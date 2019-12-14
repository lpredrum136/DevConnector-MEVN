<template>
  <b-container class="my-3">
    <b-spinner
      label="Spinning"
      style="margin: 0; position: absolute; top: 50%; left: 50%;"
      v-if="userProfile === null || userProfileLoading"
    ></b-spinner>
    <template v-else>
      <b-button to="/profiles" variant="secondary" class="mr-2">Back to Profiles</b-button>
      <b-button
        v-if="userIsAuthenticated && !userLoading && userInfo._id == userProfile.user._id"
        to="/edit-profile"
        variant="info"
      >Edit Profile</b-button>
      <ProfileTop :profile="userProfile" class="my-3" />
      <ProfileAbout :profile="userProfile" class="my-3" />

      <b-card-group deck>
        <b-card title="Experience" title-tag="h2" bg-variant="light">
          <template v-if="userProfile.experience.length > 0">
            <div v-for="singleExp in userProfile.experience" :key="singleExp._id">
              <hr />
              <ProfileExperience :experience="singleExp" />
            </div>
          </template>
          <template v-else>No experience information</template>
        </b-card>
        <b-card title="Education" title-tag="h2" bg-variant="light">
          <template v-if="userProfile.education.length > 0">
            <div v-for="singleEdu in userProfile.education" :key="singleEdu._id">
              <hr />
              <ProfileEducation :education="singleEdu" />
            </div>
          </template>
          <template v-else>No education information</template>
        </b-card>
      </b-card-group>

      <ProfileGithub
        v-if="userProfile.githubusername"
        :githubUsername="userProfile.githubusername"
      />
    </template>
  </b-container>
</template>

<script>
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Profile",
  components: {
    ProfileTop,
    ProfileAbout,
    ProfileExperience,
    ProfileEducation,
    ProfileGithub
  },
  computed: mapGetters([
    "userProfile",
    "userProfileLoading",
    "userIsAuthenticated",
    "userLoading",
    "userInfo"
  ]),
  methods: {
    ...mapActions(["getProfileById"])
  },
  created() {
    this.getProfileById(this.$route.params.id);
  }
};
</script>

<style scoped>
h2 {
  color: #33a0df;
}
</style>