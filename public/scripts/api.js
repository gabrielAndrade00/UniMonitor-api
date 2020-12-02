const _client = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

let token = localStorage.getItem('token');

if (token) {
    _client.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

const api = {
    roles: {
        get: async function () {
            try {
                const response = await _client.get('/roles');
        
                return response.data;
            }
            catch (error) {
                resolveError(resolveError);
            }
        }
    },
    users: {
        get: async function () {
            try {
                const response = await _client.get('/users');
        
                return response.data;
            }
            catch (error) {
                resolveError(resolveError);
            }
        },
        put: async function (id, user) {
            try {
                const response = await _client.put(`/users/${id}`, user);

                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
    },
    subjects: {
        get: async function () {
            try {
                const response = await _client.get('/subjects');
        
                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
        post: async function (subject) {
            try {
                const response = await _client.post('/subjects', subject);

                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
        put: async function (id, subject) {
            try {
                const response = await _client.put(`/subjects/${id}`, subject);

                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
        delete: async function (id) {
            try {
                await _client.delete(`/subjects/${id}`);
            }
            catch (error) {
                resolveError(error);
            }
        }
    },
    monitorings: {
        get: async function () {
            try {
                const response = await _client.get('/monitorings');
        
                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
        post: async function (monitoring) {
            try {
                const response = await _client.post('/monitorings', monitoring);

                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
        put: async function (id, monitoring) {
            try {
                const response = await _client.put(`/monitorings/${id}`, monitoring);

                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
        delete: async function (id) {
            try {
                await _client.delete(`/monitorings/${id}`);
            }
            catch (error) {
                resolveError(error);
            }
        }
    },
    schedules: {
        get: async function () {
            try {
                const response = await _client.get('/schedules');
        
                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
        post: async function (schedule) {
            try {
                const response = await _client.post('/schedules', schedule);

                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
        put: async function (id, schedule) {
            try {
                const response = await _client.put(`/schedules/${id}`, schedule);

                return response.data;
            }
            catch (error) {
                resolveError(error);
            }
        },
        delete: async function (id) {
            try {
                await _client.delete(`/schedules/${id}`);
            }
            catch (error) {
                resolveError(error);
            }
        }
    },
    sessions: {
        post: async function (register, password) {
            try {
                const response = await _client.post('/sessions',  { register: register, password: password });

                return response.data.token;
            }
            catch (error) {
                resolveError(error);
            }
        }
    }
}

function resolveError(error) {
    if (error.response.data.message) {
        throw Error(error.response.data.message);
    }
    throw Error('unexpected error');
}