<template>
  <div>
    <h3>{{company}}</h3>
    <p>
      {{from | moment('DD/MM/YYYY')}} -
      <span v-if="to">{{to | moment('DD/MM/YYYY')}}</span>
      <span v-else>Now</span>
    </p>
    <p>
      <strong>Position:</strong>
      {{title}}
    </p>
    <p v-if="location">
      <strong>Location:</strong>
      {{location}}
    </p>
    <p v-if="description">
      <strong>Description:</strong>
      {{description}}
    </p>
  </div>
</template>

<script>
export default {
  name: "ProfileExperience",
  props: ["experience"],
  data() {
    return {
      company: this.$props.experience.company,
      location: this.$props.experience.location,
      title: this.$props.experience.title,
      to: this.$props.experience.to,
      from: this.$props.experience.from,
      description: this.$props.experience.description
    };
  }
};
</script>

<style>
</style>