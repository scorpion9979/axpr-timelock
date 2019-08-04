<template>
  <div class='release has-text-centered'>
    <div class='columns is-centered is-mobile'>
      <div class='column is-three-fifths-desktop is-four-fifths-mobile'>
        <div class='container'>
          <b-field>
            <b-input v-model='address' size='is-large' placeholder='Recipient' icon='ethereum'>
            </b-input>
          </b-field>
          <b-button v-bind:disabled='disabled()' @click='release' type='is-warning' size='is-large'>Release</b-button>
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
        const from = await this.web3().eth.getCoinbase();
        const gas = await this.instance().release.estimateGas(this.address, { from });
        await this.instance().release(this.address, { from, gas })
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

