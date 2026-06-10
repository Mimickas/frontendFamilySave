<script setup>
defineProps({
    label: { type: String, default: 'na' }
})
</script>

<template>
    <div class="flex items-center gap-3">
        <hr class="flex-1 border-[var(--border)]">
        <span class="text-xs text-[var(--text-muted)]">{{ label }}</span>
        <hr class="flex-1 border-[var(--border)]">
    </div>
</template>