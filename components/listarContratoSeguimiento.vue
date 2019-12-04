<template>
  <div>
    <b-container v-if="$store.state.mostrar">
      <br />
      <h1 class="mt-5 text-center">Seguimiento a los Contratos de clientes</h1>
      <p class="text-center">seleccione el contrato al cual quiere ver el seguimiento</p>
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

        <template v-slot:cell(mostrar)="row">
          <b-button
            variant="outline-primary"
            @click="guaradarID(row.item,row.item.finalidad)"
          >Ver seguimiento</b-button>
        </template>
      </b-table>
    </b-container>

    <div class="container mt-3">
      <div v-if="fin ==='Compraventa' && !$store.state.mostrar">
        <cc />
      </div>
      <div v-if="fin ==='B'">
        <ca />
      </div>
      <div v-if="fin ==='C'">
        <cs />
      </div>
    </div>
  </div>
</template>



<script>
import cc from "~/components/timeLine.vue";

import { APIService } from "../middleware/APIService";
const API_URL = "http://localhost:1337";
const apiService = new APIService();

export default {
  data() {
    return {
      isBusy: true,
      mostrar: true,
      contratos: {},
      // selected: null,
      // opc: [
      //   { value: "A", text: "Contrato de Compreventa" },
      //   { value: "B", text: "Contrato de Arrendamiento" },
      //   { value: "C", text: "contrato por Prestacion de Servicios" }
      // ],
      fields: [
        // A virtual column that doesn't exist in items
        "index",
        "finalidad",
        "observaciones",
        "estado",
        "mostrar"
        // A column that needs custom formatting
      ],
      items: [],
      selec: [],
      fin: ""
    };
  },
  methods: {
    llenartabla() {
      apiService
        .getContratos()
        .then(data => {
          console.log(data);

          data.data.forEach(element => {
            apiService.getEstado(element.estado).then(estado => {
              this.isBusy = false;
              if (
                estado.data[0].slug == "iniciado" ||
                estado.data[0].slug == "finalizado"
              ) {
                this.items.push({
                  id: element.id,
                  estado: estado.data[0].titulo,
                  finalidad: element.finalidad,
                  observaciones: element.observaciones,
                  contratociudad: element.contratociudad,
                  fechainicia: element.fechainicia,
                  pagado: element.pagado,
                  valor: element.valor
                });
              }
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
    this.llenartabla();
  },

  components: {
    cc
  }
};
</script>
<style >
</style>