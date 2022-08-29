<script setup lang='ts'>
const tableProp = $ref({
  title: '员工',
  url: '',
  createUrl: 'createTeacher',
  updateUrl: 'updateTeacher',
  deleteUrl: 'deleteTeacher',
  hasCreate: true,
  hasEdit: true,
  hasDelete: true,
  rowIdKey: 'userId',
  updateIdKey: 'userId',
  rowNameKey: 'name',
  forms: [
    {
      type: 'input',
      prop: 'name',
      label: '姓名',
      rules: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
      ],
    },
    {
      type: 'input',
      prop: 'phone',
      label: '电话',
      rules: [
        { required: true, message: '请输入电话', trigger: 'blur' },
      ],
    },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      show(info: any) {
        return info.dialogType === 'create'
      },
      rules: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    },
    {
      type: 'radio',
      prop: 'sex',
      label: '性别',
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
      rules: [
        { required: true, message: '请选择性别', trigger: 'blur' },
      ],
    },
  ],
  formData: {
    name: '',
    phone: '',
    password: '',
    sex: '',
  },
})

const isShowUserClassDialog = $ref(false)
const classForms = $ref([
  {
    type: 'select',
    prop: 'classIds',
    label: '所在班级列表',
    rules: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    options: [],
    el: {
      multiple: true,
    },
  },
])

const classFormData = $ref<any>({
  classIds: [],
  teacherId: '',
})

const handleClassSubmit = () => {
  ElMessage.success('更新成功！')
}
</script>

<template>
  <div class="h-full">
    <c-page-table v-bind="tableProp">
      <template #body>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
            {{ scope.row.sex === 1 ? '男' : '女' }}
          </template>
        </el-table-column>
      </template>
    </c-page-table>
    <c-form-dialog
      v-model="isShowUserClassDialog"
      title="所在班级"
      :forms="classForms"
      :data="classFormData"
      :submit="handleClassSubmit"
    />
  </div>
</template>

<style lang="css" scoped>
</style>

<route lang="yaml">
meta:
  layout: home
  name: 老师管理
  menu: true
  menuIndex: 4
  isAdmin: true
  icon: i-carbon:stress-breath-editor
</route>
