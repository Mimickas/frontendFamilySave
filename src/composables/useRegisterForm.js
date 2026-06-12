import { ref, computed } from 'vue'
import { authService } from '../services/auth.service.js'

// mots interdits
const MOTS_INTERDITS = [
    'merde', 'putain', 'connard', 'salope', 'con', 'idiot', 'fory', 'salaud', 'saloperie',
    'imbecile', 'batard', 'enculé', 'fdp', 'pute', 'pd',
]

function contientMotInterdit(texte) {
    return MOTS_INTERDITS.some(mot =>
        texte.toLowerCase().includes(mot)
    )
}

// ---- LOGIN ----
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

    const isValid = computed(() =>
        emailErrors.value.length === 0 &&
        passwordErrors.value.length === 0
    )

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
        email, password,
        emailErrors, passwordErrors,
        loading, serverError,
        isValid, validate, submit,
    }
}

// ---- REGISTER ----
export function useRegisterForm() {
    const email = ref('')
    const password = ref('')
    const nom = ref('')
    const prenom = ref('')
    const numero = ref('')
    const dateNaissance = ref('')
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
        else if (!/[A-Z]/.test(password.value)) errors.push('Au moins une majuscule')
        else if (!/[0-9]/.test(password.value)) errors.push('Au moins un chiffre')
        return errors
    })

    const nomErrors = computed(() => {
        if (!submitted.value) return []
        const errors = []
        if (!nom.value.trim()) errors.push('Nom requis')
        else if (nom.value.trim().length < 2) errors.push('Nom trop court')
        else if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(nom.value)) errors.push('Nom invalide (chiffres non autorisés)')
        else if (contientMotInterdit(nom.value)) errors.push('Nom invalide')
        return errors
    })

    const prenomErrors = computed(() => {
        if (!submitted.value) return []
        const errors = []
        if (!prenom.value.trim()) errors.push('Prénom requis')
        else if (prenom.value.trim().length < 2) errors.push('Prénom trop court')
        else if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(prenom.value)) errors.push('Prénom invalide (chiffres non autorisés)')
        else if (contientMotInterdit(prenom.value)) errors.push('Prénom invalide')
        return errors
    })

    const numeroErrors = computed(() => {
        if (!submitted.value) return []
        const errors = []
        if (!numero.value.trim()) errors.push('Numéro requis')
        else if (!/^\+?[0-9]{8,15}$/.test(numero.value.replace(/\s/g, ''))) errors.push('Numéro invalide')
        return errors
    })

    const dateNaissanceErrors = computed(() => {
        if (!submitted.value) return []
        const errors = []
        if (!dateNaissance.value) {
            errors.push('Date de naissance requise')
        } else {
            const date = new Date(dateNaissance.value)
            const today = new Date()
            const age = today.getFullYear() - date.getFullYear()
            if (isNaN(date.getTime())) errors.push('Date invalide')
            else if (date > today) errors.push('Date dans le futur impossible')
            else if (age < 13) errors.push('Âge minimum 13 ans')
            else if (age > 120) errors.push('Date invalide')
        }
        return errors
    })

    const isValid = computed(() =>
        emailErrors.value.length === 0 &&
        passwordErrors.value.length === 0 &&
        nomErrors.value.length === 0 &&
        prenomErrors.value.length === 0 &&
        numeroErrors.value.length === 0 &&
        dateNaissanceErrors.value.length === 0
    )

    function validate() {
        submitted.value = true
        return isValid.value
    }

    async function submit() {
        serverError.value = ''
        if (!validate()) return
        loading.value = true
        try {
            const data = await authService.register({
                email: email.value,
                password: password.value,
                nom: nom.value,
                prenom: prenom.value,
                numero: numero.value,
                date_naissance: dateNaissance.value,
            })
            localStorage.setItem('token', data.token)
            return data
        } catch (err) {
            serverError.value = err.response?.data?.message || 'Une erreur est survenue'
        } finally {
            loading.value = false
        }
    }

    return {
        email, password, nom, prenom, numero, dateNaissance,
        emailErrors, passwordErrors, nomErrors, prenomErrors, numeroErrors, dateNaissanceErrors,
        loading, serverError,
        isValid, validate, submit,
    }
}