<template>
  <div class="homepage">
    <div class="homepage__head">
      <h1 class="homepage__head__title">{{$t('Список кораблей')}}</h1>
      <input type="text" class="homepage__head__searcher" :placeholder="`${$t('Поиск')}...`" :value="listRequestData.query" @input="debouncedSearch($event.target.value)">
    </div>
    <div class="homepage__sorting">
      <span class="homepage__sorting-prefix">{{$t('Сортировать по')}}:</span>
      <ul class="homepage__sorting-list">
        <li class="homepage__sorting-list-item" @click="setSorting(item.id)" :class="{'homepage__sorting-list-item_active': item.id === listRequestData.sorting_field}" v-for="(item, key) in ui.sortingVariants" :key="key">
          <span class="homepage__sorting-list-item-name">{{item.name}}</span>
          <span class="homepage__sorting-list-item-pic" v-if="item.id === listRequestData.sorting_field" :class="{'homepage__sorting-list-item-pic_desc': listRequestData.sorting_desc}"></span>
        </li>
      </ul>
    </div>
    <Loader v-if="ui.isListLoading" />
    <Error v-if="ui.isListEmpty" :title="$t('Ничего не найдено')" :subtitle="$t('Измените параметры поиска или попробуйте позднее')" />
    <Error v-if="ui.isListError" :title="$t('Ошибка сервера')" :subtitle="$t('Пожалуйста, попробуйте позднее')" />
    <ul class="homepage__list" v-if="listShips && listShips.length" :class="{'homepage__list_updating': ui.isListUpdating}">
      <li class="homepage__list-item" v-for="(ship, key) in listShips" :key="key">
        <ShipCard :ship="ship"/>
      </li>
    </ul>
    <div class="homepage__paging">
      <Pagination :value="paging" @input="setPaging" />
    </div>
  </div>
</template>

<script lang="ts" src="./homepage.ts"></script>
<style src="./homepage.css"></style>
