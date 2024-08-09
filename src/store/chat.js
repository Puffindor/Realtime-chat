import { defineStore } from 'pinia';
import {
 getAuth,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 onAuthStateChanged,
 signOut,
} from 'firebase/auth';
import { ref, set, child, get, onValue } from 'firebase/database';
import db from '@/firebase';

const dbRef = ref(db);

export const useChatStore = defineStore('chat', {
 state: () => {
  return {
   id: null,
   email: null,
   channels: [],
   users: [],
   selectedChannel: null,
  };
 },

 getters: {
  getSelectedChannel(state) {
   if (state.channels) {
    return state.channels[state.selectedChannel];
   }
  },
  //Returns all messages in the selected channel; in a real application,
  //it’s better to load them in chunks as you scroll
  //Also, use a virtual list for messages to avoid lag with a large number of items
  getMessages() {
   if (this.selectedChannel && this.channels[this.selectedChannel].messages) {
    return Object.values(this.channels[this.selectedChannel].messages);
   } else [];
  },
  getId(state) {
   return state.id;
  },
  getEmail(state) {
   return state.email;
  },
  getChannels(state) {
   return state.channels;
  },
  getUsers(state) {
   return state.users;
  },
 },
 actions: {
  signOut() {
   signOut(getAuth());
  },
  //Automatically logs in upon page reload
  autoSingIn() {
   onAuthStateChanged(getAuth(), (user) => {
    if (user) {
     this.email = user.email;
     this.id = user.uid;
    }
   });
  },
  leaveChannel() {
   set(
    ref(db, 'channels/' + this.selectedChannel + '/members/' + this.id),
    null
   );
  },
  joinChannel(channelId) {
   set(ref(db, 'channels/' + channelId + '/members/' + this.id), {
    name: this.email,
    id: this.id,
   });
  },
  deleteUser(member) {
   set(
    ref(db, 'channels/' + this.selectedChannel + '/members/' + member.id),
    null
   );
  },
  sendMessage(text) {
   const messageId = Date.now();
   set(ref(db, 'channels/' + this.selectedChannel + '/messages/' + messageId), {
    id: messageId,
    author: this.email,
    text: text,
   });
  },
  setSelectedChannel(payload) {
   this.selectedChannel = payload;
  },

  fetchChannels() {
   //Called every time data changes, such as when new messages appear
   onValue(ref(db, `channels`), (snapshot) => {
    this.channels = snapshot.val();
   });
  },
  //Fetches all users and removes the logged-in user from the list
  fetchUsers() {
   get(child(dbRef, `users`))
    .then((data) => {
     if (data) {
      const users = data.val();
      delete users[this.id];
      this.users = users;
     }
    })
    .catch((error) => alert(`Failed to fetch users: ${error}`));
  },
  //Creates a new user and logs in
  async signUp(payload) {
   createUserWithEmailAndPassword(getAuth(), payload.login, payload.password)
    .then((data) => {
     if (data) {
      this.signIn(payload);
      set(ref(db, 'users/' + data.user.uid), {
       name: data.user.email,
       id: data.user.uid,
      });
      this.email = data.user.email;
     }
    })
    .catch((error) => alert(`Error: ${error.message}`));
  },
  async signIn(payload) {
   signInWithEmailAndPassword(getAuth(), payload.login, payload.password)
    .then((userCredential) => {
     this.email = userCredential.user.email;
     this.id = userCredential.user.uid;
    })
    .catch(() => alert('Wrong login or password'));
  },
  //Create new channel with the current user as the admin
  createChannel(payload) {
   const channelId = Date.now();
   set(ref(db, 'channels/' + channelId), {
    id: channelId,
    name: payload.name,
    admin: this.id,
    massages: null,
    members: Object.assign(
     {
      [this.id]: {
       name: this.email,
       id: this.id,
      },
     },
     payload.usersList
    ),
   });
  },
 },
});
