<template>
  <div class="w-full h-full">
    <el-container class="w-full h-full">
      <el-container>
        <Aside />
        <el-container>
          <el-header class="border-b border-light-800">
            <Header />
          </el-header>
          <el-main class="bg-light-400">
            <div class="h-full bg-white shadow-dark-50 px-4 pt-4">
              <RouterView />
            </div>
          </el-main>
          <el-footer style="background-color: rgb(40, 44, 52);height: 40px">
            <Footer class="text-white" />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
