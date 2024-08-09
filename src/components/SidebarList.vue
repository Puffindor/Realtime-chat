<template>
 <div class="list">
  <div class="search">
   <base-input
    :value="searchQuarry"
    @input="this.searchQuarry = $event.target.value"
    placeholder="Search"
   />
  </div>
  <ul v-if="content === 'users' && searchResult.length > 0">
   <li v-for="user in searchResult" :key="user.id">
    {{ user.name }}

    <add-icon @click="addUser(user)" v-if="mode === 'popup'" />
   </li>
  </ul>
  <ul v-if="content === 'channels' && searchResult.length > 0">
   <li
    @click="setSelectedChannel(channel.id)"
    v-for="channel in searchResult"
    :key="channel.id"
   >
    {{ channel.name }}
    <button
     class="join"
     @click="joinChannel(channel.id)"
     v-if="!channel.members[store.getId]"
    >
     join
    </button>
   </li>
  </ul>
  <p class="not-found" v-if="searchResult.length === 0">Nothing to display</p>
 </div>
</template>

<script>
import addIcon from '@/assets/add-icon.vue';
import { useChatStore } from '@/store/chat';
export default {
 props: ['content', 'mode'],
 components: { addIcon },
 emits: ['addUser'],
 data() {
  return {
   store: useChatStore(),
   searchQuarry: '',
  };
 },
 methods: {
  joinChannel(id) {
   this.store.joinChannel(id);
  },
  //Adds a user to the channel list upon its creation
  addUser(user) {
   this.$emit('addUser', user);
  },
  //Passes the ID of the selected channel
  setSelectedChannel(id) {
   this.store.setSelectedChannel(id);
  },
 },
 computed: {
  //Search for users and channels
  //In a real application, this should be handled on the backend,
  //but as far as I know, Firebase doesn’t support search without extensions."
  searchResult() {
   let list = [];

   if (this.content === 'users') {
    list = Object.values(this.store.getUsers);
   } else {
    list = Object.values(this.store.getChannels);
   }

   if (this.searchQuarry) {
    return list.filter((element) =>
     this.searchQuarry
      .toLocaleLowerCase()
      .includes(element.name.toLocaleLowerCase())
    );
   }
   return list;
  },

  //Slightly adjusts padding in the list version for the popup
  padding() {
   if (this.mode === 'popup') return '11px';
   return '15px';
  },
 },
};
</script>

<style lang="scss" scoped>
.not-found {
 text-align: center;
}
.join {
 border-style: hidden;
 font-size: 16px;
 background-color: transparent;
 padding: 0px;
 background-color: #047857;
 cursor: pointer;
 height: 100%;
 position: absolute;
 right: 0;
 padding: 10px;
 border-radius: 0px 5px 5px 0px;
 color: white;
 transition: 150ms;
}
.join:hover {
 padding: 10px 20px 10px 20px;
 transition: 150ms;
 background-color: #059669;
}
.search {
 margin-bottom: 15px;
}
.list {
 height: 100%;
}
ul {
 display: flex;
 flex-direction: column;
 grid-gap: 10px;
 height: 83%;
 list-style: none;
 overflow-y: auto;
 overflow-x: hidden;
}

li {
 position: relative;
 display: flex;
 justify-content: space-between;
 align-items: center;
 font-weight: 500;
 border-radius: 5px;
 font-size: 16px;
 background-color: #e2e8f0;
 padding: v-bind(padding);
 transition: 150ms;
 cursor: pointer;
}

li:hover {
 transition: 150ms;
 background-color: #cbd5e1;
}
@media screen and (max-width: 640px) {
 li {
  padding: 10px;
 }
}
</style>
