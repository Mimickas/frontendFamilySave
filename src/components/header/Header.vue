<script setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

const isOpen = ref(false)
const menuContent = ref(null)

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
                    <div class="w-15 h-0.75 rounded-full bg-[var(--text-primary)] transition-all duration-300"
                        :class="isOpen ? 'rotate-15 translate-y-[5px]' : ''"
                    ></div>
                    <div class="w-15 h-0.75 rounded-full bg-[var(--text-primary)] transition-all duration-300"
                        :class="isOpen ? '-rotate-15 -translate-y-[3px]' : ''"
                    ></div>
                </div>
            </div>

            <div ref="menuContent" class="overflow-hidden flex items-center justify-center h-0 opacity-0">
                <nav class="py-6 flex flex-col gap-4">
                    <a href="#" class="text-[var(--text-primary)] hover:text-[var(--color-full-spectrum-blue-500)] transition-colors">Home</a>
                    <a href="#" class="text-[var(--text-primary)] hover:text-[var(--color-full-spectrum-blue-500)] transition-colors">About</a>
                    <a href="#" class="text-[var(--text-primary)] hover:text-[var(--color-full-spectrum-blue-500)] transition-colors">Contact</a>
                </nav>
            </div>

        </div>
    </div>

    <div class="h-[72px]"></div>
</template>