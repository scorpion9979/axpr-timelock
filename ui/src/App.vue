<template>
  <div id='app'>
    <hero v-bind:title='this.$route.meta.title' v-bind:subtitle='this.$route.meta.subtitle'/>
    <div class='tabs is-centered is-medium'>
      <ul>
        <li v-bind:class='this.$route.name=="lock"?"is-active":""'>
          <router-link to='/lock'>
            <span class='icon is-small'><i class='fas fa-lock' aria-hidden='true'></i></span>
            <span>Lock</span>
          </router-link>
        </li>
        <li v-bind:class='this.$route.name=="release"?"is-active":""'>
          <router-link to='/release'>
            <span class='icon is-small'><i class='fas fa-unlock' aria-hidden='true'></i></span>
            <span>Release</span>
          </router-link>
        </li>
        <li v-bind:class='this.$route.name=="deposit"?"is-active":""'>
          <router-link to='/deposit'>
            <span class='icon is-small'><i class='fas fa-piggy-bank' aria-hidden='true'></i></span>
            <span>Deposit</span>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <b-loading :is-full-page='true' :active='loading()' :can-cancel='true'></b-loading>
  </div>
</template>

<script>
import Hero from './components/Hero.vue'

export default {
  name: 'app',
  components: {
    Hero
  },
  inject: ['loading']
}
</script>

<style lang='scss'>
// Import Bulma"s core
@import '~bulma/sass/utilities/_all';
// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
// Setup $colors to use as bulma classes (e.g. "is-twitter")
$colors: (
  'white': (
    $white,
    $black
  ),
  'black': (
    $black,
    $white
  ),
  'light': (
    $light,
    $light-invert
  ),
  'dark': (
    $dark,
    $dark-invert
  ),
  'primary': (
    $primary,
    $primary-invert
  ),
  'info': (
    $info,
    $info-invert
  ),
  'success': (
    $success,
    $success-invert
  ),
  'warning': (
    $warning,
    $warning-invert
  ),
  'danger': (
    $danger,
    $danger-invert
  ),
  'twitter': (
    $twitter,
    $twitter-invert
  )
);
// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;
// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
