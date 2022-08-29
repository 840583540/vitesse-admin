<script setup lang='ts'>
import type { PropType } from 'vue'
interface IOption {
  label: string
  value: string
}
interface IForm {
  prop: string
  label: string
  type: string
  show?: boolean
  rules?: any []
  el?: Record<string, any>
  options?: IOption []
}
type Next = () => Promise<boolean>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '标题',
  },
  data: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  forms: {
    type: Array as PropType<IForm []>,
    default: () => [],
  },
  submit: {
    type: Function as PropType<Next>,
  },
  info: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])
let dialogVisible = $ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  dialogVisible = val
})

const formRenderRef = $ref<any>(null)
const handleClose = () => {
  emit('update:modelValue', false)
}

let submitting = $ref(false)
const handleCommit = () => {
  formRenderRef.validate().then(async () => {
    submitting = true
    props.submit && await props.submit()
    submitting = false
    dialogVisible = false
  })
}

const reset = () => {
  formRenderRef && formRenderRef.reset()
}

defineExpose({
  reset,
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="props.title"
    width="50%"
    destroy-on-close
    @close="handleClose"
  >
    <c-form-render ref="formRenderRef" :forms="props.forms" :data="props.data" :info="props.info" />
    <template #footer>
      <span class="dialog-footer">
        <el-button :loading="submitting" @click="dialogVisible = false">取消</el-button>
        <el-button :loading="submitting" type="primary" @click="handleCommit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="css" scoped>
</style>
