<script setup lang="ts">
import { RouterView } from 'vue-router';
import PageHeader from './components/PageHeader.vue';
</script>

<template>
  <div class="page">
    <PageHeader />
    <RouterView />
  </div>
</template>

<style scoped>
.page {
  background-color: rgb(133, 139, 142);
}
</style>
