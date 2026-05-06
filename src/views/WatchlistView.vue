<script setup>
import { useWatchlist } from "../stores/watchlist";
import Card from "../components/ui/Card.vue";

const { watchlist } = useWatchlist();
</script>

<template>
  <div>
    <section class="min-h-screen bg-dark px-6 py-10 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold">Watchlist</h1>
          <p class="mt-3 text-white/60">Your saved titles will appear here.</p>
          <p class="text-white/60">{{ watchlist.length }} items saved.</p>
        </div>
        <div
          v-if="watchlist.length"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-4 lg:gap-6 gap-y-8"
        >
          <Card v-for="item in watchlist" :key="item.id" :item="item" />
        </div>
        <div v-else class="text-white/40 text-center py-20">
          Belum ada yang disimpan.
        </div>
      </div>
    </section>
  </div>
</template>
