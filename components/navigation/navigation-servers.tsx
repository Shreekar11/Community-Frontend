"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ActionToolTip from "@/components/action-tooltip";

interface NavigationServersProps {
  id: string;
  image: string;
  name: string;
}

const NavigationServers = ({ id, image, name }: NavigationServersProps) => {
  const params = useParams();
  const router = useRouter();
  const handleServerChange = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <div>
      <ActionToolTip side="right" align="center" label={name}>
        <button
          onClick={handleServerChange}
          className="group relative flex items-center"
        >
          <div
            className={`absolute left-0 bg-white rounded-r-full transition-all w-[4px] 
                params?.serverId === id
            ${params?.serverId !== id && "group-hover:h-[20px]"} ${
              params?.serverId === id ? "h-[36px]" : "h-[8px]"
            }`}
          />
          <div
            className={`relative group flex mx-3 h-[48px] w-[48px] rounded-[24px]
            group-hover:rounded-[16px] transition-all overflow-hidden 
            ${
              params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
            }
          `}
          >
            <Image fill src={image} alt="server-logo" />
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
};

export default NavigationServers;
