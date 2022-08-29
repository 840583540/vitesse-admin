<script setup lang="ts">
import type { PropType } from 'vue'
import { nextTick } from 'vue'
import type { IForm } from '@/types/render-form.d.ts'
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  url: {
    type: Function,
  },
  formateList: {
    type: Function,
  },
  forms: {
    type: Array as PropType<IForm []>,
    default: () => [],
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
  rowIdKey: {
    type: String,
    default: 'id',
  },
  rowNameKey: {
    type: String,
    default: 'name',
  },
  updateIdKey: {
    type: String,
    default: 'id',
  },
  hasCreate: Boolean,
  hasEdit: Boolean,
  hasDelete: Boolean,
  hasOperation: {
    type: Boolean,
    default: true,
  },
  createUrl: Function,
  updateUrl: Function,
  deleteUrl: Function,
  beforeUpdate: Function,
  beforeCreated: Function,
  beforeGetList: Function,
})
const emit = defineEmits(['pageChange'])
let currentPage = $ref(1)
const pageSize = $ref(10)
let total = $ref(0)

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

// more
const formDialogEl = $ref<any>()
let loading = $ref(false)
let isShowDialog = $ref(false)
let editRowId = $ref()
let dialogType = $ref('create')
let list = $ref([])

const getList = () => {
  const data = {
    current: currentPage,
    size: pageSize,
  }
  props.beforeGetList && props.beforeGetList(data)
  props.url && props.url(data)
    .then((res: any) => {
      total = res.data.total
      return props.formateList ? props.formateList(res.data.records) : res.data.records
    })
    .then((data: any) => {
      list = data
    }).finally(() => {
      loading = false
    })
}
getList()

const handlePageChange = (page: number) => {
  currentPage = page
  emit('pageChange', page)
  getList()
}

const onEdit = (row: any) => {
  Object.keys(props.formData).forEach((key) => {
    // eslint-disable-next-line vue/no-mutating-props
    props.formData[key] = row[key]
  })
  editRowId = row[props.rowIdKey]
  dialogType = 'edit'
  isShowDialog = true
}
const onDel = (row: any) => {
  props.deleteUrl && props.deleteUrl({
    [props.updateIdKey]: row[props.rowIdKey],
  }).then(() => {
    getList()
  })
}
const onCreate = () => {
  dialogType = 'create'
  isShowDialog = true
  nextTick(() => {
    formDialogEl?.reset()
  })
}
const handleSubmit = async () => {
  if (dialogType === 'create') {
    const data = JSON.parse(JSON.stringify(props.formData))
    if (props.beforeCreated)
      await props.beforeCreated(data)
    return props.createUrl && props.createUrl(data).then(() => {
      getList()
    })
  }
  else {
    const data = JSON.parse(JSON.stringify(props.formData))
    data[props.updateIdKey] = editRowId
    if (props.beforeUpdate)
      await props.beforeUpdate(data)

    return props.updateUrl && props.updateUrl(data).then(() => {
      getList()
    })
  }
}
</script>

<template>
  <div class="relative pb-14 pt-10 h-full overflow-hidden">
    <div class="absolute left-0 top-0 h-10 w-full flex justify-between">
      <div>
        <el-button v-if="hasCreate" type="primary" @click="onCreate">
          新建{{ props.title }}
        </el-button>
      </div>
      <div>
        <slot name="header" />
      </div>
    </div>
    <div v-loading="loading" class=" border-solid border-light-800">
      <el-table v-if="!loading" :data="list" style="width: 100%" :height="height">
        <slot name="body" />
        <el-table-column v-if="props.hasOperation" fixed="right" label="操作">
          <template #default="{ row }">
            <slot name="operation" :row="row" />
            <el-button v-if="hasEdit" link type="primary" size="small" @click="onEdit(row)">
              编辑
            </el-button>
            <el-popconfirm v-if="hasDelete" :title="`确实是否删除【${row[props.rowNameKey]}】`" confirm-button-text="确认" cancel-button-text="取消" @confirm="onDel(row)">
              <template #reference>
                <el-button link type="danger" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      class="absolute right-0 bottom-0"
      :small="false"
      :disabled="false"
      :background="false"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="handlePageChange"
    />
    <c-form-dialog
      ref="formDialogEl"
      v-model="isShowDialog"
      :title="dialogType === 'create' ? `新建${props.title}` : `编辑${props.title}` "
      :forms="props.forms"
      :data="formData"
      :info="{
        dialogType,
      }"
      :submit="handleSubmit"
    />
  </div>
</template>
