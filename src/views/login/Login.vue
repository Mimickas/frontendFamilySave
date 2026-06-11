<script setup>
    import { ref, nextTick } from 'vue'
    import { useRouter } from 'vue-router'
    import gsap from 'gsap'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import BaseButton from '../../components/ui/BaseButton.vue'
    import BaseInput from '../../components/ui/BaseInput.vue'
    import BaseDivider from '../../components/ui/BaseDivider.vue'
    import GoogleButton from '../../components/ui/GoogleButton.vue'
    import { useLoginForm} from '../../composables/useLoginForm.js'
    import { useRegisterForm } from '../../composables/useRegisterForm.js'

    const router = useRouter()

    const { email, password, emailErrors, passwordErrors, loading, serverError, submit } = useLoginForm()

    const {
        email: regEmail,
        password: regPassword,
        nom, prenom, numero, dateNaissance,
        emailErrors: regEmailErrors,
        passwordErrors: regPasswordErrors,
        nomErrors, prenomErrors, numeroErrors, dateNaissanceErrors,
        loading: regLoading,
        serverError: regServerError,
        submit: submitRegister,
    } = useRegisterForm()

    const activePanel = ref('login')
    const isAnimating = ref(false)
    const loginRef = ref(null)
    const registerRef = ref(null)

    function animateOut(el, direction) {
        return new Promise(resolve => {
            const children = [...el.children]
            if (direction === 'down') children.reverse()
            gsap.to(children, {
                y: direction === 'down' ? 50 : -50,
                opacity: 0,
                duration: 0.18,
                stagger: 0.05,
                ease: 'power2.in',
                onComplete: resolve,
            })
        })
    }

    function animateIn(el, direction) {
        return new Promise(resolve => {
            const children = [...el.children]
            if (direction === 'from-bottom') children.reverse()
            gsap.fromTo(children,
                { y: direction === 'from-top' ? -40 : 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.22,
                    stagger: 0.055,
                    ease: 'power2.out',
                    onComplete: resolve,
                }
            )
        })
    }

    async function handlePanel(target) {
        if (isAnimating.value) return
        isAnimating.value = true

        if (target === 'register') {
            await animateOut(loginRef.value, 'down')
            activePanel.value = 'register'
            await nextTick()
            await animateIn(registerRef.value, 'from-top')
        } else {
            await animateOut(registerRef.value, 'up')
            activePanel.value = 'login'
            await nextTick()
            await animateIn(loginRef.value, 'from-bottom')
        }

        isAnimating.value = false
    }

    async function handleLogin() {
        const result = await submit()
        //  await handlePanel("login");
        // if (result) router.push('/dashboard')
    }

    async function handleRegister() {
        const result = await submitRegister()
        console.log('register result', result)
        if (result.data !== "" || result.data !== null || result !== undefined) await handlePanel("login");
        // if (result) router.push('/dashboard')
    }

    function handleGoogle() {
        console.log('google login')
    }
</script>

