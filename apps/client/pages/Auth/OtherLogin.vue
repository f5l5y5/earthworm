<template>
  <div class="pt-2">
    <button
      class="btn"
      @click="handleLogin(props.name!)"
    >
      <slot />
      Continue with {{ props.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
});

const emit = defineEmits<{
  (e: "login", val: string): void;
}>();

const handleLogin = (name: string): void => {
  emit("login", name);
};
</script>

<style scoped>
.btn {
  @apply sm:mx-auto sm:w-full sm:max-w-md flex items-center justify-start border border-gray-300 rounded-md bg-white text-gray-700 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700 hover:bg-slate-100 dark:hover:bg-stone-100;
}
</style>
