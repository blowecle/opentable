"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";


export default function NavBar() {


  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable{" "}
      </Link>
      <div className="flex">
        <AuthModal isSignin={true} />
        <AuthModal isSignin={false} />
      </div>
    </nav>
  );
}