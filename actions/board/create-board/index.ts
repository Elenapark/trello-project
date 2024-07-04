"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableBoards, hasAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "User not found",
    };
  }

  const existBoardLimit = await hasAvailableCount();
  const isPro = await checkSubscription();

  if (!existBoardLimit && !isPro) {
    return {
      error:
        "You have reached the limit of free boards. Please upgrade your plan to create more boards.",
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

    if (!isPro) {
      await incrementAvailableBoards();
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
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
