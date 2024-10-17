<template>
  <main>
    <div class="menu">
      <template :key="r.path" v-for="r in menuRoutes">
        <router-link class="button" :to="r.path">{{ r.name }}</router-link>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { menuRoutes } from '@/router';
</script>
<style lang="scss">
main {
  display: flex;

  a.button {
    padding: 50px;
    border: 1px solid var(--chompi);
    margin-right: 5px;
  }
}
</style>
