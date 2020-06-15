import React from "react";
import {TopProjectTableBar} from "./TopProjectTableBar";
import {Table} from "./Table";

import Modal from "./Modal/Modal";
import { ContactForm } from "./ContactForm";

import {getUserContactsList, upsertContact} from "../services/contacts/contacts";
import {withUserContext} from "../contexts/UserContext";

function ContactsPage(props) {

  const [ createModalDisplayed, setCreateModalDisplayed ] = React.useState(false);
  const [ isLoading, setLoadingState ] = React.useState(false);
  const [ contacts, setContacts ] = React.useState([]);
  const [ filteredContacts, setFilteredContacts ] = React.useState([]);
  const [ selectedContact, setSelectedContact ] = React.useState({});

  React.useEffect(() => {
    fetchData();
  }, [props.context.user.uid, setContacts]);

  async function fetchData() {
    // Fetch les contacts de l'utilisateur
    setLoadingState(true);

    const contacts = await getUserContactsList(props.context.user.uid);

    // Set la liste des contacts de l'utilisateur dans le state
    setContacts(contacts);
    setFilteredContacts(contacts);

    setLoadingState(false)
  }

  const onRowClick = React.useCallback((id) => {
    return async () => {
      const contact = contacts.find((contact) => contact.id === id);

      await setSelectedContact({ ...contact, id })

      setCreateModalDisplayed(true);
    }
  }, [contacts]);

  const onResearch = (research) => {
    setFilteredContacts(contacts.filter((contact) => contact.first_name.includes(research) || contact.last_name.includes(research)));
  };

  const generateRowComponent = ({ id, first_name, last_name, email }) => {
    return (
      <tr key={id} onClick={onRowClick(id)}>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td><span className="tag is-primary">{email}</span></td>
      </tr>
    )
  };

  const toggleCreateProjectModal = React.useCallback(() => {
    if (createModalDisplayed && selectedContact !== null) {
      setSelectedContact(null);
    }

    setCreateModalDisplayed(!createModalDisplayed);
  }, [createModalDisplayed, selectedContact]);

  const saveContact = async (contactData) => {
    try {
      await upsertContact(props.context.user.uid, contactData.id, contactData)

      setSelectedContact({});

      setCreateModalDisplayed(false);

      fetchData();
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className="content root">
      <div style={{ height: "100vh" }} className="columns is-desktop is-vcentered is-centered">
        <div style={{ height: "70vh" }}  className="box column is-four-fifths table-container">
          <TopProjectTableBar leftButtonLabel="Créer un contact" onLeftButtonClick={toggleCreateProjectModal} onResearch={onResearch} />
          <Table
            isLoading={isLoading}
            items={filteredContacts}
            render={generateRowComponent}
          />
        </div>
      </div>
      <Modal isActive={createModalDisplayed} onClose={toggleCreateProjectModal}>
        <ContactForm data={selectedContact} onSubmit={saveContact} />
      </Modal>
    </div>
  )
}

export default withUserContext(ContactsPage)
