"use client";

import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import usePromotionModal from "@/hooks/use-promotion-modal";
import { Button } from "@/components/ui/button";

export const PromotionModal = () => {
  const promotionModal = usePromotionModal();
  return (
    <Dialog open={promotionModal.isOpen} onOpenChange={promotionModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src="/promotion-image.jpg"
            alt="next"
            className="object-cover"
            fill
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Taskify Pro today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button className="w-full" variant="primary">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
