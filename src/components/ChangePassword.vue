<template>
  <div>
    <form @submit.prevent="submit">
      <div class="modal-card has-background-white" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Change Password</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>

        <section class="modal-card-body">
          <b-field label="Current Password">
            <b-input
              v-model="current_password"
              type="password"
              password-reveal
              placeholder="Your current password"
              required
            />
          </b-field>

          <b-field label="New Password">
            <b-input v-model="password" type="password" password-reveal placeholder="Your new password" required />
          </b-field>

          <b-field label="Confirm New Password">
            <b-input
              v-model="password_confirmation"
              type="password"
              password-reveal
              placeholder="Your new password"
              required
            />
          </b-field>
        </section>

        <footer class="modal-card-foot">
          <b-button label="Close" @click="$emit('close')" />
          <b-button native-type="submit" label="Change" type="is-primary" />
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      current_password: null,
      password: null,
      password_confirmation: null
    }
  },
  methods: {
    submit() {
      const data = {
        current_password: this.current_password,
        password: this.password,
        password_confirmation: this.password_confirmation
      }

      console.log(data)

      this.$http
        .put("user/password", data)
        .then(() => {
          this.$buefy.notification.open({
            duration: 5000,
            message: "Password changed!",
            position: "is-bottom",
            type: "is-success"
          })

          this.$emit("close")
        })
        .catch((error) => {
          console.log(error.response)
          this.$buefy.toast.open({
            duration: 5000,
            message: "Failed to change password",
            position: "is-bottom",
            type: "is-danger"
          })
        })
    }
  }
}
</script>