<template>
    <div class="min-h-screen lg:h-screen flex flex-col lg:flex-row">

        <!-- LEFT -->
        <div class="hidden lg:flex w-[60%] flex-col justify-between relative bg-[var(--bg-secondary)]">
            <div class="absolute inset-0 p-10 flex flex-col justify-between">
                <div>
                    <FontAwesomeIcon icon="arrow-left" class="text-[var(--text-primary)] text-lg cursor-pointer"/>
                    <div class="mt-10">
                        <span class="text-6xl font-bold text-[var(--color-full-spectrum-blue-500)]">Family Save</span>
                        <div class="mt-3">
                            <span class="font-light text-sm text-[var(--text-secondary)]">
                                Eto Ianao no mamorona compte, raha toa koa mbola tsy manana <br> dia afaka mamorona maimaim-paona
                            </span>
                        </div>
                    </div>
                </div>
                <div class="bg-[var(--bg-card)] rounded-xl p-6 w-full max-w-sm">
                    <span class="font-reg text-sm text-[var(--text-primary)]">
                        Raha toa ka efa vonona anefa ianao dia Manasa anao hitsidika avy antrany
                    </span>
                </div>
            </div>
        </div>

        <!-- RIGHT -->
        <div class="w-full lg:w-[50%] bg-[var(--bg-card)] flex items-center justify-center p-6 sm:p-10 lg:p-16 overflow-hidden">

            <!-- LOGIN -->
            <div v-if="activePanel === 'login'" ref="loginRef" class="w-full max-w-[70%]">

                <div class="flex lg:hidden mb-8">
                    <FontAwesomeIcon icon="arrow-left" class="text-[var(--text-primary)] text-lg cursor-pointer"/>
                </div>

                <div class="mb-6">
                    <span class="font-bold text-2xl sm:text-3xl text-[var(--text-primary)]">
                        Miditra amin'ny kaonty na mamorona kaonty vaovao
                    </span>
                    <p class="font-light text-sm text-[var(--text-muted)] mt-2">
                        Afaka miditra amin'ny kaonty Google anao koa ianao raha tianao mba hanamora ny fidirana
                    </p>
                </div>

                <div>
                    <GoogleButton @click="handleGoogle" />
                </div>

                <div>
                    <BaseDivider label="na" class="my-6" />
                </div>

                <div v-if="serverError" class="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <span class="text-xs text-red-500 font-reg">{{ serverError }}</span>
                </div>

                <div class="flex flex-col gap-4">
                    <BaseInput v-model="email" label="Email" type="email" placeholder="email@exemple.com" :errors="emailErrors" />
                    <BaseInput v-model="password" label="Teny miafina" type="password" placeholder="••••••••" :errors="passwordErrors" />
                    <div class="text-right">
                        <span class="text-xs text-[var(--color-full-spectrum-blue-500)] cursor-pointer hover:underline font-reg">
                            Adino ny teny miafina?
                        </span>
                    </div>
                    <BaseButton variant="primary" :full="true" @click="handleLogin" :disabled="loading">
                        <span v-if="loading">Miandry...</span>
                        <span v-else>Miditra</span>
                    </BaseButton>
                </div>

                <div class="text-center mt-6">
                    <span class="text-xs text-[var(--text-muted)] font-reg">
                        Tsy manana kaonty?
                        <span class="text-[var(--color-full-spectrum-blue-500)] cursor-pointer hover:underline" @click="handlePanel('register')">
                            Mamorona eto
                        </span>
                    </span>
                </div>

            </div>

            <!-- REGISTER -->
            <div v-if="activePanel === 'register'" ref="registerRef" class="w-full max-w-[70%]">

                <div class="mb-6">
                    <span class="font-bold text-2xl sm:text-3xl text-[var(--text-primary)]">
                        Mamorona kaonty vaovao
                    </span>
                    <p class="font-light text-sm text-[var(--text-muted)] mt-2">
                        Fenoy ny mombamomba anao rehetra
                    </p>
                </div>

                <div v-if="regServerError" class="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <span class="text-xs text-red-500 font-reg">{{ regServerError }}</span>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <BaseInput v-model="nom" label="Anarana" placeholder="Rakoto" :errors="nomErrors" />
                    <BaseInput v-model="prenom" label="Fanampin'anarana" placeholder="Jean" :errors="prenomErrors" />
                </div>

                <div class="mt-4">
                    <BaseInput v-model="regEmail" label="Email" type="email" placeholder="email@exemple.com" :errors="regEmailErrors" />
                </div>

                <div class="mt-4">
                    <BaseInput v-model="regPassword" label="Teny miafina" type="password" placeholder="••••••••" :errors="regPasswordErrors" />
                </div>

                <div class="mt-4">
                    <BaseInput v-model="numero" label="Laharana finday" type="tel" placeholder="+261 34 00 000 00" :errors="numeroErrors" />
                </div>

                <div class="mt-4">
                    <BaseInput v-model="dateNaissance" label="Daty nahaterahana" type="date" :errors="dateNaissanceErrors" />
                </div>

                <div class="mt-6">
                    <BaseButton variant="primary" :full="true" @click="handleRegister" :disabled="regLoading">
                        <span v-if="regLoading">Miandry...</span>
                        <span v-else>Mamorona kaonty</span>
                    </BaseButton>
                </div>

                <div class="text-center mt-4">
                    <span class="text-xs text-[var(--text-muted)] font-reg">
                        Efa manana kaonty?
                        <span class="text-[var(--color-full-spectrum-blue-500)] cursor-pointer hover:underline" @click="handlePanel('login')">
                            Miditra eto
                        </span>
                    </span>
                </div>

            </div>

        </div>
    </div>
</template>