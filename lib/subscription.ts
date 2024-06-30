import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findFirst({
    where: {
      orgId,
    },
    select: {
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      striptCurrntPeriodEnd: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValidSubscription =
    orgSubscription.stripePriceId &&
    orgSubscription.striptCurrntPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValidSubscription;
};
