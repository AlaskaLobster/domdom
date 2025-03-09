<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-purple-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="text-xl font-bold text-white">Student Dashboard</div>
          </div>
          <div class="flex items-center">
            <button @click="logout" class="text-white hover:text-gray-200">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="py-6">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <h2 class="text-2xl font-bold mb-6">Welcome, Student!</h2>
            <!-- Add student-specific content here -->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // Implement logout logic
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
