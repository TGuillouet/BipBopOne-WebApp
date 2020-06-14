import { firestore } from "../../firebase";
import {getDocumentsFromSnapshot} from "../../helpers/firestore";

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

export function updateProjectDetail(userId, projectId, updatedInfos) {
    console.log(updatedInfos);
    return firestore.collection("users").doc(userId).collection("projects").doc(projectId).update(updatedInfos)
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
        .collection("users")
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
        .collection("users")
        .doc(userId)
        .collection("projects")
        .doc(projectId)
        .collection("assets")
        .doc(assetId)
        .delete();
}
