"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import usePromotionModal from "@/hooks/use-promotion-modal";

export const PromotionModal = () => {
  const promotionModal = usePromotionModal();
  return (
    <Dialog open={promotionModal.isOpen} onOpenChange={promotionModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        heyl
      </DialogContent>
    </Dialog>
  );
};
