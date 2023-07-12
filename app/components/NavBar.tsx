"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";


export default function NavBar() {

  const { data, loading } = useContext(AuthenticationContext);
  const { signOut } = useAuth();


  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable{" "}
      </Link>
      <div>
        {loading ? ( null ) : (
          <div className="flex">
          {data ? (
            <button onClick={signOut} className="bg-blue-400 text-white border p-1 px-4 rounder mr-3">Sign out</button>
          ) : (
            <>
              <AuthModal isSignin={true} />
              <AuthModal isSignin={false} />
            </>
          )}
        </div>)}
      </div>
    </nav>
  );
}