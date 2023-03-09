<template>
  <div class="loader"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loader",
  setup: () => {}
});
</script>
<style>
.loader {
  height: 500px;
  background-image: url("~@/assets/img/loader.svg");
  background-position: center;
}
</style>
