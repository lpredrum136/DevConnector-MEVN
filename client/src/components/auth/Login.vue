<template>
  <b-container>
    <b-card
      title="Login"
      title-tag="h1"
      sub-title="Log into Your Account"
      sub-title-tag="h4"
      class="mt-3 page-title"
    >
      <b-form @submit="onSubmit">
        <b-form-group id="email" label-for="email">
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
        </b-form-group>

        <b-button type="submit" variant="primary">Login</b-button>
        <p class="mt-2">
          Don't have an account?
          <b-link to="/register" :style="{ textDecoration: 'none' }">Sign Up</b-link>
        </p>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["loginUser", "setAlert"]),
    onSubmit(event) {
      event.preventDefault();

      this.loginUser({ email: this.email, password: this.password });
    }
  }
};
</script>

<style></style>
