const API_URL = (window.location.protocol === 'file:' || window.location.hostname === '')
    ? 'http://localhost:5000/api'
    : '/api';

const api = {
    // Auth
    register: async (name, email, password) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
        }
        return { ok: response.ok, data };
    },

    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
        }
        return { ok: response.ok, data };
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('currentUser'));
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    // Entries
    getEntries: async () => {
        const token = localStorage.getItem('token');
        if (!token) return [];

        const response = await fetch(`${API_URL}/entries`, {
            headers: { 'x-auth-token': token }
        });
        if (response.ok) {
            return await response.json();
        }
        return [];
    },

    createEntry: async (content, mood) => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const response = await fetch(`${API_URL}/entries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({ content, mood })
        });

        if (response.ok) {
            return await response.json();
        }
        throw new Error('Failed to create entry');
    },

    updateEntry: async (id, content, mood) => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const response = await fetch(`${API_URL}/entries/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({ content, mood })
        });

        if (response.ok) {
            return await response.json();
        }
        throw new Error('Failed to update entry');
    },

    deleteEntry: async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        const response = await fetch(`${API_URL}/entries/${id}`, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
        });

        return response.ok;
    }
};

window.api = api;
