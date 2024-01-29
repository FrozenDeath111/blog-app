import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    
    const logout = () => {
        // remove from storage
        localStorage.removeItem('user');
        localStorage.removeItem('userInfo');

        dispatch({type: 'LOGOUT'});
    }

    return {logout};
}