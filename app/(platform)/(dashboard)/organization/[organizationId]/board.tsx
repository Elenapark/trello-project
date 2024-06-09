import { deleteBoard } from "@/actions/deleteBoard";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

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
      {/* <FormSubmit variant="destructive">Delete</FormSubmit> */}
      <Button>Delete</Button>
    </form>
  );
};
