<template>
  <div class="login">
    <nav class="login__nav">
      <div class="block block--green" />
      <div class="login__nav--container">
        <div v-for="n in 3" :key="n" class="block block--green block--small" />
      </div>
    </nav>
    <h1 class="login__title">Submit your details</h1>
    <div class="login__container">
      <form class="login__form" @submit="onSubmit">
        <label for="name" class="input__label">Name</label>
        <input
          id="name"
          class="input input__textfield"
          v-model="name"
          autocomplete="false"
          type="text"
        />
        <label for="email" class="input__label">Email</label>
        <input
          id="email"
          class="input input__textfield"
          v-model="email"
          autocomplete="false"
          type="text"
        />
        <div class="login__checkbox-container">
          <input
            id="checkbox"
            class="input input__checkbox"
            checked="checked"
            type="checkbox"
          />
          <label for="checkbox" class="input__label input__label--small"
            >I want to reveive updates via email.</label
          >
        </div>
        <button type="submit" class="login__button">Start the course</button>
      </form>
      <div class="login__info"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const name = ref("");
const email = ref("");

const onSubmit = (event) => {
  event.preventDefault();
  loginMethod();
};

const checkForm = () => {
  if (this.name && this.age) {
    return true;
  }

  this.errors = [];

  if (!this.name) {
    this.errors.push("Name required.");
  }
  if (!this.age) {
    this.errors.push("Age required.");
  }
};

const loginMethod = () => {
  store
    .dispatch("getToken", {
      name: name.value,
      email: email.value,
    })
    .then(() => {
      router.push({ name: "home" });
    });
};
</script>

<style scoped lang="scss">
@import "@/pages/login/loginPage.scss";
</style>
