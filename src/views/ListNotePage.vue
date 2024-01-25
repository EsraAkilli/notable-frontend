<template>
  <div>
    <section>
      <note-form @newNote="getList" />
      <hr />

      <div v-if="notes.length === 0">
        <p>You have not any notes yet.</p>
      </div>

      <div v-else class="section">
        <div v-for="note in notes" :key="note.id">
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
              <b-button type="is-succes" class="card-footer-item" @click="openEditModal(note.id)">Edit</b-button>
              <b-button type="is-succes" class="card-footer-item" @click="openDeleteModal(note.id)">Delete</b-button>
            </footer>
          </div>
        </div>
      </div>
    </section>

    <b-modal
      :active.sync="isEditModal"
      trap-focus
      aria-role="dialog"
      aria-label="Update"
      close-button-aria-label="Close"
    >
      <note-form :id="editNoteId" @updateNote="getList" />
    </b-modal>

    <b-modal
      :active.sync="isDeleteModal"
      trap-focus
      aria-role="dialog"
      aria-label="Delete Confirmation"
      close-button-aria-label="Close"
    >
      <p>Are you sure you want to delete this note? <i class="fas fa-trash-alt"></i></p>
      <b-button type="is-danger" @click="deleteNote">Delete</b-button>
      <b-button class="ml-2" @click="closeDeleteModal">Cancel</b-button>
    </b-modal>
  </div>
</template>

<script>
import NoteForm from "@/components/NoteForm.vue"

export default {
  name: "ListNotePage",
  components: { NoteForm },
  data() {
    return {
      editNoteId: null,
      data: null,
      notes: [],
      isEditModal: false,
      isDeleteModal: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.isEditModal = false

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
    },
    openEditModal(noteId) {
      this.editNoteId = noteId
      this.isEditModal = true
    },
    openDeleteModal(noteId) {
      this.isDeleteModal = true
      this.editNoteId = noteId
    },
    closeDeleteModal() {
      this.isDeleteModal = false
      this.editNoteId = null
    },
    deleteNote() {
      this.isDeleteModal = false
      this.editNoteId = null
    }
  }
}
</script>

<style scoped>
.section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  overflow-x: auto;
}
.card {
  width: 200px;
  height: 150px;
}
</style>
