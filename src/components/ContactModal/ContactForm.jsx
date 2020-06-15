import React from "react";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";

import { W3C_EMAIL_REGEXP } from "../../helpers/Regexp";

const formErrors = {
  first_name: {
    required: "Ce champ est requis",
  },
  last_name: {
    required: "Ce champ est requis",
  },
  email: {
    required: "Ce champ est requis",
    pattern: "L'adresse email est invalide"
  }
};

function ContactForm(props) {

  const {register, handleSubmit, errors, reset} = useForm({
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    props.onSubmit({ id: props.data.id ?? null, ...data });
    reset({ values: { first_name: "", last_name: "", email: "" } });
  };

  return (
    <form className="box" onSubmit={handleSubmit(onSubmit)}>
      <div className="columns">
        <div className="column field">
          <label className="label">Prénom</label>
          <input className="input" name="first_name" type="text" defaultValue={props.data?.first_name || ""} ref={register({ required: true })} />
          <p className="has-text-danger">{formErrors.first_name[errors.first_name?.type]}</p>
        </div>
        <div className="column field">
          <label className="label">Nom</label>
          <input className="input" name="last_name" type="text" defaultValue={props.data?.last_name || ""} ref={register({ required: true })} />
          <p className="has-text-danger">{formErrors.last_name[errors.last_name?.type]}</p>
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <input type="text" className="input" name="email" defaultValue={props.data?.email || ""} ref={register({ required: true, pattern: W3C_EMAIL_REGEXP })}/>
        <p className="has-text-danger">{formErrors.email[errors.email?.type]}</p>
      </div>

      <div className="level">
        <div className="level-left" />
        <div className="level-right">
          <div className="level-item">
            <div className="field">
              <div className="control">
                <button className="button is-primary is-block" type="submit">Sauvegarder</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </form>
  );
}

ContactForm.propTypes = {
  data: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string
  })
};

export default ContactForm;
