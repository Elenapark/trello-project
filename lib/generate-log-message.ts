import { ACTION, AuditLog } from "@prisma/client";
import { match } from "ts-pattern";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  const result = match(action)
    .with(
      ACTION.CREATE,
      () => `Created ${entityType.toLowerCase()} "${entityTitle}"`
    )
    .with(
      ACTION.UPDATE,
      () => `Updated ${entityType.toLowerCase()} "${entityTitle}"`
    )
    .with(
      ACTION.DELETE,
      () => `Deleted ${entityType.toLowerCase()} "${entityTitle}"`
    )
    .otherwise(
      () => `Unknown action: ${entityType.toLowerCase()} "${entityTitle}"`
    );

  return result;
};
