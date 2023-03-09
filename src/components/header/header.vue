<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__inner-left">
          <router-link to="/" class="header__inner-left-logo">
            <img src="@/assets/img/logo_small.svg" alt="World of Warships Logo Small" class="header__inner-left-logo-pic">
          </router-link>
          <nav class="header__inner-left-nav">
            <ul class="header__inner-left-nav-list">
              <li class="header__inner-left-nav-list-item">
                <router-link to="/" class="header__inner-left-nav-list-item-link">{{$t('Корабли')}}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="header__right">
          <router-link to="/favorite" class="header__right-favorite">{{$t('Избранное')}}</router-link>
          <div class="language-selector" v-click-outside="() => {isOpenedLangSelector = false}">
            <div class="language-selector__current" @click="isOpenedLangSelector = !isOpenedLangSelector">
              <span class="language-selector__current-prefix">{{$t('Язык')}}: </span>
              <span class="language-selector__current-value">{{getCurrentLanguage().name}}</span>
            </div>
            <transition name="fade">
              <ul class="language-selector__list" v-if="isOpenedLangSelector">
                <li class="language-selector__list-item" v-for="(item, key) in langList" :key="key" @click="setLanguage(item.code)">{{item.name}}</li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent, ref } from "vue";
import {languagesList} from "@/i18n";


export default defineComponent({
  name: "Header",
  setup: () => {
    const isOpenedLangSelector = ref<boolean>(false);
    const langList = languagesList;
    const setLanguage = (code: string) => {
      localStorage.setItem("wow_locale", code);
      isOpenedLangSelector.value = false;
      window.location.reload();
    };
    const getCurrentLanguage = () => {
      return langList.find(item => {
        return localStorage.getItem("wow_locale") ? item.code === localStorage.getItem("wow_locale") : item.code === "en";
      })
    };

    return {isOpenedLangSelector, langList, setLanguage, getCurrentLanguage};
  }
});

</script>

<style>
.header {
  background-color: #333333;
  position: sticky;
  top: -1px;
  z-index: 10;
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__inner-left-logo {
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: 40px;
  margin-right: 24px;
}
.header__inner-left-nav {
  display: inline-block;
  vertical-align: middle;
}
.header__inner-left-nav-list-item-link {
  line-height: 60px;
  text-transform: uppercase;
  display: inline-block;
}
.router-link-exact-active.header__inner-left-nav-list-item-link {
  position: relative;
}
.router-link-exact-active.header__inner-left-nav-list-item-link:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #00cccc;
}
.language-selector {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.language-selector__current {
  cursor: pointer;
  padding-left: 24px;
  background-image: url("~@/assets/img/world.svg");
  background-position: left center;
  -webkit-background-size: 16px;
  background-size: 16px;
}
.language-selector__current-prefix {
  opacity: 0.7;
}
.language-selector__list {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  padding: 12px;
  background-color: #333;
  width: 200px;
  border: 1px solid rgba(255,255,255,0.2);
  max-height: 300px;
  overflow-y: auto;
}
.language-selector__list-item {
  font-size: 14px;
  padding: 5px 0;
  cursor: pointer;
}
.header__right-favorite {
  display: inline-block;
  vertical-align: middle;
  margin-right: 36px;
  line-height: 24px;
  padding-left: 24px;
  background-image: url("~@/assets/img/heart.svg");
  background-position: left center;
  -webkit-background-size: 16px;
  background-size: 16px;
}
.header__right-favorite:hover {
  text-decoration: underline;
}
@media screen and (max-width: 767px) {
  .header {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    top: auto;
  }
  .language-selector__current-prefix {
    display: none;
  }
  .header__inner-left-logo {
    width: 24px;
    height: 30px;
  }
  .header__inner-left-logo-pic {
    max-width: 100%;
  }
  .header__inner-left-nav-list-item-link {
    line-height: 48px;
    font-size: 14px;
  }
  .language-selector__current-value {
    font-size: 14px;
  }
  .language-selector__list {
    top: auto;
    bottom: calc(100% + 10px);
  }
  .header__right-favorite {
    font-size: 0;
    margin-right: 12px;
    -webkit-background-size: 20px;
    background-size: 20px;
  }
}
</style>
