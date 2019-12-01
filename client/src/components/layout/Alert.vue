<template>
  <b-container>
    <div v-if="userAlerts.length > 0">
      <b-alert
        :show="showToggle"
        dismissible
        :variant="alert.type"
        v-for="alert in userAlerts"
        :key="alert.id"
        class="mt-3"
      >{{ alert.msg }}</b-alert>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Alert",
  data() {
    return { showToggle: true };
  },
  computed: mapGetters(["userAlerts"])
};
</script>

<style></style>
