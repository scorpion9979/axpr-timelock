<template>
  <div class="release has-text-centered">
    <div class="columns is-centered is-mobile">
      <div class="column is-three-fifths-desktop is-four-fifths-mobile">
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

