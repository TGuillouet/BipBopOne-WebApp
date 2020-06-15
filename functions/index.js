const functions = require('firebase-functions');
const admin = require("firebase-admin");

const serviceAccount = require(functions.config().admin.certificate_path);
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...adminConfig
});

const assetTrigger = functions.firestore.document("users/{user_id}/projects/{project_id}/assets/{asset_id}").onWrite(async (change, context) => {
  // If the document is deleted
  if (!change.after.exists) {
    await deleteAsset(
      context.params.user_id,
      context.params.project_id,
      context.params.asset_id
    );
    return;
  }

  // Update the number of files
  await admin
    .firestore()
    .collection("users")
    .doc(context.params.user_id)
    .collection("projects")
    .doc(context.params.project_id)
    .update({
      nb_files: admin.firestore.FieldValue.increment(1)
    })

  await admin
    .firestore()
    .collection("assets")
    .doc(context.params.asset_id)
    .set({
      ...change.after.data(),
      projectId: context.params.project_id
    });
});

async function deleteAsset(user_id, project_id, asset_id) {
  try {
    await admin.storage().bucket().deleteFiles({
      directory: `${user_id}/${project_id}/${asset_id}`
    })

    await admin
      .firestore()
      .collection("users")
      .doc(user_id)
      .collection("projects")
      .doc(project_id)
      .update({
        nb_files: admin.firestore.FieldValue.increment(-1)
      })

    await admin
      .firestore()
      .collection("assets")
      .doc(asset_id)
      .delete();
  } catch(e) {
    console.error(e);
  }
}

module.exports = {
  assetTrigger
};
