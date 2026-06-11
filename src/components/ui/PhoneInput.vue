<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber,
  getExampleNumber,
} from 'libphonenumber-js'
import examples from 'libphonenumber-js/mobile/examples'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Laharana finday' },
  errors: { type: Array, default: () => [] },
  defaultCountry: { type: String, default: 'MG' },
})

const emit = defineEmits(['update:modelValue'])

const selectedCountry = ref(props.defaultCountry)
const localNumber = ref('')
const isOpen = ref(false)
const search = ref('')

const wrapperRef = ref(null)
const menuStyle = ref({})

const displayNames = new Intl.DisplayNames(['fr'], { type: 'region' })

const countries = computed(() =>
    getCountries()
        .map(code => ({
            code,
            name: displayNames.of(code) || code,
            callingCode: '+' + getCountryCallingCode(code),
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
)

const filteredCountries = computed(() => {
    const q = search.value.trim().toLowerCase()
    if (!q) return countries.value
    return countries.value.filter(
        c => c.name.toLowerCase().includes(q) || c.callingCode.includes(q),
    )
})

const current = computed(
  () => countries.value.find(c => c.code === selectedCountry.value) || countries.value[0],
)


const placeholder = computed(() => {
    try {
        const example = getExampleNumber(selectedCountry.value, examples)
        if (example) {
      
            return example.formatNational().replace(/^0\s?/, '')
        }
    } catch {

    }
  return '00 00 000 00'
})

function updateMenuPosition() {
    if (!wrapperRef.value) return
    const rect = wrapperRef.value.getBoundingClientRect()
    menuStyle.value = {
        position: 'fixed',
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
    }
}

function toggleMenu() {
    isOpen.value = !isOpen.value
    if (isOpen.value) updateMenuPosition()
}

function selectCountry(code) {
    selectedCountry.value = code
    isOpen.value = false
    search.value = ''
    emitValue()
}

function emitValue() {
    try {
        if (localNumber.value && isValidPhoneNumber(localNumber.value, selectedCountry.value)) {
            const phone = parsePhoneNumber(localNumber.value, selectedCountry.value)
            emit('update:modelValue', phone.format('E.164'))
        } else {
            emit('update:modelValue', current.value.callingCode + localNumber.value)
        }
    } catch {
        emit('update:modelValue', current.value.callingCode + localNumber.value)
    }
}

watch(localNumber, emitValue)

function handleClickOutside(e) {
    if (wrapperRef.value && !wrapperRef.value.contains(e.target) && !e.target.closest('[data-phone-menu]')) {
        isOpen.value = false
    }
}
function handleReposition() {
    if (isOpen.value) updateMenuPosition()
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleReposition, true)
    window.addEventListener('resize', handleReposition)
})
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('scroll', handleReposition, true)
    window.removeEventListener('resize', handleReposition)
})
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <label v-if="label" class="text-sm font-reg text-[var(--text-secondary)]">
            {{ label }}
        </label>

        <div
            ref="wrapperRef"
            class="flex items-center w-full rounded-lg bg-[var(--bg)] border transition-colors"
            :class="errors.length
                ? 'border-red-400 focus-within:border-red-400'
                : 'border-transparent focus-within:border-[var(--color-full-spectrum-blue-500)]'"
        >
        <button
            type="button"
            @click="toggleMenu"
            class="flex items-center gap-2 pl-4 pr-3 py-3 shrink-0 cursor-pointer"
        >
            <span :class="`fi fi-${current.code.toLowerCase()}`" class="rounded-sm text-base"></span>
            <span class="text-sm font-reg text-[var(--text-primary)]">{{ current.callingCode }}</span>
            <svg
            class="w-3 h-3 text-[var(--text-muted)] transition-transform"
            :class="isOpen ? 'rotate-180' : ''"
            viewBox="0 0 12 12" fill="none"
            >
            <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>

        <div class="w-px h-6 bg-[var(--border)] shrink-0"></div>

        <input
            v-model="localNumber"
            type="tel"
            :placeholder="placeholder"
            class="flex-1 bg-transparent py-3 px-4 text-sm font-reg text-[var(--text-primary)] focus:outline-none w-full"
        />
        </div>

        <Teleport to="body">
        <div
            v-if="isOpen"
            data-phone-menu
            :style="menuStyle"
            class="z-[9999] max-h-72 overflow-hidden rounded-lg bg-[var(--bg-card)] shadow-xl flex flex-col"
        >
            <div class="p-2 shrink-0">
            <input
                v-model="search"
                type="text"
                placeholder="Hitady firenena..."
                class="w-full rounded-md bg-[var(--bg)] py-2 px-3 text-sm font-reg text-[var(--text-primary)] focus:outline-none border-none"
            />
            </div>

            <div class="overflow-y-auto">
            <button
                v-for="country in filteredCountries"
                :key="country.code"
                type="button"
                @click="selectCountry(country.code)"
                class="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[var(--bg-secondary)] transition-colors"
                :class="country.code === selectedCountry ? 'bg-[var(--bg-secondary)]' : ''"
            >
                <span :class="`fi fi-${country.code.toLowerCase()}`" class="rounded-sm text-base shrink-0"></span>
                <span class="flex-1 truncate text-sm font-reg text-[var(--text-primary)]">{{ country.name }}</span>
                <span class="text-xs font-reg text-[var(--text-muted)] shrink-0">{{ country.callingCode }}</span>
            </button>

            <div v-if="filteredCountries.length === 0" class="px-3 py-4 text-center text-xs text-[var(--text-muted)]">
                Tsy misy firenena hita
            </div>
            </div>
        </div>
        </Teleport>
    </div>
</template>