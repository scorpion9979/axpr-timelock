<template>
  <div class="lock">
    <div class="hero">
      <div class="hero-body">
        <h3 class="title">Lock Page</h3>
        <p class="subtitle">
          Here you can lock AXPR for a specified address to be released at a specified time
        </p>
      </div>
    </div>
    <div class="container">
      <div class="field">
        <div class="control has-icons-left">
          <input class="input is-large" placeholder="Recipient">
          <span class="icon is-small is-left">
            <i class="fab fa-ethereum"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input class="input is-large" placeholder="Amount">
          <span class="icon is-small is-left">
            <i class="fas fa-dollar-sign"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input class="input is-large" type="date" placeholder="Date for release"/>
          <span class="icon is-small is-left">
            <i class="fas fa-calendar-alt"></i>
          </span>
        </div>
      </div>
      <a class="button is-warning">Go!</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lock',
  props: {
    web3: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
