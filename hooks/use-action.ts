import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);

  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (input: TInput) => {
      try {
        const res = await action(input);

        if (!res) return;

        // validation error
        setFieldErrors(res.fieldErrors);

        // server error
        if (res.error) {
          setError(res.error);
          options.onError?.(res.error);
        }

        // success
        if (res.data) {
          setData(res.data);
          options.onSuccess?.(res.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    fieldErrors,
    error,
    data,
    isLoading,
    execute,
  };
};
