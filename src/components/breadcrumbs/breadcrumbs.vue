<template>
  <ul class="breadcrumbs" v-if="items && items.length">
    <li class="breadcrumbs__item" v-for="(item, key) in items" :key="key">
      <component :is="key === items.length - 1 ? 'span' : 'router-link'" :to="item.to || ''" class="breadcrumbs__item-link">{{$t(item.name)}}</component>
    </li>
  </ul>
</template>

<script lang="ts" src="./breadcrumbs.ts"></script>

<style>
.breadcrumbs {
  white-space: nowrap;
  overflow-x: auto;
  margin-bottom: 24px;
}
.breadcrumbs__item {
  display: inline-block;
  vertical-align: middle;
  position: relative;
}
.breadcrumbs__item:not(:last-child) {
  margin-right: 24px;
}
.breadcrumbs__item:not(:last-child):after {
  content: ">";
  position: absolute;
  right: -16px;
}
a.breadcrumbs__item-link {
  text-decoration: underline;
}
.breadcrumbs__item-link:hover {
  text-decoration: none;
}
@media screen and (max-width: 767px) {
  .breadcrumbs {
    font-size: 14px;
    margin-bottom: 12px;
  }
}
</style>
