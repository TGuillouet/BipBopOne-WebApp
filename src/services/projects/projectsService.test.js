import {
    createProjectAsset,
    deleteProjectAsset,
    getProjectAssets,
    getProjectDetail,
    getUserProjects
} from "./projectsSevice";

describe('Test all the queries to the user projects', function () {
    test('Test if we can access to the user projects', function() {
        getUserProjects("userId");
    });

    test('Test if we can access to the user projects detail', function() {
        getProjectDetail("userId", "projectId");
    });

    test('Test if we can access to the user projects assets', function() {
        getProjectAssets("userId", "projectId");
    });

    test('Test if we can create a user projects assets', function() {
        createProjectAsset("userId", "projectId");
    });

    test('Test if we can delete one user projects assets', function() {
        deleteProjectAsset("userId", "projectId", );
    });
});
