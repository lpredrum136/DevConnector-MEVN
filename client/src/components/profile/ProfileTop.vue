<template>
  <b-card
    :title="user.name"
    bg-variant="info"
    text-variant="white"
    class="text-center"
    title-tag="h2"
  >
    <b-img :src="user.avatar" rounded="circle" fluid alt="Responsive image" class="my-2"></b-img>
    <b-card-body>
      <b-card-title>
        {{status}}
        <span v-if="company">at {{company}}</span>
      </b-card-title>
      <b-link v-if="website" :href="website" target="_blank" class="mx-2">
        <i class="fas fa-globe fa-2x"></i>
      </b-link>
      <b-link v-if="social && social.twitter" :href="social.twitter" target="_blank" class="mx-2">
        <i class="fab fa-twitter fa-2x"></i>
      </b-link>
      <b-link v-if="social && social.facebook" :href="social.facebook" target="_blank" class="mx-2">
        <i class="fab fa-facebook fa-2x"></i>
      </b-link>
      <b-link
        v-if="social && social.instagram"
        :href="social.instagram"
        target="_blank"
        class="mx-2"
      >
        <i class="fab fa-instagram fa-2x"></i>
      </b-link>
      <b-link v-if="social && social.linkedin" :href="social.linkedin" target="_blank" class="mx-2">
        <i class="fab fa-linkedin fa-2x"></i>
      </b-link>
      <b-link v-if="social && social.youtube" :href="social.youtube" target="_blank" class="mx-2">
        <i class="fab fa-youtube fa-2x"></i>
      </b-link>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "ProfileTop",
  props: ["profile"],
  data() {
    return {
      status: this.$props.profile.status,
      company: this.$props.profile.company,
      location: this.$props.profile.location,
      website: this.$props.profile.website,
      social: this.$props.profile.social,
      user: this.$props.profile.user
    }; // this.profile.status is also ok
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.fa-youtube,
.fa-instagram,
.fa-facebook,
.fa-twitter,
.fa-linkedin,
.fa-globe {
  color: white;
}

i:hover {
  color: rgb(0, 60, 78);
}
</style>