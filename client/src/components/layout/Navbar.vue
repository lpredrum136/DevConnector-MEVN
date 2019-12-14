<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">
        <i class="fas fa-code"></i> DevConnector
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/profiles">
            <i class="fas fa-users"></i> Developers
          </b-nav-item>
          <template v-if="userIsAuthenticated">
            <b-nav-item to="/dashboard">
              <i class="fas fa-user"></i> Dashboard
            </b-nav-item>
            <b-nav-item @click="logoutUser">
              <i class="fas fa-power-off"></i> Logout
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item to="/register">Register</b-nav-item>
            <b-nav-item to="/login">Login</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: mapGetters(["userIsAuthenticated"]),
  methods: {
    ...mapActions(["logoutUser"])
  }
};
</script>

<style></style>
