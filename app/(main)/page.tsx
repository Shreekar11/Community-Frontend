"use client";

import { UserData } from "@/type";
import { useEffect, useState } from "react";
import api from "@/app/api/api";

export default function Home() {
  const [user, setUser] = useState<UserData>();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const data = JSON.parse(userData);
      setUser(data);
    }
  }, []);

  const getAllCommunities = async () => {
    try {
      const response = await api.get(`/v1/community`);
      const data = await response.data;
      console.log("data: ", data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getAllCommunities();
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
