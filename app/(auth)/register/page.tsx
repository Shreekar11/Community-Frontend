"use client";

import { toast } from "sonner";
import { useState } from "react";
import { RegisterForm } from "@/type";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import loginImage from "@/public/img/login/login.png";

// ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASEURL}/v1/auth/signup`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      toast.success(response.data.message);
      console.log("response:", response);
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.log("Error", err);
    }
  };

  return (
    <main className="bg-[#5865F2] flex justify-center items-center h-screen">
      <Card className="w-1/2 p-2 lg:p-8 rounded-xl bg-[#3f4146] text-white border border-[#313338] flex justify-center items-center">
        <div className="lg:border-r lg:border-r-[#aaafbc] lg:pr-8">
          <CardHeader className="mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2">Register</CardTitle>
            <CardDescription>
              Create an Account to join <span className="text-[#7c87ff]">communities</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-4">
                  <div className="">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Full Name"
                      className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  </div>{" "}
                  <div className="">
                    <Label htmlFor="name">Email Address</Label>
                    <Input
                      id="name"
                      type="email"
                      placeholder="Email Address"
                      className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="name"
                      type="password"
                      placeholder="Password"
                      className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 justify-center items-center">
            <Button
              onClick={handleSubmit}
              className="w-full mt-2 rounded-xl bg-[#5865F2] hover:bg-[#434fd0]"
            >
              Register
            </Button>
            <p className="text-xs">
              Already have an account?{" "}
              <span className="text-[#7c87ff]">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </CardFooter>
        </div>
        <div className="md:pl-8 hidden lg:block">
          <Image
            src={loginImage}
            alt="login-image"
            height={300}
            width={300}
            className=" border rounded-xl"
          />
        </div>
      </Card>
    </main>
  );
};

export default page;
