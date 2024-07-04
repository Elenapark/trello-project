"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import usePromotionModal from "@/hooks/use-promotion-modal";
import { toast } from "sonner";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const promotionModal = usePromotionModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      promotionModal.onOpen();
    }
  };

  return (
    <Button onClick={onClick} variant="primary">
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};
