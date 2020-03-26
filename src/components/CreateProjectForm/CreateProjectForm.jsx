import React from "react";
import { useForm } from "react-hook-form";

function CreateProjectForm(props) {
    const {register, handleSubmit, errors} = useForm({
        mode: "onBlur"
    });

    return (
        <form className="box" onSubmit={handleSubmit(props.onSubmit)}>
            <div className="columns">
                <div className="column">
                    <label className="label">Nom du projet</label>
                    <input className="input" name="name" ref={register({ required: true })} placeholder="Entrez le nom de votre projet ici" />
                    <p className="has-text-danger">{errors.name && 'Ce champ est requis'}</p>
                </div>
                <div className="column">
                    <label className="label">Nom du client</label>
                    <input className="input" name="client_name" ref={register({ required: true })} placeholder="Entrez le nom de votre client ici" />
                    <p className="has-text-danger">{errors.client_name && 'Ce champ est requis'}</p>
                </div>
            </div>

            <div className="field">
                <label className="label">Description</label>
                <textarea className="textarea" name="description" ref={register({ required: true })} placeholder="Description de votre projet" />
                <p className="has-text-danger">{errors.description && 'Ce champ est requis'}</p>
            </div>

            <div className="field">
                <label className="label">Etat du projet</label>
                <div className="select">
                    <select name="state" ref={register({ required: true })} placeholder="Description de votre projet">
                        <option value="En cours">En cours</option>
                        <option value="En attente">En attente</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                    <p className="has-text-danger">{errors.state && 'Ce champ est requis'}</p>
                </div>
            </div>

            <div className="level">
                <div className="level-left" />
                <div className="level-right">
                    <div className="level-item">
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary is-block" type="submit">Créer le projet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateProjectForm;
