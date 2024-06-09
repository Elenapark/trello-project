"use client";

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";

import { useFormState } from "react-dom";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { useAction } from "@/hooks/use-action";

export const Form = () => {
  // const initialState = { message: "", errors: {} };
  // [결과state, create함수]
  // const [state, dispatch] = useFormState(create, initialState); // react 19 feature

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton>Create</FormButton>
    </form>
  );
};
