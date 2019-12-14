<template>
  <div>
    <h3>{{school}}</h3>
    <p>
      {{from | moment('DD/MM/YYYY')}} -
      <span v-if="to">{{to | moment('DD/MM/YYYY')}}</span>
      <span v-else>Now</span>
    </p>
    <p>
      <strong>Degree:</strong>
      {{degree}}
    </p>
    <p v-if="fieldofstudy">
      <strong>Field of study:</strong>
      {{fieldofstudy}}
    </p>
    <p v-if="description">
      <strong>Description:</strong>
      {{description}}
    </p>
  </div>
</template>

<script>
export default {
  name: "ProfileEducation",
  props: ["education"],
  data() {
    return {
      school: this.$props.education.school,
      degree: this.$props.education.degree,
      fieldofstudy: this.$props.education.fieldofstudy,
      to: this.$props.education.to,
      from: this.$props.education.from,
      description: this.$props.education.description
    };
  }
};
</script>

<style>
</style>