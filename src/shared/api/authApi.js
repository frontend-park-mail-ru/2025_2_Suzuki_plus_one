/**
 * @module authApi
 * @description Provides API calls for authentication
 */

/**
 * Performs a login request to the authentication endpoint
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Response data or throws an error
 */
export async function login(email, password) {
  const response = await fetch('/api/v1/auth/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'An error occurred');
  }

  return response.json();
}