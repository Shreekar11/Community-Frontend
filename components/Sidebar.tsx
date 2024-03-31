import ServerSidebar from "@/components/navigation/server-sidebar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationServers from "./navigation/navigation-servers";

const Sidebar = () => {
  const userServers = [
    {
      id: '1',
      image: "/img/servers/pasc.png",
      name: "PICT ACM Student Chapter",
    },
    {
      id: '2',
      image: "/img/servers/pisb.jpeg",
      name: "PICT IEEE Student Branch",
    },
    {
      id: '3',
      image: "/img/servers/pcsi.jpeg",
      name: "PICT CSI Student Chapter",
    },
  ];

  return (
    <div>
      <div className="w-[72px] min-h-screen bg-[#1E1F22] space-y-4 flex flex-col items-center text-primary py-3">
        <ServerSidebar />
        <Separator className="h-[2px] bg-zinc-700 rounded-md w-10 mx-auto" />
        <ScrollArea className="flex-1 w-full">
          {userServers &&
            userServers.map((server) => (
              <div
                className="mb-4"
                key={server.id}
              >
                <NavigationServers
                  id={server.id}
                  image={server.image}
                  name={server.name}
                />
              </div>
            ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
