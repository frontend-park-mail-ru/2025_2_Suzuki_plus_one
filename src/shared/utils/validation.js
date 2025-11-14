/**
 * @function purifyInputString
 * @description Removes or escapes potentially dangerous characters from input
 * @param {string} input - The input string to purify
 * @returns {string} Purified string
 */
function purifyInputString(input) {
    return input.trim().replace(/[<>;"'`]/g, '');
}

/**
 * @function validateEmail
 * @description Validates email input
 * @param {string} email - The email input
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(email) {
    if (!email) return 'Email is required';
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pureEmail = purifyInputString(email);
    const localPart = pureEmail.split('@')[0];
    const domain = pureEmail.split('@')[1];

    if (pureEmail !== email) {
        return 'Email contains invalid characters (< > ; \' " `)';
    }
    if (!/^[a-zA-Z0-9._-]+@[\w.-]+\.\w+$/.test(pureEmail)) {
        return 'Email must contain only Latin letters, digits, and special characters (._-)';
    }
    if (pureEmail.length > 254) {
        return 'Email is too long (maximum 254 characters)';
    }
    if (!regex.test(pureEmail)) {
        return 'Incorrect email format';
    }
    if (/\s/.test(pureEmail)) {
        return 'Email must not contain spaces';
    }
    if (localPart.length > 64) {
        return 'Local part of the email is too long (maximum 64 characters)';
    }
    if (!domain.includes('.')) {
        return 'Domain must contain a dot';
    }
    if (localPart.length < 3) {
        return 'Local part of the email is too short (minimum 3 characters)'
    }

    return null;
}

/**
 * @function validatePassword
 * @description Validates password input
 * @param {string} password - The password input
 * @returns {string|null} Error message or null if valid
 */
export function validatePassword(password) {
    if (!password) return 'Password is required';
    const purePassword = purifyInputString(password);

    if (purePassword !== password)
        return 'Password contains invalid characters (< > ; \' " `)';
    if (!/^[a-zA-Z0-9\-/=+!@#$%^&*()]+$/.test(purePassword))
        return 'Password must contain only Latin letters, digits, and special characters (-/=+!@#$%^&*())';
    if (purePassword.length < 8)
        return 'Password must be at least 8 characters long';
    if (purePassword.length > 128)
        return 'Password is too long (maximum 128 characters)';
    if (!/[A-Z]/.test(purePassword))
        return 'Password must contain at least one capital letter';
    if (!/[a-z]/.test(purePassword))
        return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(purePassword))
        return 'Password must contain at least one digit';
    if (!/[-/=+!@#$%^&*()]/.test(purePassword))
        return 'Password must contain at least one special character (-/=+!@#$%^&*())';
    if (/\s/.test(purePassword)) return 'Password must not contain spaces';
    if (/(.)\1{3,}/.test(purePassword))
        return 'Password must not contain more than 3 identical characters in a row';

    return null;
}

/**
 * @function validateUsername
 * @description Validates username input
 * @param {string} username - The username input
 * @returns {string|null} Error message or null if valid
 */
export function validateUsername(username) {
    if (!username) return 'Username is required';
    const pureUsername = purifyInputString(username);

    if (pureUsername !== username)
        return 'Username contains invalid characters (< > ; \' " `)';
    if (!/^[a-zA-Z0-9_.-]+$/.test(pureUsername))
        return 'Username must contain only Latin letters, digits, and special characters (_.-)';
    if (pureUsername.length < 3)
        return 'Username must be at least 3 characters long';
    if (pureUsername.length > 32)
        return 'Username is too long (maximum 32 characters)';
    if (/\s/.test(pureUsername)) return 'Username must not contain spaces';

    return null;
}


/**
 * @function validatePhone
 * @description Validates phone number (E.164 format: +[country code][number])
 * @param {string} phone - The phone input
 * @returns {string|null} Error message or null if valid
 */
export function validatePhone(phone) {
    if (!phone) return 'Phone number is required';
    const purePhone = purifyInputString(phone).trim();

    if (purePhone !== phone)
        return 'Phone contains invalid characters (< > ; \' " `)';

    if (!/^\+[0-9]{1,15}$/.test(purePhone))
        return 'Phone must be in format: +1234567890 (up to 15 digits)';

    if (purePhone.length < 4 || purePhone.length > 16)
        return 'Phone number must be between 4 and 16 characters';

    return null;
}


export function validateBirthdate(birthdate) {
    if (!birthdate) return null;

    const pureBirthdate = purifyInputString(birthdate).trim();

    if (pureBirthdate !== birthdate) {
        return 'Date contains invalid characters (< > ; \' " `)';
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(pureBirthdate)) {
        return 'Date must be in format YYYY-MM-DD';
    }

    const date = new Date(pureBirthdate);
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();

    if (year < 1900) {
        return 'Year must be 1900 or later';
    }

    if (year > currentYear) {
        return 'Date cannot be in the future';
    }

    const [y, m, d] = pureBirthdate.split('-').map(Number);
    if (date.getFullYear() !== y || date.getMonth() + 1 !== m || date.getDate() !== d) {
        return 'Invalid date';
    }

    return null;
}