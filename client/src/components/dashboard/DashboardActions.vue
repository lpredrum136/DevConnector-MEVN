<template>
  <b-button-group class="dashboard-actions">
    <b-button variant="light" to="/edit-profile">
      <i class="fas fa-user"></i> Edit Profile
    </b-button>
    <b-button variant="light" to="/add-experience">
      <i class="fab fa-black-tie"></i> Add Experience
    </b-button>
    <b-button variant="light" to="/add-education">
      <i class="fas fa-graduation-cap"></i> Add Education
    </b-button>
  </b-button-group>
</template>

<script>
export default {
  name: "DashboardActions"
};
</script>

<style>
</style>