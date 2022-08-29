<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['page-change'])
const currentPage = ref(1)
const pageSize = ref(15)

let height = $ref(0)

const handleResize = () => {
  height = document.body.clientHeight - 60 - 56 - 40 - 40 - 16 - 20
}

handleResize()
onMounted(() => {
  window.addEventListener('resize', handleResize, false)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize, false)
})
</script>

<template>
  <div class="relative pb-14 pt-10 h-full overflow-hidden">
    <div class="absolute left-0 top-0 h-10 w-full">
      <slot name="header" />
    </div>
    <div v-loading="props.loading" class=" border-solid border-light-800">
      <el-table v-bind="$attrs" style="width: 100%" :height="height">
        <slot name="body" />
      </el-table>
    </div>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      class="absolute right-0 bottom-0"
      :page-sizes="[15, 20, 50, 100]"
      :small="false"
      :disabled="false"
      :background="false"
      layout="prev, pager, next, jumper"
      :total="1000"
      @current-change="(page: number) => emit('page-change', page)"
    />
  </div>
</template>
