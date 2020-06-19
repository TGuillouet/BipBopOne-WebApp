import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Table } from "../Table";

import { updateProjectDetail } from "../../services/projects/projectsSevice";
import { upsertContact } from "../../services/contacts/contacts";
import {Modal} from "../Modal";
import { ContactForm } from "../ContactForm";
import {W3C_EMAIL_REGEXP} from "../../helpers/Regexp";

const formErrors = {
  email: {
    pattern: "Cette adresse email est invalide",
    required: "Ce champ est requis"
  }
}

function ContactProject(props) {

    const { handleSubmit, register, errors, reset } = useForm();

    const [createModalDisplayed, setCreateModalDisplayed] = React.useState(false);
    const [selectedContact, setSelectedContact] = React.useState("");
    const [whiteListProject, setWhiteListProject] = React.useState([]);

    React.useEffect(() => {
      setWhiteListProject(props.whitelist);
    }, [props.whitelist])

    const generateRowComponentContact = (item) => {
        return (
            <tr key={item}>
                <td style={{ verticalAlign: "middle" }}>{item}</td>
                <td style={{ display: "flex", justifyContent: "space-around" }}>
                  <button className="button" onClick={async () => {
                    await updateProjectDetail(props.userId, props.projectId, {
                      whitelist: whiteListProject.filter(e => e !== item)
                    })
                    setWhiteListProject(whiteListProject.filter(e => e !== item))
                  }}>
                    Bloquer
                  </button>
                  <button className="button is-primary" disabled={props.userContacts.map(contact => contact.email).includes(item)} onClick={() => {
                    setSelectedContact(item)
                    setCreateModalDisplayed(true)
                  }}>
                    <FontAwesomeIcon icon={faUserPlus} />
                  </button>
                </td>
            </tr>
        );
    };

    const saveContact = async (contactData) => {
        try {

            await upsertContact(props.userId, contactData.id, contactData)
            setSelectedContact("");
            setCreateModalDisplayed(false);
            props.onContactAdded();
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async value => {
      if (!whiteListProject.includes(value.email)) {
        whiteListProject.push(value.email)
        await updateProjectDetail(props.userId, props.projectId, { whitelist: whiteListProject })
      }else{
        alert("L'adresse mail est déjà dans la whitelist du projet")
      }
        reset({ values: { email: "" } });
    }


    const toggleCloseModal = React.useCallback(() => {
        setCreateModalDisplayed(!createModalDisplayed);
    }, [createModalDisplayed]);

    return (
        <div className="ContactProjet box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="has-text-danger">{formErrors.email[errors.email?.type]}</p>
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input is-half"
                  name="email"
                  ref={register({ required: true, pattern: W3C_EMAIL_REGEXP })} />
              </div>
              <div className="control">
                <button className="button is-primary" type="submit">Ajouter</button>
              </div>
            </div>
          </form>
          <Table
            items={whiteListProject}
            render={generateRowComponentContact}
          />
          <Modal isActive={createModalDisplayed} onClose={toggleCloseModal}>
              <ContactForm data={{ email: selectedContact, first_name: "", last_name: "" }} onSubmit={saveContact} />
          </Modal>
        </div>
    )
}

export default ContactProject
