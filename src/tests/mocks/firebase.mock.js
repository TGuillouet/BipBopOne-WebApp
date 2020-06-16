import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export let userProjectAssetsData = [
  {
    id: "myAssetId",
    data: jest.fn().mockReturnValue({
      model: "modelUrl",
      material: "materialUrl",
      name: "assetName",
      type: "obj",
      visible: true,
      created_at: "16/06/2020 10:00:00"
    })
  }
]

const user1ProjectCollections = {
  assets: {
    doc: (docName) => {
      return {
        set: jest.fn((data) => {
          userProjectAssetsData.push({ id: docName, data: jest.fn().mockReturnValue(data) })
        }),
        delete: () => {
          userProjectAssetsData = userProjectAssetsData.filter((asset) => asset.id !== docName);
          return Promise.resolve();
        }
      }
    },
    get: () => {
      return (
        Promise.resolve({
          empty: userProjectAssetsData.length === 0,
          forEach: jest.fn((callback) => {
            Object.values(user1ProjectsData).forEach((project) => {
              callback(project);
            });
          })
        })
      )
    },
    add: (data) => {
      userProjectAssetsData.push({ id: "myNewItemId", data: jest.fn(() => data) });
      return Promise.resolve(data);
    }
  }
}

const user1ProjectsData = {
  myTestId: {
    id: "myTestId",
    data: jest.fn().mockReturnValue({
      name: "project1",
      client_name: "CName1",
      description: "myDescription",
      nb_file: 1,
      state: "Validé"
    })
  }
}

const user1ContactsData = {
  userContact1: {

  }
}

const user1Collections = {
  projects: {
    doc: (docName) => {
      return {
        collection: jest.fn((collectionName) => {
          return user1ProjectCollections[collectionName] || { empty: true }
        }),
        get: () => {
          return (
            Promise.resolve({
              exists: true,
              data: user1ProjectsData[docName].data
            })
          )
        }
      }
    },
    get: () => {
      return (
        Promise.resolve({
          empty: user1ProjectsData.length === 0,
          forEach: jest.fn((callback) => {
            Object.values(user1ProjectsData).forEach((project) => {
              callback(project);
            });
          })
        })
      )
    }
  },
  contacts: {
    doc: (docName) => {
      return {
        get: () => {
          return (
            Promise.resolve({
              exists: true,
              data: user1ProjectsData[docName].data
            })
          )
        }
      }
    },
    get: () => {
      return (
        Promise.resolve({
          empty: user1ContactsData.length === 0,
          forEach: jest.fn((callback) => {
            Object.values(user1ContactsData).forEach((project) => {
              callback(project);
            });
          })
        })
      )
    }
  }
};

const collections = {
  users: {
    documents: {
      user1: {
        first_name: "test",
        last_name: "test",

        collection: jest.fn((collectionName) => {
          return user1Collections[collectionName] || { empty: true }
        })
      }
    },
  }
};

jest.spyOn(firebase, "initializeApp").mockImplementation((options) => {
  return {
    auth: () => {
      return {
        onAuthStateChanged: jest.fn(() => {}),
        signInWithEmailAndPassword: jest.fn((email, password) => {
          return Promise.resolve({
            displayName: "Mocked User",
            uid: "mockedUid",
            email: "test@email.com"
          })
        }),
        currentUser: {
          sendEmailVerification: jest.fn()
        }
      };
    },
    firestore: () => {},
    storage: () => {}
  }
});

jest.spyOn(firebase, "auth").mockImplementation(() => {
  return {
    currentUser: {
      displayName: "Mocked User",
      uid: "mockedUid",
      email: "test@email.com",
      emailVerified: true
    }
  }
});

jest.spyOn(firebase, "storage").mockImplementation(() => {
  return {
    ref: jest.fn().mockReturnValue({
      put: jest.fn().mockReturnValue({
        ref: {
          getDownloadURL: jest.fn().mockReturnValue("mockedUrl")
        }
      })
    })
  };
});

jest.spyOn(firebase, "firestore").mockImplementation(() => {
  return {
    collection: jest.fn((collectionName) => {
      return {
        ...collections[collectionName],
        doc: jest.fn((docName) => {
          return collections[collectionName].documents[docName] || ({ exists: false });
        })
      };
    })
  };
})

firebase.firestore.Timestamp = {
  now: jest.fn().mockReturnValue("16/06/2020 10:00:00")
}
