"use client";

import { LoginForm } from "@/type";
import { useState } from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASEURL}/v1/auth/signin`, {
        email: userData.email,
        password: userData.password,
      });
      toast.success(response.data.message);
      console.log("response:", response);
      router.push("/");
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.log("Error", err);
    }
  };

  return (
    <main className="bg-[#5865F2] flex justify-center items-center h-screen">
      <Card className="w-1/2 p-2 lg:p-8 rounded-xl bg-[#3f4146] text-white border border-[#313338] flex justify-center items-center">
        <div className="lg:border-r lg:border-r-[#aaafbc] lg:pr-10">
          <CardHeader className="mb-5">
            <CardTitle className="mb-2 text-center">Login</CardTitle>
            <CardDescription>Welcome back to community!</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-4">
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
              className="w-1/2 border border-gray-400 rounded-xl hover:bg-[#5865F2]"
            >
              Login
            </Button>
            <p className="text-xs">
              Don't have an account?{" "}
              <span className="text-[#7884ff]">
                <Link href="/register">Register</Link>
              </span>
            </p>
          </CardFooter>
        </div>
        <div className="md:pl-10 hidden lg:block">
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