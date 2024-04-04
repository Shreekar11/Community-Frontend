"use client";

import { UserData } from "@/type";
import { useEffect, useState } from "react";

export default function Home() {

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
