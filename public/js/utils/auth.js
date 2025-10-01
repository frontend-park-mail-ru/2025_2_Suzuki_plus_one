export async function checkAuth() {
    try {
        const response = await fetch('/api/v1/auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return {
                isAuthorized: true,
                user: data.user,
            };
        } else if (response.status === 401) {
            return { isAuthorized: false, user: null };
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        return { isAuthorized: false, user: null };
    }
}

export async function signOut() {
    try {
        const response = await fetch('/api/v1/auth/signout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return { success: true };
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Sign-out failed:', error);
        return { success: false, error: error.message };
    }
}