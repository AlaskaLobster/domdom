<template>
  <div class="student-homework">
    <h2>Bài Tập Được Giao</h2>
    <ul>
      <li v-for="homework in homeworkList" :key="homework.id">
        <h3>{{ homework.title }}</h3>
        <p>{{ homework.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchHomework } from '../api'; // Import the fetchHomework function

export default {
  data() {
    return {
      homeworkList: []
    };
  },
  methods: {
    async getHomework() {
      try {
        const response = await fetchHomework(); // Call the API to get homework
        this.homeworkList = response.data; // Update the homework list
      } catch (error) {
        console.error('Error fetching homework:', error);
      }
    }
  },
  mounted() {
    this.getHomework(); // Fetch homework when the component is mounted
  }
}
</script>

<style scoped>
.student-homework {
  padding: 20px;
}
</style>
