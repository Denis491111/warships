<template>
  <div
      v-if="
      value && value.total > 1 && !isNaN(Number(value.total + value.current))
    "
      class="pagination-paging"
  >
    <button
        v-if="value.current !== 1"
        class="pagination-paging__arrow pagination-paging__arrow_left"
        @click="setPage(value.current - 1)"
    />
    <span
        v-for="(item, key) in paginationFiltered"
        :key="key"
        class="pagination-paging__item-wrapper"
    >
      <template v-if="value.current === item">
        <span
            class="pagination-paging__item pagination-paging__current"
        >{{ item }}</span
        >
      </template>
      <template v-else-if="item === '...'">
        <span class="pagination-paging__separator" />
      </template>
      <template v-else>
        <button
            class="pagination-paging__item pagination-paging__link"
            @click="setPage(item)"
        >
          {{ item }}
        </button>
      </template>
    </span>
    <button
        v-if="value.current !== value.total"
        class="pagination-paging__arrow pagination-paging__arrow_right"
        @click="setPage(value.current + 1)"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: ["value"],
  setup: (props, context) => {

    const setPage = (page: number) => {
      const paging = { ...props.value, current: page };
      context.emit("input", paging);
      context.emit("paginate", paging);
    }

    const paginationFiltered = computed<any>(() => {
      const width: number = window.screen.availWidth;
      let pages: any = [];
      let lowerLimit = props.value.current;
      let upperLimit = props.value.current;
      const centerCount: number = 3;

      for (let i = 1; i < centerCount && i < props.value.total; ) {
        if (lowerLimit > 1) {
          lowerLimit--;
          i++;
        }

        if (i < centerCount && upperLimit < props.value.total) {
          upperLimit++;
          i++;
        }
      }

      if (lowerLimit > 1) {
        pages.push(1);
        if (lowerLimit > 2) {
          pages.push("...");
        }
      }
      for (let i = lowerLimit; i <= upperLimit; i++) {
        pages.push(i);
      }
      if (centerCount === 5) {
        if (
            props.value.current < props.value.total - 3 &&
            props.value.total > centerCount
        ) {
          pages.push("...");
        }
        if (
            props.value.current < props.value.total - 2 &&
            props.value.total > centerCount
        ) {
          pages.push(props.value.total);
        }
      } else if (centerCount === 3) {
        if (
            props.value.current < props.value.total - 2 &&
            props.value.total > centerCount
        ) {
          pages.push("...");
        }
        if (
            props.value.current < props.value.total - 1 &&
            props.value.total > centerCount
        ) {
          pages.push(props.value.total);
        }
      }
      return pages;
    });

    return {setPage, paginationFiltered}
  }
});
</script>

<style>
.pagination-paging__item-wrapper {
  display: inline-block;
  vertical-align: middle;
}
.pagination-paging__item-wrapper:not(:last-child) {
  margin-right: 8px;
}
.pagination-paging__item {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background-color: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 0 6px;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  min-width: 40px;
  text-align: center;
  border-radius: 0;
  user-select: none;
  outline: none;
}
button.pagination-paging__item {
  cursor: pointer;
}
.pagination-paging__item:hover {
  background-color: #ffffff;
  color: #333;
}
.pagination-paging__current {
  pointer-events: none;
  background: linear-gradient(#fc611d, #de2515);
  border: none;
}
.pagination-paging__separator {
  display: inline-block;
  vertical-align: middle;
  height: 1px;
  width: 16px;
  background-color: rgba(255,255,255,0.2);
}
.pagination-paging__arrow {
  display: inline-block;
  vertical-align: middle;
  height: 40px;
  width: 40px;
  background-color: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  user-select: none;
  outline: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.5 3L7.5 12.5L16.5 22' stroke='%23ffffff' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
  -webkit-background-size: 16px;
  background-size: 16px;
}
.pagination-paging__arrow:not(:last-child) {
  margin-right: 8px;
}
.pagination-paging__arrow_right {
  transform: rotate(180deg);
}
.pagination-paging__arrow:hover {
  background-color: #ffffff;
  border-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.5 3L7.5 12.5L16.5 22' stroke='%23333333' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
}
@media screen and (max-width: 767px) {
  .pagination-paging__item {
    height: 32px;
    line-height: 32px;
    min-width: 32px;
    font-size: 12px;
  }
  .pagination-paging__separator {
    width: 10px;
  }
  .pagination-paging__item-wrapper:not(:last-child) {
    margin-right: 4px;
  }
  .pagination-paging__arrow {
    width: 32px;
    height: 32px;
    -webkit-background-size: 16px;
    background-size: 16px;
  }
}
</style>
