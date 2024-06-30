import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { ENTITY_TYPE } from "@prisma/client";

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: { cardId: string };
  }
) => {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createAt: "desc",
      },
      take: 3, // only the latest 3 will be visible on the card modal
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
