<template>
  <b-card
    :title="user.name"
    title-tag="h2"
    :img-src="user.avatar"
    img-left
    class="profile-item mb-3"
  >
    <b-card-text>
      <b-row>
        <b-col cols="8">
          <p>
            {{status}}
            <span v-if="company">at {{company}}</span>
          </p>

          <p v-if="location">{{location}}</p>
          <b-button :to="`/profile/${user._id}`" variant="info">View Profile</b-button>
        </b-col>
        <b-col>
          <ul>
            <li v-for="(skill, index) in skills" :key="index">
              <i class="fas fa-check"></i>
              {{skill}}
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "ProfileItem",
  props: ["profile"],
  data() {
    return {
      user: this.profile.user,
      status: this.profile.status,
      company: this.profile.company,
      location: this.profile.location,
      skills: this.profile.skills.slice(0, 4)
    };
  }
};
</script>

<style>
ul {
  list-style: none;
  color: #33a0df;
}
</style>