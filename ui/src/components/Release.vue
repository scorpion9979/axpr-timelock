<template>
  <div class="release section has-text-centered">
    <div class="container">
      <div class="field">
        <div class="control has-icons-left">
          <input class="input is-large" placeholder="Recipient">
          <span class="icon is-small is-left">
            <i class="fab fa-ethereum"></i>
          </span>
        </div>
      </div>
      <a class="button is-warning is-large">Release</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'release',
  props: {
    web3: String
  }
}
</script>

