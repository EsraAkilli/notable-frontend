<template>
  <div>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'home' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-item tag="router-link" :to="{ name: 'home' }"> Home </b-navbar-item>
        <b-navbar-dropdown label="User">
          <b-navbar-item tag="router-link" :to="{ name: 'me' }"> My Page </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ name: 'list' }"> My Notes </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ name: 'create' }"> Create Note </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link :to="{ name: 'register' }" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link :to="{ name: 'login' }" class="button is-light"> Log in </router-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>
