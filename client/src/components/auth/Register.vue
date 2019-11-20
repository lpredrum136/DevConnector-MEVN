<template>
  <b-container>
    <b-card
      title="Sign Up"
      title-tag="h1"
      sub-title="Create Your Account"
      sub-title-tag="h4"
      class="mt-3"
    >
      <b-form @submit="onSubmit">
        <b-form-group id="name" label-for="name">
          <b-form-input
            id="name"
            placeholder="Name"
            required
            v-model="name"
          ></b-form-input>
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
          <b-form-text id="password-help-block"
            >Your password must be at least 6 characters long.</b-form-text
          >
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

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password2: ''
    };
  },
  methods: {
    ...mapActions(['registerUser']),
    onSubmit(event) {
      event.preventDefault();
      this.registerUser({
        name: this.name,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style>
h1 {
  color: #33a0df;
}
</style>
