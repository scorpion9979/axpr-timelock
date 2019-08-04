<template>
  <div class='release has-text-centered'>
    <div class='columns is-centered is-mobile'>
      <div class='column is-three-fifths-desktop is-four-fifths-mobile'>
        <div class='container'>
          <div class='field'>
            <div class='control has-icons-left'>
              <input v-model='address' class='input is-large' placeholder='Recipient'>
              <span class='icon is-small is-left'>
                <i class='fab fa-ethereum'></i>
              </span>
            </div>
          </div>
          <button v-bind:disabled='disabled()' v-on:click='release' class='button is-warning is-large'>Release</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'release',
  data: function() {
    return {
      address: '',
    }
  },
  inject: ['web3', 'instance', 'disabled', 'toggleDisabled', 'success', 'danger'],
  methods: {
    release: async function() {
      this.toggleDisabled();
      try {
        const account = await this.web3().eth.getAccounts();
        await this.instance().release(this.address, { gas: 400000, from: account.toString() })
                             .then(() => this.success('AXPR released successfully'));
        this.toggleDisabled();
      } catch (err) {
        this.toggleDisabled();
        this.danger('Encountered an error');
      }
    }
  }
}
</script>

