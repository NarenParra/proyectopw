<template>
  <div>
    <b-card>
      <b-button
        variant="outline-success"
        class="float-left"
        @click="$store.commit('cambio',true)"
      >《 Volver</b-button>
      <!-- <b-button variant="outline-primary" class="float-right" @click="$store.commit('cambio',true)" >Guardar Borrador</b-button> -->
    </b-card>
  <br>
      <b-card class="text-center" >
        <b-row>
          <b-card
            title="Crear contrato"
            tag="article"
            style="max-width: 10rem;"
            class="mb-2 mr-4 ml-4"
          >
            <b-col md="12">
              <b-card-img src="../static/cont.png" class="rounded-0"></b-card-img>
            </b-col>

            <b-col md="11">
              <b-button href="/contratos/base" variant="primary" >Mostrar</b-button>
            </b-col>
          </b-card>

          <b-card
            title="Contratos Borrador"
            tag="article"
            style="max-width: 10rem;"
            class="mb-2 mr-4 ml-4"
          >
            <b-col md="12">
              <b-card-img src="../static/cont.png" class="rounded-0"></b-card-img>
            </b-col>

            <b-col md="11">
              <b-button href="/contratos/borrador" variant="primary">Mostrar</b-button>
            </b-col>
          </b-card>

          <b-card
            title="Contratos Iniciados"
            tag="article"
            style="max-width: 10rem;"
            class="mb-2 mr-4 ml-4"
          >
            <b-col md="12">
              <b-card-img src="../static/cont.png" class="rounded-0"></b-card-img>
            </b-col>

            <b-col md="11">
              <b-button href="/contratos/iniciado" variant="primary">Mostrar</b-button>
            </b-col>
          </b-card>

          <b-card
            title="Seguimiento de contratos"
            tag="article"
            style="max-width: 12rem;"
            class="mb-2 mr-4 ml-4"
          >
            <b-col md="12">
              <b-card-img src="../static/cont.png" class="rounded-0"></b-card-img>
            </b-col>

            <b-col md="11">
              <b-button href="/contratos/seguimiento" variant="primary">Mostrar</b-button>
            </b-col>
          </b-card>
        </b-row>
      </b-card>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

