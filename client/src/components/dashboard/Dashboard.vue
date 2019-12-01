<template>
  <b-container class="mt-3">
    <template v-if="userProfile !== null || !userProfileLoading">
      <h1 class="page-title">Dashboard</h1>
      <h2 class="my-3">
        <i class="fas fa-user"></i>
        Welcome {{ userInfo && userInfo.name }}
      </h2>
      <template v-if="userProfile">
        <DashboardActions />
      </template>
      <div v-else class="my-4">
        <h4>You have not set up a profile, please add some information</h4>
        <b-button to="/create-profile" variant="primary">Create Profile</b-button>
      </div>
    </template>
    <template v-else>
      <b-spinner label="Spinning" style="margin: 0; position: absolute; top: 50%; left: 50%;"></b-spinner>
    </template>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DashboardActions from "./DashboardActions";

export default {
  name: "Dashboard",
  components: { DashboardActions },
  computed: mapGetters(["userProfile", "userProfileLoading", "userInfo"]),
  methods: {
    ...mapActions(["getCurrentProfile"])
  },
  created() {
    this.getCurrentProfile();
  }
};
</script>

<style></style>
