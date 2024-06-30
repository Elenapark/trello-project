"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "User not found",
    };
  }

  const { title, image } = data;
  const [imageId, imageThumbUrl, imageUserName, imageLinkHTML, imageFullUrl] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageUserName ||
    !imageLinkHTML ||
    !imageFullUrl
  ) {
    return {
      error: "Missing image data. Failed to create board.",
    };
  }

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    });
  } catch (error) {
    return {
      error: "DB Error",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return {
    data: board,
  };
};

/**
 * returns a promise that resolves to an ActionState
 */
export const createBoard = createSafeAction(CreateBoard, handler);
