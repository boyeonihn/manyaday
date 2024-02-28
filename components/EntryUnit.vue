<script setup lang="ts">
defineProps({
  content: String,
  createdAt: String,
});
</script>
<template>
  <section>
    <h3>{{ extractYear(createdAt!) }}</h3>
    <div>{{ content }}</div>
  </section>
</template>

<style scoped>
h3 {
  font-size: 2rem;
  font-family: 'Glass Antiqua';
}

div {
  background-color: hotpink;
  padding: 20px;
}
</style>
