<template>
  <div id="app">
    <Navbar />
    <Alert />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: { Navbar, Alert },
  methods: {
    ...mapActions(["loadUser"])
  },
  created() {
    this.loadUser();
  }
};
</script>

<style>
@import "./assets/styles/styles.css";
</style>
