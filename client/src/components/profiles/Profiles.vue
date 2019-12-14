<template>
  <b-container class="mt-3">
    <h1 class="page-title">Developers</h1>
    <h2 class="my-3">
      <i class="fab fa-connectdevelop"></i>
      Browse and connect with developers
    </h2>
    <template v-if="userProfileLoading">
      <b-spinner label="Spinning" style="margin: 0; position: absolute; top: 50%; left: 50%;"></b-spinner>
    </template>
    <template v-else>
      <ProfileItem v-for="profile in allProfiles" :key="profile._id" :profile="profile" />
    </template>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProfileItem from "./ProfileItem";

export default {
  name: "Profiles",
  components: { ProfileItem },
  computed: mapGetters(["allProfiles", "userProfileLoading"]),
  methods: {
    ...mapActions(["getProfiles"])
  },
  created() {
    this.getProfiles();
  }
};
</script>

<style>
</style>