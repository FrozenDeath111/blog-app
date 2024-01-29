import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const register = async(email, name, password) => {
        setIsLoading(true);
        setError(null);

        const res = await fetch('http://localhost:4000/api/user/register', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                name,
                password
            })
        });

        const json = await res.json();

        if(!res.ok){
            setIsLoading(false);
            setError(json.error);
        }

        if(res.ok){
            // save to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update AuthContext
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);
        }
    }
    
    return { register, isLoading, error }
}