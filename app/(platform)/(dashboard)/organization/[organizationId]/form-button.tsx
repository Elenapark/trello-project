"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const FormButton = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  // form 태그 아래에 있으면 useFormStatus()를 사용할 수 있음
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...props}>
      {children || "Submit"}
    </Button>
  );
};
