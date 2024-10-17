<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from './composables/useTheme';
import { menuRoutes } from './router';
import { useSDStore } from './stores/sd';

const { initTheme } = useTheme();
initTheme();
const sdStore = useSDStore()
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <div class="logo logo-text">
      <h2>CHOMPI BENCH</h2>
    </div>

    <nav v-if="sdStore.isReady">
      <RouterLink v-for="r in menuRoutes" :key="r.path" :to="r.path">{{ r.name }}</RouterLink>
    </nav>

  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.logo-text {
  padding: 30px;
  border: 10px dashed var(--chompi);
  color: var(--chompi);
}

nav {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--chompi);
  border: 1px solid var(--chompi);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
