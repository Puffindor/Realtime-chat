<template>
 <section>
  <form>
   <base-input
    placeholder="login"
    :value="login"
    @input="this.login = $event.target.value"
    :valid="loginIsValid"
    @blur="validateLogin"
   />
   <base-input
    type="password"
    placeholder="password"
    :value="password"
    @input="this.password = $event.target.value"
    :valid="passwordIsValid"
    @blur="validatePassword"
   />
   <div class="btns">
    <base-button
     :disabled="!loginIsValid || !passwordIsValid"
     @click.prevent="signUp"
     title="Sign up"
     mode="flat"
    />
    <base-button
     :disabled="!loginIsValid || !passwordIsValid"
     @click.prevent="signIn"
     title="Sign in"
     mode="full"
    />
   </div>
  </form>
 </section>
</template>

<script>
import { useChatStore } from '@/store/chat';
export default {
 data() {
  return {
   login: '',
   password: '',
   loginIsValid: true,
   passwordIsValid: true,
  };
 },
 methods: {
  //Basic validation for login and password
  validateLogin() {
   if (this.login.includes('@') && this.login.length > 3) {
    this.loginIsValid = true;
    return;
   }
   this.loginIsValid = false;
  },
  validatePassword() {
   if (this.password.length > 3) {
    this.passwordIsValid = true;
    return;
   }
   this.passwordIsValid = false;
  },
  //Registering a new user
  signUp() {
   if (
    this.loginIsValid &&
    this.passwordIsValid &&
    this.login.length > 4 &&
    this.password.length > 6
   ) {
    useChatStore().signUp({
     login: this.login,
     password: this.password,
    });
   }
  },
  //Logging into an existing account
  signIn() {
   if (
    this.loginIsValid &&
    this.passwordIsValid &&
    this.login.length > 4 &&
    this.password.length > 6
   ) {
    useChatStore().signIn({
     login: this.login,
     password: this.password,
    });
   }
  },
 },
};
</script>

<style lang="scss" scoped>
.btns {
 height: 50%;
 display: flex;
 flex-direction: row;
 grid-gap: 15px;
}
section {
 width: 100vw;
 height: 100vh;
 display: flex;
 justify-content: center;
 align-items: center;
}
form {
 grid-gap: 15px;
 display: flex;
 flex-direction: column;
 padding: 15px;
 border-radius: 5px;
 background-color: #f1f5f9;
}
</style>
