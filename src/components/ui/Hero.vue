<script setup>
import { getImageUrl } from "../../services/api";

defineProps({
  trending: Array,
  currentSlide: Number,
});

const emit = defineEmits(["prev", "next", "goTo"]);

const isRecommended = (item) => item.vote_average > 8 && item.vote_count > 1000;
</script>

<template>
  <div class="relative h-[60vh] overflow-hidden">
    <div
      v-for="(item, index) in trending"
      :key="item.id"
      class="absolute inset-0 transition-opacity duration-700"
      :class="index === currentSlide ? 'opacity-100' : 'opacity-0'"
    >
      <img
        :src="getImageUrl(item.backdrop_path, 'original')"
        :alt="item.title || item.name"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"
      />

      <div class="absolute bottom-16 left-8 px-8 md:px-16 max-w-2xl">
        <span
          v-if="isRecommended(item)"
          class="text-xs font-medium bg-primary text-white px-3 py-1 rounded-full mb-3 inline-block"
        >
          Recommended
        </span>
        <h1 class="text-3xl md:text-6xl font-semibold text-white mb-3">
          {{ item.title || item.name }}
        </h1>
        <p class="text-white/70 text-sm md:text-base line-clamp-3 mb-8">
          {{ item.overview }}
        </p>
        <div class="flex gap-3">
          <button
            class="bg-primary text-white px-6 py-2.5 rounded font-medium hover:bg-primary/80 transition-colors"
          >
            ▶ Watch Now
          </button>
          <button
            class="bg-white/20 text-white px-6 py-2.5 rounded font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            + Watchlist
          </button>
        </div>
      </div>
    </div>

    <button
      @click="emit('prev')"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full hover:bg-black/70 transition-colors"
    >
      ‹
    </button>
    <button
      @click="emit('next')"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full hover:bg-black/70 transition-colors"
    >
      ›
    </button>

    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, i) in trending"
        :key="i"
        @click="emit('goTo', i)"
        class="w-2 h-2 rounded-full transition-colors"
        :class="i === currentSlide ? 'bg-primary' : 'bg-white/40'"
      />
    </div>
  </div>
</template>
