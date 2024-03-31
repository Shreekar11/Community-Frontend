import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ActionToolTip from "@/components/action-tooltip";

const ServerSidebar = () => {
  return (
    <div>
      <ActionToolTip side="right" align="center" label="Add a server">
        <Button className="group flex items-center">
          <div
            className="flex mx-3 h-[48px] w-[48px] rounded-[24px] 
          group-hover:rounded-[16px] transition-all overflow-hidden items-center 
          justify-center bg-background bg-neutral-700 group-hover:bg-emerald-500"
          >
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </Button>
      </ActionToolTip>
    </div>
  );
};

export default ServerSidebar;
