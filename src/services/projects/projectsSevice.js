import firebase, { firestore, storage } from "../../firebase";
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
    return firestore.collection("users").doc(userId).collection("projects").add({ ...project, whitelist: [], nb_files: 0 });
}

/**
 * Fetch the detail of a project from the database
 * @param userId The user id in the database
 * @param projectId The project id in the database
 * @returns {Promise<object>}
 */
export function getProjectDetail(userId, projectId) {
    return firestore.collection("users").doc(userId).collection("projects").doc(projectId).get().then(doc => {
        if (!doc.exists) {
            throw new Error("This project do not exists");
        }

        return doc.data();
    });
}

export function updateProjectDetail(userId, projectId, updatedInfos) {
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
 * @param {String} userId The user id in the database
 * @param {String} projectId The project id in the database
 * @param {File} model The asset's file to insert
 * @param {File | null} material The asset's material to insert
 * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
 */
export async function createProjectAsset(userId, projectId, model, material) {
  // Create the document in the firestore database (to generate the firestore document id before the upload)
  const assetDocument = firestore
    .collection("users")
    .doc(userId)
    .collection("projects")
    .doc(projectId)
    .collection("assets")
    .doc();

  const promises = [
    storage.ref(`${userId}/${projectId}/${assetDocument.id}/${model.name}`).put(model)
  ]
  if (material) promises.push(storage.ref(`${userId}/${projectId}/${assetDocument.id}/${material.name}`).put(material));

  // Upload the file
  const [ modelTask, materialTask ] = await Promise.all(promises)

  // Get the urls
  const modelUrl = await modelTask
    .ref
    .getDownloadURL();

  const materialUrl = await materialTask
    .ref
    .getDownloadURL();

  // Set the firestore file data
  await assetDocument
    .set({
        name : model.name.split('.').shift(),
        model : modelUrl,
        material : materialUrl,
        visible : true,
        type : model.name.split('.').pop(),
        created_at : firebase.firestore.Timestamp.now()
    });

    return modelTask
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

export function changeAssetVisibility(userId, projectId, assetId, newVisibility) {
  return firestore
    .collection("users")
    .doc(userId)
    .collection("projects")
    .doc(projectId)
    .collection("assets")
    .doc(assetId)
    .update({
      visible: newVisibility
    });
}
