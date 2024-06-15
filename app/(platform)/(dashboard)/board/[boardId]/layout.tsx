import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { BoardNavbar } from "./_components/BoardNavbar";

export const generateMetadata = async ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
};

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    boardId: string;
  };
}) => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    // redirect to 404 page
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative h-dvh bg-no-repeat bg-cover bg-center"
    >
      <BoardNavbar data={board} />
      {/* layer */}
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
