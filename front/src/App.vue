<script setup lang="ts">
import { Ref, ref } from 'vue';

interface Msg {
  username: string
  message: string
  datetime: number
}


const username = ref('')
const message = ref('')
const user = ref('')
const msglist: Ref<Msg[]> = ref([])

const ws = new WebSocket('ws:localhost:8000')



const handleWsOpen = () => {}
const handleWsClose = () => {}
const handleWsError = () => {}
const handleWsMessage = (data: any) => {
  const msgData = JSON.parse(data.data)
  console.log('msgData', msgData)
  msglist.value.push(msgData)
}
const bindEvent = () => {
    ws.addEventListener('open', handleWsOpen)
    ws.addEventListener('close', handleWsClose)
    ws.addEventListener('error', handleWsError)
    ws.addEventListener('message', handleWsMessage)
}
const init = () => {
    bindEvent()
}
init()

const handleLoginBtnClick = () => {
  if (username.value === '') return alert('用户名不得为空！')
  localStorage.setItem('username', username.value)
  user.value = username.value
}
const handleSendBtnClick = () => {
  if (message.value === '') return
  const _params = {
    username: username.value,
    message: message.value,
    datetime: new Date().getTime()
  }
  ws.send(JSON.stringify(_params))
}
</script>

<template>
<div v-if="user === ''">
  <input type="text" id="username" v-model="username" placeholder="请输入用户名" />
  <button id="login-btn" @click="handleLoginBtnClick">登录</button>
</div>
<div v-else>
  <input type="text" id="message" v-model="message" placeholder="请输入信息">
  <button id="send-btn" @click="handleSendBtnClick">发送</button>
  <ul>
    <li v-for="msg in msglist" :key="msg.datetime">
      <p>
        {{ new Date(msg.datetime) }}
      </p>
      <p>
        <span>{{ msg.username }}：</span>
        <span>{{ msg.message }}</span>
      </p>
    </li>
  </ul>
</div>
</template>

<style scoped>
</style>
