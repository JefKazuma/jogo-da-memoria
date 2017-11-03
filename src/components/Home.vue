<template>
  <b-container>
    <b-row class="height-80 justify-content-md-center" align-v="center">
      <b-col cols="8">
        <b-alert variant="danger"
                dismissible
                :show="erro && erro.length > 0">
          {{ erro }}
        </b-alert>
        <b-card header="Bem vindo ao jogo da memória">
          <b-form @submit.prevent="onSubmit">
            <b-form-group id="lblNome"
                          label="Insira seu nome para iniciar o jogo:"
                          label-for="txtNome">
              <b-form-input id="txtNome"
                            type="text"
                            v-model="form.nome"
                            required>
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Iniciar</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  props: ['erro'],
  data () {
    return {
      form: {
        nome: ''
      }
    }
  },
  created: function () {
    localStorage.removeItem('Jogador')
  },
  methods: {
    onSubmit: function () {
      if (!this.verificaJogador()) {
        localStorage.setItem('Jogador', JSON.stringify(this.form))
        this.$router.replace({name: 'Jogo'})
      } else {
        this.$router.replace({name: 'HomeErro', params: {erro: 'Este nome já existe no ranking, por favor, insira outro nome'}})
      }
    },
    verificaJogador: function () {
      let lista = JSON.parse(localStorage.getItem('Ranking')) || []
      if (lista.length > 0) {
        return lista.filter(x => x.jogador === this.form.nome).length > 0
      }
      return false
    }
  }
}
</script>

<style scoped>
.height-80 {
  height: 80vh;
}
</style>

