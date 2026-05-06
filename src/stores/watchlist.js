import { ref } from "vue";

const watchlist = ref(JSON.parse(localStorage.getItem("watchlist") || "[]"));

export const useWatchlist = () => {
  const toggle = (item) => {
    const exists = watchlist.value.find((i) => i.id === item.id);
    if (exists) {
      watchlist.value = watchlist.value.filter((i) => i.id !== item.id);
    } else {
      watchlist.value = [...watchlist.value, item];
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist.value));
  };

  const isWatchlisted = (id) => watchlist.value.some((i) => i.id === id);

  return { watchlist, toggle, isWatchlisted };
};
