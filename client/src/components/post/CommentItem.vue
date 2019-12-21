<template>
  <b-card no-body class="overflow-hidden profile-item mb-3">
    <b-row no-gutters>
      <b-col md="2" class="my-auto p-3">
        <b-card-img :src="comment.avatar"></b-card-img>
        <b-card-text text-tag="h3" class="comment-name text-center mt-1">{{comment.name}}</b-card-text>
      </b-col>
      <b-col md="10">
        <b-card-body>
          <b-card-text>{{comment.text}}</b-card-text>
          <b-badge variant="light">Posted on {{comment.date | moment('DD/MM/YYYY')}}</b-badge>
          <hr />
          <b-button
            v-if="!userLoading && comment.user == userInfo._id"
            class="mx-1"
            variant="danger"
            @click="deleteComment({ postId, commentId: comment._id })"
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
  name: "CommentItem",
  computed: mapGetters(["userLoading", "userInfo"]),
  props: ["comment", "postId"],
  methods: {
    ...mapActions(["deleteComment"])
  }
};
</script>

<style scoped>
.comment-name {
  color: #33a0df;
}
</style>