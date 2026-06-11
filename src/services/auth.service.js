import api from './api.js'

export const authService = {
    async login(email, password) {
        const { data } = await api.post('/users', { email, password })
        return data
    },

    async loginWithGoogle(token) {
        const { data } = await api.post('/auth/google', { token })
        return data
    },

    async me() {
        const { data } = await api.get('/auth/me')
        return data
    },

    logout() {
        localStorage.removeItem('token')
    },

    async register(dto) {
        console.log('numero:', dto.numero, typeof dto.numero)
        const { data } = await api.post('/users', dto)
        return data
    },
}

