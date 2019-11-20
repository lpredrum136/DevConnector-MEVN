<template>
  <b-jumbotron class="text-center" style="height: 100vh; margin-bottom: 0">
    <template v-slot:header>Developer Connector</template>

    <template
      v-slot:lead
    >Create a developer profile/portfolio, share posts and get help from other developers</template>

    <hr class="my-4" />

    <b-button variant="primary" to="/register" class="mr-2">Sign Up</b-button>
    <b-button variant="success" to="/login">Login</b-button>
  </b-jumbotron>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Landing"
};
</script>

<style scoped>
</style>
