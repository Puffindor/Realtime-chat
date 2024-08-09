<template>
 <div class="container">
  <login v-if="!store.getEmail" />
  <the-header v-else />
  <main v-if="store.getEmail">
   <the-sidebar @toggleSideBar="toggleSideBar" />
   <user-chat :windowWidth="windowWidth" />
  </main>
 </div>
</template>

<script>
import TheSidebar from './components/TheSidebar.vue';
import TheHeader from './components/TheHeader.vue';
import Login from './components/UserLogin.vue';
import { useChatStore } from './store/chat';
import UserChat from './components/UserChat.vue';
export default {
 components: { Login, TheHeader, TheSidebar, UserChat },
 data() {
  return {
   store: useChatStore(),
   windowWidth: null,
   sideBarIsOpen: true,
  };
 },
 methods: {
  toggleSideBar() {
   this.sideBarIsOpen = !this.sideBarIsOpen;
  },
 },
 computed: {
  gridColumns() {
   if (this.sideBarIsOpen) {
    return '38% 62%';
   }
   return '7% 93%';
  },
 },

 mounted() {
  this.windowWidth = window.screen.width;
  this.store.autoSingIn();
 },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
::-webkit-scrollbar {
 box-shadow: inset 0 0 10px 10px transparent;
 border: solid 3px transparent;
}
::-webkit-scrollbar-thumb {
 box-shadow: inset 0 0 10px 10px #64748b;
 border-radius: 10px;
 border: solid 6px transparent;
}
main {
 height: 92%;
 width: 100%;
 display: grid;
 grid-template-columns: 20% 80%;
 grid-template-rows: 100%;
}
.container {
 height: 100vh;
 width: 100vw;
}
* {
 font-family: 'Poppins', sans-serif;
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}
@media screen and (max-width: 640px) {
 main {
  height: 90%;
  grid-template-columns: v-bind(gridColumns);
  transition: 150ms;
 }
}
</style>
