<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand style="font-size:40px" href="/">WinTime</b-navbar-brand>
      <b-navbar-nav>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Contratos de clientes">
          <b-dropdown-item href="/contratos/base">Crear contrato</b-dropdown-item>
          <b-dropdown-item href="/contratos/borrador">Contratos Borrador</b-dropdown-item>
          <b-dropdown-item href="/contratos/iniciado">Contratos Iniciados</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="/contratos/seguimiento">Seguimiento</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item>Vendedor</b-dropdown-item>
          <b-dropdown-item>Comprador</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      {{$store.state.nav}}
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>