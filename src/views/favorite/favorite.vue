<template>
  <div class="favorite">
    <Breadcrumbs :items="ui.breadcrumbs" />
    <h1 class="favorite__title">{{$t("Избранное")}}</h1>
    <Loader v-if="ui.isListLoading" />
    <Error v-if="ui.isListEmpty" :title="$t('Ничего не найдено')" :subtitle="$t('Измените параметры поиска или попробуйте позднее')" />
    <Error v-if="ui.isListError" :title="$t('Ошибка сервера')" :subtitle="$t('Пожалуйста, попробуйте позднее')" />
    <ul class="favorite__list" v-if="ships && ships.length" :class="{'tag__list_updating': ui.isListUpdating}">
      <li class="favorite__list-item" v-for="(item, key) in ships" :key="key">
        <ShipCard :ship="item" />
      </li>
    </ul>
    <div class="favorite__paging">
      <Pagination :value="paging" @input="setPaging" />
    </div>
  </div>
</template>

<script lang="ts" src="./favorite.ts"></script>
<style src="./favorite.css"></style>
