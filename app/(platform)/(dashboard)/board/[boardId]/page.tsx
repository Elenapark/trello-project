export default function BoardIdPage({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  return (
    <div className="text-white font-semibold">
      Board에 대한 컨텐츠가 여기에 들어감
    </div>
  );
}
