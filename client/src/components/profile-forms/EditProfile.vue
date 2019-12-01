<template>
  <b-container>
    <b-card
      title="Edit Your Profile"
      title-tag="h1"
      sub-title="Add some changes to your profile"
      sub-title-tag="h4"
      class="my-3 page-title"
    >
      <p>
        <small>* = required field</small>
      </p>
      <b-form @submit="onSubmit">
        <b-form-group
          id="status"
          label-for="status"
          description="Give us an idea of where you are at in your career"
        >
          <b-form-select v-model="status" :options="statusOptions"></b-form-select>
        </b-form-group>

        <b-form-group
          label-for="company"
          description="Could be your own company or one you work for"
        >
          <b-form-input id="company" placeholder="Company" v-model="company" :value="company"></b-form-input>
        </b-form-group>

        <b-form-group label-for="website" description="Could be your own or a company website">
          <b-form-input id="website" type="url" placeholder="Website" v-model="website"></b-form-input>
        </b-form-group>

        <b-form-group label-for="location" description="City & state suggested (eg. Boston, MA)">
          <b-form-input id="location" placeholder="Location" v-model="location"></b-form-input>
        </b-form-group>

        <b-form-group
          label-for="skills"
          description="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
        >
          <b-form-input id="skills" placeholder="* Skills" v-model="skills"></b-form-input>
        </b-form-group>

        <b-form-group
          label-for="githubusername"
          description="If you want your latest repos and a Github link, include your username"
        >
          <b-form-input id="githubusername" placeholder="GitHub Username" v-model="githubusername"></b-form-input>
        </b-form-group>

        <b-form-group label-for="bio" description="Tell us a little about yourself">
          <b-form-textarea
            id="bio"
            placeholder="A short bio of yourself"
            rows="3"
            max-rows="6"
            v-model="bio"
          ></b-form-textarea>
        </b-form-group>

        <b-row>
          <b-col cols="3">
            <b-form-group label-for="social">
              <b-button variant="light" @click="toggleSocialInputs">Add Social Networks</b-button>
            </b-form-group>
          </b-col>
          <b-col cols="9" v-if="displaySocialInputs">
            <b-input-group class="mb-2">
              <template v-slot:prepend>
                <b-input-group-text>
                  <i class="fab fa-twitter"></i>
                </b-input-group-text>
              </template>
              <b-form-input id="twitter" placeholder="Your Twitter" v-model="twitter"></b-form-input>
            </b-input-group>
            <b-input-group class="mb-2">
              <template v-slot:prepend>
                <b-input-group-text>
                  <i class="fab fa-facebook"></i>
                </b-input-group-text>
              </template>
              <b-form-input id="facebook" placeholder="Your Facebook" v-model="facebook"></b-form-input>
            </b-input-group>
            <b-input-group class="mb-2">
              <template v-slot:prepend>
                <b-input-group-text>
                  <i class="fab fa-instagram"></i>
                </b-input-group-text>
              </template>
              <b-form-input id="instagram" placeholder="Your Instagram" v-model="instagram"></b-form-input>
            </b-input-group>
            <b-input-group class="mb-2">
              <template v-slot:prepend>
                <b-input-group-text>
                  <i class="fab fa-youtube"></i>
                </b-input-group-text>
              </template>
              <b-form-input id="youtube" placeholder="Your Youtube" v-model="youtube"></b-form-input>
            </b-input-group>
            <b-input-group class="mb-2">
              <template v-slot:prepend>
                <b-input-group-text>
                  <i class="fab fa-linkedin"></i>
                </b-input-group-text>
              </template>
              <b-form-input id="linkedin" placeholder="Your LinkedIn" v-model="linkedin"></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>

        <b-button type="submit" variant="primary" class="mr-2">Save Profile</b-button>
        <b-button to="/dashboard" variant="secondary">Go Back</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditProfile",
  data() {
    return {
      company: "",
      website: "",
      location: "",
      status: null,
      skills: "",
      bio: "",
      githubusername: "",
      youtube: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      displaySocialInputs: false,

      statusOptions: [
        { value: null, text: "* Select professional status" },
        { value: "Developer", text: "Developer" },
        { value: "Junior Developer", text: "Junior Developer" },
        { value: "Senior Developer", text: "Senior Developer" },
        { value: "Manager", text: "Manager" },
        { value: "Student or Learning", text: "Student or Learning" },
        { value: "Instructor or Teacher", text: "Instructor or Teacher" },
        { value: "Intern", text: "Intern" },
        { value: "Other", text: "Other" }
      ]
    };
  },
  computed: mapGetters(["userProfile", "userProfileLoading"]),
  watch: {
    userProfile(newValue) {
      if (!this.userProfileLoading) {
        this.company = this.userProfile.company;
        this.website = this.userProfile.website;
        this.location = this.userProfile.location;
        this.status = this.userProfile.status;
        this.skills = this.userProfile.skills.join(", ");
        this.bio = this.userProfile.bio;
        this.githubusername = this.userProfile.githubusername;
        this.youtube = this.userProfile.social.youtube;
        this.twitter = this.userProfile.social.twitter;
        this.facebook = this.userProfile.social.facebook;
        this.instagram = this.userProfile.social.instagram;
        this.linkedin = this.userProfile.social.linkedin;
      }
    }
  },
  methods: {
    ...mapActions(["getCurrentProfile", "createProfile"]),
    toggleSocialInputs() {
      this.displaySocialInputs = !this.displaySocialInputs;
    },
    onSubmit(event) {
      event.preventDefault();

      const userData = {
        company: this.company,
        website: this.website,
        location: this.location,
        status: this.status,
        skills: this.skills,
        bio: this.bio,
        githubusername: this.githubusername,
        youtube: this.youtube,
        facebook: this.facebook,
        twitter: this.twitter,
        instagram: this.instagram,
        linkedin: this.linkedin
      };

      this.createProfile({ userData, isEdit: true });
    }
  },
  created() {
    this.getCurrentProfile();
  }
};
</script>

<style>
</style>