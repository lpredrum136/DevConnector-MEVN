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
        <b-card
          no-body
          v-for="post in myPost.posts"
          :key="post._id"
          class="overflow-hidden profile-item mb-3"
        >
          <b-row no-gutters>
            <b-col md="2" class="my-auto p-3">
              <b-card-img :src="post.avatar"></b-card-img>
              <b-card-text text-tag="h3" class="post-name text-center mt-1">{{post.name}}</b-card-text>
            </b-col>
            <b-col md="10">
              <b-card-body>
                <b-card-text>{{post.text}}</b-card-text>
                <b-badge variant="light">Posted on {{post.date | moment('DD/MM/YYYY')}}</b-badge>
                <hr />
                <b-button class="mx-1" variant="success" @click="addLike(post._id)">
                  <i class="fas fa-thumbs-up"></i>
                  {{post.likes.length}}
                </b-button>
                <b-button
                  class="mx-1"
                  variant="warning"
                  :id="`like-reminder-${post._id}`"
                  @click="removeLike(post._id)"
                >
                  <i class="fas fa-thumbs-down"></i>
                </b-button>
                <b-tooltip
                  v-if="!userLoading && post.likes.findIndex(like => like.user == userInfo._id) == -1"
                  :target="`like-reminder-${post._id}`"
                  triggers="hover"
                >You must like the post first</b-tooltip>
                <b-button class="mx-1" variant="info">
                  Discussion
                  <b-badge variant="light">{{post.comments.length}}</b-badge>
                </b-button>
                <b-button
                  v-if="!userLoading && post.user == userInfo._id"
                  class="mx-1"
                  variant="danger"
                  @click="deletePost(post._id)"
                >
                  <i class="fas fa-times"></i>
                </b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </template>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Posts",
  computed: mapGetters(["myPost", "userInfo", "userLoading"]),
  methods: {
    ...mapActions(["getPosts", "addLike", "removeLike", "deletePost"])
  },
  created() {
    this.getPosts();
  }
};
</script>

<style scoped>
.post-name {
  color: #33a0df;
}
</style>