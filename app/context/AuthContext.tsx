"use client";

import { create } from "domain";
import React from "react"
import { useState, createContext } from "react";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    city: string;
    phone: string;
}

interface State {
    loading: boolean;
    data: string | null;
    error: User | null;
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    error: null,
    data: null,
    setAuthState: () => {}
});

export default function AuthContext({children}: {children: React.ReactNode}) {

    const [authState, setAuthState] = useState<State>({
        loading: false,
        data: null,
        error: null
    })
    return <AuthenticationContext.Provider value={{
        ...authState,
        setAuthState
        }}>
        {children}
    </AuthenticationContext.Provider>
}