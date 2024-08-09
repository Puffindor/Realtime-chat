<template>
 <header>
  <p>{{ store.getEmail }}</p>
  <div class="btn">
   <base-button @click="signOut" mode="full" title="Logout" type="red" />
  </div>
 </header>
</template>

<script>
import { useChatStore } from '@/store/chat';
export default {
 data() {
  return {
   store: useChatStore(),
  };
 },
 methods: {
  signOut() {
   this.store.signOut();
   this.store.$reset();
  },
 },
};
</script>

<style lang="scss" scoped>
.btn {
 width: 10%;
}
header {
 height: 8%;
 background-color: #64748b;
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 0px 15px;
 color: white;
 font-size: 20px;
 font-weight: 600;
}
@media screen and (max-width: 640px) {
 header {
  height: 10%;
 }
}
</style>
