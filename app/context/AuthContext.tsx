"use client";

import React, { useEffect } from "react"
import { useState, createContext } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

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
    data: User | null;
    error: string | null;
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
        loading: true,
        data: null,
        error: null
    })

    const fetchUser = async () => {
        try {
            const jwt = getCookie("jwt");
            if(!jwt){
                setAuthState({
                    data: null,
                    error: null,
                    loading: false
                })
            }
            const response = await axios.get('/api/auth/me', {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            })
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
        } catch (error: any) {

            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return <AuthenticationContext.Provider value={{
        ...authState,
        setAuthState
        }}>
        {children}
    </AuthenticationContext.Provider>
}