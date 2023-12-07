<template>
  <div>
    <section>
      <p>User Profile</p>

      <b-field label="Name">
        <b-input v-model="name" type="text" maxlength="30" />
      </b-field>

      <b-field label="Email">
        <b-input v-model="email" type="email" maxlength="30" />
      </b-field>

      <b-field label="Password">
        <b-input v-model="password" type="password" password-reveal />
      </b-field>

      <b-button :loading="isLoading" @click="updateProfile">Update</b-button>
    </section>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      isLoading: false
    }
  },
  mounted() {
    this.$http
      .get("user/me")
      .then((response) => {
        this.name = response.data.name
        this.email = response.data.email
        this.password = response.data.password
      })
      .catch((error) => {
        console.log(error)
        this.$buefy.toast.open({
          message: "Something went wrong.",
          type: "is-danger"
        })
      })
  },
  methods: {
    updateProfile() {
      const data = {
        name: this.name,
        email: this.email
      }

      this.isLoading = true

      this.$http
        .put("user/me", data)
        .then(() => {
          this.$buefy.notification.open({
            duration: 5000,
            message: "Profile updated!",
            position: "is-bottom",
            type: "is-success"
          })
        })
        .catch((error) => {
          console.log(error)
          this.$buefy.toast.open({
            duration: 5000,
            message: "Failed to update profile",
            position: "is-bottom",
            type: "is-danger"
          })
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
