<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Search, Bell, User } from 'lucide-vue-next'

const route = useRoute()

const navItems = [
  { id: 'home', name: 'Home', path: '/' },
  { id: 'movies', name: 'Movies', path: '/movies' },
  { id: 'tvshows', name: 'TV Shows', path: '/tvshows' },
  { id: 'watchlist', name: 'Watchlist', path: '/watchlist' },
]

const activeSection = computed(() => {
  return route.path === '/' ? 'home' : route.path.substring(1)
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16">

        <RouterLink
          to="/"
          class="text-xl font-black text-primary mr-10"
          style="font-family: var(--font-logo)"
        >
          MOOFY
        </RouterLink>

        <div class="flex items-center gap-1 flex-1 justify-center">
          <RouterLink
            v-for="item in navItems"
            :key="item.id"
            :to="item.path"
            class="relative px-4 py-2 text-sm font-regular transition-colors duration-200"
            :class="
              activeSection === item.id
                ? 'text-white font-semibold'
                : 'text-white/50 hover:text-white'
            "
          >
            {{ item.name }}
            <span
              v-if="activeSection === item.id"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
            />
          </RouterLink>
        </div>

        <div class="flex items-center gap-8 text-white/70">
          <button class="hover:text-white transition-colors">
            <Search :size="20" />
          </button>
          <button class="hover:text-white transition-colors">
            <Bell :size="20" />
          </button>
          <button class="hover:text-white transition-colors">
            <User :size="20" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
