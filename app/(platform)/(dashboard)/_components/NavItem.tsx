import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
};

interface NavItemProps {
  organization: Organization;
  isActive: boolean;
  isExpanded: boolean;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  organization,
  isActive,
  isExpanded,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Board",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none ">
      <AccordionTrigger
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
        onClick={() => onExpand(organization.id)}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      {/* Route Items */}
      {isExpanded && (
        <AccordionContent className="pt-1 text-neutral-700">
          {routes.map((route) => (
            <Button
              key={route.href}
              onClick={() => onClick(route.href)}
              variant="ghost"
              className={cn(
                "w-full justify-start pl-10 mb-1",
                pathname === route.href && "bg-sky-500/10 text-sky-700"
              )}
            >
              {route.icon}
              {route.label}
            </Button>
          ))}
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      {/* Image Skeleton */}
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      {/* Text Skeleton */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
};