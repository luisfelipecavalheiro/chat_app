<template>
  <div class="chat-conversation">
    <div class="chat-conversation__message" v-for="message in messages" :message="message" v-bind:key="message.id">
      <p class="text-left"><strong>{{ message.user.name }}: </strong>{{ message.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatConversation',
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      messages: []
    };
  },
  mounted() {
    this.socket.on('message', (data) => {
      this.messages.push(data);
    });
    this.socket.on('disconnect', () => {
      this.messages = [];
    });
  }
}
</script>
<style>
.chat-conversation {
  padding: 20px 0;
}
</style>
