"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useMobileSidebar from "@/hooks/use-mobile-sidebar";
import { Sidebar } from "./Sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);

  // to fix hydration issue between server and client
  // server side rendering first -> when it finishes -> useEffect runs
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);
  if (!isMounted) return null;

  return (
    <>
      <Button
        variant="ghost"
        onClick={onOpen}
        className="block mr-2 md:hidden"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="trello-mobile-sidebar-key" />
        </SheetContent>
      </Sheet>
    </>
  );
};
