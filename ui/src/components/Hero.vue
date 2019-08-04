<template>
  <div id='hero'>
    <div class='hero has-text-left is-dark'>
      <div class='hero-body'>
        <h1 class='title'>{{title}}</h1>
        <h2 class='subtitle'>{{subtitle}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hero',
  props: {
      title: String,
      subtitle: String
  }
}
</script>
