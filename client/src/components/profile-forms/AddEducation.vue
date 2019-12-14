<template>
  <b-container class="mt-3">
    <h1 class="page-title">Add Education</h1>
    <h2 class="my-3">
      <i class="fas fa-glasses"></i> Add any school or bootcamp that you have attended
    </h2>
    <b-card class="my-3 page-title">
      <p>
        <small>
          <strong style="color: red">* = required field</strong>
        </small>
      </p>
      <b-form @submit="onSubmit">
        <b-form-group label-for="school">
          <b-form-input id="school" placeholder="* School or Bootcamp" v-model="school"></b-form-input>
        </b-form-group>

        <b-form-group label-for="degree">
          <b-form-input id="degree" placeholder="* Degree or Certificate" v-model="degree"></b-form-input>
        </b-form-group>

        <b-form-group label-for="fieldofstudy">
          <b-form-input id="fieldofstudy" placeholder="* Field of Study" v-model="fieldofstudy"></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-input-group>
            <template v-slot:prepend>
              <b-input-group-text>
                <strong>From Date</strong>
              </b-input-group-text>
            </template>
            <b-form-input id="from" type="date" v-model="from"></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group>
          <b-form-checkbox id="current" v-model="current" name="current">Current School</b-form-checkbox>
        </b-form-group>

        <b-form-group v-if="!current">
          <b-input-group>
            <template v-slot:prepend>
              <b-input-group-text>
                <strong>To Date</strong>
              </b-input-group-text>
            </template>
            <b-form-input id="to" type="date" v-model="to"></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group label-for="description">
          <b-form-input id="description" placeholder="Course Description" v-model="description"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mr-2">Add Education</b-button>
        <b-button to="/dashboard" variant="secondary">Go Back</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddEducation",
  data() {
    return {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: ""
    };
  },
  methods: {
    ...mapActions(["addEducation"]),
    onSubmit(event) {
      event.preventDefault();

      const formData = {
        school: this.school,
        degree: this.degree,
        fieldofstudy: this.fieldofstudy,
        from: this.from,
        to: this.to,
        current: this.current,
        description: this.description
      };

      this.addEducation(formData);
    }
  },
  watch: {
    // If current is changed, if it's true, reset "to"
    current(newValue) {
      if (newValue) this.to = "";
      // or if (this.current) this.to = ''; is also ok
    }
  }
};
</script>

<style>
</style>