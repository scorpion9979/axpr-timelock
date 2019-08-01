Vue.component('web3', {
    data () {
        return {
            state: {
                instance: null
            }
        }
    },
  
    provide () {
        return {
            web3State: this.state
        }
    },
  
    render (createElement) {
        return createElement(
            'div', 
            { class: 'web3' }, 
            this.$slots.default
        )
    }
})