import { format } from "date-fns";
import { AuditLog } from "@prisma/client";
import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "./ui/avatar";

interface ActivityItemProps {
  data: AuditLog;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-5 w-5">
        <AvatarImage src={data.userImage} />
      </Avatar>

      <div className="flex items-center gap-2 space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700 mr-2">
            {data.userName}
          </span>
          {generateLogMessage(data)}
        </p>
        <p className="text-xs">
          {format(new Date(data.createAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};