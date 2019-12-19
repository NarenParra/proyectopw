  <template lang="">
    <div>
      <b-card>
         <b-button variant="outline-success" class="float-left" @click="$store.commit('cambio',true)" >《 Volver</b-button>
        <b-button v-if="$store.state.counter.estado == 'Borrador'"  variant="outline-success" class="float-right" @click="onComplete" > Iniciar contrato</b-button> 
        <b-button v-if="$store.state.counter.estado == 'Borrador'" variant="outline-danger" class="float-right" @click="$refs['eliminar-borrador'].show()" >Eliminar Borrador</b-button>
      </b-card>
      <br>
      <b-card>
        <form-wizard
            ref="wizard"
            nextButtonText="Siguiente"
            backButtonText="Atrás"
            finishButtonText="Guardar"
            title="Contrato de Compraventa"
            subtitle="El texto dentro del formulario que aparece en color azul son campos editables "
            @on-complete="onComplete"
            shape="circle"
            color="#0390C3">
            <tab-content ref="primer" :before-change="()=>validateStep($v.sec1)"   title="Identificación de las partes" >
                <b-container class="">
                  <client-only>
                  <div class="text-justify form-inline ">
                   <p class="d-inline mb-0">Entre los suscritos de una parte </p> &nbsp <quick-edit :disabled="docVendedor!=''" style="" id="butto2"  :validator="(vari)=>validateSolo($v.sec1.nombVendedor,vari,$v.sec1,true)"  v-model="nombVendedor"  placeholder="Nombre del Vendedor" emptyText=" Nombre del Vendedor " ><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="nombVendedor==''&& !$v.sec1.nombVendedor.$error " class="bien">Nombre del Vendedor </span><span v-if="$v.sec1.nombVendedor.$error" class="error mb-0" >  "Nombre del Vendedor" </span><b-tooltip v-if="$v.sec1.nombVendedor.$error" show target="butto2"  variant="danger">{{$v.sec1.nombVendedor.err }}</b-tooltip></quick-edit> &nbsp
                   <p class="d-inline mb-0" v-if="selectedVend !='Nit'"> mayor de edad, con domicilio en esta ciudad e identificado (a) con  &nbsp</p> 
                   <p class="d-inline mb-0" v-if="selectedVend =='Nit'"> Sociedad comercial, con domicilio en esta ciudad e identificado (a) con  &nbsp</p> 
                   <quick-edit :disabled="docVendedor!=''" id="selecV" :validator="(vari)=>validateSolo($v.sec1.selectedVend,vari,$v.sec1,true)"v-model="selectedVend" type="select" :options="options" emptyText="Tipo de documento"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="selectedVend==''&& !$v.sec1.selectedVend.$error " class="bien">Tipo de documento </span><span v-if="$v.sec1.selectedVend.$error" class="error" > {{ selectedVend ||"Tipo de documento"}} </span><b-tooltip v-if="$v.sec1.selectedVend.$error" show target="selecV"  variant="danger">{{$v.sec1.selectedVend.err}}</b-tooltip></quick-edit>  &nbsp 
                   <p  class="d-inline mb-0"> número </p> &nbsp  <quick-edit id="docV" :validator="(vari)=>validateSolo($v.sec1.docVendedor,vari,$v.sec1,true)"  v-model="docVendedor" type="number" placeholder="Eje. 1234567899" emptyText="Número de documento"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="docVendedor==''&& !$v.sec1.docVendedor.$error " class="bien">Número de documento </span><span v-if="$v.sec1.docVendedor.$error" class="error" > {{docVendedor||"Número de documento"}} </span><b-tooltip v-if="$v.sec1.docVendedor.$error" show target="docV"  variant="danger">{{$v.sec1.docVendedor.err}}</b-tooltip></quick-edit>   &nbsp  
                   <p class="d-inline mb-0" v-if="selectedVend !='Nit'">expedida en</p> &nbsp <quick-edit :disabled="docVendedor!=''" v-if="selectedVend !='Nit'" id="docEV" :validator="(vari)=>validateSolo($v.sec1.docExpeVende,vari,$v.sec1,true)" v-model="docExpeVende" placeholder="Lugar de expedición del documento" emptyText="Lugar de expedición del documento"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="docExpeVende==''&& !$v.sec1.docExpeVende.$error " class="bien">Lugar de expedición del documento</span><span v-if="$v.sec1.docExpeVende.$error" class="error" > {{docExpeVende||"Lugar de expedición del documento"}} </span><b-tooltip v-if="$v.sec1.docExpeVende.$error  " show target="docEV"  variant="danger">{{$v.sec1.docExpeVende.err || "Error en el campo"}}</b-tooltip></quick-edit>  
                   <p class="d-inline mb-0">quien para efectos de este contrato se denomina VENDEDOR, y de la otra parte:</p>  &nbsp <quick-edit :disabled="docComprador!=''" id="nomC" :validator="(vari)=>validateSolo($v.sec1.nombComprador,vari,$v.sec1,true)"  v-model="nombComprador" placeholder="Nombre del comprador" emptyText="Nombre del comprador"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="nombComprador==''&& !$v.sec1.nombComprador.$error " class="bien">Nombre del comprador </span><p v-if="$v.sec1.nombComprador.$error"  class="error mb-0"> {{nombComprador||"Nombre del comprador"}} </p><b-tooltip v-if="$v.sec1.nombComprador.$error" show target="nomC"  variant="danger"> {{$v.sec1.nombComprador.err}} </b-tooltip></quick-edit>
                   <p class="d-inline mb-0" v-if="selectedComp !='Nit'">mayor de edad, con domicilio en esta ciudad e identificado (a) con &nbsp</p> 
                   <p class="d-inline mb-0" v-if="selectedComp =='Nit'">Sociedad comercial, con domicilio en esta ciudad e identificado (a) con &nbsp</p> 
                    <quick-edit :disabled="docComprador!=''" id="selC"  :validator="(vari)=>validateSolo($v.sec1.selectedComp,vari,$v.sec1,true)" v-model="selectedComp" type="select" :options="options"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="selectedComp==''&& !$v.sec1.selectedComp.$error " class="bien">Tipo de documento </span><span v-if="$v.sec1.selectedComp.$error" class="error" > {{selectedComp||"Tipo de documento"}} </span><b-tooltip v-if="$v.sec1.selectedComp.$error" show target="selC"  variant="danger">{{$v.sec1.selectedComp.err}}</b-tooltip></quick-edit>
                   <p class="d-inline mb-0">número</p> &nbsp <quick-edit id="docC" :validator="(vari)=>validateSolo($v.sec1.docComprador,vari,$v.sec1,true)"  v-model="docComprador" type="number" placeholder="Eje. 1234567899" emptyText="Número de documento"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="docComprador==''&& !$v.sec1.docComprador.$error " class="bien">Número de documento </span><span v-if="$v.sec1.docComprador.$error" class="error" > {{docComprador||"numero de documento"}} </span><b-tooltip v-if="$v.sec1.docComprador.$error" show target="docC"  variant="danger">{{$v.sec1.docComprador.err}}</b-tooltip></quick-edit>  &nbsp 
                   <p class="d-inline mb-0" v-if="selectedComp !='Nit'" >expedida en</p> &nbsp <quick-edit :disabled="docComprador!=''" v-if="selectedComp !='Nit'"  id="docEC" :validator="(vari)=>validateSolo($v.sec1.docExpeCompra,vari,$v.sec1,true)" v-model="docExpeCompra" placeholder="Lugar de expedición del documento" emptyText="Lugar de expedición del documento"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="docExpeCompra==''&& !$v.sec1.docExpeCompra.$error " class="bien">Lugar de expedición del documento</span><span v-if="$v.sec1.docExpeCompra.$error" class="error" >{{docExpeCompra||"Lugar de expedición del documento"}} </span><b-tooltip v-if="$v.sec1.docExpeCompra.$error" show target="docEC"  variant="danger">{{$v.sec1.docExpeCompra.err || "Error en el campo"}}</b-tooltip></quick-edit> 
                   <p class="d-inline mb-0">quien en adelante se denominará simplemente como COMPRADOR, hacemos constar que de mutuo acuerdo hemos convenido en celebrar un contrato de COMPRAVENTA que se regirá por las normas aplicables a la materia y especialmente por las siguientes cláusulas:</p> 
                  </div>
                  <br>                
                  </client-only> 
                </b-container>
              <br />
            </tab-content>
            <tab-content :before-change="()=>validateStep($v.sec2)"  title="Objeto"  >
               <client-only>
                <b-container >
                  <div class="text-justify form-inline ">
                    <b>PRIMERA</b> <p class="mb-0">- OBJETO: El VENDEDOR, por medio del presente instrumento transfiere a título de compraventa real y efectiva al COMPRADOR el derecho de dominio y la posesión que tiene y ejerce sobre el siguiente bien:</p>
                    
                    <quick-edit id="cantart"  v-model="cantidadArticulo" type="number" placeholder="Eje. 89" emptyText="Escriba la cantidad"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="!cantidadArticulo" class="bien">Escriba la cantidad </span><span v-if="cantidadArticulo" class="bien">{{cantidadArticulo}}</span><b-tooltip v-if="$v.sec1.docVendedor.$error" show target="docV"  variant="danger">{{$v.sec1.docVendedor.err}}</b-tooltip></quick-edit>
                    &nbsp
                    <quick-edit  id="bien" :validator="(vari)=>validateSolo($v.sec2.bien,vari,$v.sec2,true)"   v-model="bien" placeholder="Eje. nike" emptyText="Agregar bien"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="articulo.length>0 " class="bien">Agregar bien</span><span v-if="articulo.length<1" class="error" > {{"Agregar bien"}} </span><b-tooltip v-if="articulo.length<1"  show target="bien"  variant="danger">{{ "No hay articulos"}}</b-tooltip></quick-edit>
                    <br>
                    <br>
                    <br>
                  </div>
                  <li v-for="(input, index) in articulo">         
                    <span
                     v-if="input.articulo"
                    style=" padding: 3px 10px;
                     border: RoyalBlue 5px solid;
                      border-radius: 20px;"
                      >
                      ({{input.cantidad}})&nbsp{{input.articulo}}
                      <b-link @click="deleteRow(index)">❌</b-link>
                     </span>   
                    <br>
                    <br>
                  </li>
                  </b-alert>
                </b-container>
                <br>   
                 </client-only>
              <br />
            </tab-content>
            <tab-content :before-change="()=>validateStep($v.sec3)" title="Precio">
               <client-only>
              <div class="form-inline ">
                    <b>SEGUNDA</b></p> <p class="d-inline mb-0">- PRECIO: Las partes han acordado como precio del bien objeto de la compraventa, la suma de</p> &nbsp <b>{{dineroS= NumberAsString(dineroN)}}</b> &nbsp M CTE $ (
                    <quick-edit id="dineroN" :validator="(vari)=>validateSolo($v.sec3.dineroN,vari,$v.sec3,true)" v-model="dineroN" aria-placeholder="Eje. 500000" type="number" emptyText="Escriba un numero"><b-tooltip v-if="$v.sec3.dineroN.$error && $v.sec3.dineroN.$invalid"  show target="dineroN"  variant="danger">{{"Escriba un numero"|| "Error en el campo"}}</b-tooltip><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="$v.sec3.dineroN.$error" class="error" > {{dineroN ||"Escriba un numero"}} </span><span v-if="dineroN==''&& !$v.sec3.dineroN.$error " class="bien"> Escriba un numero</span></quick-edit>) valor que EL COMPRADOR pagará AL VENDEDOR de la siguiente manera: &nbsp
                    <quick-edit id="fPago" :validator="(vari)=>validateSolo($v.sec3.descripValor,vari,$v.sec3,true)" v-model="descripValor" type="select" :options="opt" emptyText="Periodicidad"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="$v.sec3.descripValor.$error" class="error" > {{descripValor ||"Periodicidad"}} </span><span v-if="descripValor==''&& !$v.sec3.descripValor.$error " class="bien"> Periodicidad </span><b-tooltip v-if="$v.sec3.descripValor.$error && $v.sec3.descripValor.$invalid"  show target="fPago"  variant="danger">{{$v.sec3.descripValor.err || "Error en el campo"}}</b-tooltip></quick-edit>
                    
                    
                     <div class="form-inline " v-if="descripValor=='En una fecha determinada posterior'">
                      <p class="d-inline mb-0"> El Comprador se compromete a satisfacer su obligacion pecuniaria en un plazo de </p> &nbsp 
                      
                      <quick-edit id="cantidadPeriodo" :validator="(vari)=>validateSolo($v.cantidadPeriodo,vari,$v.sec3,true)" v-model="cantidadPeriodo" aria-placeholder="Eje. 500000" type="number" emptyText="Escriba un numero"><b-tooltip v-if="$v.cantidadPeriodo.$error && $v.cantidadPeriodo.$invalid"  show target="cantidadPeriodo"  variant="danger">{{"Escriba un numero"|| "Error en el campo"}}</b-tooltip><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="$v.cantidadPeriodo.$error" class="error" > {{cantidadPeriodo ||"Escriba un numero"}} </span><span v-if="cantidadPeriodo==''&& !$v.cantidadPeriodo.$error " class="bien"> Escriba un numero</span></quick-edit>  &nbsp  &nbsp 
                      
                      <quick-edit id="unidadperiodo" :validator="(vari)=>validateSolo($v.unidadPeriodo,vari,$v.sec3,true)" v-model="unidadPeriodo" type="select" :options="periodo" emptyText="Periodicidad"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="$v.unidadPeriodo.$error" class="error" > {{unidadPeriodo ||"Periodicidad"}} </span><span v-if="unidadPeriodo==''&& !$v.unidadPeriodo.$error " class="bien"> Periodicidad </span><b-tooltip v-if="$v.unidadPeriodo.$error && $v.unidadPeriodo.$invalid"  show target="unidadperiodo"  variant="danger">{{$v.unidadPeriodo.err || "Error en el campo"}}</b-tooltip></quick-edit> <p class="d-inline mb-0"> desde la fecha de firma de este Contrato.</p>
                    </div>
                    <div class="form-inline " v-if="descripValor=='De forma periodica'">
                      <p class="d-inline mb-0"> En este mismo acto, el Comprador hace entrega al Vendedor la cantidad de: &nbsp </p>

                      <quick-edit id="cantidadPagada" :validator="(vari)=>validateSolo($v.cantidadPagada,vari,$v.sec3,true)" v-model="cantidadPagada" aria-placeholder="Eje. 500000" type="number" emptyText="Escriba un numero"><b-tooltip v-if="$v.cantidadPagada.$error && $v.cantidadPagada.$invalid"  show target="cantidadPagada"  variant="danger">{{"Escriba un numero"|| "Error en el campo"}}</b-tooltip><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="$v.cantidadPagada.$error" class="error" > {{cantidadPagada ||"Escriba un numero"}} </span><span v-if="cantidadPagada==''&& !$v.cantidadPagada.$error " class="bien"> Escriba un numero</span></quick-edit>
                      &nbsp 
                      <p class="d-inline mb-0"> PESOS M CTE &nbsp</p>
                      <p class="d-inline mb-0">Por lo tanto la cantidad aplazada asciende a  {{NumberAsString(diferencia)}} &nbsp $(<b>{{diferencia}}</b>)  &nbsp<p>
                      <p class="d-inline mb-0">los cuales son pagaderos en &nbsp</p> 
                       <quick-edit id="cantidadPeriodo" :validator="(vari)=>validateSolo($v.cantidadPeriodo,vari,$v.sec3,true)" v-model="cantidadPeriodo" aria-placeholder="Eje. 5" type="number" emptyText="Escriba un numero"><b-tooltip v-if="$v.cantidadPeriodo.$error && $v.cantidadPeriodo.$invalid"  show target="cantidadPeriodo"  variant="danger">{{"Escriba un numero"|| "Error en el campo"}}</b-tooltip><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="$v.cantidadPeriodo.$error" class="error" > {{cantidadPeriodo ||"Escriba un numero"}} </span><span v-if="cantidadPeriodo==''&& !$v.cantidadPeriodo.$error " class="bien"> Escriba un numero</span></quick-edit>
                      &nbsp cuotas &nbsp 
                      <quick-edit id="unidadperiodo" :validator="(vari)=>validateSolo($v.unidadPeriodo,vari,$v,true)" v-model="unidadPeriodo" type="select" :options="periodo2" emptyText="Periodicidad"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="$v.unidadPeriodo.$error" class="error" > {{unidadPeriodo ||"Periodicidad"}} </span><span v-if="unidadPeriodo==''&& !$v.unidadPeriodo.$error " class="bien"> Periodicidad </span><b-tooltip v-if="$v.unidadPeriodo.$error && $v.unidadPeriodo.$invalid"  show target="unidadperiodo"  variant="danger">{{$v.unidadPeriodo.err || "Error en el campo"}}</b-tooltip></quick-edit>
                      <p class="d-inline mb-0"> siendo el monto de cada cuota de $ ({{calcularCuota()}}) PESOS, desde la fecha de firma de este Contrato.</p>
                    </div> 
                    <br>
              </div>
              <br>
            </client-only>
            </tab-content>
            <tab-content  :before-change="()=>validateStep($v.sec5)" title="Aceptación">
               <client-only>
                <b-container>
                  <br />
                  <div class="form-inline text-justify">
                    <b>QUINTA.</b> <p class="d-inline mb-0">ACEPTACIÓN: En constancia de aceptación se suscribe, una vez leído, en dos copias del mismo tenor y contenido con destino a cada una de las partes, en la ciudad de</p> <quick-edit id="lugarC" :validator="(vari)=>validateSolo($v.sec5.contratoCiudad,vari,$v.sec5,true)"  v-model="contratoCiudad" placeholder emptyText="Lugar de celebración del contrato"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="$v.sec5.contratoCiudad.$error" class="error" > {{contratoCiudad ||"Lugar de celebración del contrato"}} </span><span v-if="contratoCiudad==''&& !$v.sec5.contratoCiudad.$error " class="bien"> Lugar de celebración del contrato </span><b-tooltip v-if="$v.sec5.contratoCiudad.$error && $v.sec5.contratoCiudad.$invalid"  show target="lugarC"  variant="danger">{{$v.sec5.contratoCiudad.err || "Error en el campo"}}</b-tooltip></quick-edit>, <p class="d-inline mb-0">hoy (</p>
                    <quick-edit id="fechaC"  :validator="(vari)=>validateSolo($v.sec5.fechaContrato,vari,$v.sec5,true)"  v-model="fechaContrato" type="date" placeholder emptyText="Fecha  de celebración del contrato"><span slot="button-ok">✔</span><span slot="button-cancel">❌</span><span v-if="$v.sec5.fechaContrato.$error" class="error" > {{fechaContrato ||"Fecha de celebración del contrato"}} </span><span v-if="fechaContrato==''&& !$v.sec5.fechaContrato.$error " class="bien"> Fecha de celebración del contrato" </span><b-tooltip v-if="$v.sec5.fechaContrato.$error && $v.sec5.fechaContrato.$invalid"  show target="fechaC"  variant="danger">{{$v.sec5.fechaContrato.err || "Error en el campo"}}</b-tooltip></quick-edit>).
                  </div>
                </b-container>
                <br>
                </client-only>
              </tab-content >
              <tab-content  title="Vista completa">
                <client-only>
                <div class="text-justify" id="imprimir">
                  <h1 class="text-center">Contrato de Compraventa</h1>
                  <br>
                  <p  class="d-inline mb-0">
                    Entre los suscritos de una parte  <b>{{nombVendedor}}</b> <p  class="d-inline mb-0" v-if="selectedVend !='Nit'"> mayor de edad,</p> <p  class="d-inline mb-0" v-if="selectedVend =='Nit'"> Sociedad comercial,</p> con domicilio en esta ciudad e identificado (a) con  <b>{{selectedVend}}</b> número <b>{{docVendedor}}</b>  <p  class="d-inline mb-0" v-if="selectedVend !='Nit'"> expedida en </p> <b>{{docExpeVende}}</b> quien para efectos de este contrato se denomina VENDEDOR, y de la otra parte: <b>{{nombComprador}}</b> <p  class="d-inline mb-0" v-if="selectedComp !='Nit'"> mayor de edad,</p> <p  class="d-inline mb-0" v-if="selectedComp =='Nit'"> Sociedad comercial,</p>  con domicilio en esta ciudad e identificado (a) con <b>{{selectedComp}}</b> número <b>{{docComprador}}</b> <p  class="d-inline mb-0" v-if="selectedComp !='Nit'"> expedida en </p> <b>{{docExpeCompra}}</b> quien en adelante se denominará simplemente como COMPRADOR, hacemos constar que de mutuo acuerdo hemos convenido en celebrar un contrato de COMPRAVENTA que se regirá por las normas aplicables a la materia y especialmente por las siguientes cláusulas: 
                  </p>
                  <p>
                    <b>PRIMERA</b> - OBJETO: El VENDEDOR, por medio del presente instrumento
                    transfiere a título de compraventa real y efectiva al COMPRADOR el derecho de
                    dominio y la posesión que tiene y ejerce sobre el siguiente bien:
                    
                      <li v-for="(input, index) in articulo">
                        <b>
                        ({{input.cantidad}})&nbsp{{input.articulo}}
                        </b>
                        <br>
                      </li>
                  </p>

                  <p v-if="descripValor=='En totalidad al momento de firmar el contrato'">
                    <b>En totalidad al momento de firmar el contrato</b>
                  </p>

                  <p>
                    <b>SEGUNDA</b> - PRECIO: Las partes han acordado como precio del bien objeto de la compraventa, la suma de <b>{{dineroS}}</b> PESOS M CTE $ (<b>{{dineroN}}</b>) valor que EL COMPRADOR pagará AL VENDEDOR de la siguiente manera: </b>
                  </p>

                  <p v-if="descripValor=='En una fecha determinada posterior'">
                    El Comprador se compromete a satisfacer su obligacion pecuniaria en un plazo de  <b>{{cantidadPeriodo}}</b> <b>{{unidadPeriodo}}</b>  desde la fecha de firma de este Contrato.
                  </p>
                  <p v-if="descripValor=='De forma periodica'">
                    En este mismo acto, el Comprador hace entrega al Vendedor la cantidad de:<b> {{NumberAsString(cantidadPagada)}} $({{cantidadPagada}}) </b>. Por lo tanto la cantidad aplazada asciende a <b>{{NumberAsString(diferencia)}} $({{diferencia}})</b>, los cuales son pagaderos en  <b>{{cantidadPeriodo}}</b> cuotas <b>{{unidadPeriodo}}</b>  siendo el monto de cada cuota de $ ({{calcularCuota()}}) PESOS, desde la fecha de firma de este Contrato.
                    
                  </p>
                  <p v-if="descripValor=='De forma periodica'">
                    En caso de que el Comprador demore el pago de dos plazos o en el último de estos, el Vendedor podrá optar entre exigir el pago de todos los plazos pendientes de abono o resolver el contrato. En el primer caso, la cantidad debida por el Comprador tendrá la consideración de deuda vencida, liquidada y exigible. En el segundo caso, las Partes deberán restituirse recíprocamente las prestaciones objeto de este contrato.    
                  </p>
                  <p>
                    <b>TERCERA.</b> - OTRAS OBLIGACIONES: EL VENDEDOR hace entrega del bien objeto. Es
                    entendido que será a cargo de EL COMPRADOR cualquier suma que se cause o liquide a partir de esta fecha con relación al citado bien.
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
              </client-only>                
            </tab-content >
<!-- Bloque de alertas -->
            <div v-if="mostrar && $v.$anyError">
              <b-card
                border-variant="danger"
                header="Error"
                header-border-variant="danger"
                header-text-variant="danger"
                align="left">
              <template v-slot:header>
               <b-row>
               <b-col cols="11">
                  <header>Error en el contrato</header>
                  </b-col>
                  <b-col cols="1">
                  <a @click="mostrar=false" href="#" class="card-link" style="right">❌</a>
                </b-col>
                </b-row>
              </template>

              <b-card-text>
                <div v-if="$v.sec1.$anyError">
                  <b>Seccion 1: identificación de las partes</b>
                   <p> tiene {{contSec1}} campos con errores
                 <a  href="#" @click="$refs.wizard.activateTab(0)">revisar seccion >></a></p>
                </div>  
               
                <div v-if="articulo.length == 0" >
                  <b>Seccion 2: Objeto</b>
                  <p > No hay articulos agreagados al contrato
                  <a  href="#" @click="$refs.wizard.activateTab(1)">revisar seccion >></a></p>
                </div>    
                
                <div v-if="$v.sec3.$anyError" >
                  <b>Seccion 3: </b>
                  <p> tiene {{contSec3}} campos con errores
                  <a  href="#" @click="$refs.wizard.activateTab(2)">revisar seccion >></a></p>
                </div>

                <div v-if="$v.sec5.$anyError" >
                  <b>Seccion 4: </b>
                  <p> tiene {{contSec5}} campos con errores
                  <a  href="#" @click="$refs.wizard.activateTab(3)">revisar seccion >></a></p>
                </div>
              </b-card-text>
            </b-card>
          </div>
        </form-wizard>   
      </b-card>
   <div>
     <!-- Guardar como contrato borrador  -->
    <b-modal ref="my-modal"  hide-footer title="Guardar Borrador">
      <div class="d-block text-center">
        <h3>Hay Errores en el fomulario, eche un vistazo a los Errores!</h3>
      </div>
      <b-button class="mt-3" variant="outline-warning" block @click="$refs['my-modal'].hide()">Seguir Editando</b-button>
      <b-button class="mt-2" variant="outline-success" block @click="gurardarContrato">Guardar como Borrador y Salir</b-button>
    </b-modal>
  </div>
<!-- Actualizar borrador -->
  <div>
    <b-modal ref="my-modal-borrador"  hide-footer title="Actualizar Borrador">
      <div class="d-block text-center">
        <h3>Hay Errores en el fomulario, eche un vistazo a los Errores!</h3>
      </div>
      <b-button class="mt-3" variant="outline-warning" block @click="$refs['my-modal-borrador'].hide()">Seguir Editando</b-button>
      <b-button class="mt-2" variant="outline-success" block @click="updateContrato">Actualizar Borrador y Salir</b-button>
    </b-modal>
  </div>
<!-- Por si se quiere modificar contrato iniciado -->
  <div>
    <b-modal ref="no-edit"  hide-footer title="">
      <div class="d-block text-center">
        <h3>No es posible modificar contratos con estado Iniciado!</h3>
      </div>
      <b-button class="mt-3" variant="outline-warning" block @click="$refs['no-edit'].hide()">Seguir viendo</b-button>
      <b-button class="mt-2" variant="outline-success" block @click="reload()">Salir</b-button>
    </b-modal>
  </div>
  <!-- Registrar contrato iniciado -->
  <div>
    <b-modal ref="allfine"  hide-footer title="Registrar Contrato">
      <div class="d-block text-center">
        <h3> Está seguro de que desea registrado como contrato iniciado ?</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="$refs['allfine'].hide()">Cancelar</b-button>
      <b-button class="mt-2" variant="outline-success" block @click="gurardarContrato">Registrar</b-button>
    </b-modal>
  </div>
<!-- Guardar borrador como iniciado -->
  <div>
    <b-modal ref="allfine-borrador"  hide-footer title="Registrar Contrato">
      <div class="d-block text-center">
        <h3> Está seguro de que desea registrado como contrato iniciado ?</h3>
      </div>
      <b-button class="mt-2" variant="outline-success" block @click="gurardarContrato">Registrar como Iniciado</b-button>
      <b-button class="mt-2" variant="outline-secondary" block @click="updateContrato">Actualizar Borrador</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="$refs['allfine-borrador'].hide()">Cancelar</b-button>
    </b-modal>
  </div>
<!-- Eliminar contrato borrador -->
  <div>
    <b-modal ref="eliminar-borrador"  hide-footer title="Registrar Contrato">
      <div class="d-block text-center">
        <h3> Está seguro de que desea Eliminar este contrato ?</h3>
      </div>
      <b-button class="mt-3" variant="outline-warning" block @click="$refs['eliminar-borrador'].hide()">Cancelar</b-button>
      <b-button class="mt-2" variant="outline-success" block @click="eliminarBorrador">Eliminar</b-button>
    </b-modal>
  </div>
  <!-- Registrar usuario  -->
  <div v-if="this.$store.state.counter.estado== 'Borrador' || this.$store.state.counter.estado== 'Base' " >
    <b-modal ref="usuario"  hide-footer title="Registro de Persona">
      <div>
  <h3 class="text-center"> La persona no existe. </h3>
        <h3 class="text-center">Desea Registrarla?</h3>
        <b-form  @submit="onSubmit">
        <b-form-group id="nombre" label="Nombres:" >
          <b-form-input
            v-model="user.nomb" 
            required
            placeholder="ingrese el nombre"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="apellido" label="Apellidos:" >
          <b-form-input
            v-model="user.ape"
            placeholder="Ingrese el apellido"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="doc" label="Tipo de Documento:">
          <b-form-select
          id="input-3"
          v-model="user.tipo"
          :options="options"
          required
        ></b-form-select>
        </b-form-group>

        <b-form-group id="doc" label="Documento:">
          <b-form-input v-model="user.doc" type="number" required placeholder="Ingrese el documento" ></b-form-input>
        </b-form-group>

        <b-form-group v-if="user.tipo !='Nit'" id="doc" label="Lugar de expedición del documento:">
          <b-form-input v-model="user.expe" required placeholder="Ingrese el lugar de expedición " ></b-form-input>
        </b-form-group>


        <b-form-group id="persona" label="Tipo persona:">
          <b-form-select
          id="pers"
          v-model="user.persona"
          :options="per"
          required
        ></b-form-select>
        </b-form-group>

        <b-form-group id="email" label="Email:">
          <b-form-input v-model="user.email" type="email"  required placeholder="Enter email" ></b-form-input>
        </b-form-group>

        <b-form-group id="direc" label="Direccion:" >
          <b-form-input
            v-model="user.direccion" required
            placeholder="Ingrese la direccion"
          ></b-form-input>
        </b-form-group>
        <b-button class="mt-3" variant="outline-danger" block  @click="$refs['usuario'].hide()">Cancelar</b-button>
        <b-button class="mt-2" variant="outline-success" block type="submit">Guardar</b-button>
      </b-form>    
      </div>
    </b-modal>
    
  </div>

</div>
</template>
<script>
//--FormWizard
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";

//--QuickEdit
import QuickEdit from "vue-quick-edit";
Vue.component("quick-edit", QuickEdit);
import { mapMutations } from "vuex";

//---validaciones
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  between,
  email,
  alpha,
  numeric,
  sameAs,
  minValue
} from "vuelidate/lib/validators";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

