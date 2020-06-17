import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Table } from "../Table";

import { updateProjectDetail,getProjectAssets } from "../../services/projects/projectsSevice";
import { upsertContact } from "../../services/contacts/contacts";
import Modal from "../Modal/Modal";
import { ContactForm } from "../ContactForm";

function ContactProject(props) {

    const { handleSubmit, register, errors, reset } = useForm();

    const [createModalDisplayed, setCreateModalDisplayed] = React.useState(false);
    const [selectedContact, setSelectedContact] = React.useState("");
    const [whiteListProject, setwhiteListProject] = React.useState(props.whitelist);

    const generateRowComponentContact = (item) => {
        return (
            <tr>
                <td style={{ verticalAlign: "middle" }}>{item}</td>
                <td>
                    <button class="button" onClick={async () => {
                        setSelectedContact(item)
                        await updateProjectDetail(props.userId, props.projectId, {
                            whitelist: whiteListProject.filter(e => e !== selectedContact)
                        })
                        setwhiteListProject(whiteListProject.filter(e => e !== selectedContact))
                    }}>
                        Bloquer
                    </button>
                </td>
                <td>
                    <button class="button is-primary" disabled={props.userContacts.map(contact => contact.email).includes(item)} onClick={() => {
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
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async value => {
        whiteListProject.push(value.email)
        await updateProjectDetail(props.userId, props.projectId, { whitelist: whiteListProject })
        reset({ values: { email: "" } });
    }


    const toggleCloseModal = React.useCallback(() => {
        setCreateModalDisplayed(!createModalDisplayed);
    }, [createModalDisplayed]);

    const handleDebug = async () => {
        console.log(
            props.whitelist
        );
        console.log(
            whiteListProject
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="email"
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid email address"
                        }
                    })}
                />
                {errors.email && errors.email.message}
                <button class="button is-primary" type="submit">+ Add</button>
            </form>
            <Table
                items={whiteListProject}
                render={generateRowComponentContact}
            />
            <Modal isActive={createModalDisplayed} onClose={toggleCloseModal}>
                <ContactForm data={{ email: selectedContact, first_name: "", last_name: "" }} onSubmit={saveContact} />
            </Modal>
            <button onClick={handleDebug}>debug</button>
        </div>
    )
}

export default ContactProject