"use client";

import { useEffect, useState } from "react";
import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  // for optimistic updates
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3">
      {orderedData.map((list, idx) => (
        <ListItem key={list.id} index={idx} data={list} />
      ))}

      <ListForm />
      {/* empty space at the end of x-axis - create little bit of padding */}
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
