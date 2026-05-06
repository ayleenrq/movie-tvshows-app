<script setup>
import Navbar from './components/layout/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-dark">
    <Navbar />
    <main class="pt-20">
      <RouterView />
    </main>
  </div>
</template>