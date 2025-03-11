<template>
  <div class="subject-management-container">
    <div class="header">
      <h1>Quản lý môn học</h1>
      <div class="header-actions">
        <input type="text" class="search-input" placeholder="Tìm kiếm môn học..." v-model="searchQuery">
        <button class="add-subject-btn" @click="openAddModal">Thêm môn học</button>
      </div>
    </div>

    <div class="statistics-section">
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <h3>Tổng số môn học</h3>
          <p>{{ subjects.length }}</p>
        </div>
      </div>
    </div>

    <div class="table-section">
      <table class="subject-table">
        <thead>
          <tr>
            <th @click="sortBy('id')">Mã môn học</th>
            <th @click="sortBy('name')">Tên môn học</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in filteredSubjects" :key="subject.id">
            <td>{{ subject.id }}</td>
            <td>{{ subject.name }}</td>
            <td class="action-buttons">
              <button class="edit-btn" @click="openEditModal(subject)">✏️</button>
              <button class="delete-btn" @click="confirmDelete(subject)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal thêm/sửa môn học -->
    <div class="modal-overlay" v-if="showModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Cập nhật môn học' : 'Thêm môn học mới' }}</h2>
          <button class="close-modal-btn" @click="closeModal">&times;</button>
        </div>
        <div class="form-group">
          <label for="subjectName">Tên môn học</label>
          <input type="text" id="subjectName" v-model="currentSubject.name">
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">Hủy</button>
          <button class="save-btn" @click="saveSubject">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubjectManagement',
  data() {
    return {
      subjects: [],
      searchQuery: '',
      sortKey: 'id',
      sortDirection: 'asc',
      showModal: false,
      isEditing: false,
      currentSubject: { id: null, name: '' }
    };
  },
  created() {
    this.fetchSubjects();
  },
  computed: {
    filteredSubjects() {
      const query = this.searchQuery.toLowerCase();
      let result = this.subjects.filter(subject => 
        subject.name.toLowerCase().includes(query)
      );
      
      // Sắp xếp
      result.sort((a, b) => {
        const aValue = a[this.sortKey];
        const bValue = b[this.sortKey];
        
        if (this.sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      
      return result;
    }
  },
  methods: {
    async fetchSubjects() {
      try {
        // Thay thế API URL này bằng API thực tế của bạn
        const response = await fetch('/api/subjects');
        if (!response.ok) throw new Error('Không thể lấy dữ liệu');
        this.subjects = await response.json();
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu môn học:', error);
      }
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortDirection = 'asc';
      }
    },
    openAddModal() {
      this.isEditing = false;
      this.currentSubject = { id: null, name: '' };
      this.showModal = true;
    },
    openEditModal(subject) {
      this.isEditing = true;
      this.currentSubject = { ...subject };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async saveSubject() {
      try {
        if (this.isEditing) {
          await fetch(`/api/subjects/${this.currentSubject.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.currentSubject)
          });
        } else {
          await fetch('/api/subjects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.currentSubject)
          });
        }
        this.fetchSubjects();
        this.closeModal();
      } catch (error) {
        console.error('Lỗi khi lưu môn học:', error);
      }
    },
    async confirmDelete(subject) {
      if (confirm(`Bạn có chắc chắn muốn xóa môn học "${subject.name}"?`)) {
        try {
          await fetch(`/api/subjects/${subject.id}`, {
            method: 'DELETE'
          });
          this.fetchSubjects();
        } catch (error) {
          console.error('Lỗi khi xóa môn học:', error);
        }
      }
    }
  }
}
</script>