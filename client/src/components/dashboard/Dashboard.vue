<template>
  <b-container class="mt-3 mb-4">
    <template v-if="userProfile == null && userProfileLoading">
      <b-spinner label="Spinning" style="margin: 0; position: absolute; top: 50%; left: 50%;"></b-spinner>
    </template>
    <template v-else>
      <h1 class="page-title">Dashboard</h1>
      <h2 class="my-3">
        <i class="fas fa-user"></i>
        Welcome {{ userInfo && userInfo.name }}
      </h2>
      <template v-if="userProfile">
        <DashboardActions />
        <Experience
          v-if="userProfile.experience.length > 0"
          :myExperience="userProfile.experience"
        />
        <Education v-if="userProfile.education.length > 0" :myEducation="userProfile.education" />
        <b-button variant="danger" @click="deleteAccount()">
          <i class="fas fa-user-slash"></i> Delete My Account
        </b-button>
      </template>
      <div v-else class="my-4">
        <h4>You have not set up a profile, please add some information</h4>
        <b-button to="/create-profile" variant="primary">Create Profile</b-button>
      </div>
    </template>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

export default {
  name: "Dashboard",
  components: { DashboardActions, Experience, Education },
  computed: mapGetters(["userProfile", "userProfileLoading", "userInfo"]),
  methods: {
    ...mapActions(["getCurrentProfile", "deleteAccount"])
  },
  created() {
    this.getCurrentProfile();
  }
};
</script>

<style></style>
