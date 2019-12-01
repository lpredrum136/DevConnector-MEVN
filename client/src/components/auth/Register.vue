<template>
  <b-container>
    <b-card
      title="Sign Up"
      title-tag="h1"
      sub-title="Create Your Account"
      sub-title-tag="h4"
      class="mt-3 page-title"
    >
      <b-form @submit="onSubmit">
        <b-form-group id="name" label-for="name">
          <b-form-input id="name" placeholder="Name" required v-model="name"></b-form-input>
        </b-form-group>

        <b-form-group
          id="email"
          label-for="email"
          description="This site uses Gravatar so if you want a profile image, use a Gravatar email"
        >
          <b-form-input
            id="email"
            type="email"
            placeholder="Email Address"
            required
            v-model="email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password" label-for="password">
          <b-form-input
            id="password"
            type="password"
            placeholder="Password"
            aria-describedby="password-help-block"
            required
            v-model="password"
          ></b-form-input>
          <b-form-text id="password-help-block">Your password must be at least 6 characters long.</b-form-text>
        </b-form-group>

        <b-form-group id="password2" label-for="password2">
          <b-form-input
            id="password2"
            type="password"
            placeholder="Confirm Password"
            required
            v-model="password2"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Create Account</b-button>

        <p class="mt-2">
          Already have an account?
          <b-link to="/login" :style="{ textDecoration: 'none' }">Sign In</b-link>
        </p>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import uuid from "uuid";
import router from "../../router";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  },
  computed: mapGetters(["userIsAuthenticated"]),
  methods: {
    ...mapActions(["registerUser", "setAlert"]),
    onSubmit(event) {
      event.preventDefault();

      if (this.password !== this.password2)
        this.setAlert({
          id: uuid.v4(),
          msg: "Passwords do not match",
          type: "danger"
        });
      else
        this.registerUser({
          name: this.name,
          email: this.email,
          password: this.password
        });

      /* if (this.userIsAuthenticated) {
        console.log('yes');
        this.$router.push('/');
      } */
    }
  }
  /* created() {
    if (this.userIsAuthenticated) {
      this.$router.push('/');
    }
  } */
};
</script>

<style>
</style>
