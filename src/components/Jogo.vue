<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Olá {{ jogador }}, rodada: {{ rodada }}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" lg="2" md="3" sm="4"
             v-for="carta in listaCartas"
             :key="carta.id">
        <carta-component :carta="carta"
                         @click.native="clickCarta(carta)">
        </carta-component>
      </b-col>
    </b-row>
    <b-modal ref="myModalRef" hide-footer title="Parabens">
        <div class="d-block text-center">
            <h3>Hello From My Modal!</h3>
        </div>
    </b-modal>
  </b-container>
</template>

<script>
import CartaComponent from '@/components/Carta.vue'

export default {
  name: 'Jogo',
  components: {
    CartaComponent
  },
  data () {
    return {
      listaCartas: [
        {id: 1, par: 1, disable: false, active: false, erro: false},
        {id: 2, par: 2, disable: false, active: false, erro: false},
        {id: 3, par: 3, disable: false, active: false, erro: false},
        {id: 4, par: 4, disable: false, active: false, erro: false},
        {id: 5, par: 5, disable: false, active: false, erro: false},
        {id: 6, par: 6, disable: false, active: false, erro: false},
        {id: 7, par: 7, disable: false, active: false, erro: false},
        {id: 8, par: 8, disable: false, active: false, erro: false},
        {id: 9, par: 9, disable: false, active: false, erro: false},
        {id: 10, par: 10, disable: false, active: false, erro: false},
        {id: 11, par: 1, disable: false, active: false, erro: false},
        {id: 12, par: 2, disable: false, active: false, erro: false},
        {id: 13, par: 3, disable: false, active: false, erro: false},
        {id: 14, par: 4, disable: false, active: false, erro: false},
        {id: 15, par: 5, disable: false, active: false, erro: false},
        {id: 16, par: 6, disable: false, active: false, erro: false},
        {id: 17, par: 7, disable: false, active: false, erro: false},
        {id: 18, par: 8, disable: false, active: false, erro: false},
        {id: 19, par: 9, disable: false, active: false, erro: false},
        {id: 20, par: 10, disable: false, active: false, erro: false}
      ],
      rodada: 0,
      jogador: '',
      cartaSelecionada: null,
      desabilitarClick: false
    }
  },
  watch: {
    listaCartas: {
      handler: function () {
        if (this.verificaLista()) {
          this.$refs.myModalRef.show()
        }
      },
      deep: true
    }
  },
  created: function () {
    this.jogador = JSON.parse(localStorage.getItem('Jogador')).nome
    this.shuffle(this.listaCartas)
  },
  methods: {
    clickCarta: function (carta) {
      if (!carta.disable && !this.desabilitarClick) {
        if (this.cartaSelecionada === null) {
          this.cartaSelecionada = carta
          this.selecionarCarta(carta, true)
        } else if (this.cartaSelecionada.par === carta.par) {
          if (this.cartaSelecionada.id !== carta.id) {
            this.selecionarCarta(carta, true)
            this.desabilitarCartas()
            console.log('vc acertou')
            this.cartaSelecionada = null
            this.rodada++
          } else {
            this.selecionarCarta(carta, false)
            this.cartaSelecionada = null
            console.log('não vale selecionar a msms carta')
          }
        } else {
          this.selecionarCarta(carta, true)
          this.cartaErrada(carta, true)
          this.cartaErrada(this.cartaSelecionada, true)
          this.desabilitarClick = true
          setTimeout(() => {
            this.selecionarCarta(carta, false)
            this.selecionarCarta(this.cartaSelecionada, false)

            this.cartaErrada(carta, false)
            this.cartaErrada(this.cartaSelecionada, false)
            this.cartaSelecionada = null
            this.desabilitarClick = false
          }, 1000)
          console.log('vc errou')
          this.rodada++
        }
      }
    },
    cartaErrada: function (carta, erro) {
      this.listaCartas
        .filter(x => x.id === carta.id)
        .map(x => {
          x.erro = erro
          return x
        })
    },
    selecionarCarta: function (carta, ativo) {
      this.listaCartas
        .filter(x => x.id === carta.id)
        .map(x => {
          x.active = ativo
          return x
        })
    },
    desabilitarCartas: function () {
      this.listaCartas
        .filter(x => x.par === this.cartaSelecionada.par)
        .map(x => {
          x.disable = true
          return x
        })
    },
    verificaLista: function () {
      return this.listaCartas.filter(x => !x.disable).length === 0
    },
    shuffle: function (array) {
      let currentIndex = array.length
      let temporaryValue
      let randomIndex

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    }
  }
}
</script>
