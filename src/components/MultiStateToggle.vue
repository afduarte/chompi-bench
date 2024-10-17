<template>
  <div class="wrapper" :style="{ width: wrapperWidth + 'px' }">
    <div class="three-state-toggle" @click="toggle" :aria-valuenow="modelValue" role="slider" tabindex="0"
      @keydown.enter.prevent="toggle" @keydown.space.prevent="toggle"
      :style="{ width: trackWidth + 'px', height: thumbWidth + 'px' }">
      <div class="toggle-track"></div>
      <div class="toggle-thumb" :style="{ left: positions[currentIndex] }"></div>
    </div>
    <div class="toggle-labels">
      <span v-for="(option, index) in options" :key="index" :class="{ active: option === modelValue }">
        {{ option }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  /**
   * The currently selected option value.
   */
  modelValue: any;
  /**
   * An array of option values (strings).
   */
  options: any[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const direction = ref(1); // 1 for increasing index, -1 for decreasing index

/**
 * Computes the index of the current modelValue in the options array.
 */
const currentIndex = computed(() => props.options.indexOf(props.modelValue));
const thumbWidth = 30; // Width of the thumb in pixels
const trackWidth = computed(() => props.options.length * (thumbWidth + 1))
const wrapperWidth = computed(() => trackWidth.value + thumbWidth)
/**
 * Computes positions for the toggle thumb based on the number of options.
 * Adjusts for the thumb's width to keep it within the track.
 */
const positions = computed(() => {
  const numOptions = props.options.length;
  const maxPosition = trackWidth.value - thumbWidth; // Maximum left position

  return props.options.map((_, index) => {
    const positionRatio = index / (numOptions - 1);
    const positionPx = positionRatio * maxPosition;
    return `${positionPx}px`;
  });
});

/**
 * Toggles the modelValue through the options array in a 0 → 1 → 2 → 1 → 0 sequence.
 */
function toggle() {
  const currentIdx = currentIndex.value;
  let newIndex = currentIdx + direction.value;

  if (newIndex >= props.options.length) {
    direction.value = -1;
    newIndex = props.options.length - 2;
  } else if (newIndex < 0) {
    direction.value = 1;
    newIndex = 1;
  }

  const newValue = props.options[newIndex];
  emit('update:modelValue', newValue);
}
</script>

<style scoped lang="scss">
.wrapper {
  .three-state-toggle {
    position: relative;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    outline: none;

    .toggle-track {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 20px; // Track height
      background-color: var(--color-border);
      transform: translateY(-50%);
    }

    .toggle-thumb {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 30px; // Thumb size
      height: 30px;
      background-color: var(--color-background-soft);
      border: 6px solid var(--chompi);
      box-sizing: border-box;
      transition: left 0.3s;
    }
  }

  .toggle-labels {
    display: flex;
    justify-content: space-between;

    span {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: var(--color-text);

      &.active {
        color: var(--color-heading);
        font-weight: bold;
      }
    }
  }
}
</style>