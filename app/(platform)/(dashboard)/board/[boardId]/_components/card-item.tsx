"use client";
import { Card } from "@prisma/client";

interface CardProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data }: CardProps) => {
  return (
    <div
      role="button" // clickable
      className="truncate border-2 border-transparent hover:border-black *:
  py-2 px-3 bg-white rounded-md text-sm shadow-sm"
    >
      {data.title}
    </div>
  );
};
