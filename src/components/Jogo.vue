<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="display-4">Olá {{ jogador }}, rodada: {{ rodada }}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="3" 
             v-for="carta in listaCartas"
             :key="carta.id"
             v-if="!carta.disable">
        <b-card :img-src="carta.img"
                img-alt="Img"
                img-top
                no-body
                v-on:click="clickCarta(carta)">
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="myModalRef" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
            <h3>Hello From My Modal!</h3>
        </div>
    </b-modal>
  </b-container>
</template>

<script>

export default {
  name: 'Jogo',
  data () {
    return {
      listaCartas: [
        {id: 1, par: 1, img: './static/cartas/1.jpg', disable: false},
        {id: 2, par: 2, img: './static/cartas/2.jpg', disable: false},
        {id: 3, par: 3, img: './static/cartas/3.jpg', disable: false},
        {id: 4, par: 4, img: './static/cartas/4.jpg', disable: false},
        {id: 5, par: 5, img: './static/cartas/5.jpg', disable: false},
        {id: 6, par: 6, img: './static/cartas/6.jpg', disable: false},
        {id: 7, par: 7, img: './static/cartas/7.jpg', disable: false},
        {id: 8, par: 8, img: './static/cartas/8.jpg', disable: false},
        {id: 9, par: 9, img: './static/cartas/9.jpg', disable: false},
        {id: 10, par: 10, img: './static/cartas/10.jpg', disable: false},
        {id: 11, par: 1, img: './static/cartas/1.jpg', disable: false},
        {id: 12, par: 2, img: './static/cartas/2.jpg', disable: false},
        {id: 13, par: 3, img: './static/cartas/3.jpg', disable: false},
        {id: 14, par: 4, img: './static/cartas/4.jpg', disable: false},
        {id: 15, par: 5, img: './static/cartas/5.jpg', disable: false},
        {id: 16, par: 6, img: './static/cartas/6.jpg', disable: false},
        {id: 17, par: 7, img: './static/cartas/7.jpg', disable: false},
        {id: 18, par: 8, img: './static/cartas/8.jpg', disable: false},
        {id: 19, par: 9, img: './static/cartas/9.jpg', disable: false},
        {id: 20, par: 10, img: './static/cartas/10.jpg', disable: false}
      ],
      rodada: 0,
      jogador: '',
      cartaSelecionada: null
    }
  },
  watch: {
    listaCartas: function (e) {
      console.log(e)
    }
  },
  created: function () {
    this.jogador = JSON.parse(localStorage.getItem('Jogador')).nome
    this.shuffle(this.listaCartas)
    console.log(this.listaCartas)
  },
  methods: {
    clickCarta: function (carta) {
      if (!carta.disable) {
        if (this.cartaSelecionada === null) {
          this.cartaSelecionada = carta
        } else if (this.cartaSelecionada.par === carta.par) {
          if (this.cartaSelecionada.id !== carta.id) {
            this.desabilitarCartas()
            console.log('vc acertou')
            this.cartaSelecionada = null
            this.rodada++
            console.log(this.verificaLista())
            if (this.verificaLista()) {
              // abrir modal
              this.$refs.myModalRef.show()
            }
          } else {
            console.log('não vale selecionar a msms carta')
          }
        } else {
          this.cartaSelecionada = null
          console.log('vc errou')
          this.rodada++
        }
      }
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

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
