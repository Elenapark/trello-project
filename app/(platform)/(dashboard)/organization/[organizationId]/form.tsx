"use client";

import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";

import { useFormState } from "react-dom";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";

export const Form = () => {
  const initialState = { message: "", errors: {} };
  // [결과state, create함수]
  const [state, dispatch] = useFormState(create, initialState); // react 19 feature

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <FormButton>Create</FormButton>
    </form>
  );
};
