<template>
  <div class="flex-container">
    <p>Merhaba {{ name }}</p>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      name: null
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.$http.get("/user/me").then((response) => {
        this.name = response.data.name
      })
    })
  }
}
</script>

<style>
.flex-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
