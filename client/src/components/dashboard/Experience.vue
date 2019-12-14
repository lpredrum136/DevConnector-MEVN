<template>
  <div>
    <h2 class="my-3">Experience</h2>
    <b-table-simple hover>
      <b-thead head-variant="light">
        <b-tr>
          <b-th>Company</b-th>
          <b-th>Title</b-th>
          <b-th>Years</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="experience in myExperience" :key="experience._id">
          <b-td>{{ experience.company }}</b-td>
          <b-td>{{ experience.title }}</b-td>
          <b-td>
            {{ experience.from | moment('DD/MM/YYYY') }} -
            <span v-if="experience.to === null">Now</span>
            <span v-else>{{ experience.from | moment('DD/MM/YYYY') }}</span>
          </b-td>
          <b-td class="text-center">
            <b-button variant="danger" @click="deleteExperience(experience._id)">Delete</b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Experience",
  props: ["myExperience"],
  methods: {
    ...mapActions(["deleteExperience"])
  }
};
</script>

<style></style>
