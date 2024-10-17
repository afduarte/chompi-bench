<template>
  <main>
    <p>Theme:</p>
    <MultiStateToggle v-model="theme" :options="['light', 'system', 'dark']" />
  </main>
</template>

<script setup lang="ts">
import MultiStateToggle from '@/components/MultiStateToggle.vue';
import { useTheme } from '@/composables/useTheme';

const { theme } = useTheme();

</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>