<template>
  <b-form @submit="onSubmit">
    <b-alert variant="info" show>Leave a Comment</b-alert>
    <b-form-group>
      <b-form-textarea v-model="text" placeholder="Type your comment here"></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CommentForm",
  props: ["postId"],
  data() {
    return { text: "" };
  },
  methods: {
    ...mapActions(["addComment"]),
    onSubmit(event) {
      event.preventDefault();
      this.addComment({ text: this.text, postId: this.postId });
      this.text = "";
    }
  }
};
</script>

<style>
</style>