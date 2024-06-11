export default function BoardIdPage({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  return <div>{params.boardId}</div>;
}
