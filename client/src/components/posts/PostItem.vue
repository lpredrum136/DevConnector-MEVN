<template>
  <b-card no-body class="overflow-hidden profile-item mb-3">
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
          <b-button :to="`/posts/${post._id}`" class="mx-1" variant="info">
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

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PostItem",
  props: ["post"],
  computed: mapGetters(["userInfo", "userLoading"]),
  methods: {
    ...mapActions(["addLike", "removeLike", "deletePost"])
  }
};
</script>

<style scoped>
.post-name {
  color: #33a0df;
}
</style>