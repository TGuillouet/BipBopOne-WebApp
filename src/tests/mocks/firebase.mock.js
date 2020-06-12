import * as firebase from "firebase/app";
import "firebase/firestore";

export let userProjectAssetsData = [
  {
    id: "myAssetId",
    data: jest.fn().mockReturnValue({
      model: "modelUrl",
      material: "materialUrl",
      name: "assetName",
      projectId: "myTestId",
      type: "obj",
      visible: true
    })
  }
]

const user1ProjectCollections = {
  assets: {
    doc: (docName) => {
      return {
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
  },
  myTestId2: {
    id: "myTestId2",
    data: jest.fn().mockReturnValue({
      name: "project2",
      client_name: "CName2",
      description: "myDescription",
      nb_file: 0,
      state: "Validé"
    })
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

