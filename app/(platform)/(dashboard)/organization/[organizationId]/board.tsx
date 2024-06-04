import { deleteBoard } from "@/actions/deleteBoard";
import { Button } from "@/components/ui/button";
import { FormButton } from "./form-button";

interface BoardProps {
  title: string;
  id: string;
}

export const Board = ({ title, id }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form
      action={deleteBoardWithId}
      className="border border-gray-300 rounded-sm p-2 flex items-center justify-between"
    >
      <p>Board title: {title}</p>
      <FormButton variant="destructive">Delete</FormButton>
    </form>
  );
};
