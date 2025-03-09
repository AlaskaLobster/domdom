<template>
    <div class="student-statistics-chart">
      <div class="chart-controls">
        <h3>Biểu đồ thống kê học sinh</h3>
        <div class="chart-buttons">
          <button 
            @click="chartType = 'bar'" 
            :class="{ active: chartType === 'bar' }"
          >
            Biểu đồ cột
          </button>
          <button 
            @click="chartType = 'pie'" 
            :class="{ active: chartType === 'pie' }"
          >
            Biểu đồ tròn
          </button>
        </div>
      </div>
  
      <div class="statistics-summary">
        <div class="stat-item">
          <p class="stat-label">Tổng số học sinh</p>
          <p class="stat-value">100</p>
        </div>
        <div class="stat-item">
          <p class="stat-label">Điểm trung bình</p>
          <p class="stat-value">8.5</p>
        </div>
        <div class="stat-item">
          <p class="stat-label">Tỷ lệ đạt</p>
          <p class="stat-value">92%</p>
        </div>
      </div>
  
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>
  
      <div class="chart-analysis">
        <h4>Phân tích nhanh</h4>
        <p>
          Số liệu cho thấy học sinh có điểm trung bình tốt nhất ở môn Toán. 
          85% học sinh đạt loại Khá trở lên. Cần tập trung hỗ trợ 15% học sinh loại Trung bình và Yếu.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'StudentStatisticsChart',
    data() {
      return {
        chartType: 'bar',
        chartInstance: null,
        subjectData: [
          { name: 'Toán', average: 8.2, passed: 92 },
          { name: 'Ngữ văn', average: 7.5, passed: 88 },
          { name: 'Tiếng Anh', average: 7.8, passed: 85 },
          { name: 'Vật lý', average: 6.9, passed: 78 },
          { name: 'Hóa học', average: 7.2, passed: 80 },
        ],
        studentCategoryData: [
          { name: 'Xuất sắc', value: 15 },
          { name: 'Giỏi', value: 30 },
          { name: 'Khá', value: 40 },
          { name: 'Trung bình', value: 12 },
          { name: 'Yếu', value: 3 },
        ],
        colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
      };
    },
    watch: {
      chartType() {
        this.renderChart();
      }
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        // Destroy existing chart if it exists
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
  
        const ctx = this.$refs.chartCanvas.getContext('2d');
        
        // Create new chart based on selected type
        if (this.chartType === 'bar') {
          this.renderBarChart(ctx);
        } else {
          this.renderPieChart(ctx);
        }
      },
      renderBarChart(ctx) {
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.subjectData.map(item => item.name),
            datasets: [
              {
                label: 'Điểm trung bình',
                data: this.subjectData.map(item => item.average),
                backgroundColor: '#8884d8',
                borderColor: '#7551E9',
                borderWidth: 1
              },
              {
                label: 'Tỷ lệ đạt (%)',
                data: this.subjectData.map(item => item.passed),
                backgroundColor: '#82ca9d',
                borderColor: '#4CAF50',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      renderPieChart(ctx) {
        this.chartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.studentCategoryData.map(item => item.name),
            datasets: [
              {
                data: this.studentCategoryData.map(item => item.value),
                backgroundColor: this.colors,
                borderColor: '#FFFFFF',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value * 100) / total);
                    return `${label}: ${percentage}%`;
                  }
                }
              }
            }
          }
        });
      }
    },
    beforeDestroy() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
    }
  };
  </script>
  
  <style scoped>
  .student-statistics-chart {
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .chart-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .chart-controls h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  
  .chart-buttons {
    display: flex;
    gap: 10px;
  }
  
  .chart-buttons button {
    padding: 6px 12px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .chart-buttons button.active {
    background-color: #2196F3;
    color: white;
    border-color: #2196F3;
  }
  
  .statistics-summary {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .stat-item {
    flex: 1;
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 10px;
    text-align: center;
  }
  
  .stat-item:nth-child(1) {
    background-color: #e3f2fd;
  }
  
  .stat-item:nth-child(2) {
    background-color: #e8f5e9;
  }
  
  .stat-item:nth-child(3) {
    background-color: #fff8e1;
  }
  
  .stat-label {
    margin: 0 0 5px 0;
    font-size: 14px;
    color: #666;
  }
  
  .stat-value {
    margin: 0;
    font-size: 22px;
    font-weight: bold;
  }
  
  .chart-container {
    height: 300px;
    margin-bottom: 15px;
  }
  
  .chart-analysis {
    border-top: 1px solid #eee;
    padding-top: 15px;
  }
  
  .chart-analysis h4 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #333;
  }
  
  .chart-analysis p {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .statistics-summary {
      flex-direction: column;
      gap: 10px;
    }
  
    .chart-controls {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  
    .chart-container {
      height: 250px;
    }
  }
  </style>