<template>
  <div class="lock section has-text-centered">
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
          <input class="input is-medium" type="number" placeholder="Amount">
          <span class="icon is-small is-left">
            <i class="fas fa-coins"></i>
          </span>
        </div>
      </div>
      <b-field>
          <b-datepicker
              placeholder="Date for release"
              icon="calendar-today"
              size="is-medium"
              editable>
          </b-datepicker>
      </b-field>
      <!-- <div class="field">
        <div class="control has-icons-left">
          <input class="input is-large" type="date" placeholder="Date for release"/>
          <span class="icon is-small is-left">
            <i class="fas fa-calendar-alt"></i>
          </span>
        </div>
      </div> -->
      <a class="button is-warning is-large">Lock</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lock',
  props: {
    web3: String
  }
}
</script>

