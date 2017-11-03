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
        <div slot="modal-footer" class="w-100 text-right">
          <b-btn variant="primary" @click="tentarNovamente()">
            Tentar novamente
          </b-btn>
          <b-btn variant="success" @click="fecharModal()">
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
    },
    rodada: {
      handler: function (e) {
        localStorage.setItem('Jogador', JSON.stringify({
          nome: this.jogador,
          rodada: e
        }))
      },
      deep: true
    }
  },
  created: function () {
    let item = JSON.parse(localStorage.getItem('Jogador'))
    if (item) {
      this.jogador = item.nome
      this.shuffle(this.listaCartas)
    } else {
      this.$router.replace({name: 'HomeErro', params: {erro: 'Ocorreu um erro ao carregar o jogo, por favor, insira seu nome e tente novamente'}})
    }
  },
  methods: {
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
      let lista = JSON.parse(localStorage.getItem('Ranking')) || []
      lista.push({jogador: this.jogador, rodada: this.pontuacaoAnterior !== 0 && this.pontuacaoAnterior < this.rodada ? this.pontuacaoAnterior : this.rodada})
      localStorage.setItem('Ranking', JSON.stringify(lista))
      localStorage.removeItem('Jogador')
      this.$refs.jogoFinalizado.hide()
      this.$router.replace({name: 'Home'})
    },
    tentarNovamente: function () {
      this.pontuacaoAnterior = this.rodada
      this.rodada = 0
      this.listaCartas.map(x => {
        x.active = false
        x.erro = false
        x.disable = false
        return x
      })
      this.shuffle(this.listaCartas)
      this.$refs.jogoFinalizado.hide()
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
