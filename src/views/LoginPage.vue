<template>
  <div>
    <section>
      <form v-if="showLoginForm" class="box" @submit.prevent="formSubmit">
        <b-field label="Email">
          <b-input v-model="email" type="email" maxlength="30" />
        </b-field>

        <b-field label="Password">
          <b-input v-model="password" type="password" password-reveal />
        </b-field>

        <b-button native-type="submit" :loading="isLoading">Submit</b-button>
      </form>
    </section>
  </div>
</template>

<script>
import router from "@/router"

export default {
  name: "LoginPage",
  data() {
    return {
      email: null,
      password: null,
      isLoading: false,
      showLoginForm: false
    }
  },
  mounted() {
    this.$store
      .dispatch("userMe")
      .then(() => {
        router.push({ name: "home" })
      })
      .catch(() => {
        this.showLoginForm = true
      })
  },
  methods: {
    formSubmit() {
      this.isLoading = true

      this.$http
        .post("login", {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.access_token)

          this.$buefy.toast.open({
            message: "Submitted!",
            type: "is-success"
          })

          router.push({ name: "home" })
        })
        .catch((error) => {
          console.log(error)
          this.$buefy.toast.open({
            message: "Incorrect email or password.",
            type: "is-danger"
          })
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
