import {useCookies} from "react-cookie";


export const useGetUserId = () => {
    const [cookies, _] = useCookies(["access_token"]);
    if(cookies.access_token){
        return window.localStorage.getItem("userId");
    }else{
        window.localStorage.removeItem("userId");
        return false;
    }
}