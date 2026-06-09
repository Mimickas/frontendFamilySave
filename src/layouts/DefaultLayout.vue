<script setup>
    import Header from '../components/header/Header.vue'
</script>

<template>
    <Header />
    <div class="bg-[var(--bg)] min-h-screen pt-20">
        <router-view></router-view>
    </div>
</template>