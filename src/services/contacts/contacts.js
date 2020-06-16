import { firestore } from "../../firebase";
import {getDocumentsFromSnapshot} from "../../helpers/firestore";

/**
 * Get all the contacts of a user
 * @param {String} userId
 * @return {Promise<any[]>}
 */
export function getUserContactsList(userId) {
  return firestore
    .collection("users")
    .doc(userId)
    .collection("contacts")
    .get()
    .then(getDocumentsFromSnapshot)
}

export function upsertContact(userId, contactId, contactData) {
  const contactsRef = firestore
    .collection("users")
    .doc(userId)
    .collection("contacts");

  const toInsert = {
    first_name: contactData.first_name,
    last_name: contactData.last_name,
    email: contactData.email
  };

  if (contactId) {
    return contactsRef
      .doc(contactId)
      .set(toInsert);
  }

  return contactsRef
    .doc()
    .set(toInsert);
}
