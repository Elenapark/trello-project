import { XCircleIcon } from "lucide-react";

export const FormErrors = ({
  id,
  errors,
}: {
  id: string;
  errors?: Record<string, string[] | undefined>;
}) => {
  if (!errors) return null;

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-xs text-rose-500"
    >
      {errors?.[id]?.map((error) => (
        <div
          key={error}
          className="flex items-center font-medium border p-2 mb-2 border-rose-500 bg-rose-500/10 rounded-sm"
        >
          <XCircleIcon className="h-4 w-4 mr-2" />
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
};
