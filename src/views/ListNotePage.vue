<template>
  <div>
    <section>
      <note-form @newNote="getList" />
      <hr />

      <div v-if="notes.length === 0">
        <p>You have not any notes yet.</p>
      </div>

      <div v-else>
        <ul>
          <li v-for="note in notes" :key="note.id">
            <div class="card mb-5">
              <header class="card-header">
                <p class="card-header-title">{{ note.title }}</p>
              </header>

              <div class="card-content">
                <div class="content">
                  {{ note.content }}
                  <br />
                </div>
              </div>

              <footer class="card-footer">
                <a href="#" class="card-footer-item">Save</a>
                <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a>
              </footer>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import NoteForm from "@/components/NoteForm.vue"

export default {
  name: "ListNotePage",
  components: { NoteForm },
  data() {
    return {
      data: null,
      notes: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http
        .get("note/list")
        .then(({ data: { data } }) => {
          this.notes = data
        })
        .catch((error) => {
          console.log(error)

          this.$buefy.toast.open({
            duration: 5000,
            message: "Something went wrong.",
            position: "is-bottom",
            type: "is-danger"
          })
        })
    }
  }
}
</script>
