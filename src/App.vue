<template>
  <div id="app">
    <b-navbar toggleable="md"
              type="dark"
              variant="info">
      <b-navbar-brand href="/">Jogo da memória</b-navbar-brand>
      <b-nav is-nav-bar
             right
             class="ml-auto">
        <b-nav-item @click="ranking()">Ranking</b-nav-item>
      </b-nav>
    </b-navbar>
    <router-view/>
    <b-modal ref="ranking"
             header-bg-variant="info"
             header-text-variant="light"
             ok-variant="info"
             :ok-only="true"
             title="Ranking dos melhores jogadores">
      <b-table bordered hover
               :items="jogadores"
               :fields="campos"
               v-if="jogadores.length > 0">
      </b-table>
      <p v-else>Por enquanto não há nenhum registro</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      jogadores: [],
      campos: [
        {
          key: 'jogador',
          sortable: true
        },
        {
          key: 'rodada',
          sortable: true
        }
      ]
    }
  },
  methods: {
    ranking: function () {
      let lista = JSON.parse(localStorage.getItem('Ranking')) || []
      if (lista.length > 0) {
        this.jogadores = lista.sort(function (a, b) {
          return a.rodada - b.rodada
        })
      }
      this.$refs.ranking.show()
    }
  }
}
</script>
