<template>
  <router-link class="ship-card" :to="ship.link">
    <div class="ship-card__image">
      <span class="ship-card__image-level">{{ship.level}}</span>
      <img :src="ship.image" :alt="ship.name" class="ship-card__image-pic">
    </div>
    <p class="ship-card__title" :title="ship.name">{{ship.name}}</p>
    <p class="ship-card__desc">{{ship.description}}</p>
    <button class="ship-card__details">{{$t('Подробнее')}}</button>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ShipCard",
  props: ["ship"],
  setup: () => {}
});
</script>

<style>
.ship-card {
  display: block;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 24px;
  min-height: 100%;
  position: relative;
  padding-bottom: 64px;
}
.ship-card:hover {
  border: 1px solid rgba(255,255,255,0.3);
}
.ship-card__image {
  display: block;
  height: 0;
  padding-bottom: 50%;
  overflow: hidden;
  position: relative;
  margin-bottom: 12px;
  background: linear-gradient(185deg, rgba(0,0,0,0) 65%, rgba(0,0,0,0.5));
}
.ship-card__image-pic {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  max-width: 100%;
}
.ship-card__title {
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 18px;
  max-height: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ship-card__desc {
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 24px;
  opacity: 0.8;
}
.ship-card__details {
  border: none;
  font-weight: 600;
  background: linear-gradient(#fc611d, #de2515);
  border-radius: 0;
  color: #fff;
  font-size: 14px;
  padding: 12px 24px;
  position: absolute;
  left: 24px;
  bottom: 24px;
}
@media screen and (max-width: 767px) {
  .ship-card {
    padding: 15px;
  }
  .ship-card__details {
    position: static;
  }
}
</style>
