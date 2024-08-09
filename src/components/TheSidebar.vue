<template>
 <aside>
  <teleport to="body">
   <base-popup v-if="createPopupIsOpen">
    <div class="popup-list">
     <div class="selected-list">
      <base-input
       placeholder="Channel name"
       :value="newChannel.name"
       @input="newChannel.name = $event.target.value"
      />
      <ul class="selected-users">
       <li v-for="user in newChannel.usersList" :key="user.id">
        {{ user.name }}
       </li>
      </ul>
      <base-button @click="createChannel" title="Create" mode="full" />
     </div>
     <div class="search-list">
      <sidebar-list content="users" mode="popup" @addUser="addUser" />
      <base-button title="Close" mode="flat" @click="closePopup" />
     </div>
    </div>
   </base-popup>
  </teleport>

  <img
   @click="toggleSidebarMobile"
   class="arrow-mobile"
   :class="{ active: sideBarIsOpen }"
   src="@/assets/arrow.svg"
   alt="arrow-icon"
  />
  <div class="sidebar" :class="{ active: sideBarIsOpen }">
   <base-button
    @click="this.createPopupIsOpen = true"
    title="create channel"
    mode="full"
   />
   <div class="list-btns">
    <button
     @click="selectChannels"
     :class="{ active: listMode === 'channels' }"
    >
     Channels
    </button>
    <button @click="selectUsers" :class="{ active: listMode === 'users' }">
     Users
    </button>
   </div>
   <sidebar-list :content="listMode" />
  </div>
 </aside>
</template>

<script>
import SidebarList from './SidebarList.vue';
import { useChatStore } from '@/store/chat';

export default {
 components: { SidebarList },
 data() {
  return {
   store: useChatStore(),
   listMode: 'users',
   createPopupIsOpen: false,
   sideBarIsOpen: true,
   newChannel: {
    usersList: {},
    name: '',
   },
  };
 },

 methods: {
  //Toggles the sidebar on low-resolution screens
  toggleSidebarMobile() {
   this.sideBarIsOpen = !this.sideBarIsOpen;
   this.$emit('toggleSideBar');
  },
  closePopup() {
   this.createPopupIsOpen = false;
   this.newChannel.name = '';
   this.newChannel.usersList = {};
  },
  //Adds a user to the channel list upon its creation
  addUser(user) {
   if (this.newChannel.usersList[user.id]) {
    return;
   }
   this.newChannel.usersList[user.id] = user;
  },
  //Selects list mode in the sidebar
  selectChannels() {
   this.listMode = 'channels';
  },
  selectUsers() {
   this.listMode = 'users';
  },
  //создает новый канал
  createChannel() {
   if (this.newChannel.name) {
    this.store.createChannel(this.newChannel);
    this.createPopupIsOpen = false;
    this.newChannel.name = '';
    this.newChannel.usersList = {};
   }
  },
 },
};
</script>

<style lang="scss" scoped>
.arrow-mobile {
 display: none;
 transition: 250ms;
}
.arrow-mobile.active {
 transition: 250ms;
 transform: rotate(180deg);
}
.search-list {
 height: 100%;
 display: grid;
 grid-template-columns: 1fr;
 grid-template-rows: 88% 1fr;
}
.selected-users {
 overflow-y: auto;
}
button {
 border-radius: 5px 5px 0px 0px;
 border-style: hidden;
 outline: none;
 padding: 10px;
 cursor: pointer;
 font-size: 16px;
 width: 100%;
 background-color: transparent;
 border-bottom: solid 3px transparent;
 transition: 150ms;
}
button:hover {
 transition: 150ms;
 background-color: #a7f3d0;
}

button.active {
 transition: 150ms;
 border-bottom: 3px solid green;
}
.popup-list {
 position: relative;
 display: flex;
 flex-direction: row;
 padding: 15px;
 grid-gap: 15px;
 width: 100%;
 height: 100%;
 .selected-users {
  height: 94%;
  margin-bottom: 10px;
 }
}
.selected-list {
 display: grid;
 grid-template-rows: 10% 78% 12%;
}
ul {
 margin-top: 15px;
 display: flex;
 flex-direction: column;
 grid-gap: 10px;
 height: 83%;
 list-style: none;
}
li {
 font-weight: 500;
 border-radius: 5px;
 font-size: 16px;
 background-color: #e2e8f0;
 padding: 15px;
 transition: 150ms;
 cursor: pointer;
}

li:hover {
 transition: 150ms;
 background-color: #cbd5e1;
}
.sidebar {
 display: grid;
 grid-template-columns: 1fr;
 grid-template-rows: 6% 9% 96%;
 overflow: hidden;
 padding: 15px;
 width: 100%;
 height: 100%;
 background-color: #f1f5f9;
}
.list-btns {
 margin: 15px 0px 15px 0px;
 display: flex;
 flex-direction: row;
}
@media screen and (max-width: 1430px) {
 .sidebar {
  grid-template-rows: 7% 12% 89%;
 }
}
@media screen and (max-width: 640px) {
 .arrow-mobile {
  display: block;
  margin-top: 5px;
 }
 aside {
  background-color: #f1f5f9;
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0px 10px 0px 10px;
 }
 .sidebar.active {
  height: 91%;
  position: absolute;
  top: 34px;
  left: 0%;
  grid-template-rows: 11% 19% 70%;
  padding: 10px;
  transition: 150ms;
 }
 .sidebar {
  transition: 150ms;
  position: absolute;
  left: -100%;
 }
}
</style>
