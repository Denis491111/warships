<template>
    <div class="head-logo">
      <img src="@/assets/img/logo.svg" alt="" class="head-logo__image">
    </div>
    <main class="main">
      <Header />
      <div class="main__inner">
        <div class="container">
          <router-view/>
        </div>
      </div>
      <Footer />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    Header,
    Footer
  },
  setup: () => {
    return {};
  }
});

</script>

<style>
.main {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(24, 45, 68, 0.95);
  color: #fff;
  min-height: calc(100vh - 100px);
}
.head-logo {
  margin-bottom: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
}
.head-logo__image {
  max-width: 100%;
  user-select: none;
  pointer-events: none;
}
.main__inner {
  padding-top: 50px;
  padding-bottom: 50px;
  min-height: calc(100vh - 200px);
}
@media screen and (max-width: 767px) {
  .main {
    max-width: 500px;
  }
  .head-logo {
    max-width: 100px;
    margin-bottom: 30px;
  }
  .main__inner {
    padding-top: 0;
  }
}
</style>
