"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  errors?: {
    title?: string[];
  };
}

export const FormInput = ({ errors }: FormInputProps) => {
  // form 태그 아래에 있으면 useFormStatus()를 사용할 수 있음
  const { pending, data } = useFormStatus();
  return (
    <div>
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter a board title"
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((err) => (
            <p key={err} className="text-rose-500">
              {err}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};
