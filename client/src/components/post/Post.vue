<template>
  <b-container class="mt-3 mb-4">
    <b-spinner
      v-if="myPost.loading"
      label="Spinning"
      style="margin: 0; position: absolute; top: 50%; left: 50%;"
    ></b-spinner>
    <b-button v-else-if="myPost.post == null" to="/posts" variant="secondary">Go back to Posts</b-button>
    <template v-else>
      <b-button to="/posts" variant="secondary">Go back to Posts</b-button>
      <b-card
        no-body
        class="overflow-hidden profile-item my-3"
        bg-variant="primary"
        text-variant="white"
      >
        <b-row no-gutters>
          <b-col md="2" class="my-auto p-3">
            <b-card-img :src="myPost.post.avatar"></b-card-img>
            <b-card-text text-tag="h3" class="post-name text-center mt-1">{{myPost.post.name}}</b-card-text>
          </b-col>
          <b-col md="10">
            <b-card-body>
              <b-card-text>{{myPost.post.text}}</b-card-text>
              <b-badge variant="light">Posted on {{myPost.post.date | moment('DD/MM/YYYY')}}</b-badge>
              <hr />
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>

      <CommentForm class="my-3" :postId="myPost.post._id" />
      <hr />

      <CommentItem
        v-for="comment in myPost.post.comments"
        :key="comment._id"
        :comment="comment"
        :postId="myPost.post._id"
      />
    </template>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default {
  name: "Post",
  components: { CommentForm, CommentItem },
  computed: mapGetters(["myPost"]),
  methods: {
    ...mapActions(["getPostById"])
  },
  created() {
    this.getPostById(this.$route.params.postId);
  }
};
</script>

<style>
</style>