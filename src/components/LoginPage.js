import React, { useState } from "react"
import {useForm} from "react-hook-form"
import {auth} from "./../firebase"
import {useUserPreferencies} from "../hooks/useUserPreferencies"
import {W3C_EMAIL_REGEXP} from "../helpers/Regexp";

const formErrors = {
    mail: {
        pattern: "Votre adresse email est invalide",
        required: "Ce champ est requis"
    },
    password: {
        validate: "Votre mot de passe est invaide",
        required: "Ce champ est requis"
    }
}

const authErrorMessages = {
    "auth/wrong-password": "Ce mot de passe ne correspond pas à cette adresse email",
    "auth/network-request-failed": "Une erreur de réseau s'est produite, veuillez vérifier votre connexion internet",
    "auth/too-many-requests": "Notre serveur est surchargé, veuiillez réessayer plus tard"
}

/**
 *
 */
function LoginPage () {
    const {getRememberUsernameCookie, setRememberUsernameCookie, clearRememberedUsername} = useUserPreferencies();
    const username = getRememberUsernameCookie();

    const [formError, setFormError] = useState(null);
    const {register, handleSubmit, errors} = useForm({
        defaultValues: {
            mail: username,
            remember: username.length > 0
        }
    })

    async function onSubmit (data) {
        try {
            await auth.signInWithEmailAndPassword(data.mail, data.password);
            if (data.remember) setRememberUsernameCookie(data.mail);
            else clearRememberedUsername();
        } catch(error) {
            setFormError(authErrorMessages[error.code]);
        }
    }


    return(
        <div className="content">
            <div style={{ height: "100vh" }} className="columns is-desktop is-vcentered is-centered">
                <div className="box column is-three-fifths table-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formError && <p style={{ display: "flex", justifyContent: "center" }} className="has-text-danger" >{formError}</p>}
                        <label>Email:</label>
                        <input name="mail" className="input" ref={register({required:true, pattern: W3C_EMAIL_REGEXP})} type="text"/>
                        <p className="has-text-danger">{formErrors.mail[errors.mail?.type]}</p>

                        <label>Mot de passe:</label>
                        <input name="password" className="input" ref={register({required:true})} type="password"/>
                        <p className="has-text-danger">{formErrors.password[errors.password?.type]}</p>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                            <a>Pas de compte ? Ça se passe ici !</a>
                            <label className="checkbox">
                                <input name="remember" type="checkbox" ref={register} />
                                <span style={{ marginLeft: "10px" }}>Se souvenir de moi</span>
                            </label>
                            <input className="button" type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginPage
