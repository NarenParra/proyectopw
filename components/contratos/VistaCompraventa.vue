  <template lang="">
    <div>
      <b-card>
         <b-button variant="outline-success" class="float-left" @click="$store.commit('cambio',true)" >《 Volver</b-button>
      </b-card>
      <b-card>
         <div class="text-justify" id="imprimir">
            <h1 class="text-center">Contrato de Compraventa</h1>
            <br>
            <p class="d-inline mb-0">
                Entre los suscritos de una parte  <b>{{nombVendedor}}</b> <span class="d-inline mb-0" v-if="selectedVend !='Nit'"> mayor de edad,</span> <span  class="d-inline mb-0" v-if="selectedVend =='Nit'"> Sociedad comercial,</span> con domicilio en esta ciudad e identificado (a) con  <b>{{selectedVend}}</b> número <b>{{docVendedor}}</b> <span v-if="selectedVend !='Nit'"> expedida en </span> <b>{{docExpeVende}}</b> quien para efectos de este contrato se denomina VENDEDOR, y de la otra parte: <b> {{nombComprador}}</b> <span class="d-inline mb-0" v-if="selectedComp !='Nit'"> mayor de edad,</span> <span  class="d-inline mb-0" v-if="selectedComp =='Nit'"> Sociedad comercial,</span>  con domicilio en esta ciudad e identificado (a) con <b>{{selectedComp}}</b> número <b>{{docComprador}}</b> <span v-if="selectedComp !='Nit'"> expedida en </span>  <b>{{docExpeCompra}}</b> quien en adelante se denominará simplemente como COMPRADOR, hacemos constar que de mutuo acuerdo hemos convenido en celebrar un contrato de COMPRAVENTA que se regirá por las normas aplicables a la materia y especialmente por las siguientes cláusulas: 
            </p>
            <p>
                <b>PRIMERA</b> - OBJETO: El VENDEDOR, por medio del presente instrumento transfiere a título de compraventa real y efectiva al COMPRADOR el derecho de dominio y la posesión que tiene y ejerce sobre el siguiente bien:
                    
                <li v-for="(input, index) in articulo">
                  <b>
                  ({{input.cantidad}})&nbsp{{input.articulo}}
                  </b>
                  <br>
                </li>
            </p>
            <p>
              <b>SEGUNDA</b> - PRECIO: Las partes han acordado como precio del bien objeto de la compraventa, la suma de <b>{{dineroS}}</b> PESOS M CTE $ (<b>{{dineroN}}</b>) valor que EL COMPRADOR pagará AL VENDEDOR de la siguiente manera: </b>
            </p>

            <p v-if="descripValor=='En totalidad al momento de firmar el contrato'">
              <b>En totalidad al momento de firmar el contrato</b>
            </p>

            <p v-if="descripValor=='En una fecha determinada posterior'">
              El Comprador se compromete a satisfacer su obligación pecuniaria en un plazo de  <b>{{cantidadPeriodo}}</b> <b>{{unidadPeriodo}}</b>  desde la fecha de firma de este Contrato.
            </p>
            <p v-if="descripValor=='De forma periodica'">
              En este mismo acto, el Comprador hace entrega al Vendedor la cantidad de:<b> {{NumberAsString(cantidadPagada)}} $({{cantidadPagada}}) </b>. Por lo tanto la cantidad aplazada asciende a <b>{{NumberAsString(diferencia)}} $({{diferencia}})</b>, los cuales son pagaderos en  <b>{{cantidadPeriodo}}</b> cuotas <b>{{unidadPeriodo}}</b>  siendo el monto de cada cuota de $ ({{calcularCuota()}}) PESOS, desde la fecha de firma de este Contrato.
                    
            </p>
            <p v-if="descripValor=='De forma periodica'">
              En caso de que el Comprador demore el pago de dos plazos o en el último de estos, el Vendedor podrá optar entre exigir el pago de todos los plazos pendientes de abono o resolver el contrato. En el primer caso, la cantidad debida por el Comprador tendrá la consideración de deuda vencida, liquidada y exigible. En el segundo caso, las Partes deberán restituirse recíprocamente las prestaciones objeto de este contrato.    
            </p>
            <p>
              <b>TERCERA.</b> - OTRAS OBLIGACIONES: EL VENDEDOR hace entrega del bien objeto. Es entendido que será a cargo de EL COMPRADOR cualquier suma que se cause o liquide a partir de esta fecha con relación al citado bien.
            </p>
            <p>
              <b>CUARTA.</b> ENTREGA: EL VENDEDOR con la fecha de la firma de este instrumento hace entrega real y material de los bienes a EL COMPRADOR, y este declara haberlos recibido a satisfacción, en las condiciones y estado en que fueron comprados.
            </p>
                  
            <p>
              <b>QUINTA.</b> ACEPTACIÓN:  En constancia de aceptación se suscribe, una vez leído, en dos copias del mismo tenor y contenido con destino a cada una de las partes, en la ciudad de <b>{{contratoCiudad}}</b>, hoy (<b>{{moment(fechaContrato).format("YYYY-MM-DD")}}</b>).
            </p>
                  
            <br>
            <br>

            <b-row>
              <b-col cols="8">
                <p>firma del Vendedor</P>                   
                <p>______________</p>                       
                <p>cc.</p>  
            </b-col>

            <b-col>
               <p>firma del Comprador</p>
               <p>______________</p>
               <p>cc.</p>
             </b-col>
           </b-row>
                                        
        </div>                                       
        <br>
        <br> 
         <b-row align-h="center">
           <b-col cols="2"><b-button  variant="primary"  class="float-left" @click="downloadPDF()" >Descargar PDF</b-button></b-col>
           <b-col cols="2"><b-button  variant="success" class="float-left" @click=" printDiv()" >Imprimir</b-button></b-col>
           
        </b-row>
         
        <br>
        <br>                      
      </b-card>
    </div>
