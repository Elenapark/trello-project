"use client";
import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

interface CardProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps} // activate the drag and drop
          ref={provided.innerRef}
          role="button" // clickable
          className="truncate border-2 border-transparent hover:border-black *:
   py-2 px-3 bg-white rounded-md text-sm shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
