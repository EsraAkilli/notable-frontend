<template>
  <div class="flex-container">
    <p>Merhaba {{ name }} 🎉</p>
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
}

.flex-container p {
  font-size: 24px;
  padding: 20px;
  color: #403e47;
  margin-bottom: 20px;
}
</style>
