<script setup lang='ts'>
const el = {
  action: '/api/file/uploadImg',
  size: 2,
  limit: 1,
  headers: {
    Authorization: localStorage.getItem('token'),
  },
}
const list = $ref([
  { name: 'aa', url: 'https://iot-manage.oss-cn-shenzhen.aliyuncs.com/attachment/202208/20220830/e95d3d2d-6a2b-4762-8242-ae46fc158831.jpeg?Expires=1977205299&OSSAccessKeyId=LTAI5tSPVuXs5uYbRfwMFkxV&Signature=8dDDg4fVBAHPA4L%2Fk0bPZhjlolE%3D' },
])
</script>

<template>
  <div class="h-full">
    <c-upload v-model="list" placeholder="只支持.jpg .png .jpeg格式，建议图片比例1:2，不超过2M" :el="el" />
  </div>
</template>

<style lang="css" scoped>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
