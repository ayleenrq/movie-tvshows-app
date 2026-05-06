<script setup>
import { ref, onMounted, computed} from "vue";
import { getDiscoverMovies } from "../services/api";
import Card from "../components/ui/Card.vue";

const movies = ref([]);
const page = ref(1);
const hasMore = ref(true);
const loading = ref(true);

const fetchMovies = async () => {
  try {
    const res = await getDiscoverMovies(page.value);
    movies.value = [...movies.value, ...res.data.results];
    hasMore.value = page.value < res.data.total_pages;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const loadMore = () => {
  page.value++;
  fetchMovies();
};

onMounted(fetchMovies);
</script>

<template>
  <div v-if="loading" class="text-white text-center py-20">Loading...</div>

  <div v-else>
    <section class="min-h-screen bg-dark px-6 py-10 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold">Movies</h1>
          <p class="text-white/60">Explore movie picks here.</p>
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-4 lg:gap-6 gap-y-8"
        >
          <Card v-for="movie in movies" :key="movie.id" :item="movie" />
        </div>
        <button
          v-if="hasMore"
          @click="loadMore"
          class="mx-auto px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-sm transition"
        >
          Load More
        </button>
      </div>
    </section>
  </div>
</template>
