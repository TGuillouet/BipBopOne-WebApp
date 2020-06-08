/**
 * Validate a password (Using firebase rules)
 * @param {String} value 
 * @returns {Boolean}
 */
export function validatePassword (value){
    return value.length>=8&&hasCapitalizedCharacters(value)&&hasNumberCharacters(value)
}

/**
 * Check if a string posess a character in the specified ascii range
 * @param {String} str 
 * @param {Number} start 
 * @param {Number} end 
 */
function hasCharacterInRange (str, start, end) {
    for(let charCode=start; charCode<=end; charCode++){
        if (str.includes(String.fromCharCode(charCode)))
        return true
    }
    return false
}

/**
 * Check if the string has at least one capitalized character
 * The ascii codes from 65 (A) to 90 (Z) are used
 * @param {String} str 
 * @returns {Boolean}
 */
export function hasCapitalizedCharacters (str) {
    const CAPITALIZED_A_CHARCODE=65
    const CAPITALIZED_Z_CHARCODE=90
    return hasCharacterInRange(str, CAPITALIZED_A_CHARCODE, CAPITALIZED_Z_CHARCODE )
}

/**
 * Check if the string has at least one capitalized character
 * The ascii codes from 48 to 57 are used
 * @param {String} str
 * @returns {Boolean}
 */
export function hasNumberCharacters (str) {
    const NUMBER_0_CHARCODE=48
    const NUMBER_9_CHARCODE=57
    return hasCharacterInRange(str, NUMBER_0_CHARCODE, NUMBER_9_CHARCODE )
}