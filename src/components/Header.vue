<!-- src/components/Header.vue -->

<template>
  <header class="header">
    <div class="container">
      <h1>Visualitix </h1>
    </div>
  </header>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  props: {
    darkTheme: {
      type: Boolean,
      default: false,
    },
  }
})
export default class Header extends Vue {
}
</script>

