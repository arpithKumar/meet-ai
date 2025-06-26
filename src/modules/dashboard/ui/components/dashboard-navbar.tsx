"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftIcon, PanelLeftCloseIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCommand from "./dashboard-command";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const downKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", downKey);
    return () => document.removeEventListener("keydown", downKey);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button className="size-9" variant={"outline"} onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          className="h-9 w-[240px] justify-start font-nomal text-muted-foreground hover:text-muted-foreground"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd
            className="ml-auto 
        pointer-events-none
        inline-flex
        h-5
        select-none
        items-center
        gap-1 
        rounded
        border
        bg-muted
        px-1.5
        font-mono
        text-[10px]
        font-medium
        text-muted-foreground"
          >
            <span className="text-xs">(&#8984;/ctrl)</span>(K/k)
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
