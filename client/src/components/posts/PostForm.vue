<template>
  <b-form @submit="onSubmit">
    <b-alert variant="info" show>Say Something...</b-alert>
    <b-form-group>
      <b-form-textarea v-model="text" placeholder="Create a post"></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PostForm",
  data() {
    return {
      text: ""
    };
  },
  methods: {
    ...mapActions(["addPost"]),
    onSubmit(event) {
      event.preventDefault();
      this.addPost({ text: this.text });
      this.text = "";
    }
  }
};
</script>

<style>
</style>