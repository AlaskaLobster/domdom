<template>
  <div class="dashboard">
    <header class="header">
      <div class="logo">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
          </svg>
        </div>
        <h1>Student Dashboard</h1>
      </div>
      <div class="user-info">
        <div class="user-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <span>{{ student.name }}</span>
        <button @click="logout" class="logout-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Đăng xuất
        </button>
      </div>
    </header>

    <div class="nav-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <div class="tab-icon" v-html="getTabIcon(tab.id)"></div>
        {{ tab.name }}
      </button>
    </div>

    <main class="content">
      <!-- Thời khóa biểu -->
      <div v-if="activeTab === 'schedule'" class="tab-content">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Thời khóa biểu
        </h2>
        <div class="schedule-container">
          <table class="schedule-table">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Thứ Hai</th>
                <th>Thứ Ba</th>
                <th>Thứ Tư</th>
                <th>Thứ Năm</th>
                <th>Thứ Sáu</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="timeSlot in schedule" :key="timeSlot.time">
                <td>
                  <div class="time-cell">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {{ timeSlot.time }}
                  </div>
                </td>
                <td v-for="(day, index) in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']" :key="day">
                  <div 
                    v-if="timeSlot[day]" 
                    class="class-item"
                    :class="{ 'active-class': timeSlot[day].isActive }"
                  >
                    <div class="class-name">{{ timeSlot[day].name }}</div>
                    <div class="class-location">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {{ timeSlot[day].location }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bài tập về nhà -->
      <div v-if="activeTab === 'homework'" class="tab-content">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Bài tập về nhà
        </h2>
        <div class="homework-list">
          <div 
            v-for="homework in homeworks" 
            :key="homework.id" 
            class="homework-item"
            :class="{ 'overdue': isOverdue(homework.dueDate) }"
          >
            <div class="homework-header">
              <h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                {{ homework.subject }}
              </h3>
              <span class="homework-due-date">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Hạn nộp: {{ formatDate(homework.dueDate) }}
              </span>
            </div>
            <p class="homework-description">{{ homework.description }}</p>
            <div class="homework-status">
              <span :class="['status-badge', homework.status]">
                <svg v-if="homework.status === 'pending'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <svg v-if="homework.status === 'submitted'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <svg v-if="homework.status === 'graded'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {{ getStatusText(homework.status) }}
              </span>
              <button v-if="homework.status === 'pending'" class="submit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Điểm số -->
      <div v-if="activeTab === 'grades'" class="tab-content">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Điểm số
        </h2>
        <div class="grades-overview">
          <div class="gpa-card">
            <div class="gpa-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3>Điểm trung bình</h3>
            <div class="gpa-value">{{ student.gpa.toFixed(2) }}</div>
          </div>
        </div>
        <div class="grades-table-container">
          <table class="grades-table">
            <thead>
              <tr>
                <th>Môn học</th>
                <th>Giữa kỳ</th>
                <th>Cuối kỳ</th>
                <th>Bài tập</th>
                <th>Điểm trung bình</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="subject in grades" :key="subject.id">
                <td>
                  <div class="subject-name">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    {{ subject.name }}
                  </div>
                </td>
                <td>{{ subject.midterm }}</td>
                <td>{{ subject.final }}</td>
                <td>{{ subject.assignments }}</td>
                <td>
                  <div class="avg-grade" :class="getGradeColorClass(calculateAverage(subject))">
                    {{ calculateAverage(subject).toFixed(2) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Thông báo -->
      <div v-if="activeTab === 'notifications'" class="tab-content">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          Thông báo
        </h2>
        <div class="notifications-list">
          <div 
            v-for="notification in notifications" 
            :key="notification.id" 
            class="notification-item"
            :class="{ 'unread': !notification.read }"
          >
            <div class="notification-icon" :class="notification.type" v-html="getNotificationIcon(notification.type)"></div>
            <div class="notification-content">
              <h3 class="notification-title">{{ notification.title }}</h3>
              <p class="notification-message">{{ notification.message }}</p>
              <span class="notification-time">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {{ formatDate(notification.timestamp) }}
              </span>
            </div>
            <button v-if="!notification.read" @click="markAsRead(notification.id)" class="mark-read-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Đánh dấu đã đọc
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'StudentDashboard',
  data() {
    return {
      activeTab: 'schedule',
      student: {
        id: 'ST12345',
        name: 'Nguyễn Văn A',
        class: '12A1',
        gpa: 8.5
      },
      tabs: [
        { id: 'schedule', name: 'Thời khóa biểu' },
        { id: 'homework', name: 'Bài tập về nhà' },
        { id: 'grades', name: 'Điểm số' },
        { id: 'notifications', name: 'Thông báo' }
      ],
      schedule: [
        {
          time: '07:30 - 09:00',
          monday: { name: 'Toán', location: 'Phòng 201', isActive: true },
          tuesday: { name: 'Văn học', location: 'Phòng 305', isActive: false },
          wednesday: { name: 'Tiếng Anh', location: 'Phòng 103', isActive: false },
          thursday: { name: 'Hóa học', location: 'Phòng 402', isActive: false },
          friday: { name: 'Vật lý', location: 'Phòng 205', isActive: false }
        },
        {
          time: '09:15 - 10:45',
          monday: { name: 'Địa lý', location: 'Phòng 301', isActive: false },
          tuesday: { name: 'Tiếng Anh', location: 'Phòng 103', isActive: false },
          wednesday: { name: 'Toán', location: 'Phòng 201', isActive: false },
          thursday: { name: 'Sinh học', location: 'Phòng 401', isActive: false },
          friday: { name: 'Tin học', location: 'Phòng IT1', isActive: false }
        },
        {
          time: '11:00 - 12:30',
          monday: { name: 'Lịch sử', location: 'Phòng 302', isActive: false },
          tuesday: { name: 'Vật lý', location: 'Phòng 205', isActive: false },
          wednesday: { name: 'Hóa học', location: 'Phòng 402', isActive: false },
          thursday: { name: 'Văn học', location: 'Phòng 305', isActive: false },
          friday: { name: 'GDCD', location: 'Phòng 304', isActive: false }
        }
      ],
      homeworks: [
        {
          id: 1,
          subject: 'Toán học',
          description: 'Giải phương trình bậc 2, trang 45-46 sách giáo khoa',
          dueDate: new Date('2025-03-26T23:59:59'),
          status: 'pending'
        },
        {
          id: 2,
          subject: 'Văn học',
          description: 'Viết bài luận về tác phẩm "Truyện Kiều", độ dài 500 từ',
          dueDate: new Date('2025-03-28T23:59:59'),
          status: 'pending'
        },
        {
          id: 3,
          subject: 'Tiếng Anh',
          description: 'Làm bài tập về thì hiện tại hoàn thành, Unit 5',
          dueDate: new Date('2025-03-25T23:59:59'),
          status: 'submitted'
        },
        {
          id: 4,
          subject: 'Vật lý',
          description: 'Báo cáo thí nghiệm về chuyển động của vật rơi tự do',
          dueDate: new Date('2025-03-20T23:59:59'),
          status: 'graded',
          grade: 9.0
        }
      ],
      grades: [
        {
          id: 1,
          name: 'Toán học',
          midterm: 8.5,
          final: 9.0,
          assignments: 8.7
        },
        {
          id: 2,
          name: 'Văn học',
          midterm: 7.5,
          final: 8.0,
          assignments: 8.2
        },
        {
          id: 3,
          name: 'Tiếng Anh',
          midterm: 9.0,
          final: 8.5,
          assignments: 9.3
        },
        {
          id: 4,
          name: 'Vật lý',
          midterm: 8.0,
          final: 8.5,
          assignments: 9.0
        },
        {
          id: 5,
          name: 'Hóa học',
          midterm: 7.5,
          final: 8.0,
          assignments: 8.5
        }
      ],
      notifications: [
        {
          id: 1,
          title: 'Thông báo lịch thi giữa kỳ',
          message: 'Lịch thi giữa kỳ đã được cập nhật. Vui lòng kiểm tra lịch thi trên hệ thống.',
          timestamp: new Date('2025-03-22T10:30:00'),
          read: false,
          type: 'announcement'
        },
        {
          id: 2,
          title: 'Bài tập Vật lý đã được chấm điểm',
          message: 'Bài tập về chuyển động của vật rơi tự do đã được chấm điểm: 9.0/10',
          timestamp: new Date('2025-03-21T15:45:00'),
          read: false,
          type: 'grade'
        },
        {
          id: 3,
          title: 'Nhắc nhở nộp bài tập Toán học',
          message: 'Bài tập Toán học sẽ đến hạn trong 2 ngày tới. Vui lòng nộp đúng hạn.',
          timestamp: new Date('2025-03-24T08:15:00'),
          read: true,
          type: 'reminder'
        }
      ]
    };
  },
  methods: {
    logout() {
      // Xử lý đăng xuất
      alert('Đăng xuất thành công');
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    isOverdue(date) {
      return new Date(date) < new Date();
    },
    getStatusText(status) {
      switch(status) {
        case 'pending': return 'Chưa nộp';
        case 'submitted': return 'Đã nộp';
        case 'graded': return 'Đã chấm điểm';
        default: return status;
      }
    },
    calculateAverage(subject) {
      return (subject.midterm * 0.3 + subject.final * 0.5 + subject.assignments * 0.2);
    },
    markAsRead(id) {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.read = true;
      }
    },
    getTabIcon(tabId) {
      switch(tabId) {
        case 'schedule':
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>`;
        case 'homework':
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>`;
        case 'grades':
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>`;
        case 'notifications':
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>`;
        default:
          return '';
      }
    },
    getNotificationIcon(type) {
      switch(type) {
        case 'announcement':
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
                  </svg>`;
        case 'grade':
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>`;
        case 'reminder':
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>`;
        default:
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>`;
      }
    },
    getGradeColorClass(grade) {
      if (grade >= 8.5) return 'excellent';
      if (grade >= 7.0) return 'good';
      if (grade >= 5.0) return 'average';
      return 'poor';
    }
  }
};
</script>

<style scoped>
.dashboard {
  font-family: 'Roboto', Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  margin-right: 10px;
  color: #4a6cf7;
}

.logo h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #4a6cf7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.logout-btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid #eee;
  padding: 6px 12px;
  border-radius: 4px;
  margin-left: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background-color: #f5f5f5;
}

.logout-btn svg {
  margin-right: 5px;
}

.nav-tabs {
  display: flex;
  margin: 20px 0;
  border-bottom: 1px solid #eee;
}

.tab-btn {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.tab-btn.active {
  border-bottom: 3px solid #4a6cf7;
  color: #4a6cf7;
}

.tab-icon {
  margin-right: 8px;
}

.content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.tab-content h2 {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-top: 0;
  color: #333;
}

.tab-content h2 svg {
  margin-right: 10px;
  color: #4a6cf7;
}

/* Schedule styles */
.schedule-container {
  overflow-x: auto;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
}

.schedule-table th, 
.schedule-table td {
  padding: 12px;
  border: 1px solid #eee;
  text-align: center;
}

.schedule-table th {
  background-color: #f7f9fc;
  font-weight: 600;
}

.time-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.time-cell svg {
  margin-right: 5px;
  color: #888;
}

.class-item {
  background-color: #f0f7ff;
  border-radius: 6px;
  padding: 10px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.class-item.active-class {
  background-color: #e1edff;
  border-left: 3px solid #4a6cf7;
}

.class-name {
  font-weight: 600;
  margin-bottom: 5px;
}

.class-location {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: #666;
}

.class-location svg {
  margin-right: 4px;
}

/* Homework styles */
.homework-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.homework-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: 15px;
  border: 1px solid #eee;
  transition: transform 0.3s;
}

.homework-item:hover {
  transform: translateY(-3px);
}

.homework-item.overdue {
  border-left: 3px solid #ff6b6b;
}

.homework-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.homework-header h3 {
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 1.1rem;
}

.homework-header h3 svg {
  margin-right: 6px;
  color: #4a6cf7;
}

.homework-due-date {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #666;
}

.homework-due-date svg {
  margin-right: 4px;
}

.homework-description {
  font-size: 0.95rem;
  margin-bottom: 15px;
  color: #555;
}

.homework-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-badge {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.status-badge.pending {
  background-color: #fff4de;
  color: #ffa940;
}

.status-badge.submitted {
  background-color: #e6f7ff;
  color: #1890ff;
}

.status-badge.graded {
  background-color: #e6fffb;
  color: #13c2c2;
}

.status-badge svg {
  margin-right: 4px;
}

.submit-btn {
  display: flex;
  align-items: center;
  background-color: #4a6cf7;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #3b5fe0;
}

.submit-btn svg {
  margin-right: 4px;
}

/* Grades styles */
.grades-overview {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.gpa-card {
  background: linear-gradient(135deg, #4a6cf7 0%, #3b5fe0 100%);
  color: white;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  width: 200px;
  box-shadow: 0 5px 15px rgba(74, 108, 247, 0.2);
}

.gpa-icon {
  background-color: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.gpa-card h3 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 10px;
}

.gpa-value {
  font-size: 2.5rem;
  font-weight: 700;
}

.grades-table-container {
  overflow-x: auto;
}

.grades-table {
  width: 100%;
  border-collapse: collapse;
}

.grades-table th,
.grades-table td {
  padding: 12px;
  border: 1px solid #eee;
  text-align: center;
}

.grades-table th {
  background-color: #f7f9fc;
  font-weight: 600;
}

.subject-name {
  display: flex;
  align-items: center;
  text-align: left;
}

.subject-name svg {
  margin-right: 8px;
  color: #4a6cf7;
}

.avg-grade {
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.avg-grade.excellent {
  background-color: #e6fffb;
  color: #13c2c2;
}

.avg-grade.good {
  background-color: #e6f7ff;
  color: #1890ff;
}

.avg-grade.average {
  background-color: #fff4de;
  color: #ffa940;
}

.avg-grade.poor {
  background-color: #fff1f0;
  color: #ff4d4f;
}

/* Notifications styles */
.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.notification-item {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: 15px;
  border: 1px solid #eee;
  transition: transform 0.3s;
}

.notification-item.unread {
  border-left: 3px solid #4a6cf7;
  background-color: #f7f9ff;
}

.notification-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.notification-icon.announcement {
  background-color: #e6f7ff;
  color: #1890ff;
}

.notification-icon.grade {
  background-color: #e6fffb;
  color: #13c2c2;
}

.notification-icon.reminder {
  background-color: #fff4de;
  color: #ffa940;
}

.notification-content {
  flex: 1;
}

.notification-title {
  margin: 0 0 5px;
  font-size: 1.1rem;
  font-weight: 600;
}

.notification-message {
  margin: 0 0 8px;
  color: #555;
  font-size: 0.95rem;
}

.notification-time {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
}

.notification-time svg {
  margin-right: 4px;
}

.mark-read-btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid #eee;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  align-self: center;
  margin-left: 15px;
  font-size: 0.85rem;
}

.mark-read-btn:hover {
  background-color: #f5f5f5;
}

.mark-read-btn svg {
  margin-right: 4px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .user-info {
    margin-top: 15px;
  }
  
  .nav-tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 5px;
  }
  
  .tab-btn {
    padding: 10px 15px;
  }
  
  .homework-list {
    grid-template-columns: 1fr;
  }
  
  .notification-item {
    flex-direction: column;
  }
  
  .notification-icon {
    margin-bottom: 10px;
  }
  
  .mark-read-btn {
    margin-left: 0;
    margin-top: 10px;
    align-self: flex-start;
  }
}
</style>