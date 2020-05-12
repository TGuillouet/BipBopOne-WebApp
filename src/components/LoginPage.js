import React from "react"
import {useForm} from "react-hook-form"
import {auth} from "./../firebase"
import {useUserPreferencies} from "../hooks/useUserPreferencies"

/**
 * 
 * @param {String} value 
 * @returns {Boolean}
 */
function validatePassword (value){
    console.log(value.length>=8&&hasCapitalizedCharacters(value)&&hasNumberCharacters(value)&&new RegExp(/[!@#$%^&*(),.?":{}|<>]/).test(value))
    return value.length>=8&&hasCapitalizedCharacters(value)&&hasNumberCharacters(value)&&new RegExp(/[!@#$%^&*(),.?":{}|<>]/).test(value)
}
function hasCharacterInRange (str, start, end) {
    for(let charCode=start; charCode<=end; charCode++){
        if (str.includes(String.fromCharCode(charCode)))
        return true
    }
    return false
}
/**
 * 
 * @param {String} str 
 * @returns {Boolean}
 */
function hasCapitalizedCharacters (str) {
    const CAPITALIZED_A_CHARCODE=65
    const CAPITALIZED_Z_CHARCODE=90
    return hasCharacterInRange(str, CAPITALIZED_A_CHARCODE, CAPITALIZED_Z_CHARCODE )
}
function hasNumberCharacters (str) {
    const NUMBER_0_CHARCODE=48
    const NUMBER_9_CHARCODE=57
    return hasCharacterInRange(str, NUMBER_0_CHARCODE, NUMBER_9_CHARCODE )
}
/**
 * 
 */
function LoginPage () {
    const {register, handleSubmit, errors} = useForm()
    const {getCookie, setCookie} = useUserPreferencies()
    function onSubmit (data){
        auth.signInWithEmailAndPassword(data.mail, data.password); // Automatic login

        console.log(data)
        console.log(errors)
    }
    


    return(
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="mail" ref={register({required:true, pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})} type="text"/>
                    <p className="has-text-danger">{errors.mail?.type}</p>
                    <input name="password" ref={register({required:true, validate: validatePassword})} type="text"/>
                    <p className="has-text-danger">{errors.password?.type}</p>
                    <input type="submit"/>
                </form> 
            </div>
        </div>
    )
}
export default LoginPage