import { hasCapitalizedCharacters, hasNumberCharacters, validatePassword } from "../String";

describe("Strings", () => {
    describe("hasCapitalizedCharacters", () => {
        it("should return true", () => {
            const testStr = "Test";
            const testStr2 = "tesT";

            expect(hasCapitalizedCharacters(testStr)).toBeTruthy();
            expect(hasCapitalizedCharacters(testStr2)).toBeTruthy();
        })

        it("should return false", () => {
            const testStr = "test";

            expect(hasCapitalizedCharacters(testStr)).toBeFalsy();
        })
    });

    describe("hasNumberCharacters", () => {
        it("should return true", () => {
            const testStr = "Test2";
            const testStr2 = "tes6T";

            expect(hasNumberCharacters(testStr)).toBeTruthy();
            expect(hasNumberCharacters(testStr2)).toBeTruthy();
        })

        it("should return false", () => {
            const testStr = "test";

            expect(hasNumberCharacters(testStr)).toBeFalsy();
        })
    });

    describe("validatePassword", () => {
        it("should return true", () => {
            const testStr = "Testasd2";
            const testStr2 = "tesasddd6T";

            expect(validatePassword(testStr)).toBeTruthy();
            expect(validatePassword(testStr2)).toBeTruthy();
        });

        it("should return false because the password is too short", () => {
            const testStr = "test";

            expect(validatePassword(testStr)).toBeFalsy();
        });

        it("should return false because the password ", () => {
            const testStr = "test";

            expect(validatePassword(testStr)).toBeFalsy();
        });
    });
});