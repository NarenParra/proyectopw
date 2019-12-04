<template>
  <div align="center">
    <br />
    <b-container v-if="mostrar">
      <b-card>
        <h3>Linea de tiempo del seguimiento de contratos de clientes</h3>
        <b-button variant="outline-success" class="float-left" @click="$store.commit('cambio',true)">《 Volver</b-button>
        <b-button
          @click="verContrato($store.state.counter.finalidad)"
          class="float-rigth"
          variant="outline-primary"
        >Ver contrato</b-button>
      </b-card>
      <br />
      <b-card>
        <br />
        <Timeline
          :timeline-items="dataTimeline"
          :message-when-no-items="messageWhenNoItems"
          :unique-year="true"
          order="desc"
        >mm</Timeline>
      </b-card>
    </b-container>
    <div class="container mt-3">
      <div v-if="fin ==='Compraventa' && !mostrar">
        <cc />
      </div>
    </div>
  </div>
</template>

<script>
import cc from "~/components/contratos/VistaCompraventa.vue";

import Vue from "vue";
import Timeline from "timeline-vuejs";
import "../node_modules/timeline-vuejs/dist/timeline-vuejs.css";

import { APIService } from "../middleware/APIService";
const API_URL = "http://localhost:1337";
const apiService = new APIService();

//---moment
import moment from "moment";
Vue.prototype.moment = moment;
moment.locale("es");

Vue.config.productionTip = false;
export default {
  data() {
    return {
      mostrar: true,
      fin: "",
      messageWhenNoItems: "No hay datos de seguimiento",
      dataTimeline: []
    };
  },
  methods: {
    llenarLinea() {
      apiService
        .getLinea(this.$store.state.counter.id)
        .then(data => {
          console.log(data.success);
          if (data.success == false) {
            console.log("no hay elementoss");
          } else {
            data.data.forEach(element => {
              this.dataTimeline.push({
                from: new Date(
                  moment(element.fecha).year(),
                  moment(element.fecha).month()
                ),
                title:
                  element.titulo +
                  ". " +
                  "<br>" +
                  moment.utc(element.fecha).format("YYYY-MM-DD") +
                  " a las " +
                  element.hora,
                description: element.descripcion
              });
            });
          }
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

    verContrato(finalidad) {
      console.log("entra ver contrato");
      this.mostrar = false;
      this.fin = finalidad;
    }
  },
  mounted() {
    console.log("this.$store.state.counter.id");
    console.log(this.$store.state.counter.id);
    this.llenarLinea();
  },

  components: {
    Timeline,
    cc
  }
};
</script>