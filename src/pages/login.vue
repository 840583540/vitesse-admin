<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { login } from '@/api/index.ts'

const userStore = useUserStore()
const router = useRouter()
const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const model = reactive({
  account: '',
  password: '',

})

const loginForm = ref<any>(null)
const submitForm = () => {
  loginForm.value.validate((valid: boolean) => {
    if (valid) {
      login(model).then((resp: any) => {
        if (resp.success) {
          userStore.setToken(resp.data.token)
          userStore.setUserInfo(resp.data.user)
          ElMessage.success('登录成功')
          router.push('/')
        }
      })
    }
  })
}
</script>

<template>
  <div class="login-page w-full h-full relative">
    <el-card class="absolute right-1/6 top-1/4 w-460px p-4">
      <h2 class="w-full text-3xl mb-8 text-left">
        登录
      </h2>
      <!-- 登录 -->
      <el-form ref="loginForm" :model="model" :rules="rules" label-width="0">
        <el-form-item prop="account">
          <el-input v-model="model.account" placeholder="请输入账号" size="large">
            <template #prepend>
              <span class="inline-block  i-carbon:user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="mt-10">
          <el-input
            v-model="model.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            @keyup.enter="submitForm()"
          >
            <template #prepend>
              <span class="inline-block  i-carbon:password" />
            </template>
          </el-input>
        </el-form-item>
        <div class="text-left mt-10">
          <el-button type="primary" class="w-50" size="large" @click="submitForm()">
            登录
          </el-button>
        </div>
        <!-- <p class="text-left text-blue-500 mt-5 flex justify-between">
          <router-link to="/register">
            注册
          </router-link>
          <router-link to="/forget">
            忘记密码
          </router-link>
        </p> -->
      </el-form>
    </el-card>
  </div>
</template>

<style lang="css" scoped>
</style>

<route lang="yaml">
meta:
  layout: login
</route>
