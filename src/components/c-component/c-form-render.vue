<script setup lang='ts'>
import type { PropType } from 'vue'
import type { FormInstance } from 'element-plus'
const props = defineProps({
  data: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  forms: {
    type: Array as PropType<IForm []>,
    default: () => [],
  },
  info: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
})
type ShowFn = (info: Record<string, any>) => boolean
interface IForm {
  prop: string
  label: string
  type: string
  show?: boolean | ShowFn
  rules?: any []
  el?: Record<string, any>
  options?: IOption []
}
interface IOption {
  label: string
  value: string
}

const displayForms = computed(() => {
  return props.forms.filter((form) => {
    if (typeof form.show === 'function')
      return form.show(props.info)

    return form.show !== false
  })
})

const formRef = $ref<FormInstance | undefined>()
const validate = () => {
  if (!formRef)
    throw new Error('formRef is undefined')
  return new Promise((resolve, reject) => {
    formRef.validate((valid) => {
      if (valid)
        resolve(true)
      else
        reject()
    })
  })
}

function resetFile(val: any) {
  const type = Object.prototype.toString.call(val)
  switch (type) {
    case '[object String]':
      return ''
    case '[object Array]':
      return []
    case '[object Number]':
      return ''
    default:
      return val
  }
}

const reset = () => {
  Object.keys(props.data).forEach((prop) => {
    // eslint-disable-next-line vue/no-mutating-props
    props.data[prop] = resetFile(props.data[prop])
  })
}

defineExpose({
  validate,
  reset,
})
</script>

<template>
  <div class="c-form-render">
    <el-form ref="formRef" :model="props.data" label-width="120px" label-position="top">
      <el-form-item v-for="item in displayForms" :key="item.prop" v-bind="item">
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <el-input v-if="item.type === 'input'" v-model="props.data[item.prop]" v-bind="item.el" />
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <el-select v-else-if="item.type === 'select'" v-model="props.data[item.prop]" class="w-full" v-bind="item.el">
          <el-option v-for="(option, index) in item.options" :key="index" :label="option.label" :value="option.value" />
        </el-select>
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <el-radio-group v-else-if="item.type === 'radio'" v-model="props.data[item.prop]">
          <el-radio v-for="(option, index) in item.options" :key="index" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <rule-form v-else-if="item.type === 'rule'" v-model="props.data[item.prop]" />
        <p v-else>
          不支持表单
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="css" scoped>
</style>
