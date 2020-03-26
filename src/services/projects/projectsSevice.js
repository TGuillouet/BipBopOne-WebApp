import { firestore } from "../../firebase";

/**
 * Fetch the user's projects from the database
 * @param userId The user id in the database
 * @returns {Promise<object>}
 */
export function getUserProjects(userId) {
    return firestore.collection("users").doc(userId).collection("projects").get().then(getDocumentsFromSnapshot);
}

/**
 * Create a project for the specified user in the database
 * @param userId The user id
 * @param project The project data
 * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
 */
export function createProject(userId, project) {
    return firestore.collection("users").doc(userId).collection("projects").add({...project, whitelist: [], nb_files: 0});
}

/**
 * Fetch the detail of a project from the database
 * @param userId The user id in the database
 * @param projectId The project id in the database
 * @returns {Promise<object>}
 */
export function getProjectDetail(userId, projectId) {
    return firestore.collection("users").doc(userId).collection("projects").doc(projectId).get().then(doc => {
        if(!doc.exists) {
            throw new Error("This project do not exists");
        }

        return doc.data();
    });
}

/**
 * Fetch the user's project assets
 * @param userId The user id in the database
 * @param projectId The project id in the database
 * @returns {Promise<object[]>}
 */
export function getProjectAssets(userId, projectId) {
    return firestore.collection("users").doc(userId).collection("projects").doc(projectId).collection("assets").get().then(getDocumentsFromSnapshot);
}

/**
 * Create an asset in a user's project in the database
 * @param userId The user id in the database
 * @param projectId The project id in the database
 * @param asset The asset id in the database
 * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
 */
export function createProjectAsset(userId, projectId, asset) {
    return firestore
        .collection("user")
        .doc(userId)
        .collection("projects")
        .doc(projectId)
        .collection("assets")
        .add(asset);
}

/**
 * Delete a user's project asset
 * @param userId The user id in the database
 * @param projectId The project id in the database
 * @param assetId The asset id in the database
 * @returns {Promise<void>}
 */
export function deleteProjectAsset(userId, projectId, assetId) {
    return firestore
        .collection("user")
        .doc(userId)
        .collection("projects")
        .doc(projectId)
        .collection("assets")
        .doc(assetId)
        .delete();
}

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


