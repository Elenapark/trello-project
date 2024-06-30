import { create } from "zustand";

type PromitionModalStore = {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

const usePromotionModal = create<PromitionModalStore>((set) => ({
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePromotionModal;
