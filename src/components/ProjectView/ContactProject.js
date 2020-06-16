import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Table } from "../Table";

import { updateProjectDetail } from "../../services/projects/projectsSevice";

function ContactProject(props) {

    const { handleSubmit, register, errors, reset } = useForm();

    const generateRowComponentContact = (item) => {
        return (
            <tr>
                <td style={{ verticalAlign: "middle" }}>{item}</td>
                <td><button class="button">Bloquer</button></td>
                <td><button class="button">Ajouter contact</button></td>
            </tr>
        );
    };

    const onSubmit = async value => {
        props.whitelist.push(value.email)
        await updateProjectDetail(props.userId, props.projectId, { whitelist: props.whitelist })
        reset({ values: { email: "" } });
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
                <button class="button is-primary" type="submit"><FontAwesomeIcon icon={faUserPlus} /></button>
            </form>
            <Table
                items={props.whitelist}
                render={generateRowComponentContact}
            />
        </div>
    )
}

export default ContactProject