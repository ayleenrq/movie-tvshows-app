<script setup>
import { ref, onMounted, watch } from "vue";
import {
  getDiscoverMovies,
  getMovieGenres,
  searchMovies,
} from "../services/api";
import Card from "../components/ui/Card.vue";

const movies = ref([]);
const page = ref(1);
const hasMore = ref(true);
const loading = ref(true);
const genres = ref([]);
const search = ref("");
const selectedGenre = ref(null);

const fetchMovies = async () => {
  try {
    const res = search.value
      ? await searchMovies(search.value, page.value)
      : await getDiscoverMovies(page.value, selectedGenre.value);
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

const fetchGenres = async () => {
  const res = await getMovieGenres();
  genres.value = res.data.genres;
};

const onGenreChange = (genreId) => {
  selectedGenre.value = genreId === selectedGenre.value ? null : genreId;
  movies.value = [];
  page.value = 1;
  fetchMovies();
};

const reset = () => {
  movies.value = [];
  page.value = 1;
};

watch(search, () => {
  selectedGenre.value = null;
  reset();
  fetchMovies();
});

onMounted(async () => {
  await fetchGenres();
  fetchMovies();
});
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

        <div class="flex flex-col gap-3">
          <input
            v-model="search"
            type="text"
            placeholder="Search Movie..."
            class="bg-white/10 text-white placeholder-white/40 rounded-full px-6 py-3 outline-none focus:bg-white/15 transition w-full sm:w-80"
          />

          <div class="flex flex-wrap gap-2 gap-y-3 mt-3">
            <button
              v-for="genre in genres"
              :key="genre.id"
              @click="onGenreChange(genre.id)"
              :class="[
                'px-5 py-2 rounded-full text-sm transition',
                selectedGenre === genre.id
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20',
              ]"
            >
              {{ genre.name }}
            </button>
          </div>
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
