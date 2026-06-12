import { ref, computed } from 'vue'
import { authService } from '../services/auth.service.js'

export function useVerificationCode() {
    const verificationCode = ref('')
    const submitted = ref(false)
    const loading = ref(false)
    const serverError = ref('')

    const verificationCodeErrors = computed(() => {
        const errors = []
        if (verificationCode.value.length === 0) return errors 
        if (!/^\d+$/.test(verificationCode.value)) errors.push('Isa ihany no ekena')
        if (verificationCode.value.length !== 6) errors.push('Tsy maintsy isa 6 no ampidirina')
        return errors
    })

    const isValid = computed(() => 
        verificationCode.value.length === 6 && verificationCodeErrors.value.length === 0
    )

    function validate() {
        submitted.value = true
        return isValid.value
    }

    async function submit(email) {
        serverError.value = ''
        if (!validate()) return

        loading.value = true
        try {
            const data = await authService.verifyCode(email, verificationCode.value)
            return data
        } catch (err) {
            serverError.value = err.response?.data?.message || 'Une erreur est survenue'
        } finally {
            loading.value = false
        }
    }

    return {
        verificationCode,
        verificationCodeErrors,
        loading,
        serverError,
        isValid,
        validate,
        submit,
    }
}