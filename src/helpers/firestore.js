/**
 * Get all documents from a collection's snapshot with the id inside the object
 * @param {DocumentSnapshot} snapshot
 * @returns {[]|*[]}
 */
export function getDocumentsFromSnapshot(snapshot) {
  if (snapshot.empty) {
    return [];
  }

  let documents = [];

  snapshot.forEach((document) => {
    documents.push({ id: document.id, ...document.data() });
  });

  return documents;
}

