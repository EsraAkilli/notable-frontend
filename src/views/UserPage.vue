<template>
  <section class="user-page">
    <h1>User Profile</h1>

    <b-field label="Name">
      <b-input v-model="name" type="text" maxlength="30" />
    </b-field>

    <b-field label="Email">
      <b-input v-model="email" type="email" maxlength="30" />
    </b-field>

    <b-button type="is-info" :loading="isLoading" @click="updateProfile">Update</b-button>
    <b-button type="is-success" class="ml-2" @click="openChangePasswordModal">Change Password</b-button>
    <b-button type="is-danger" class="ml-2" @click="logout">Logout</b-button>

    <b-modal
      :active.sync="isChangePasswordModal"
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Change Password"
      close-button-aria-label="Close"
    >
      <change-password @close="closeModalChangePassword" />
    </b-modal>
  </section>
</template>

<script>
import ChangePassword from "@/components/ChangePassword.vue"

export default {
  name: "UserPage",
  components: { ChangePassword },
  data() {
    return {
      name: null,
      email: null,
      isLoading: false,
      isChangePasswordModal: false
    }
  },
  mounted() {
    this.$http
      .get("user/me")
      .then((response) => {
        this.name = response.data.name
        this.email = response.data.email
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
    },
    openChangePasswordModal() {
      this.isChangePasswordModal = true
    },
    closeModalChangePassword() {
      this.isChangePasswordModal = false
    },
    logout() {
      this.$http
        .post("user/logout")
        .then(() => {
          this.$router.push({ name: "login" })
        })
        .catch((error) => {
          console.log(error)
          this.$buefy.toast.open({
            message: "Failed to logout",
            position: "is-bottom",
            type: "is-danger"
          })
        })
    }
  }
}
</script>

<style scoped>
.user-page {
  max-width: 600px;
  padding: 20px;
  margin: auto auto 20px;
  height: 100vh;
}
.user-page h1 {
  font-size: 24px;
  font-weight: bold;
  color: #7957d5;
  margin-bottom: 20px;
}
</style>
