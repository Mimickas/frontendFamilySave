<script setup>
    defineProps({
        label: String,
        type: { type: String, default: 'text' },
        placeholder: String,
        modelValue: String,
        errors: { type: Array, default: () => [] },
    })

    defineEmits(['update:modelValue'])
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <label v-if="label" class="text-sm font-reg text-[var(--text-secondary)]">
            {{ label }}
        </label>
        <input
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :class="[
                'w-full rounded-lg py-3 px-4 text-sm font-reg text-[var(--text-primary)] bg-[var(--bg)] border focus:outline-none transition-colors',
                errors.length
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-transparent focus:border-[var(--color-full-spectrum-blue-500)]'
            ]"
        />
        <span
            v-for="error in errors"
            :key="error"
            class="text-xs text-red-400 font-reg"
        >
            {{ error }}
        </span>
    </div>
</template>