"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { useAction } from "@/hooks/use-action";
import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { updateListOrder } from "@/actions/list/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/card/update-card-order";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  // for optimistic updates
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success(`Lists reordered`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success(`Cards reordered`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, idx) => ({
          ...item,
          order: idx,
        })
      );

      // only update the UI (optimistic update)
      setOrderedData(items);

      // server action to update the DB
      executeUpdateListOrder({
        boardId,
        items,
      });
    }

    // User moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      // card item을 drag하는 list를 찾는다
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      // card item을 drop하는 list를 찾는다
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      // check if cards exists in the source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // check if cards exists in the destination list
      if (!destList.cards) {
        destList.cards = [];
      }

      // moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        // reassign the order
        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        // update the source list cards
        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        executeUpdateCardOrder({
          boardId,
          items: reorderedCards,
        });
      } else {
        // moving the card to another list

        // remove the card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        if (!movedCard) return;
        // assign the new listid (destination listid) to the moved card
        movedCard.listId = destination.droppableId;

        // insert the card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        // source list cards reordering
        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // destination list cards reordering
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);

        executeUpdateCardOrder({
          boardId,
          items: destList.cards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3"
          >
            {orderedData.map((list, idx) => (
              <ListItem key={list.id} index={idx} data={list} />
            ))}

            {/*  Add a new list form at the end of the list */}
            {provided.placeholder}
            <ListForm />

            {/* empty space at the end of x-axis - create little bit of padding */}
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
