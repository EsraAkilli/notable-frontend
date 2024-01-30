<template>
  <div class="flex-container">
    <p>Merhaba {{ userFullName }} 🎉</p>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "HomePage",
  computed: {
    ...mapState(["userFullName"])
  },
  mounted() {
    this.$nextTick(function () {
      this.$store.dispatch("userMe")
    })
  }
}
</script>

<style>
.flex-container p {
  font-size: 24px;
  padding: 20px;
  color: #403e47;
  margin-bottom: 20px;
}
</style>
