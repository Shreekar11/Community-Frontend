"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/app/api/api";
import ActionToolTip from "@/components/action-tooltip";
import { useRouter } from "next/navigation";

const CreateServerSidebar = () => {
  const router = useRouter();
  const [communityName, setCommunityName] = useState("");

  const handleCreateCommunity = async () => {
    try {
      const response = await api.post("/v1/community", {
        community_name: communityName,
      });
      toast.success(response.data.message);
      console.log("Community: ", response);
      router.push(`/servers/${response.data.content.data.id}`);
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.log("Error", err);
    }
  };

  return (
    <div>
      <Dialog>
        <ActionToolTip side="right" align="center" label="Add a community">
          <DialogTrigger asChild>
            <Button className="group flex items-center">
              <div
                className="flex h-[48px] w-[48px] rounded-[24px] 
          group-hover:rounded-[16px] transition-all overflow-hidden items-center 
          justify-center bg-background bg-neutral-700 group-hover:bg-emerald-500"
              >
                <Plus
                  className="group-hover:text-white transition text-emerald-500"
                  size={25}
                />
              </div>
            </Button>
          </DialogTrigger>
        </ActionToolTip>
        <DialogContent className="max-w-[20rem] md:max-w-[30rem] rounded-xl md:rounded-xl bg-[#fff]">
          <DialogHeader>
            <DialogTitle className="text-center md:text-3xl">
              Create a <span className="text-[#5865F2]">Community</span>
            </DialogTitle>
            <DialogDescription className="flex justify-center items-center text-zinc-500">
              Please Provide an image and a name for your community. Fill the
              below fields.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="communityImage" className="text-right">
                Image
              </Label>
              <Input
                placeholder="Community Image"
                className="col-span-3 rounded-xl border 
                border-zinc-500 placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="communityName" className="text-right">
                Community Name
              </Label>
              <Input
                placeholder="Name of community"
                className="col-span-3 rounded-xl border 
                border-zinc-500 placeholder:text-zinc-500"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateCommunity}
              className="text-white w-full rounded-xl bg-[#5865F2] hover:bg-[#434fd0]"
            >
              Create Community
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateServerSidebar;
