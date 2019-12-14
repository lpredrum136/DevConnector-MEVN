<template>
  <div>
    <h2 class="my-2">Github Repos</h2>
    <b-spinner
      v-if="allRepos === null"
      label="Spinning"
      style="margin: 0; position: absolute; top: 50%; left: 50%;"
    ></b-spinner>

    <b-card-group v-else deck>
      <b-card v-for="repo in allRepos" :key="repo._id" bg-variant="light" class="text-center">
        <b-card-title>
          <b-link class="repo-link" :href="repo.html_url" target="_blank">{{repo.name}}</b-link>
        </b-card-title>
        <b-card-text class="repo-text">{{repo.description}}</b-card-text>
        <b-card-footer class="repo-footer">
          <b-badge variant="info" class="repo-footer-stats">Stars: {{repo.stargazers_count}}</b-badge>
          <br />
          <b-badge variant="secondary" class="repo-footer-stats">Watchers: {{repo.watchers_count}}</b-badge>
          <br />
          <b-badge variant="light" class="repo-footer-stats">Forks: {{repo.forks_count}}</b-badge>
        </b-card-footer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProfileGithub",
  props: ["githubUsername"],
  computed: mapGetters(["allRepos"]),
  methods: {
    ...mapActions(["getGitHubRepos"])
  },
  created() {
    this.getGitHubRepos(this.githubUsername);
  }
};
</script>

<style scoped>
.repo-link {
  text-decoration: none;
  color: #33a0df;
}

.repo-text {
  margin-bottom: 100px;
}

.repo-footer {
  position: absolute;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

ul {
  list-style: none;
}
</style>