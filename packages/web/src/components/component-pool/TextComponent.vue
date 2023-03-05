<template>
  <div>
    <h3>{{ name }}</h3>
    <p>id: {{ id }}</p>
    <p>width: {{ width }}</p>
    <p>height: {{ height }}</p>
    <p>x: {{ x }}</p>
    <p>y: {{ y }}</p>
  </div>
</template>

<script setup lang="ts">
// wip
defineProps<{
  id: string
  name: string
  width: number
  height: number
  x: number
  y: number
}>()
</script>
