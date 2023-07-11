import axios from "axios";

const useAuth = () => {

    const signIn = async ({email, password}: {email: string, password: string}) => {
        try {
            const response = await axios.post('/api/auth/signin', {
                email,
                password
            })

            console.log(response);

            

        } catch (error) {
            
        }
    }

    const signUp = async () => {
        console.log('signUp');
    }

    return {signIn, signUp}
}

export default useAuth;