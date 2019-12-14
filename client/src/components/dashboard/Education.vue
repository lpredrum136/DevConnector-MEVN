<template>
  <div>
    <h2 class="my-3">Education</h2>
    <b-table-simple hover>
      <b-thead head-variant="light">
        <b-tr>
          <b-th>School</b-th>
          <b-th>Degree</b-th>
          <b-th>Years</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="education in myEducation" :key="education._id">
          <b-td>{{ education.school }}</b-td>
          <b-td>{{ education.degree }}</b-td>
          <b-td>
            {{ education.from | moment('DD/MM/YYYY') }} -
            <span v-if="education.to === null">Now</span>
            <span v-else>{{ education.from | moment('DD/MM/YYYY') }}</span>
          </b-td>
          <b-td class="text-center">
            <b-button variant="danger" @click="deleteEducation(education._id)">Delete</b-button>
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
  props: ["myEducation"],
  methods: {
    ...mapActions(["deleteEducation"])
  }
};
</script>

<style></style>
