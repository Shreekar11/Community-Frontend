"use client";

import { toast } from "sonner";
import { useState } from "react";
import { LoginForm } from "@/type";
import { getAuth } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { githubProvider, googleProvider } from "@/lib/firebase";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import loginImage from "@/public/img/login/login.png";
import githubIcon from "@/public/img/login/github.png";

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
import { useAuth } from "@/context/Auth";
import { Separator } from "@/components/ui/separator";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const page = () => {
  const auth = getAuth();
  const router = useRouter();
  const { setUserAuthInfo } = useAuth();
  const [userData, setUserData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const email = userData.email;
    const password = userData.password;

    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/v1/auth/signin`, {
        email: userData.email,
        password: userData.password,
      });
      toast.success(response.data.message);
      setUserAuthInfo(response.data);
      console.log("response:", response);
      router.push("/");
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.log("Error", err);
    }
  };

  const handleGoogleSubmit = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      toast.success("User sign in Successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSubmit = async () => {
    try {
      const response = await signInWithPopup(auth, githubProvider);
      toast.success("User sign in Successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-[#5865F2] flex justify-center items-center h-screen">
      <Card className="w-3/4 sm:w-1/2 p-2 lg:p-8 rounded-xl bg-[#3f4146] text-white border border-[#313338] flex justify-center items-center">
        <div className="lg:border-r lg:border-r-[#aaafbc] lg:pr-8">
          <CardHeader className="lg:mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2">Login</CardTitle>
            <CardDescription className="text-sm text-center">
              Welcome back to{" "}
              <span className="text-[#7c87ff]">communities</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
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
          <CardFooter className=" flex flex-col space-y-2 justify-center items-center">
            <Button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-[#5865F2] hover:bg-[#434fd0]"
            >
              Login
            </Button>
            <p className="text-xs">
              Don't have an account?{" "}
              <span className="text-[#7c87ff]">
                <Link href="/register">Register</Link>
              </span>
            </p>
          </CardFooter>
          <Separator className="h-[1px] lg:mb-6 bg-[#aaafbc] rounded-md w-[13rem] mx-auto" />
          <div className="flex flex-col justify-center items-center space-y-4 pb-4">
            <div className="relative w-[80%] hover:cursor-pointer">
              <FcGoogle className="h-6 w-6 absolute top-[0.50rem] left-5 rounded-full" />
              <Button
                onClick={handleGoogleSubmit}
                className="w-full rounded-xl text-xs text-black pr-1 bg-[#ffffff] hover:bg-[#e5e5e5]"
              >
                Continue with Google
              </Button>
            </div>
            <div className="relative w-[80%] hover:cursor-pointer">
              {/* <FaGithub className="h-6 w-6 absolute top-[0.50rem] left-5 bg-black rounded-full" /> */}
              <Image
                src={githubIcon}
                alt="github-image"
                className="h-6 w-6 absolute top-[0.50rem] left-5"
              />
              <Button
                onClick={handleGithubSubmit}
                className="w-full rounded-xl text-xs text-black pr-1 bg-[#ffffff] hover:bg-[#e5e5e5]"
              >
                Continue with Github
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:pl-8 hidden lg:block">
          <div className="space-y-6 flex flex-col justify-center items-center">
            <div className="text-center flex flex-col justify-center items-center font-bold text-3xl ">
              {" "}
              Explore<span className="text-[#7c87ff]">Communities!</span>
            </div>
            <Image
              src={loginImage}
              alt="login-image"
              height={300}
              width={300}
              className=" border rounded-xl"
            />
          </div>
        </div>
      </Card>
    </main>
  );
};

export default page;
