import React from "react"
import Cookies from "js-cookie"

export function useUserPreferencies(){

    function setRememberUsernameCookie(username){
        Cookies.set("rememberedUsername", username,{expires: 7})

    }
    function getRememberUsernameCookie(){
       return Cookies.get("rememberedUsername")
    }
    return {setRememberUsernameCookie, getRememberUsernameCookie}
}