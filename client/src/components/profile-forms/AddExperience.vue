<template>
  <b-container class="mt-3">
    <h1 class="page-title">Add Experience</h1>
    <h2 class="my-3">
      <i class="fas fa-briefcase"></i>
      Add any developer/programming positions that you have had in the past
    </h2>
    <b-card class="my-3 page-title">
      <p>
        <small>
          <strong style="color: red">* = required field</strong>
        </small>
      </p>
      <b-form @submit="onSubmit">
        <b-form-group label-for="title">
          <b-form-input id="title" placeholder="* Job Title" v-model="title"></b-form-input>
        </b-form-group>

        <b-form-group label-for="company">
          <b-form-input id="company" placeholder="* Company" v-model="company"></b-form-input>
        </b-form-group>

        <b-form-group label-for="location" description="City & state suggested (eg. Boston, MA)">
          <b-form-input id="location" placeholder="Location" v-model="location"></b-form-input>
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
          <b-form-checkbox id="current" v-model="current" name="current">Current Job</b-form-checkbox>
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
          <b-form-input id="description" placeholder="Job Description" v-model="description"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mr-2">Add Experience</b-button>
        <b-button to="/dashboard" variant="secondary">Go Back</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddExperience",
  data() {
    return {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: ""
    };
  },
  methods: {
    ...mapActions(["addExperience"]),
    onSubmit(event) {
      event.preventDefault();

      const formData = {
        company: this.company,
        title: this.title,
        location: this.location,
        from: this.from,
        to: this.to,
        current: this.current,
        description: this.description
      };

      this.addExperience(formData);
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