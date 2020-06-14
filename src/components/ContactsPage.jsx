import React from "react";
import {TopProjectTableBar} from "./TopProjectTableBar";
import {Table} from "./Table";
import Modal from "./Modal/Modal";
import {getUserContactsList} from "../services/contacts/contacts";
import {withUserContext} from "../contexts/UserContext";

function ContactsPage(props) {

  const [ createModalDisplayed, setCreateModalDisplayed ] = React.useState(false);
  const [ isLoading, setLoadingState ] = React.useState(false);
  const [ contacts, setContacts ] = React.useState([]);
  const [ filteredContacts, setFilteredContacts ] = React.useState([]);

  async function fetchData() {
    // Fetch les contacts de l'utilisateur
    setLoadingState(true);

    const contacts = await getUserContactsList(props.context.user.uid);

    // Set la liste des contacts de l'utilisateur dans le state
    setContacts(contacts);
    // setFilteredContacts(contacts);

    setLoadingState(false);
  }

  React.useEffect(() => {
    fetchData();
  });

  const onRowClick = React.useCallback((id) => {
    return () => {
      console.log(id);
    }
  }, []);

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
    setCreateModalDisplayed(!createModalDisplayed);
  }, [createModalDisplayed, setCreateModalDisplayed]);

  return (
    <div className="content root">
      <div style={{ height: "100vh" }} className="columns is-desktop is-vcentered is-centered">
        <div style={{ height: "70vh" }}  className="box column is-four-fifths table-container">
          <TopProjectTableBar leftButtonLabel="Créer un contact" onLeftButtonClick={toggleCreateProjectModal} onResearch={onResearch} />
          <Table
            isLoading={isLoading}
            items={contacts}
            render={generateRowComponent}
          />
        </div>
      </div>
      <Modal isActive={createModalDisplayed} onClose={toggleCreateProjectModal}>
        {/*<CreateProjectForm onSubmit={this.createProject} />*/}
      </Modal>
    </div>
  )
}

export default withUserContext(ContactsPage)
