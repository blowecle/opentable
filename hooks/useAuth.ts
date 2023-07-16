import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
import { deleteCookie } from "cookies-next";

const useAuth = () => {

    const { setAuthState } = useContext(AuthenticationContext);

    const signIn = async ({email, password}: {email: string, password: string}, handleClose: ()=> void) => {
        setAuthState({
            data: null,
            error: null,
            loading: true
        })
        try {
            const response = await axios.post('/api/auth/signin', {
                email,
                password
            })
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
            handleClose();
        } catch (error: any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }
    }

    const signUp = async ({first_name, last_name, email, password, city, phone}: {first_name: string, last_name: string, email: string, password: string, city: string, phone: string}, handleClose: ()=> void) => {
        setAuthState({
            data: null,
            error: null,
            loading: true
        })
        try {
            const response = await axios.post('/api/auth/signup', {
                first_name,
                last_name,
                email,
                password,
                city,
                phone
            })
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
            handleClose();
        } catch (error: any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }

    }

    const signOut = async () => {
        deleteCookie("jwt");

        setAuthState({
            data: null,
            error: null,
            loading: false
        })
    }
    return {signIn, signUp, signOut}
}

export default useAuth;