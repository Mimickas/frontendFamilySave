<script setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

const isOpen = ref(false)
const menuContent = ref(null)

const theme = ref(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')

function setTheme(value) {
    document.documentElement.classList.add('theme-transitioning')

    theme.value = value
    if (value === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        document.documentElement.removeAttribute('data-theme')
    }

    setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning')
    }, 400)
    }

    watch(isOpen, (val) => {
        if (val) {
            gsap.fromTo(menuContent.value,
                { height: 0, opacity: 0 },
                { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
            )
        } else {
            gsap.to(menuContent.value,
                { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }
            )
        }
    })
</script>

<template>
    <div class="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)] shadow-md">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-5">

            <div class="flex items-center justify-between">
                <div class="flex items-center font-heavy text-2xl text-[var(--color-full-spectrum-blue-500)]">
                    <font-awesome-icon icon="money-check" />
                    <span>FS</span>
                </div>

                <div class="flex flex-col gap-1.5 cursor-pointer" @click="isOpen = !isOpen">
                    <div class="w-15 h-0.5 rounded-full bg-[var(--text-primary)] transition-all duration-300"
                        :class="isOpen ? 'rotate-15 translate-y-[5px]' : ''"
                    ></div>
                    <div class="w-15 h-0.5 rounded-full bg-[var(--text-primary)] transition-all duration-300"
                        :class="isOpen ? '-rotate-15 -translate-y-[3px]' : ''"
                    ></div>
                </div>
            </div>

            <div ref="menuContent" class="overflow-hidden h-0 opacity-0">

                <div class="flex items-center justify-center">
                    <nav class="py-40 flex flex-col gap-4 text-center text-6xl font-medium">
                        <router-link to="/">
                            <a href="#" class="text-[var(--text-primary)] hover:text-[var(--color-full-spectrum-blue-500)] transition-colors">Home</a>
                        </router-link>
                        <router-link to="/about">
                            <a href="#" class="text-[var(--text-primary)] hover:text-[var(--color-full-spectrum-blue-500)] transition-colors">About</a>
                        </router-link>
                        <router-link to="/contact">
                            <a href="#" class="text-[var(--text-primary)] hover:text-[var(--color-full-spectrum-blue-500)] transition-colors">Contact</a>
                        </router-link>
                    </nav>
                </div>

                <div class="flex items-center justify-between">

                    <div>
                        <span class="text-sm text-[var(--text-secondary)]">&copy; 2026 Family save</span>
                    </div>
                   
                    <Transition name="label" mode="out-in">
                        <span
                            :key="theme"
                            @click="setTheme(theme === 'light' ? 'dark' : 'light')"
                            class="text-sm underline cursor-pointer text-[var(--text-primary)]"
                        >
                            {{ theme === 'light' ? 'Dark' : 'Light' }}
                        </span>
                    </Transition>
                </div>

            </div>

        </div>
    </div>

    <div class="h-[72px]"></div>
</template>

