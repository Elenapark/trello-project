"use client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { ListWithCards } from "@/types";

interface ListHeaderProps {
  data: ListWithCards;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  // for optimistic updates
  const [title, setTitle] = useState(data.title);

  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      disableEditing();
    }

    execute({ title, id, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            onBlur={onBlur}
            defaultValue={title}
            placeholder="Enter list title..."
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transitio truncate bg-transparent"
          />
          {/* hidden id & board id */}
          <input hidden value={data.id} name="id" id="id" />
          <input hidden value={data.boardId} name="boardId" id="boardId" />
          {/* form submit use */}
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
          onClick={enableEditing}
        >
          {data.title}
        </div>
      )}
    </div>
  );
};
