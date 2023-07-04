<template>
  <div class="content">
    <app-header />
    <el-button type="primary" @click="userLogin">primary</el-button>
    <div>{{ en }}</div>
  </div>
</template>

<script setup>
import AppHeader from './components/common/app-header.vue'
// 接口测试
// import axios from 'axios'
// axios
//   .post('/api/user/login', {
//     username: 'admin',
//     password: '111111',
//   })
//   .then((res) => {
//     console.log(res)
//   })
import { reqLogin } from '@/api/user'
async function userLogin(data) {
  data = {
    username: 'admin',
    password: '111111',
  }
  const res = await reqLogin(data)
  console.log(res)
}

// 获取环境变量
const en = import.meta.env.VITE_USER_NODE_ENV
console.log(import.meta)
</script>

<style scoped>
.content {
  width: 1020px;
  padding: 0 20px;
  margin: 0 auto;
}
</style>
