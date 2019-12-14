<template>
  <b-card class="text-center" bg-variant="light">
    <b-card-text v-if="bio">
      <h2>{{user.name.trim().split(' ')[0]}}'s Bio</h2>
      {{bio}}
    </b-card-text>
    <hr />
    <b-card-text>
      <h2>Skill Set</h2>
      <span v-for="(skill, index) in skills" :key="index" class="mx-3">
        <i class="fas fa-check"></i>
        {{skill}}
      </span>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "ProfileAbout",
  props: ["profile"],
  data() {
    return {
      bio: this.$props.profile.bio,
      skills: this.$props.profile.skills,
      user: this.$props.profile.user
    };
  }
};
</script>

<style scoped>
h2 {
  color: #33a0df;
}
</style>