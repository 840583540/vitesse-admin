<script setup lang='ts'>
import type { PropType } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadFiles, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Array as PropType<UploadUserFile []>,
    default: () => [],
  },
  placeholder: {
    type: String,
  },
  el: {
    type: Object,
  },
})
const emit = defineEmits(['update:modelValue'])

let dialogImageUrl = $ref('')
let dialogVisible = $ref(false)
const disabled = $ref(false)
const refUpload = $ref<any>()
const fileList = $ref<UploadUserFile []>()

const handleRemove = (file: UploadFile) => {
  refUpload.handleRemove(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl = file.url!
  dialogVisible = true
}

function handleChange(_uploadFile: UploadFile, uploadFiles: UploadFiles) {
  emit('update:modelValue', uploadFiles)
}

function handleExceed(_files: any, uploadFiles: UploadFiles) {
  ElMessage.warning(`超出文件个数限制( ${uploadFiles.length} 个)，请先删除已上传的文件`)
}

function beforeAvatarUpload(rawFile: any) {
  if (props?.el?.size && rawFile.size / 1024 / 1024 > props?.el?.size) {
    ElMessage.error(`文件大小不大超出 ${props?.el?.size} M!`)
    return false
  }
  return true
}

onMounted(() => {
  fileList = props.modelValue
})
</script>

<template>
  <el-upload
    ref="refUpload"
    v-model:file-list="fileList"
    action="#"
    accept=".jpg,.png,.jpeg"
    list-type="picture-card"
    :auto-upload="true"
    :on-change="handleChange"
    :on-exceed="handleExceed"
    :before-upload="beforeAvatarUpload"
    v-bind="props.el"
  >
    <el-icon><Plus /></el-icon>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
    <template #tip>
      <div class="el-upload__tip">
        {{ props.placeholder }}
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img class="w-full" :src="dialogImageUrl" alt="Preview Image">
  </el-dialog>
</template>

<style lang="css" scoped>
</style>
