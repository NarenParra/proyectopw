<template>
  <div>
    <div>
      <b-navbar  type="dark" variant="info">
        <b-nav-brand variant="info" class="mt-2" style="font-size:180%; color:#ffffff" href="/"><p style="margin-left:10px; font-size:40px">WinTime</p></b-nav-brand>
        <b-navbar-nav v-if="vendedor">
          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Contratos de clientes" >
            <b-dropdown-item href="/contratos/base">Crear contrato</b-dropdown-item>
            <b-dropdown-item href="/contratos/borrador">Contratos Borrador</b-dropdown-item>
            <b-dropdown-item href="/contratos/iniciado">Contratos Iniciados</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="/contratos/seguimiento">Seguimiento</b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item @click="ver_cliente">Vendedor</b-dropdown-item>
            <b-dropdown-item @click="ver_cliente">Comprador</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        
        {{vendedor}}
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vendedor: true
    };
  },
  methods: {
    ver_cliente() {
      this.vendedor = false;
    }
  }
};
</script>