</template>
<script>
//---moment
import moment from "moment";
Vue.prototype.moment = moment;
moment.locale("es");
import Vue from "vue";

//--apiservice
import { APIService } from "../../middleware/APIService";
const API_URL = "http://localhost:1337";
const apiService = new APIService();

// nuemor a string
import { NumberAsString } from "../../assets/js/NumberAsString";

//jspdf
import jsPDF from "../../node_modules/jspdf/dist/jspdf.debug";

export default {
  data() {
    return {
      articulo: [],
      cantidadArticulo: null,
      NumberAsString,
      idcontrato: null,
      diferencia: 0,
      //datos personales
      nombVendedor: "",
      docVendedor: "",
      docExpeVende: "",
      nombComprador: "",
      docComprador: "",
      docExpeCompra: "",
      selectedComp: null,
      selectedVend: null,
      options: [
        { value: null, text: " -- Seleccione --" },
        { value: "Nit", text: " Nit " },
        { value: "Cedula de Ciudadanía", text: " Cedula de Ciudadanía " },
        { value: "Pasaporte", text: " Pasaporte " },
        { value: "Cédula de extranjería", text: " Cédula de extranjería " }
      ],
      //priemra
      bien: "",
      //segunda
      dineroS: "",
      dineroN: "",
      descripValor: null,
      opt: [
        { value: null, text: " -- Seleccione --" },
        {
          value: "En totalidad al momento de firmar el contrato",
          text: " En totalidad al momento de firmar el contrato"
        },
        {
          value: "En una fecha determinada posterior",
          text: " En una fecha determinada posterior"
        },
        { value: "De forma periodica", text: " De forma periodica" }
      ],

      cantidadPeriodo: "",
      unidadPeriodo: null,
      periodo: [
        { value: null, text: " -- Seleccione --" },
        {
          value: "Días",
          text: " Días "
        },
        {
          value: "Meses",
          text: " Meses "
        },
        { value: "Años", text: " Años " }
      ],

      periodo2: [
        { value: null, text: " -- Seleccione --" },
        {
          value: "Mensuales",
          text: " Mensuales "
        },
        {
          value: "Anuales",
          text: " Anuales "
        }
      ],
      cantidadPagada: "",
      cancelo: false,
      //tercera
      // tradicion: "NADA",
      //sexta
      //  gastos: "NADA",
      contratoCiudad: "",
      fechaContrato: "",

      //--->
      showDismissibleAlert: false,
      finalidad: "Compraventa",
      observaciones: "",
      //--->validations
      salida: 0,
      contSec1: 0,
      contSec2: 0,
      contSec3: 0,
      contSec4: 0,
      contSec5: 0,
      mostraSalida: false,
      mostrar: false,
      tipoContrato: "",
      validar: 1,
      ///usuario log
      usuariolog: "123456789",
      //guardar usuario
      user: {
        naturaleza: "",
        nomb: "",
        ape: "",
        email: "",
        tipo: "",
        doc: "",
        persona: "",
        direccion: "",
        expe: ""
      },

      per: [
        { text: " -- Seleccione --", value: null },
        { value: "Natural", text: "Natural" },
        { value: "Juridica", text: "Juridica" }
      ]
      //
    };
  },

  methods: {
    downloadPDF() {
      var pdf = new jsPDF();

      const contentHtml = document.getElementById("imprimir").innerHTML;
      pdf.fromHTML(contentHtml, 15, 15, {
        width: 170
      });
      pdf.save("Contrato.pdf");
    },
    calcularCuota() {
      return Math.round((this.diferencia / this.cantidadPeriodo) * 100) / 100;
    },
    reload() {
      location.reload();
    },
    printDiv() {
      console.log("entra imprimir");
      var ventana = window.open("", "PRINT", "height=400,width=600");
      ventana.document.write(
        "<html><head><title>" + document.title + "</title>"
      );
      ventana.document.write("</head><body >");
      ventana.document.write(document.getElementById("imprimir").innerHTML);
      ventana.document.write("</body></html>");
      ventana.document.close();
      ventana.focus();
      ventana.print();
      ventana.close();
      return true;
    }
  },
  mounted() {},
  created() {
    if (
      (this.$store.state.counter.id &&
        this.$store.state.counter.estado == "Borrador") ||
      (this.$store.state.counter.id &&
        this.$store.state.counter.estado == "Iniciado")||
      (this.$store.state.counter.id &&
        this.$store.state.counter.estado == "Finalizado")
    ) {
      this.idcontrato = this.$store.state.counter.id;
      this.contratoCiudad = this.$store.state.counter.contratociudad;
      this.fechaContrato = this.$store.state.counter.fechainicia;
      this.cantidadPagada = this.$store.state.counter.pagado;
      // moment(this.$store.state.counter.fechainicia).format("YYYY-MM-DD");
      // lbusca y llena campos de usuario y rol
      apiService.getContratoUsuario(this.$store.state.counter.id).then(data => {
        data.data.forEach(element => {
          if (element.usuario) {
            apiService.getUsuarios(element.usuario).then(data2 => {
              //console.log(data2.data);
              apiService.getRol(element.rol).then(data3 => {
                //  console.log(data3.data[0].slug);

                if (data3.data[0].slug == "comprador") {
                  this.docComprador = data2.data[0].docid;
                  this.nombComprador =
                    data2.data[0].nombre + " " + data2.data[0].apellido;
                  this.selectedComp = data2.data[0].tipodocid;
                  this.docExpeCompra = data2.data[0].expediciondoc;
                }
                if (data3.data[0].slug == "vendedor") {
                  this.docVendedor = data2.data[0].docid;
                  this.nombVendedor =
                    data2.data[0].nombre + " " + data2.data[0].apellido;
                  this.selectedVend = data2.data[0].tipodocid;
                  this.docExpeVende = data2.data[0].expediciondoc;
                }
              });
            });
          }
        });
      });
      // busqueda etiquetas y llenar campos
      apiService
        .getContratoEtiqueta(this.$store.state.counter.id)
        .then(data => {
          data.data.forEach(element => {
            if (element.titulo == "Objeto") {
              apiService
                .getContratoArticulo(this.$store.state.counter.id)
                .then(data2 => {
                  //this.bien = data2.data[0].slug;
                  console.log("data2");
                  console.log(data2);
                  data2.forEach(articulo => {
                    this.articulo.push({
                      articulo: articulo.articulo.slug,
                      cantidad: articulo.cantidad
                    });
                  });
                });
            }
            if (element.titulo == "Precio") {
              //console.log(element);
              this.dineroN = this.$store.state.counter.valor;
              this.descripValor = element.descripcion;
              this.dineroS = element.valorDescripcion;
              this.cantidadPeriodo = element.cantidadPeriodo;
              this.unidadPeriodo = element.unidadPeriodo;
              if (this.$store.state.counter.valor == 0) {
                this.dineroN = "";
              } else {
                this.diferencia =
                  this.$store.state.counter.valor -
                  this.$store.state.counter.pagado;
              }
            }
          });
        });

      //
    }
  },
  components: {
    NumberAsString
  }
};
</script>
<style>
p.error {
  color: #e74c3c;
}

span.error {
  color: #e74c3c;
  display: flex;
}

span.bien {
  color: blue;
}
</style>  