<script setup>
import { getImageUrl } from "../../services/api";
import { useWatchlist } from "../../stores/watchlist";
import { useRouter } from "vue-router";

const props = defineProps({
  item: Object,
});

const router = useRouter();
const isRecommended = (item) => item.vote_average > 8 && item.vote_count > 1000;
const getTitle = (item) => item.title || item.name;
const getYear = (item) => {
  const date = item.release_date || item.first_air_date;
  return date?.split?.("-")?.[0] || "Unknown";
};
const { toggle, isWatchlisted } = useWatchlist();

const goToDetail = () => {
  const type = props.item.title ? "movie" : "tv";
  router.push(`/${type}/${props.item.id}`);
};
</script>

<template>
  <div @click="goToDetail" class="w-full cursor-pointer group relative">
    <div class="relative rounded-lg overflow-hidden">
      <img
        :src="getImageUrl(item.poster_path)"
        :alt="getTitle(item)"
        class="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <span
        v-if="isRecommended(item)"
        class="absolute top-2 left-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full"
      >
        Recommended
      </span>
    </div>
    <p class="text-white text-xs font-medium mt-3 truncate">
      {{ getTitle(item) }}
    </p>
    <div class="flex items-center gap-2 mt-2">
      <p class="text-white/75 text-xs font-light">
        ⭐ {{ item.vote_average.toFixed(1) }}
      </p>
      <div class="w-1 h-1 rounded-full bg-white/30"></div>
      <p v-if="getYear(item)" class="text-white/75 text-xs font-light">
        {{ getYear(item) }}
      </p>
    </div>
    <span
      class="text-xs font-medium bg-white/90 text-black/90 px-2 py-0.5 rounded-full uppercase absolute top-2 right-2"
    >
      {{ item.original_language }}
    </span>
  </div>
</template>
