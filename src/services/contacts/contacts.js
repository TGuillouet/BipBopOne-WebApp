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
    .collection("contacts")

  if (contactData.id) {
    return contactsRef
      .doc(contactId)
      .set(contactData)
  }

  return contactsRef
    .doc()
    .set(contactData)
}
