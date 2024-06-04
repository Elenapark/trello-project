"use server";

// server action - much faster than usual api calls
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  message?: string | null;
  errors?: {
    title?: string[];
  };
};

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "DB Error",
    };
  }

  // update immediately to show the new board
  revalidatePath("/organization/org_2hHnO1QsbQLQNFwtHRhJhdNP7q");
  redirect("/organization/org_2hHnO1QsbQLQNFwtHRhJhdNP7q");
}
