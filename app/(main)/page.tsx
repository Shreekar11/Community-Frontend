"use client";

import { UserData } from "@/type";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"

export default function Home() {

  const [userDetails] = useAuthState(auth);

  const [user, setUser] = useState<UserData>();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const data = JSON.parse(userData);
      setUser(data);
    }
  }, []);

  return (
    <main className="text-white">
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </main>
  );
}
