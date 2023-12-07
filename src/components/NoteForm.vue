<template>
  <div>
    <section>
      <form class="box" @submit.prevent="submit">
        <b-field label="Title">
          <b-input v-model="title" type="text" maxlength="255" />
        </b-field>

        <b-field label="Content">
          <b-input v-model="content" type="text" maxlength="255" />
        </b-field>

        <b-button native-type="submit" :loading="isLoading">Submit</b-button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "NoteForm",
  data() {
    return {
      title: null,
      content: null,
      isLoading: false
    }
  },
  methods: {
    submit() {
      const data = {
        title: this.title,
        content: this.content
      }

      this.isLoading = true

      this.$http
        .post("note/create", data)
        .then((data) => {
          console.log(data)
          this.$emit("newNote")
          this.$buefy.notification.open("Submitted!")
        })
        .catch((error) => {
          console.log(error)

          this.$buefy.toast.open({
            duration: 5000,
            message: "Note submitting has failed.",
            position: "is-bottom",
            type: "is-danger"
          })
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
