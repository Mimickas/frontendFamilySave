<script setup>
defineProps({
    variant: {
        type: String,
        default: 'primary', // primary | outline | ghost | google
    },
    full: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'button',
    }
})

defineEmits(['click'])
</script>

<template>
    <button
        :type="type"
        @click="$emit('click')"
        :class="[
            'flex items-center justify-center gap-3 rounded-xl py-3 px-5 text-sm font-reg transition-all duration-200 active:scale-95 cursor-pointer',
            full ? 'w-full' : '',
            variant === 'primary' && 'bg-[var(--color-full-spectrum-blue-500)] text-white hover:bg-[var(--color-full-spectrum-blue-400)] active:bg-[var(--color-full-spectrum-blue-600)]',
            variant === 'outline' && 'border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]',
            variant === 'ghost'   && 'text-[var(--text-primary)] hover:bg-[var(--bg-hover)]',
            variant === 'google'  && 'bg-[var(--bg)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]',
        ]"
    >
        <slot />
    </button>
</template>