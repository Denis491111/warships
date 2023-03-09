<template>
  <footer class="footer">
    <div class="container">
      <p class="footer__text">
        {{$t('© 2012 – 2023 Wargaming.net Все права защищены. © 2023')}}
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  setup: () => {}
});

</script>

<style>
.footer {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #333;
}
.footer__text {
  font-size: 12px;
}
</style>
