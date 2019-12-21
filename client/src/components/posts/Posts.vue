<template>
  <b-container class="mt-3 mb-4">
    <h1 class="page-title">Posts</h1>
    <h2 class="my-3">
      <i class="fas fa-users"></i>
      Welcome to the community
    </h2>
    <template v-if="myPost.loading">
      <b-spinner label="Spinning" style="margin: 0; position: absolute; top: 50%; left: 50%;"></b-spinner>
    </template>
    <template v-else>
      <b-alert v-if="myPost.posts.length == 0" variant="info">No posts found</b-alert>
      <template v-else>
        <PostItem v-for="post in myPost.posts" :key="post._id" :post="post" />
      </template>
    </template>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PostItem from "./PostItem";

export default {
  name: "Posts",
  components: { PostItem },
  computed: mapGetters(["myPost"]),
  methods: {
    ...mapActions(["getPosts"])
  },
  created() {
    this.getPosts();
  }
};
</script>

<style scoped>
</style>