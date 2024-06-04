"use server";

// server action - much faster than usual api calls
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2hHnO1QsbQLQNFwtHRhJhdNP7q");
}
