<template>
  <div class="chat">
    <!-- Online Alert -->
    <div class="fadeIn first">
      <b-alert show variant="success">Online</b-alert>
    </div>
    <div  v-if="user.name">
      <div>
        <chat-conversation :socket="socket">
        </chat-conversation>
        <div class="text-left">
          <input @keyup="onKeyUp" v-model="message" />
          <b-button variant="success" @click="sendMessage">Enviar</b-button>
        </div>
      </div>
      <div>
        <chat-user-list :socket="socket"></chat-user-list>
      </div>
    </div>
    <div v-else>
      <div>
        <spin>Erro ao acessar o Chat, faça login na página principal!</spin>
      </div>
      <div>
        <b-button variant="info">
          <router-link to ="/">Login </router-link>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { mapState } from 'vuex'
import ChatConversation from './ChatConversation.vue';
import ChatUserList from './ChatUserList.vue';

export default {
  name: 'chat',
  components: {
    ChatConversation,
    ChatUserList
  },
  data() {
    return {
      message: '',
      socket: null,
      user: {
        name: null
      }
    };
  },
  created() {
    this.user.name = this.users.user.name;
    if (this.user.name) {
      this.socket = io('http://localhost:8081');
      this.socket.on('connect', () => {
        this.connect();
      });
    }
  },
  methods: {
    connect() {
      this.socket.emit('connected', this.user);
    },
    sendMessage() {
      this.socket.emit('message', {
        user: this.user,
        message: this.message
      });
      this.message = '';
    },
    onKeyUp(event) {
      if (event.keyCode === 13) {
        this.sendMessage();
      }
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.emit('disconnected', {
        user: this.user
      });
    }
  },
  // Mapeia Store Base State Vuex
  computed: mapState([
    'users'
  ])
}
</script>
