<template>
  <div>
    <section>
      <form class="box" @submit.prevent="submit">
        <b-field>
          <b-input v-model="title" type="text" placeholder="Title" maxlength="255" />
        </b-field>

        <b-field>
          <b-input v-model="content" type="textarea" placeholder="Content" maxlength="255" />
        </b-field>

        <b-button v-if="isEdit" type="is-success" @click="closeModal()">Close</b-button>
        <b-button native-type="submit" :loading="isLoading" type="is-success">{{ btnSubmitText }}</b-button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "NoteForm",
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      title: null,
      content: null,
      isLoading: false
    }
  },
  computed: {
    isCreate() {
      return this.id === null
    },
    isEdit() {
      return !this.isCreate
    },
    btnSubmitText() {
      return this.isCreate ? "Add" : "Update"
    }
  },
  mounted() {
    if (this.isEdit) {
      this.getNoteDetails()
    }
  },
  methods: {
    submit() {
      const data = {
        id: this.id,
        title: this.title,
        content: this.content
      }

      this.isLoading = true

      const endPoint = this.isEdit ? `note/${this.id}` : "note/create"
      const method = this.isCreate ? "post" : "put"

      this.$http({
        method: method,
        url: endPoint,
        data: data
      })
        .then((data) => {
          console.log(data)
          this.$emit("updateNote")
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
    },
    closeModal() {
      this.$parent.close()
    },
    getNoteDetails() {
      this.isLoading = true

      this.$http
        .get(`note/${this.id}`)
        .then(({ data }) => {
          const noteDetails = data

          this.title = noteDetails.title
          this.content = noteDetails.content

          console.log(noteDetails)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style>
.box {
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 30px;
}
section {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
