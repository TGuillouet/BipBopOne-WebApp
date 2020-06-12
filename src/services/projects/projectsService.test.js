import * as mock from "./../../tests/mocks/firebase.mock";
import {
    createProjectAsset,
    deleteProjectAsset,
    getProjectAssets,
    getProjectDetail,
    getUserProjects
} from "./projectsSevice";

describe('Test all the queries to the user projects', function () {
    afterEach(() => {
        jest.clearAllMocks();
    })

    test('Test if we can access to the user projects', async function(done) {
        const projects = await getUserProjects("user1");

        expect(projects.length).toBe(2);
        done()
    });

    test('Test if we can access to the user projects detail', async function(done) {
        const projectDetail = await getProjectDetail("user1", "myTestId");

        const expectedProjectDetail = {
            name: "project1",
            client_name: "CName1",
            description: "myDescription",
            nb_file: 1,
            state: "Validé"
        };

        expect(projectDetail).toEqual(expectedProjectDetail)
        done();
    });

    test('Test if we can access to the user projects assets', async function(done) {
        const projectAssetsList = await getProjectAssets("user1", "myTestId");

        expect(projectAssetsList).toHaveLength(2);
        done();
    });

    test('Test if we can create a user projects assets', async function(done) {
        const asset = {
            model: "modelUrl",
            material: "materialUrl",
            name: "assetName",
            projectId: "myTestId",
            type: "obj",
            visible: true
        };

        const data = await createProjectAsset("user1", "myTestId", asset);

        expect(data).toEqual(asset);
        expect(mock.userProjectAssetsData).toHaveLength(2);
        done();
    });

    test('Test if we can delete one user projects assets', async function(done) {
        await deleteProjectAsset("user1", "myTestId", "myAssetId");

        // The mock.userProjectAssetsData keep the element added in the "Test if we can create a user projects assets" test
        expect(mock.userProjectAssetsData).toHaveLength(1);
        done();
    });
});
