<template>
  <div class="jogo">
    <b-jumbotron :header="`Olá ${jogador}`" 
                 lead="Bem-vindo ao jogo da memória"
                 :fluid="true">
      <p>Você está na rodada: {{ rodada }}</p>
    </b-jumbotron>
    <b-container>
      <b-row>
        <b-col cols="4" lg="2" md="3" sm="4"
              v-for="carta in listaCartas"
              :key="carta.id">
          <carta-component :carta="carta"
                          @click.native="clickCarta(carta)">
          </carta-component>
        </b-col>
      </b-row>
      <b-modal ref="jogoFinalizado"
               header-bg-variant="success"
               header-text-variant="light"
               :ok-only="true"
               :no-close-on-backdrop="true"
               :no-close-on-esc="true"
               :hide-header-close="true"
               ok-variant="success"
               title="Parabéns, você completou o jogo">
        <p>Você finalizou o jogo em <strong>{{ rodada }}</strong> rodadas.</p>
        <div slot="modal-footer" class="w-100">
          <b-btn variant="primary" class="float-left" @click="tentarNovamente()">
            Tentar novamente
          </b-btn>
          <b-btn variant="success" class="float-right" @click="fecharModal()">
            Voltar para Home
          </b-btn>
        </div>
      </b-modal>
    </b-container>
  </div>
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
      listaCartas: [],
      rodada: 0,
      jogador: '',
      cartaSelecionada: null,
      desabilitarClick: false,
      pontuacaoAnterior: 0
    }
  },
  watch: {
    listaCartas: {
      handler: function () {
        if (this.verificaLista()) {
          this.$refs.jogoFinalizado.show()
        }
      },
      deep: true
    }
  },
  created: function () {
    let item = JSON.parse(localStorage.getItem('Jogador'))
    if (item && item.nome) {
      this.jogador = item.nome
      this.listaCartas = this.shuffle(this.criaLista())
    } else {
      this.$router.replace({name: 'HomeErro', params: {erro: 'Ocorreu um erro ao carregar o jogo, por favor, insira seu nome e tente novamente'}})
    }
  },
  methods: {
    criaLista: function () {
      let j = 10
      let lista = []
      for (let i = 1; i <= 20; i++) {
        let item = {
          id: i,
          par: i,
          disable: false,
          erro: false,
          active: false
        }
        if (i > 10) {
          item.par = j
          j--
        }
        lista.push(item)
      }
      return lista
    },
    clickCarta: function (carta) {
      if (!carta.disable && !this.desabilitarClick) {
        if (this.cartaSelecionada === null) {
          this.cartaSelecionada = carta
          carta.active = true
        } else if (this.cartaSelecionada.par === carta.par) {
          if (this.cartaSelecionada.id !== carta.id) {
            carta.active = true
            this.cartaSelecionada.disable = true
            carta.disable = true
            this.cartaSelecionada = null
            this.rodada++
          }
        } else {
          carta.active = true
          carta.erro = true
          this.cartaSelecionada.erro = true
          this.desabilitarClick = true
          setTimeout(() => {
            carta.active = false
            this.cartaSelecionada.active = false
            carta.erro = false
            this.cartaSelecionada.erro = false
            this.cartaSelecionada = null
            this.desabilitarClick = false
          }, 1000)
          this.rodada++
        }
      }
    },
    verificaLista: function () {
      return this.listaCartas.filter(x => !x.disable).length === 0
    },
    fecharModal: function () {
      this.salvarJogadorRanking()
      this.$refs.jogoFinalizado.hide()
      this.$router.replace({name: 'Home'})
    },
    tentarNovamente: function () {
      this.salvarJogadorRanking()
      this.pontuacaoAnterior = this.rodada
      this.rodada = 0
      this.listaCartas = this.shuffle(this.criaLista())
      this.$refs.jogoFinalizado.hide()
    },
    salvarJogadorRanking: function () {
      let lista = JSON.parse(localStorage.getItem('Ranking')) || []
      let rodada = this.pontuacaoAnterior !== 0 && this.pontuacaoAnterior < this.rodada ? this.pontuacaoAnterior : this.rodada
      if (lista.length > 0) {
        let item = lista.filter(x => x.jogador === this.jogador)
        if (item.length > 0) {
          item.map(x => {
            x.rodada = rodada
          })
        } else {
          lista.push({jogador: this.jogador, rodada})
        }
      }
      localStorage.setItem('Ranking', JSON.stringify(lista))
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
