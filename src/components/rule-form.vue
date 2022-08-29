<script setup lang='ts'>
const props = defineProps({
  modelValue: [String, Array],
})
const emit = defineEmits(['update:modelValue'])
const predefineColors = $ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
])

function generateOne() {
  return {
    number: '',
    name: '',
    color: '',
  }
}

let valueList = $ref([
  generateOne(),
])

const onAdd = () => {
  valueList.push(generateOne())
}

watch(valueList, (val) => {
  emit('update:modelValue', val)
})

watch(() => props.modelValue, (val) => {
  if (typeof val === 'string') {
    valueList = JSON.parse(val)
    emit('update:modelValue', valueList)
  }
}, {
  immediate: true,
})
</script>

<template>
  <div class="">
    <div v-for="(item, index) in valueList" :key="index" class="flex items-center mt-4">
      <el-input v-model="item.name" class="w-24" placeholder="等级/分数" />
      <span class="inline-block text-center w-10">-</span>
      <el-input v-model="item.number" type="number" class="w-20 mr-4" />
      <el-color-picker
        v-model="item.color"
        show-alpha
        :predefine="predefineColors"
      />
    </div>
    <span class="text-blue-500 text-sm cursor-pointer mt-1" @click="onAdd">添加规则</span>
  </div>
</template>

<style lang="css" scoped>
</style>
