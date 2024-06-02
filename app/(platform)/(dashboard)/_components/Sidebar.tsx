"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { useLocalStorage } from "usehooks-ts";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { NavItem, Organization } from "./NavItem";

interface SidebarProps {
  storageKey?: string;
}

// dashboard mobile navbar에서 사용 & organization sidebar에서 사용하므로 dashboard components에 생성
export const Sidebar = ({
  storageKey = "trello-sidebar-key",
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  // current organization
  const {
    organization: activeOrganization,
    isLoaded: isActiveOrganizationLoaded,
  } = useOrganization();

  // existing organization list
  const { userMemberships, isLoaded: isOrgListLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordingValue = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (
    !isOrgListLoaded ||
    !isActiveOrganizationLoaded ||
    userMemberships.isLoading
  )
    return (
      // Skeleton
      <>
        <div className="flex items-center justify-between mb-2">
          {/* replicationg workspaces */}
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        {/* replicating organization list */}
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );

  return (
    <>
      {/* Sidebar Header */}
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">WorkSpaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          className="ml-auto" // same as justify-between
          variant="ghost"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Accordion */}
      <Accordion
        type="multiple"
        className="space-y-2"
        defaultValue={defaultAccordingValue}
      >
        {userMemberships.data?.map(({ organization }) => {
          return (
            <NavItem
              key={organization.id}
              organization={organization as Organization}
              onExpand={onExpand}
              isActive={activeOrganization?.id === organization.id}
              isExpanded={expanded[organization.id]}
            />
          );
        })}
      </Accordion>
    </>
  );
};
