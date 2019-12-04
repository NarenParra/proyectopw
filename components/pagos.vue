<template>
  <div class>
    <b-container v-if="$store.state.mostrar">
      <br />
      <h1 class="mt-5 text-center">Contratos de clientes</h1>
      <p class="text-center">seleccione el contrato iniciado a mostrar</p>
      <br />
      <b-table striped :fields="fields" :items="items" responsive="sm">
        <!-- A virtual column -->
        <template v-slot:cell(index)="data">{{ data.index + 1 }}</template>

        <!-- A custom formatted column -->

        <template v-slot:cell(mostrar)="row">
          <b-button @click="llamarModal(row.item.id)">Pagar</b-button>
        </template>
      </b-table>
    </b-container>

    <b-modal ref="pagar" hide-footer title="Registro de pago">
      <div>
        <h3 class="text-center">Realizar Pago</h3>
        <b-form @submit="onSubmit">
          <b-form-group id="doc" label="Valor a pagar:">
            <b-form-input v-model="valor" type="number" required placeholder="Ingrese el monto"></b-form-input>
          </b-form-group>

          <b-form-group id="doc" label="Numero de cuota">
            <b-form-input
              v-model="cuota"
              type="number"
              required
              placeholder="Ingrese el numero cuota"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="valor" label="fecha del pago:">
            <b-form-input
              v-model="fecha"
              type="date"
              required
              placeholder="Ingrese el lugar de expedición "
            ></b-form-input>
          </b-form-group>

          <b-form-group id="Tipo de pago" label="Tipo de pago:">
            <b-form-select id="pers" v-model="tipopago" :options="tipo" required></b-form-select>
          </b-form-group>

          <b-button
            class="mt-3"
            variant="outline-danger"
            block
            @click="$refs['pagar'].hide()"
          >Cancelar</b-button>
          <b-button class="mt-2" variant="outline-success" block type="submit">Guardar</b-button>
        </b-form>
      </div>
    </b-modal>
    {{items}}
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
import cc from "~/components/contratos/VistaCompraventa.vue";

import { APIService } from "../middleware/APIService";
const API_URL = "http://localhost:1337";
const apiService = new APIService();

export default {
  data() {
    return {
      mostrar: true,
      contratos: {},
      //
      cuota: null,
      tipopago: "",
      valor: null,
      fecha: "",
      //
      tipo: ["normal", "parcial"],
      fields: [
        // A virtual column that doesn't exist in items
        "index",
        "finalidad",
        "observaciones",
        "mostrar"
        // A column that needs custom formatting
      ],
      items: [],
      selec: [],
      fin: ""
    };
  },
  methods: {
    llamarModal(id) {
      (this.contrato = id), this.$refs["pagar"].show();
    },
    onSubmit(evt) {
      const axios = require("axios");
      axios
        .post(`http://localhost:1337/api/pago`, {
          contrato: this.contrato,
          tipo: this.tipopago,
          monto: this.valor,
          cuota: this.cuota,
          fecha: this.fecha
        })
        .then(response => {
          if (response.data.success) {
            this.makeToast("primary", response.data.massage);
            this.$refs['pagar'].hide()
          } else {
            this.makeToast("danger", response.data.massage);
          }
        })
        .catch(e => {
          console.log(e);
          this.makeToast("danger", " " + e);
        });
    },

    llenartabla(estado) {
      apiService
        .getContrato(estado)
        .then(data => {
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
    this.llenartabla("iniciado");
  },

  components: {
    cc
  }
};
</script>
<style >
</style>