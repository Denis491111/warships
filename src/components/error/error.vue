<template>
  <div class="error">
    <p class="error__title" v-if="!!title">{{title}}</p>
    <p class="error__subtitle" v-if="!!subtitle">{{subtitle}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Footer",
  props: ["subtitle", "title"],
  setup: () => {}
});

</script>

<style>
.error {
  padding: 100px 0;
  text-align: center;
}
.error__title {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 24px;
}
.error__subtitle {
  font-size: 14px;
  opacity: 0.7;
}
</style>
