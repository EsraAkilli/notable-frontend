<template>
  <div>
    <section>
      <form @submit.prevent="formRegister" class="box">
        <b-field label="Name">
          <b-input v-model="name" type="text" maxlength="30" />
        </b-field>

        <b-field label="Email">
          <b-input v-model="email" type="email" maxlength="30" />
        </b-field>

        <b-field label="Password">
          <b-input v-model="password" type="password" password-reveal />
        </b-field>

        <b-button native-type="submit" :loading="isLoading">Register</b-button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      isLoading: false
    }
  },
  methods: {
    formRegister() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      this.isLoading = true

      this.$http
        .post("register", data)
        .then((data) => {
          console.log(data)
          this.$buefy.notification.open("Registered!")
        })
        .catch((error) => {
          console.log(error)
          this.$buefy.toast.open({
            duration: 5000,
            message: "Registration failed.",
            position: "is-bottom",
            type: "is-danger"
          })
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