//---moment
import moment from "moment";
Vue.prototype.moment = moment;
moment.locale("es");

//--apiservice
import { APIService } from "../../middleware/APIService";
const API_URL = "http://localhost:1337";
const apiService = new APIService();

// nuemor a string
import { NumberAsString } from "../../assets/js/NumberAsString";

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
  // de Vuelidate
  validations() {
    //para  el tipo de pago "En totalidad al momento de firmar el contrato"
    if (this.validar == 1) {
      return {
        nombVendedor: {
          required,
          nombre(nombVendedor) {
            return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]+[\s]*)+$/.test(nombVendedor); //checks for special char
          },
          minLength: minLength(3)
        },
        docVendedor: {
          required,
          numeric,
          minLength: minLength(4)
        },
        docExpeVende: {
          minLength: minLength(4)
        },
        nombComprador: {
          required,
          nombre(nombComprador) {
            return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]+[\s]*)+$/.test(nombComprador); //checks for special char
          },
          minLength: minLength(3)
        },
        docComprador: {
          required,
          numeric,
          minLength: minLength(4)
        },
        docExpeCompra: {
          minLength: minLength(3)
        },
        selectedComp: {
          required
        },
        selectedVend: {
          required
        },
        bien: {
          minLength: minLength(2)
        },
        articulo: {
          required
        },
        dineroS: {
          required,
          minLength: minLength(1)
        },
        dineroN: {
          required,
          numeric,
          minLength: minLength(2)
        },
        descripValor: {
          required,
          minLength: minLength(2)
        },
        unidadPeriodo: {},
        cantidadPeriodo: {},

        cantidadPagada: {},
        //tercera
        // tradicion: {
        //   required
        // },
        //sexta
        // gastos: {
        //   required,
        //   minLength: minLength(3)
        // },

        contratoCiudad: {
          required,
          minLength: minLength(3),
          nombre(contratoCiudad) {
            return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]+[\s]*)+$/.test(contratoCiudad); //checks for special char
          }
        },
        fechaContrato: {
          required,
          minLength: minLength(3)
          // validacion fecha min value
          // minValue: value => value >= moment(new Date()).format("YYYY-MM-DD")
          //
        },

        sec1: [
          "nombVendedor",
          "selectedVend",
          "docVendedor",
          "docExpeVende",
          "nombComprador",
          "selectedComp",
          "docComprador",
          "docExpeCompra"
        ],
        sec2: ["bien"],
        //sec3: ["dineroS", "dineroN", "descripValor"],
        sec3: ["dineroS", "dineroN", "descripValor","unidadPeriodo","cantidadPeriodo","cantidadPagada"],
        //sec4: ["tradicion"],
        sec5: ["contratoCiudad", "fechaContrato"]
      };
      //para  el tipo de pago "En una fecha determinada posterior"
    } else if (this.validar == 2) {
      return {
        nombVendedor: {
          required,
          nombre(nombVendedor) {
            return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]+[\s]*)+$/.test(nombVendedor); //checks for special char
          },
          minLength: minLength(3)
        },
        docVendedor: {
          required,
          numeric,
          minLength: minLength(4)
        },
        docExpeVende: {
          minLength: minLength(4)
        },
        nombComprador: {
          required,
          nombre(nombComprador) {
            return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]+[\s]*)+$/.test(nombComprador); //checks for special char
          },
          minLength: minLength(3)
        },
        docComprador: {
          required,
          numeric,
          minLength: minLength(4)
        },
        docExpeCompra: {
          minLength: minLength(3)
        },
        selectedComp: {
          required
        },
        selectedVend: {
          required
        },
        bien: {
          minLength: minLength(2)
        },
        articulo: {
          required
        },
        dineroS: {
          required,
          minLength: minLength(1)
        },
        dineroN: {
          required,
          numeric,
          minLength: minLength(2)
        },
        descripValor: {
          required,
          minLength: minLength(2)
        },
        //tercera
        // tradicion: {
        //   required
        // },
        //sexta
        // gastos: {
        //   required,
        //   minLength: minLength(3)
        // },
        unidadPeriodo: {
          required,
        },
        cantidadPeriodo: {
          required,
          numeric,
          minValue: minValue(1)
        },
        cantidadPagada: {},
        contratoCiudad: {
          required,
          minLength: minLength(3),
          nombre(contratoCiudad) {
            return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]+[\s]*)+$/.test(contratoCiudad); //checks for special char
          }
        },
        fechaContrato: {
          required,
          minLength: minLength(3)
          // validacion fecha min value
          // minValue: value => value >= moment(new Date()).format("YYYY-MM-DD")
          //
        },

        sec1: [
          "nombVendedor",
          "selectedVend",
          "docVendedor",
          "docExpeVende",
          "nombComprador",
          "selectedComp",
          "docComprador",
          "docExpeCompra"
        ],
        sec2: ["bien"],
        //sec3: ["dineroS", "dineroN", "descripValor"],
        sec3: ["dineroS", "dineroN", "descripValor","unidadPeriodo","cantidadPeriodo","cantidadPagada"],
        //sec4: ["tradicion"],
        sec5: ["contratoCiudad", "fechaContrato"]
      };
      //para  el tipo de pago "De forma periodica"
    } else if (this.validar == 3) {
      return {
        nombVendedor: {
          required,
          nombre(nombVendedor) {
            return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]+[\s]*)+$/.test(nombVendedor); //checks for special char
          },
          minLength: minLength(3)
        },
        docVendedor: {
          required,
          numeric,
          minLength: minLength(4)
        },
        docExpeVende: {
          minLength: minLength(4)
        },
        nombComprador: {
          required,
          nombre(nombComprador) {
            return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]+[\s]*)+$/.test(nombComprador); //checks for special char
          },
          minLength: minLength(3)
        },
        docComprador: {
          required,
          numeric,
          minLength: minLength(4)
        },
        docExpeCompra: {
          minLength: minLength(3)
        },
        selectedComp: {
          required
        },
        selectedVend: {
          required
        },
        bien: {
          minLength: minLength(2)
        },
        articulo: {
          required
        },
        dineroS: {
          required,
          minLength: minLength(1)
        },
        dineroN: {
          required,
          numeric,
          minLength: minLength(2)
        },
        descripValor: {
          required,
          minLength: minLength(2)
        },
        //tercera
        // tradicion: {
        //   required
        // },
        //sexta
        // gastos: {
        //   required,
        //   minLength: minLength(3)
        // },
        unidadPeriodo: {
          required
        },
        cantidadPeriodo: {
          required,
          numeric,
          minValue: minValue(1)
        },

        cantidadPagada: {
          required,
          numeric,
          minLength: minLength(3)
        },
        contratoCiudad: {
          required,
          minLength: minLength(3),
          nombre(contratoCiudad) {
            return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]+[\s]*)+$/.test(contratoCiudad); //checks for special char
          }
        },
        fechaContrato: {
          required,
          minLength: minLength(3)
          // validacion fecha min value
          // minValue: value => value >= moment(new Date()).format("YYYY-MM-DD")
          //
        },

        sec1: [
          "nombVendedor",
          "selectedVend",
          "docVendedor",
          "docExpeVende",
          "nombComprador",
          "selectedComp",
          "docComprador",
          "docExpeCompra"
        ],
        sec2: ["bien"],
        //sec3: ["dineroS", "dineroN", "descripValor"],
        sec3: ["dineroS", "dineroN", "descripValor","unidadPeriodo","cantidadPeriodo","cantidadPagada"],
        //sec4: ["tradicion"],
        sec5: ["contratoCiudad", "fechaContrato"]
      };
    }
  },
  methods: {
    //eliminar articulos del array
    deleteRow(index) {
      this.articulo.splice(index, 1);
    },
    //submit del modal registrar usuario
    onSubmit(evt) {
      evt.preventDefault();
      console.log(evt.preventDefault());
      this.guardarUsuario(this.user.doc, this.user.nomb, this.user.tipo);
    },
    //Alertes
    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: `Alerta`,
        variant: variant,
        solid: true
      });
    },

    //cuando completa el fomulario (boton finalizar ultimo step)
    onComplete: function() {
      //toca las secciones para saber si tienen errores 
      this.$v.sec1.$touch();
      this.$v.sec2.$touch();
      this.$v.sec3.$touch();
      this.$v.sec5.$touch();
      //
      if (this.articulo.length > 0) {
        this.finalidad = "Compraventa";
        this.observaciones =
          "Contrato realizado entre " +
          this.nombVendedor +
          " y " +
          this.nombComprador +
          " con objeo de compra " +
          this.articulo[0].articulo +
          "...";
      } else {
        this.finalidad = "Compraventa";
        this.observaciones =
          "Contrato realizado entre " +
          this.nombVendedor +
          " y " +
          this.nombComprador +
          " con objeo de compra " +
          "...";
      }

      if (this.idcontrato && this.$store.state.counter.estado == "Iniciado") {
        this.$refs["no-edit"].show();
      } else if (
        this.idcontrato &&
        this.$store.state.counter.estado == "Borrador"
      ) {
        if (this.$v.$anyError) {
          if (!this.dineroN) {
            this.dineroN = 0;
          }
          this.tipoContrato = "borrador";
          this.$refs["my-modal-borrador"].show();
          this.mostrar = true;
        } else {
          console.log("entra update bien todo");
          this.tipoContrato = "borrador";
          this.$refs["allfine-borrador"].show();
        }
      } else {
        if (this.$v.$anyError) {
          this.tipoContrato = "borrador";
          if (!this.dineroN) {
            this.dineroN = 0;
          }
          if (!this.cantidadPeriodo) {
            this.cantidadPeriodo = 0;
          }
          if (!this.cantidadPagada) {
            this.cantidadPagada = 0;
          }
          console.log("dinero");
          console.log(this.dineroN);

          this.mostraSalida = true;
          this.mostrar = true;
          this.$refs["my-modal"].show();
        } else {
          this.tipoContrato = "iniciado";
          this.$refs["allfine"].show();

          /*  envia datos al state 
        this.addt({
          nombrevend: this.nombVendedor,
          docvend: this.docVendedor,
          fecha: this.fechaContrato
          
        });*/
        }
      }
    },
    ...mapMutations({
      addt: "datos/add"
    }),
    //Calcula cuotas
    calcularCuota() {
      return Math.round((this.diferencia / this.cantidadPeriodo) * 100) / 100;
    },
    //validador por secciones
    validateStep(name) {

      for (let index = 0; index < Object.keys(name).length - 8; index++) {
        this.validateSolo(
          this.$v[Object.keys(name)[index]],
          Object.values(name)[index].$model,
          name,
          false
        );
      }
      return true;
    },
    // validador para cada campo
    validateSolo(name, vari, sec, mtoast) {
    
      //consuta los articulos
      if (name == this.$v.sec2.bien && vari.length > 2) {
        console.log(vari);
        apiService.getArticulo(vari).then(articulo => {
          if (articulo.success) {
            if (!this.cantidadArticulo || this.cantidadArticulo == 0) {
              this.cantidadArticulo = 1;
            }
            this.articulo.push({
              articulo: articulo.data.slug,
              cantidad: this.cantidadArticulo
            });
            this.bien = "";
            this.cantidadArticulo = "";
          } else {
            this.makeToast("danger", "El articulo no existe");
            this.$refs["articulo"].show();
            this.bien = "";
            this.cantidadArticulo = "";
          }
          console.log(articulo);
        });
      }
      //consulta el vendedor
      if (name == this.$v.sec1.docVendedor && vari.length > 3) {
        apiService.getUsuario(vari).then(usuario => {
          if (usuario.success) {
            this.nombVendedor =
              usuario.data.nombre + " " + usuario.data.apellido;
            this.selectedVend = usuario.data.tipodocid;
            this.docExpeVende = usuario.data.expediciondoc;
          } else {
            this.user.naturaleza = "vendedor";
            this.user.doc = this.docVendedor;
            this.user.nomb = this.nombVendedor;
            this.user.tipo = this.selectedVend;
            this.makeToast("danger", "El usuario no existe");
            this.$refs["usuario"].show();
          }
        });
      }
      // consulta comprador
      if (name == this.$v.sec1.docComprador && vari.length > 3) {
        console.log(vari);
        apiService.getUsuario(vari).then(usuario => {
          if (usuario.success) {
            this.nombComprador =
              usuario.data.nombre + " " + usuario.data.apellido;
            this.selectedComp = usuario.data.tipodocid;
            this.docExpeCompra = usuario.data.expediciondoc;
          } else {
            this.user.naturaleza = "comprador";
            this.user.doc = this.docComprador;
            this.user.nomb = this.nombComprador;
            this.user.tipo = this.selectedComp;
            this.makeToast("danger", "El usuario no existe");
            this.$refs["usuario"].show();
          }
          console.log(usuario);
        });
      }
      // dependiendo los tipos de pago se manejan las validaciones
      if (
        name == this.$v.sec3.descripValor &&
        vari == "En totalidad al momento de firmar el contrato"
      ) {
        this.validar = 1;
        //this.cantidadPagada = this.dineroN;
        this.cantidadPeriodo = "";
        this.unidadPeriodo = null;
      } else if (
        name == this.$v.sec3.descripValor &&
        vari == "En una fecha determinada posterior"
      ) {
        this.validar = 2;
        this.cancelo = false;
        if(this.unidadPeriodo == "Mensuales" || this.unidadPeriodo ==  "Anuales"){
          this.unidadPeriodo=null
        }
      } else if (
        name == this.$v.sec3.descripValor &&
        vari == "De forma periodica"
      ) {
        this.validar = 3;
        this.cancelo = false;
        console.log("this.unidadPeriodo")
        console.log(this.unidadPeriodo)
        if(this.unidadPeriodo == "Días" || this.unidadPeriodo ==  "Meses" || this.unidadPeriodo ==  "Años"){
          this.unidadPeriodo=null
        }
      }       
      //calcula la diferencia entre el valor del contrato y la cantidad pagada
      if (name == this.$v.cantidadPagada && vari.length > 0) {
        this.diferencia = this.dineroN - vari;
      } else if (name == this.$v.sec3.dineroN && vari.length > 0) {
        console.log(vari);
        console.log(this.cantidadPagada);
        this.diferencia = vari - this.cantidadPagada;
      }

      //validacion de los campos uno por uno
      name.$model = vari;
      name.$touch();
      var isValid = name.$invalid;
      if (isValid && mtoast) {
        this.makeToast("danger", "Error en el campo");
      }
      this.handlerError(name);
      this.contadorErrores(sec);
      return false;
    },
    //manejador de errores
    handlerError(name) {
      switch (name.$anyError) {
        case !name.required:
          name.err = "¡Este campo es obligatorio!";
          break;
        case name.nombre == false:
          name.err =
            "Error, el campo no puede contener números o caracteres especiales";
          break;
        case name.minValue == false:
          name.err = "¡La fecha debe ser Superior o igual a la Actual!";
          break;
        case name.minLength == false:
          name.err = "¡La longitud del texto es demasiado pequeña!";
          break;
        case name.numeric == false:
          name.err = "¡Error no es un numero";
          break;
        default:
          name.err = "Error, valor minimo";
          break;
      }
    },
    // contador de errores por seccion
    contadorErrores(name) {
      this.salida = 0;
      switch (name) {
        case this.$v.sec1:
          this.contSec1 = 0;
          for (let index = 0; index < Object.keys(name).length - 8; index++) {
            if (Object.values(name)[index].$anyError) {
              this.contSec1++;
            }
          }
          break;
        case this.$v.sec2:
          this.contSec2 = 0;
          for (let index = 0; index < Object.keys(name).length - 8; index++) {
            if (Object.values(name)[index].$invalid) {
              this.contSec2++;
            }
          }
          break;
        case this.$v.sec3:
          this.contSec3 = 0;
          for (let index = 0; index < Object.keys(name).length - 8; index++) {
            if (Object.values(name)[index].$anyError) {
              this.contSec3++;
            }
          }
          break;
        case this.$v.sec4:
          this.contSec4 = 0;
          for (let index = 0; index < Object.keys(name).length - 8; index++) {
            if (Object.values(name)[index].$anyError) {
              this.contSec4++;
            }
          }
          break;
        case this.$v.sec5:
          this.contSec5 = 0;
          for (let index = 0; index < Object.keys(name).length - 8; index++) {
            if (Object.values(name)[index].$anyError) {
              this.contSec5++;
            }
          }
          break;
        default:
          break;
      }
      this.salida =
        this.contSec5 +
        this.contSec4 +
        this.contSec3 +
        this.contSec2 +
        this.contSec1;
    },
    // guardar contrato
    gurardarContrato() {
      if(this.descripValor == "En totalidad al momento de firmar el contrato"){
        this.cantidadPagada = this.dineroN;
        this.cancelo = true;
        this.unidadPeriodo = "";
      }else if(this.descripValor =="En una fecha determinada posterior"){
        this.cantidadPagada = 0;
      }
      if(!this.$v.$anyError){
        this.tipoContrato="Iniciado"; 
      }
      const axios = require("axios");
      axios
        .post("http://localhost:1337/api/contrato", {
          padre: this.$store.state.counter.id,
          estado: this.tipoContrato,
          observaciones: this.observaciones,
          valor: this.dineroN,
          pagado: this.cantidadPagada,
          cancelo: this.cancelo,
          fechainicia: this.fechaContrato,
          contratoCiudad: this.contratoCiudad,
          slugObj: "objeto",
          slugArt: this.articulo,
          slugPre: "precio",
          valorletra: this.dineroS,
          descripcion: this.descripValor,
          cantidadPeriodo: this.cantidadPeriodo,
          unidadPeriodo: this.unidadPeriodo,
          slugAcep: "aceptacion",
          userlog: this.usuariolog,
          usercomp: this.docComprador,
          docExpeCompra: this.docExpeCompra,
          uservend: this.docVendedor,
          //docExpeVende: this.docExpeVende,
          finalidad: this.finalidad
        })
        .then(response => {
          // Respuesta del servidor
          console.log(response);
          if (response.data.success) {
            this.makeToast("primary", response.data.massage);

            if (this.tipoContrato == "borrador") {
              window.location.href = "/contratos/borrador";
            } else if (this.tipoContrato == "iniciado") {
              window.location.href = "/contratos/iniciado";
            }else{
              window.location.href = "/contratos/iniciado";
            }
          } else {
            this.makeToast("danger", response.data.massage);
          }
        })
        .catch(e => {
          console.log(e);
          this.makeToast("danger", " " + e);
        });

      this.$refs["my-modal"].hide();
      this.$refs["allfine"].hide();
    },
    // Guardar usuario
    guardarUsuario(docid, nombre, tipodoc) {
      if(this.descripValor == "En totalidad al momento de firmar el contrato"){
        this.cantidadPagada = this.dineroN;
      }

      if (docid && nombre && tipodoc) {
        this.$refs["usuario"].hide();
        const axios = require("axios");
        axios
          .post(`http://localhost:1337/api/usuario`, {
            user: this.user
          })
          .then(response => {
            // Respuesta del servidor

            if (response.data.success) {
              this.makeToast("primary", response.data.massage);
              if (this.user.naturaleza == "vendedor") {
                this.docVendedor = this.user.doc;
                this.nombVendedor = this.user.nomb;
                this.selectedVend = this.user.tipo;
                this.docExpeVende = this.user.expe;
              } else if (this.user.naturaleza == "comprador") {
                this.docComprador = this.user.doc;
                this.nombComprador = this.user.nomb;
                this.selectedComp = this.user.tipo;
                this.docExpeCompra = this.user.expe;
              }
            } else {
              this.makeToast("danger", response.data.massage);
            }
          })
          .catch(e => {
            console.log(e);
            this.makeToast("danger", " " + e);
          });
      } else {
        this.makeToast("danger", "Los datos son incorreecetos");
      }
    },
    //Actualizar contrato
    updateContrato() {
      if(this.descripValor == "En totalidad al momento de firmar el contrato"){
        this.cantidadPagada = this.dineroN;
        this.unidadPeriodo = "";
      }else if(this.descripValor =="En una fecha determinada posterior"){
        this.cantidadPagada = 0;
      }

      if (!this.cantidadPagada) {
        this.cantidadPagada = 0;
      }
      if (!this.cantidadPeriodo) {
        this.cantidadPeriodo == 0;
      }
      const axios = require("axios");
      axios
        .put(
          `http://localhost:1337/api/contrato/${this.$store.state.counter.id}`,
          {
            estado: this.tipoContrato,
            observaciones: this.observaciones,
            valor: this.dineroN,
            pagado: this.cantidadPagada,
            cancelo: this.cancelo,
            fechainicia: this.fechaContrato,
            contratoCiudad: this.contratoCiudad,
            slugObj: "objeto",
            slugArt: this.articulo,
            slugPre: "precio",
            valorletra: this.dineroS,
            cantidadPeriodo: this.cantidadPeriodo,
            unidadPeriodo: this.unidadPeriodo,
            descripcion: this.descripValor,
            slugAcep: "aceptacion",
            userlog: this.usuariolog,
            usercomp: this.docComprador,
            docExpeCompra: this.docExpeCompra,
            uservend: this.docVendedor,
            //docExpeVende: this.docExpeVende,
            finalidad: this.finalidad
          }
        )
        .then(response => {
          // Respuesta del servidor

          console.log(response);
          if (response.data.success) {
            this.makeToast("primary", response.data.massage); 
            window.location.href = "/contratos/borrador";
          } else {
            this.makeToast("danger", response.data.massage);
          }
        })
        .catch(e => {
          console.log(e);
          this.makeToast("danger", " " + e);
        });

      this.$refs["my-modal"].hide();
      this.$refs["allfine"].hide();
    },
    // Eliminar contrato Borrador
    eliminarBorrador() {
      apiService
        .deleteContrato(this.$store.state.counter.id)
        .then(respuesta => {
          console.log(respuesta);
          this.makeToast("primary", respuesta.massage);
          this.$refs["my-modal"].hide();
          this.reload();
        });
    },
    // Recarga la pagina
    reload() {
      location.reload();
    },
    // Imprimir
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
  //Carga el front wizard
  mounted() {
    var wizard = this.$refs.wizard;
    console.log(wizard);
    wizard.activateAll();
  },
  //Carga todos los datos del contrato seleccionado
  created() {
    if (
      (this.$store.state.counter.id &&
        this.$store.state.counter.estado == "Borrador") ||
      (this.$store.state.counter.id &&
        this.$store.state.counter.estado == "Iniciado")
    ) {
      this.idcontrato = this.$store.state.counter.id;
      this.contratoCiudad = this.$store.state.counter.contratociudad;
      this.fechaContrato = this.$store.state.counter.fechainicia;
      if (this.$store.state.counter.pagado == 0) {
        this.cantidadPagada = "";
      } else {
        this.cantidadPagada = this.$store.state.counter.pagado;
      }

      // busca y llena campos de usuario y rol
      apiService.getContratoUsuario(this.$store.state.counter.id).then(data => {
        data.data.forEach(element => {
          if (element.usuario) {
            apiService.getUsuarios(element.usuario).then(data2 => {
              apiService.getRol(element.rol).then(data3 => {
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
                  data2.forEach(articulo => {
                    this.articulo.push({
                      articulo: articulo.articulo.slug,
                      cantidad: articulo.cantidad
                    });
                  });
                });
            }
            if (element.titulo == "Precio") {
              this.dineroN = this.$store.state.counter.valor;
              this.descripValor = element.descripcion;
              if(element.descripcion=="De forma periodica"){
                this.validar=3;
              }else if(element.descripcion=="En una fecha determinada posterior"){
                this.validar=2;
              }else{
                this.validar=1;
              }
              this.dineroS = element.valorDescripcion;
              if (element.cantidadPeriodo == 0) {
                this.cantidadPeriodo = "";
              } else {
                this.cantidadPeriodo = element.cantidadPeriodo;
              }

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
    FormWizard,
    QuickEdit,
    TabContent,
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