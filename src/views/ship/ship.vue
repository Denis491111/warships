<template>
  <div class="ship">
    <Loader v-if="ui.isLoading" />
    <Error v-if="ui.isServerError" :title="$t('Ошибка сервера')" :subtitle="$t('Пожалуйста, попробуйте позднее')" />
    <Error v-if="ui.isShipNotFound" :title="$t('Корабль не найден')" :subtitle="$t('Перейдите на главную страницу и попробуйте заново')" />
    <template v-if="!!ship">
      <Breadcrumbs :items="ui.breadcrumbs" />
      <section class="ship__head">
        <h1 class="ship__head-title">{{ship.name}}</h1>
        <button class="ship__head-liker" @click="toggleItemFavorite">
          <template v-if="isItemFavorite">{{$t('В избранном')}}</template>
          <template v-else>{{$t('Добавить в избранное')}}</template>
        </button>
      </section>
      <section class="ship__main">
        <div class="ship__main-left">
          <div class="ship__main-left-inner">
            <div class="ship__main-left-inner-pic">
              <img :src="ship.image" :alt="ship.name" class="ship__main-left-inner-pic-img" @click="ui.isOpenedPopup = true">
            </div>
          </div>
        </div>
        <div class="ship__main-right">
          <ul class="ship__main-right-listing">
            <li class="ship__main-right-listing-item" v-if="!!ship.description">
              <p class="ship__main-right-listing-item-prefix">{{$t('Описание')}}</p>
              <p class="ship__main-right-listing-item-value">{{ship.description}}</p>
            </li>
            <li class="ship__main-right-listing-item" v-if="!!ship.country">
              <p class="ship__main-right-listing-item-prefix">{{$t('Флот')}}</p>
              <p class="ship__main-right-listing-item-value">{{ship.country}}</p>
            </li>
            <li class="ship__main-right-listing-item" v-if="!!ship.level">
              <p class="ship__main-right-listing-item-prefix">{{$t('Уровень')}}</p>
              <div class="ship__main-right-listing-item-stars">
                <span class="ship__main-right-listing-item-stars-item" v-for="(item, key) in ship.level" :key="key"></span>
                <span class="ship__main-right-listing-item-stars-value">({{ship.level}})</span>
              </div>
            </li>
            <li class="ship__main-right-listing-item" v-if="!!ship.tags && !!ship.tags.length">
              <p class="ship__main-right-listing-item-prefix">{{$t('Теги')}}</p>
              <div class="ship__main-right-listing-item-tags">
                <router-link class="ship__main-right-listing-item-tags-link" :to="item.link" v-for="(item, key) in ship.tags" :key="key">{{item.name}}</router-link>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <transition name="fade">
        <div class="image-popup" v-if="ui.isOpenedPopup">
          <button class="image-popup__closer" @click="ui.isOpenedPopup = false"></button>
          <img :src="ship.image" :alt="ship.name" class="image-popup__image">
        </div>
      </transition>
    </template>
  </div>
</template>

<script lang="ts" src="./ship.ts"></script>
<style src="./ship.css"></style>
