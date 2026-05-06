<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import {
  getTrending,
  getPopularMovies,
  getPopularTVShows,
} from "../services/api";
import Hero from "../components/ui/Hero.vue";
import Card from "../components/ui/Card.vue";

const trending = ref([]);
const movies = ref([]);
const tvShows = ref([]);
const currentSlide = ref(0);
const loading = ref(true);
const recommendedMoviesTVShows = ref([]);

onMounted(async () => {
  try {
    const [trendingRes, moviesRes, tvRes] = await Promise.all([
      getTrending(),
      getPopularMovies(),
      getPopularTVShows(),
    ]);
    trending.value = trendingRes.data.results.slice(0, 5);
    movies.value = moviesRes.data.results;
    tvShows.value = tvRes.data.results;
    recommendedMoviesTVShows.value = [...movies.value, ...tvShows.value]
      .filter((item) => item.vote_average > 8 && item.vote_count > 1000)
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.id === item.id),
      );
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0
      ? trending.value.length - 1
      : currentSlide.value - 1;
};

const nextSlide = () => {
  currentSlide.value =
    currentSlide.value === trending.value.length - 1
      ? 0
      : currentSlide.value + 1;
};
</script>

<template>
  <div v-if="loading" class="text-white text-center py-20">Loading...</div>

  <div v-else>
    <Hero
      :trending="trending"
      :current-slide="currentSlide"
      @prev="prevSlide"
      @next="nextSlide"
      @go-to="currentSlide = $event"
    />

    <div class="px-8 md:px-16 pb-16 space-y-12 mt-8 flex flex-col gap-8">
      <section>
        <div class="flex justify-between mb-6 items-center">
          <h2 class="text-white text-xl font-semibold">Recommended For You</h2>
        </div>
        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div
            v-for="item in recommendedMoviesTVShows"
            :key="item.id"
            class="shrink-0 w-42"
          >
            <Card :item="item" />
          </div>
        </div>
      </section>

      <section>
        <div class="flex justify-between mb-6 items-center">
          <h2 class="text-white text-xl font-semibold">Popular Movies</h2>
          <RouterLink
            to="/movies"
            class="text-xs text-white/80 hover:text-white transition-colors"
            >See All</RouterLink
          >
        </div>
        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div v-for="item in movies" :key="item.id" class="shrink-0 w-42">
            <Card :item="item" />
          </div>
        </div>
      </section>

      <section>
        <div class="flex justify-between mb-6 items-center">
          <h2 class="text-white text-xl font-semibold">Popular TV Shows</h2>
          <RouterLink
            to="/tvshows"
            class="text-xs text-white/80 hover:text-white transition-colors"
            >See All</RouterLink
          >
        </div>
        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div v-for="item in tvShows" :key="item.id" class="shrink-0 w-42">
            <Card :item="item" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
