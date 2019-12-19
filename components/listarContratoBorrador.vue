<template>
  <div class>
    <b-container v-if="$store.state.mostrar">
      <br />
      <h1 class="mt-5 text-center">Contratos Borrador de clientes</h1>
      <p class="text-center">seleccione el contrato borrador a editar</p>
      <br />
      <b-table
        class="table table-hover"
        :busy="isBusy"
        striped
        :fields="fields"
        :items="items"
        responsive="sm"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <!-- <strong>Loading...</strong> -->
          </div>
        </template>
        <!-- A virtual column -->
        <template v-slot:cell(index)="data">{{ data.index + 1 }}</template>

        <!-- A custom formatted column -->
        <template v-slot:cell(editar)="row">
          <b-button
            variant="outline-primary"
            @click="guaradarID(row.item,row.item.finalidad)"
          >Editar</b-button>
        </template>
      </b-table>
    </b-container>

    <div class="container mt-3">
      <div v-if="fin ==='Compraventa' && !$store.state.mostrar">
        <cc />
      </div>
    </div>
  </div>
</template>



<script>
import cc from "~/components/contratos/ContratoCompraventa.vue";

import { APIService } from "../middleware/APIService";
const API_URL = "http://localhost:1337";
const apiService = new APIService();

export default {
  data() {
    return {
      isBusy: true,
      mostrar: true,
      contratos: {},
      fields: [
        // A virtual column that doesn't exist in items
        "index",
        "finalidad",
        "observaciones",
        "editar"
        // A column that needs custom formatting
      ],
      items: [],
      selec: [],
      fin: ""
    };
  },
  methods: {
    llenartabla(estado) {
      apiService
        .getContrato(estado)
        .then(data => {
          this.isBusy = false;
          this.items = data.data;
          this.items.forEach(element => {
            //console.log(element.estado)
            apiService.getEstado(element.estado).then(data2 => {
              element.estado = data2.data[0].titulo;
            });
          });
        })
        .catch(e => {
          console.log(e);
          this.makeToast("danger", " " + e);
        });
    },

    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: `Alerta`,
        variant: variant,
        solid: true
      });
    },

    guaradarID(row, finalidad) {
      // $store.commit('increment',id)
      this.$store.commit("increment", row);
      this.$store.commit("cambio", false);
      this.fin = finalidad;
    }
  },
  mounted() {
    this.llenartabla("borrador");
  },

  components: {
    cc
  }
};
</script>
<style >
</style>
