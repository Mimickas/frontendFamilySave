import { ref, computed } from 'vue'
import { authService } from '../services/auth.service.js'

export function useLoginForm() {
    const email = ref('')
    const password = ref('')
    const submitted = ref(false)
    const loading = ref(false)
    const serverError = ref('')

    const emailErrors = computed(() => {
        if (!submitted.value) return []
        const errors = []
        if (!email.value.trim()) errors.push('Email requis')
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) errors.push('Email invalide')
        return errors
    })

    const passwordErrors = computed(() => {
        if (!submitted.value) return []
        const errors = []
        if (!password.value) errors.push('Mot de passe requis')
        else if (password.value.length < 8) errors.push('Minimum 8 caractères')
        return errors
    })

    const isValid = computed(() => emailErrors.value.length === 0 && passwordErrors.value.length === 0)

    function validate() {
        submitted.value = true
        return isValid.value
    }

    async function submit() {
        serverError.value = ''
        if (!validate()) return

        loading.value = true
        try {
            const data = await authService.login(email.value, password.value)
            localStorage.setItem('token', data.token)
            return data
        } catch (err) {
            serverError.value = err.response?.data?.message || 'Une erreur est survenue'
        } finally {
            loading.value = false
        }
    }

    return {
        email,
        password,
        emailErrors,
        passwordErrors,
        loading,
        serverError,
        isValid,
        validate,
        submit,
    }
}