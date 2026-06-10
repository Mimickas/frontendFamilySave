<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseDivider from '../../components/ui/BaseDivider.vue'
import GoogleButton from '../../components/ui/GoogleButton.vue'
import { useLoginForm } from '../../composables/useLoginForm.js'

const { email, password, emailErrors, passwordErrors, validate, reset } = useLoginForm()

function handleLogin() {
    if (!validate()) return
    console.log('login ok', email.value, password.value)
    // appel API ici
}

function handleGoogle() {
    console.log('google login')
}
</script>

<template>
    <div class="min-h-screen lg:h-screen flex flex-col lg:flex-row">

        <!-- LEFT — caché sur mobile -->
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
        <div class="w-full lg:w-[50%] h-full bg-[var(--bg-card)] flex items-center justify-center p-6 sm:p-10 lg:p-16">
            <div class="w-full max-w-[70%]">

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

                <GoogleButton @click="handleGoogle" />

                <BaseDivider label="na" class="my-6" />

                <div class="flex flex-col gap-4">
                    <BaseInput
                        v-model="email"
                        label="Email"
                        type="email"
                        placeholder="email@exemple.com"
                        :errors="emailErrors"
                    />
                    <BaseInput
                        v-model="password"
                        label="Teny miafina"
                        type="password"
                        placeholder="••••••••"
                        :errors="passwordErrors"
                    />

                    <div class="text-right -mt-2">
                        <span class="text-xs text-[var(--color-full-spectrum-blue-500)] cursor-pointer hover:underline font-reg">
                            Adino ny teny miafina?
                        </span>
                    </div>

                    <BaseButton variant="primary" :full="true" @click="handleLogin">
                        Miditra
                    </BaseButton>
                </div>

                <div class="text-center mt-6">
                    <span class="text-xs text-[var(--text-muted)] font-reg">
                        Tsy manana kaonty?
                        <span class="text-[var(--color-full-spectrum-blue-500)] cursor-pointer hover:underline">
                            Mamorona eto
                        </span>
                    </span>
                </div>

            </div>
        </div>

    </div>
</template>