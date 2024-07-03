import { create } from "zustand";

type PromitionModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const usePromotionModal = create<PromitionModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePromotionModal;
