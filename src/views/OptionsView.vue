<template>
  <main>
    <div class="options">
      <div class="save-icon" @click="save">
        <img class="save" :src="saveLeftGradient" alt="Save" />
      </div>
      <template v-for="o in optionsStore.options.chompi" :key="o.name">
        <div class="option">
          <p>{{ o.name }}</p>
          <input v-if="getInputType(o.value) != 'bool'" :type="getInputType(o.value)" v-model="o.value" />
          <MultiStateToggle v-else :options="[true, false]" v-model="o.value" />
        </div>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useOptionsStore } from '@/stores/options'
import { ref } from 'vue';
import saveLeftGradient from '@/assets/save.png';
import { toast } from 'vue3-toastify'
import MultiStateToggle from '@/components/MultiStateToggle.vue';

const loading = ref<boolean>(false);
const optionsStore = useOptionsStore();

function getInputType(value: string | number | boolean): string {
  if (typeof value === 'string') return 'text';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'bool';
  return '';
}

async function save() {
  loading.value = true;
  await optionsStore.saveFile();
  loading.value = false;
  toast.success('options.json file updated successfully')
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .options {
    position: relative;
    /* Make the options div the reference for absolute positioning */
    width: 100%;
    padding: 20px;

    /* Optional background for visual clarity */
    .save-icon {
      position: absolute;
      /* Position the button absolutely inside the options div */
      top: 0;
      /* Align with the top */
      right: 0;
      /* Align with the right */
      cursor: pointer;
      width: 50px;
      height: 50px;

      img.save {
        width: 100%;
        height: 100%;
        transition: filter 0.7s ease;
        /* Smooth transition for the contrast effect */
      }

      &:hover img.save {
        filter: contrast(200%);
        /* Increase contrast on hover */
      }
    }

    .option {
      display: grid;
      grid-template-columns: 1fr 1fr; // Two equal columns
      gap: 20px;
      align-items: center;
      margin-bottom: 5px;

      p {
        justify-self: end; // Align the <p> to the right in the first column
        margin: 0;
      }

      input,
      .radio {
        justify-self: start; // Align the <input> to the left in the second column
      }
    }
  }
}
</style>