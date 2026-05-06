<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMovieDetail, getMovieCredits, getMovieVideos, getSimilarMovies, getImageUrl } from "../services/api";
import { useWatchlist } from "../stores/watchlist";
import Card from "../components/ui/Card.vue";

const route = useRoute();
const movie = ref(null);
const cast = ref([]);
const trailer = ref(null);
const similar = ref([]);
const loading = ref(true);
const { toggle, isWatchlisted } = useWatchlist();

onMounted(async () => {
  const id = route.params.id;
  const [detailRes, creditsRes, videosRes, similarRes] = await Promise.all([
    getMovieDetail(id),
    getMovieCredits(id),
    getMovieVideos(id),
    getSimilarMovies(id),
  ]);

  movie.value = detailRes.data;
  cast.value = creditsRes.data.cast.slice(0, 10);
  trailer.value = videosRes.data.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  similar.value = similarRes.data.results.slice(0, 12);
  loading.value = false;
});

const getRuntime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};
</script>

<template>
  <div v-if="loading" class="text-white text-center py-20">Loading...</div>

  <div v-else class="min-h-screen bg-dark text-white">
    <div class="relative h-[420px]">
      <img
        :src="getImageUrl(movie.backdrop_path, 'original')"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent via-dark/60 to-dark"
      ></div>

      <div class="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-7xl mx-auto">
        <div class="flex gap-6 items-end">
          <img
            :src="getImageUrl(movie.poster_path, 'w300')"
            class="w-28 rounded-lg shrink-0 hidden sm:block"
          />
          <div class="flex flex-col gap-2">
            <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
            <p class="text-white/60 text-sm">
              {{ movie.release_date?.slice(0, 4) }} •
              {{ getRuntime(movie.runtime) }} •
              {{ movie.original_language?.toUpperCase() }} • ⭐
              {{ movie.vote_average.toFixed(1) }}
            </p>
            <div class="flex gap-2 flex-wrap">
              <span
                v-for="genre in movie.genres"
                :key="genre.id"
                class="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full"
              >
                {{ genre.name }}
              </span>
            </div>
            <p class="text-white/70 text-sm max-w-xl mt-1 line-clamp-2">
              {{ movie.overview }}
            </p>
            <div class="flex gap-3 mt-2">
              <a
                v-if="trailer"
                :href="`https://www.youtube.com/watch?v=${trailer.key}`"
                target="_blank"
                class="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition"
              >
                ▶ Trailer
              </a>
              <button
                @click="toggle(movie)"
                class="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition"
              >
                <span
                  :class="
                    isWatchlisted(movie.id) ? 'text-red-500' : 'text-white/70'
                  "
                >
                  {{ isWatchlisted(movie.id) ? "♥" : "♡" }}
                </span>
                {{ isWatchlisted(movie.id) ? "Saved" : "Watchlist" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">
      <section v-if="cast.length">
        <h2 class="text-xl font-semibold mb-4">Cast</h2>
        <div class="flex gap-4 overflow-x-auto pb-2">
          <div
            v-for="person in cast"
            :key="person.id"
            class="shrink-0 w-24 text-center"
          >
            <img
              :src="
                person.profile_path
                  ? getImageUrl(person.profile_path, 'w185')
                  : 'https://placehold.co/100x150?text=?'
              "
              class="w-24 h-24 object-cover rounded-full mb-2"
            />
            <p class="text-xs text-white/80 truncate">{{ person.name }}</p>
            <p class="text-xs text-white/40 truncate">{{ person.character }}</p>
          </div>
        </div>
      </section>

      <section v-if="similar.length">
        <h2 class="text-xl font-semibold mb-4">Similar Movies</h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 gap-y-8"
        >
          <Card v-for="item in similar" :key="item.id" :item="item" />
        </div>
      </section>
    </div>
  </div>
</template>
