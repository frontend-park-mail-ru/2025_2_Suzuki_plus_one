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

  if (pureEmail !== email) return 'Email contains invalid characters (< > ; \' " `)';
  if (!/^[a-zA-Z0-9._-]+@[\w.-]+\.\w+$/.test(pureEmail)) return 'Email must contain only Latin letters, digits, and special characters (._-)';
  if (pureEmail.length > 254) return 'Email is too long (maximum 254 characters)';
  if (!regex.test(pureEmail)) return 'Incorrect email format';
  if (/\s/.test(pureEmail)) return 'Email must not contain spaces';
  if (localPart.length > 64) return 'Local part of the email is too long (maximum 64 characters)';
  if (!domain.includes('.')) return 'Domain must contain a dot';

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

  if (purePassword !== password) return 'Password contains invalid characters (< > ; \' " `)';
  if (!/^[a-zA-Z0-9\-/=+\!@#$%^&*()]+$/.test(purePassword)) return 'Password must contain only Latin letters, digits, and special characters (-/=+\!@#$%^&*())';
  if (purePassword.length < 8) return 'Password must be at least 8 characters long';
  if (purePassword.length > 128) return 'Password is too long (maximum 128 characters)';
  if (!/[A-Z]/.test(purePassword)) return 'Password must contain at least one capital letter';
  if (!/[a-z]/.test(purePassword)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(purePassword)) return 'Password must contain at least one digit';
  if (!/[-/=+\!@#$%^&*()]/.test(purePassword)) return 'Password must contain at least one special character (-/=+\!@#$%^&*())';
  if (/\s/.test(purePassword)) return 'Password must not contain spaces';
  if (/(.)\1{3,}/.test(purePassword)) return 'Password must not contain more than 3 identical characters in a row';

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

  if (pureUsername !== username) return 'Username contains invalid characters (< > ; \' " `)';
  if (!/^[a-zA-Z0-9_.-]+$/.test(pureUsername)) return 'Username must contain only Latin letters, digits, and special characters (_.-)';
  if (pureUsername.length < 3) return 'Username must be at least 3 characters long';
  if (pureUsername.length > 32) return 'Username is too long (maximum 32 characters)';
  if (/\s/.test(pureUsername)) return 'Username must not contain spaces';

  return null;
}