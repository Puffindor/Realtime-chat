<template>
 <div class="chat-container" :class="{ empty: !store.getSelectedChannel }">
  <div class="chat" v-if="store.getSelectedChannel">
   <div class="chat-head" @click="setMembersOpenMobile">
    <p class="name">{{ store.getSelectedChannel.name }}</p>
    <p class="members">
     {{ Object.keys(store.getSelectedChannel.members).length }} members
    </p>
   </div>
   <ul class="messages">
    <li
     v-for="message in store.getMessages"
     :key="message.id"
     :class="{ self: message.author === store.getEmail }"
    >
     <div :class="{ self: message.author === store.getEmail }" class="message">
      <p class="author">{{ message.author }}</p>
      <p class="message-text">{{ message.text }}</p>
     </div>
    </li>
   </ul>
   <div class="input" v-if="showMessageInput">
    <input v-model="messageInput" @keyup.enter="sendMessage" />
    <base-button @click="sendMessage" title="Send" mode="full" />
   </div>
  </div>
  <div
   v-if="store.getSelectedChannel"
   class="chat-side"
   :class="{ active: membersOpenMobile }"
  >
   <ul class="members-list">
    <li
     :class="{ self: store.getId === member.id }"
     v-for="member in store.getSelectedChannel.members"
     :key="member.id"
    >
     {{ member.name }}
     <delete-icon
      v-if="canDeleteUSers && store.getId !== member.id"
      @click="deleteUser(member)"
     />
     <p v-if="store.getSelectedChannel.admin === member.id">Admin</p>
    </li>
   </ul>
   <div class="btn-leave">
    <base-button
     v-if="showMessageInput"
     @click="leaveChannel"
     mode="full"
     type="red"
     title="Leave Channel"
    />
   </div>
  </div>
  <p v-else>No channel selected</p>
 </div>
</template>

<script>
import deleteIcon from '@/assets/delete-icon.vue';
import { useChatStore } from '@/store/chat';
export default {
 components: { deleteIcon },
 props: ['windowWidth'],
 data() {
  return {
   membersOpenMobile: false,
   messageInput: '',
   store: useChatStore(),
  };
 },
 mounted() {
  this.store.fetchUsers();
  this.store.fetchChannels();
 },
 methods: {
  //opens list of channel members on a low-resolution
  setMembersOpenMobile() {
   if (this.windowWidth <= 640) {
    this.membersOpenMobile = !this.membersOpenMobile;
   }
  },
  leaveChannel() {
   this.store.leaveChannel();
  },
  //Removing user from the channel
  deleteUser(member) {
   this.store.deleteUser(member);
  },

  sendMessage() {
   if (this.messageInput) {
    this.store.sendMessage(this.messageInput);
    this.messageInput = '';
   }
  },
 },
 //Automatic scroll to the bottom of the message list
 updated() {
  const list = document.querySelector('.messages');
  if (list) {
   list.scrollTo(0, list.scrollHeight);
  }
 },
 computed: {
  //Allows users to be deleted if the logged user is an admin
  canDeleteUSers() {
   if (
    this.store.getSelectedChannel.admin === this.store.getId &&
    this.store.getSelectedChannel.members[this.store.getId]
   )
    return true;
   return false;
  },
  //Hide message input field if the user is not a member of channel
  showMessageInput() {
   if (
    this.store.getSelectedChannel &&
    this.store.getSelectedChannel.members[this.store.getId]
   ) {
    return true;
   }
   return false;
  },
 },
};
</script>

<style lang="scss" scoped>
.chat-container.empty {
 justify-content: center;
 align-items: center;
}
.members-list {
 overflow-y: auto;
 height: 93%;
 .self {
  background-color: #047857;
  color: white;
  justify-content: space-between;
 }
 .self:hover {
  background-color: #047857;
 }
}
.members-list li {
 display: flex;
 justify-content: space-between;
 align-items: center;
 font-weight: 500;
 border-radius: 5px;
 font-size: 16px;
 grid-gap: 10px;
 background-color: #e2e8f0;
 padding: 15px;
 transition: 150ms;
 cursor: pointer;
 p {
  color: #047857;
 }
}
.members-list li:hover {
 transition: 150ms;
 background-color: #cbd5e1;
}
.chat-container {
 display: flex;
 .chat {
  width: 80%;
  border-left: 2px solid #64748b;
  border-right: 2px solid #64748b;
 }
 .chat-side {
  height: 100%;
  width: 20%;
  background-color: #f1f5f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 15px 15px 15px;
 }
}
.chat-head {
 display: flex;
 justify-content: center;
 flex-direction: column;
 height: 7%;
 background-color: #f1f5f9;
 padding-left: 15px;

 .members {
  font-size: 14px;
 }
}
.message {
 max-width: 40%;
 word-break: break-all;
 padding: 10px;
 border-radius: 5px;
 background-color: #94a3b8;
 .author {
  font-size: 14px;
 }
 .message-text {
  font-size: 16px;
 }
}
.message.self {
 background-color: #047857;
}

li {
 justify-content: right;
 list-style: none;
 margin: 10px 0px 10px 0px;
 display: flex;
}

li.self {
 justify-content: left;
}

.messages {
 padding: 15px;
 overflow-y: scroll;
 height: 84%;
}
.input {
 padding: 15px;
 grid-gap: 15px;
 height: 9%;
 display: grid;
 grid-template-columns: 80% 1fr;
 width: 100%;
 background-color: #f1f5f9;
 input {
  height: 100%;
  outline: none;
  width: 100%;
  background-color: #94a3b8;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  border-style: none;
 }
}

@media screen and (max-width: 1430px) {
 .messages {
  height: 82%;
 }
 .members-list {
  font-size: 14px;
 }
 .chat-container {
  .chat-side {
   width: 25%;
  }
 }
}
@media screen and (max-width: 640px) {
 .members-list li {
  padding: 10px;
  font-size: 14px;
 }
 .chat-head {
  height: 13%;
 }
 .messages {
  height: 75%;
 }
 .input {
  height: 12%;
  padding: 10px;
 }
 .chat-container {
  overflow: hidden;
  .chat {
   width: 100%;
   border: 0px;
  }

  .chat-side {
   height: 90%;
   bottom: 0;
   width: fit-content;
   position: fixed;
   right: 0;
   transition: 150ms;
   transform: translateX(100%);
  }
  .chat-side.active {
   transition: 150ms;
   transform: translateX(0);
  }
 }
 .message {
  .author {
   font-size: 12px;
  }
  .message-text {
   font-size: 14px;
  }
 }
}
@media screen and (max-width: 430px) {
 .messages {
  height: 85%;
 }
 .chat-head {
  height: 7%;
 }
 .input {
  height: 8%;
  grid-template-columns: 70% 1fr;
 }
}
@media screen and (max-width: 375px) {
 .chat-head {
  height: 9%;
 }
 .messages {
  height: 83%;
 }
 .input {
  grid-template-columns: 64% 1fr;
 }
}
</style>
