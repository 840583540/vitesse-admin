<template>
  <main class="page-container w-full h-full text-center text-gray-700 dark:text-gray-200 relative pb-10">
    <!-- <img src="../assets/images/background.jpg" alt="bg" class="absolute left-0 top-0 w-full h-full"> -->
    <RouterView />
    <Footer class="absolute bottom-0 left-0" />
  </main>
</template>

<style lang="css">
  .page-container {
    background: url(../assets/images/background.jpg) 100% 100%;
    background-size: cover;
  }
</style>
