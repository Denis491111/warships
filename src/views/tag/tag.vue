<template>
  <div class="tag">
    <Breadcrumbs :items="ui.breadcrumbs" />
    <h1 class="tag__title">{{$t("Записи по тегу")}} {{$route.params.id}}</h1>
    <Loader v-if="ui.isListLoading" />
    <Error v-if="ui.isListEmpty" :title="$t('Ничего не найдено')" :subtitle="$t('Измените параметры поиска или попробуйте позднее')" />
    <Error v-if="ui.isListError" :title="$t('Ошибка сервера')" :subtitle="$t('Пожалуйста, попробуйте позднее')" />
    <ul class="tag__list" v-if="ships && ships.length" :class="{'tag__list_updating': ui.isListUpdating}">
      <li class="tag__list-item" v-for="(item, key) in ships" :key="key">
        <ShipCard :ship="item" />
      </li>
    </ul>
    <div class="homepage__paging">
      <Pagination :value="paging" @input="setPaging" />
    </div>
  </div>
</template>

<script lang="ts" src="./tag.ts"></script>
<style src="./tag.css"></style>
