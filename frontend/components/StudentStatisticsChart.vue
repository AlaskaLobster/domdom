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
        <button 
          @click="chartType = 'ck'" 
          :class="{ active: chartType === 'ck' }"
        >
          CK
        </button>
      </div>
    </div>

    <div class="statistics-summary">
      <div class="stat-item">
        <p class="stat-label">Tổng số học sinh</p>
        <p class="stat-value">30</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Điểm trung bình</p>
        <p class="stat-value">8.9</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Tỷ lệ đạt</p>
        <p class="stat-value">92%</p>
      </div>
    </div>

    <div class="chart-container">
      <canvas v-if="['bar', 'pie'].includes(chartType)" ref="chartCanvas"></canvas>
      <div v-else-if="chartType === 'spectral'" ref="spectralChart" class="spectral-chart">
        <div v-for="(subject, index) in subjectData" :key="index" class="spectral-item">
          <div class="spectral-label">{{ subject.name }}</div>
          <div class="spectral-bars">
            <div 
              class="spectral-bar average-bar" 
              :style="{ width: `${subject.average * 10}%`, backgroundColor: getGradientColor(subject.average / 10) }"
            >
              <span class="spectral-value">{{ subject.average }}</span>
            </div>
            <div 
              class="spectral-bar passed-bar" 
              :style="{ width: `${subject.passed}%`, backgroundColor: getGradientColor(subject.passed / 100) }"
            >
              <span class="spectral-value">{{ subject.passed }}%</span>
            </div>
          </div>
        </div>
        <div class="spectral-legend">
          <div class="legend-item">
            <div class="legend-color" style="background-color: #8884d8;"></div>
            <div class="legend-text">Điểm trung bình</div>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #82ca9d;"></div>
            <div class="legend-text">Tỷ lệ đạt (%)</div>
          </div>
        </div>
      </div>
      <div v-else-if="chartType === 'ck'" ref="ckChart" class="ck-chart">
        <div class="chart-header">
          <div class="chart-title">Diễn biến điểm số theo thời gian</div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color" style="background-color: #2196F3;"></div>
              <div class="legend-text">Toán</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #F44336;"></div>
              <div class="legend-text">Ngữ văn</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #4CAF50;"></div>
              <div class="legend-text">Tiếng Anh</div>
            </div>
          </div>
        </div>
        <div class="stock-chart-container">
          <canvas ref="stockCanvas"></canvas>
        </div>
        <div class="stock-details">
          <div class="stock-info-item" v-for="(subject, index) in stockData" :key="index">
            <div class="subject-name">{{ subject.name }}</div>
            <div class="current-score" :class="{ 'positive': subject.change > 0, 'negative': subject.change < 0 }">
              {{ subject.currentScore.toFixed(1) }}
              <span class="change">{{ subject.change > 0 ? '+' : '' }}{{ subject.change.toFixed(1) }}</span>
            </div>
            <div class="mini-chart">
              <div 
                v-for="(point, i) in subject.miniChart" 
                :key="i" 
                class="mini-chart-point" 
                :style="{ 
                  height: `${(point / 10) * 100}%`,
                  backgroundColor: subject.color
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-analysis">
      <h4>Phân tích nhanh</h4>
      <p v-if="chartType !== 'ck'">
        Số liệu cho thấy học sinh có điểm trung bình tốt nhất ở môn Toán. 
        85% học sinh đạt loại Khá trở lên. Cần tập trung hỗ trợ 15% học sinh loại Trung bình và Yếu.
      </p>
      <p v-else>
        Biểu đồ thể hiện xu hướng điểm số theo thời gian. Môn Toán có xu hướng tăng điểm ổn định nhất.
        Môn Ngữ văn có biến động lớn nhất. Tiếng Anh đang có xu hướng cải thiện rõ rệt trong các kỳ gần đây.
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
      chartType: 'ck',
      chartInstance: null,
      stockChartInstance: null,
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
      colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'],
      spectralAnimationFrame: null,
      stockData: [
        { 
          name: 'Toán', 
          color: '#2196F3',
          currentScore: 8.2, 
          change: 0.5, 
          data: [
            { time: 'T9', value: 7.0 },
            { time: 'T10', value: 7.2 },
            { time: 'T11', value: 7.5 },
            { time: 'T12', value: 7.3 },
            { time: 'T1', value: 7.8 },
            { time: 'T2', value: 8.0 },
            { time: 'T3', value: 8.2 }
          ],
          miniChart: [7.0, 7.2, 7.5, 7.3, 7.8, 8.0, 8.2]
        },
        { 
          name: 'Ngữ văn', 
          color: '#F44336',
          currentScore: 7.5, 
          change: -0.3, 
          data: [
            { time: 'T9', value: 8.0 },
            { time: 'T10', value: 8.2 },
            { time: 'T11', value: 7.8 },
            { time: 'T12', value: 7.2 },
            { time: 'T1', value: 7.7 },
            { time: 'T2', value: 7.8 },
            { time: 'T3', value: 7.5 }
          ],
          miniChart: [8.0, 8.2, 7.8, 7.2, 7.7, 7.8, 7.5]
        },
        { 
          name: 'Tiếng Anh', 
          color: '#4CAF50',
          currentScore: 7.8, 
          change: 0.7, 
          data: [
            { time: 'T9', value: 6.5 },
            { time: 'T10', value: 6.8 },
            { time: 'T11', value: 7.0 },
            { time: 'T12', value: 7.2 },
            { time: 'T1', value: 7.3 },
            { time: 'T2', value: 7.5 },
            { time: 'T3', value: 7.8 }
          ],
          miniChart: [6.5, 6.8, 7.0, 7.2, 7.3, 7.5, 7.8]
        }
      ],
      stockAnimationFrame: null,
      currentDataPoints: 7,
      maxDataPoints: 15
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
      // Hủy animation đang chạy
      if (this.spectralAnimationFrame) {
        cancelAnimationFrame(this.spectralAnimationFrame);
        this.spectralAnimationFrame = null;
      }
      
      if (this.stockAnimationFrame) {
        cancelAnimationFrame(this.stockAnimationFrame);
        this.stockAnimationFrame = null;
      }

      // Hủy biểu đồ hiện tại nếu có
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
      
      if (this.stockChartInstance) {
        this.stockChartInstance.destroy();
        this.stockChartInstance = null;
      }

      if (this.chartType === 'spectral') {
        this.$nextTick(() => {
          this.startSpectralAnimation();
        });
      } else if (this.chartType === 'ck') {
        this.$nextTick(() => {
          this.renderStockChart();
          this.startStockAnimation();
        });
      } else {
        const ctx = this.$refs.chartCanvas.getContext('2d');
        
        // Tạo biểu đồ mới dựa trên loại đã chọn
        if (this.chartType === 'bar') {
          this.renderBarChart(ctx);
        } else {
          this.renderPieChart(ctx);
        }
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
    },
    renderStockChart() {
      const ctx = this.$refs.stockCanvas.getContext('2d');
      
      // Chuẩn bị dữ liệu
      const labels = this.stockData[0].data.map(d => d.time);
      const datasets = this.stockData.map(subject => {
        return {
          label: subject.name,
          data: subject.data.map(d => d.value),
          borderColor: subject.color,
          backgroundColor: `${subject.color}20`,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: subject.color,
          tension: 0.4,
          fill: {
            target: 'origin',
            above: `${subject.color}10`
          }
        };
      });
      
      this.stockChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          scales: {
            y: {
              suggestedMin: 5,
              suggestedMax: 10,
              grid: {
                color: 'rgba(200, 200, 200, 0.1)'
              }
            },
            x: {
              grid: {
                color: 'rgba(200, 200, 200, 0.1)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear'
            }
          }
        }
      });
    },
    startSpectralAnimation() {
      const spectralBars = this.$el.querySelectorAll('.spectral-bar');
      let animationPhase = 0;
      
      const animate = () => {
        animationPhase += 0.05;
        
        spectralBars.forEach((bar, index) => {
          const wave = Math.sin(animationPhase + index * 0.5) * 0.05 + 0.98;
          const currentWidth = parseFloat(bar.style.width);
          const scaleValue = wave * currentWidth;
          
          bar.style.transform = `scaleX(${wave})`;
          
          // Thêm hiệu ứng phát sáng
          const glowIntensity = Math.abs(Math.sin(animationPhase + index * 0.3)) * 10;
          bar.style.boxShadow = `0 0 ${glowIntensity}px rgba(255, 255, 255, 0.7)`;
        });
        
        this.spectralAnimationFrame = requestAnimationFrame(animate);
      };
      
      // Bắt đầu animation
      this.spectralAnimationFrame = requestAnimationFrame(animate);
    },
    startStockAnimation() {
      // Thiết lập khoảng thời gian để thêm dữ liệu mới
      const updateInterval = 2000; // 2 giây
      let lastUpdateTime = Date.now();
      
      const animate = () => {
        const currentTime = Date.now();
        
        // Thêm điểm dữ liệu mới sau mỗi khoảng thời gian
        if (currentTime - lastUpdateTime > updateInterval) {
          this.addNewDataPoint();
          lastUpdateTime = currentTime;
        }
        
        // Cập nhật hiệu ứng nhấp nháy cho mini-chart
        const miniCharts = this.$el.querySelectorAll('.mini-chart');
        miniCharts.forEach((chart) => {
          const points = chart.querySelectorAll('.mini-chart-point');
          points.forEach((point, index) => {
            if (index === points.length - 1) {
              const pulseIntensity = Math.abs(Math.sin(currentTime / 500)) * 0.3 + 0.7;
              point.style.opacity = pulseIntensity;
            }
          });
        });
        
        this.stockAnimationFrame = requestAnimationFrame(animate);
      };
      
      // Bắt đầu animation
      this.stockAnimationFrame = requestAnimationFrame(animate);
    },
    addNewDataPoint() {
      // Thêm điểm dữ liệu mới cho mỗi môn học
      if (this.currentDataPoints >= this.maxDataPoints) {
        // Xóa điểm dữ liệu đầu tiên nếu đã đạt tối đa
        this.stockData.forEach(subject => {
          subject.data.shift();
          subject.miniChart.shift();
        });
      } else {
        this.currentDataPoints++;
      }
      
      // Tháng mới
      const nextMonth = `T${(parseInt(this.stockData[0].data[this.stockData[0].data.length - 1].time.slice(1)) + 1) % 12 || 12}`;
      
      // Thêm dữ liệu mới cho từng môn
      this.stockData.forEach(subject => {
        // Tính điểm mới với một số biến động ngẫu nhiên
        const lastValue = subject.data[subject.data.length - 1].value;
        const change = (Math.random() - 0.5) * 0.6; // Biến động -0.3 đến +0.3
        let newValue = lastValue + change;
        
        // Giới hạn điểm từ 5.0 đến 10.0
        newValue = Math.max(5.0, Math.min(10.0, newValue));
        newValue = Math.round(newValue * 10) / 10; // Làm tròn 1 chữ số thập phân
        
        // Thêm điểm mới
        subject.data.push({ time: nextMonth, value: newValue });
        subject.miniChart.push(newValue);
        
        // Cập nhật điểm hiện tại và thay đổi
        subject.currentScore = newValue;
        subject.change = newValue - subject.data[subject.data.length - 2].value;
      });
      
      // Cập nhật biểu đồ
      if (this.stockChartInstance) {
        this.stockChartInstance.data.labels.push(nextMonth);
        if (this.stockChartInstance.data.labels.length > this.maxDataPoints) {
          this.stockChartInstance.data.labels.shift();
        }
        
        this.stockChartInstance.data.datasets.forEach((dataset, index) => {
          dataset.data = this.stockData[index].data.map(d => d.value);
        });
        
        this.stockChartInstance.update();
      }
    },
    getGradientColor(value) {
      // Tạo màu gradient dựa trên giá trị (0-1)
      const hue = value * 120; // 0 là đỏ, 120 là xanh lá
      return `hsl(${hue}, 80%, 50%)`;
    }
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    if (this.stockChartInstance) {
      this.stockChartInstance.destroy();
    }
    if (this.spectralAnimationFrame) {
      cancelAnimationFrame(this.spectralAnimationFrame);
    }
    if (this.stockAnimationFrame) {
      cancelAnimationFrame(this.stockAnimationFrame);
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
  position: relative;
}

.spectral-chart {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #111;
  border-radius: 6px;
  padding: 15px;
}

.spectral-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.spectral-label {
  width: 100px;
  color: #fff;
  font-weight: bold;
  text-align: right;
  padding-right: 15px;
}

.spectral-bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.spectral-bar {
  height: 20px;
  border-radius: 4px;
  position: relative;
  transition: width 0.3s ease;
  transform-origin: left;
  display: flex;
  align-items: center;
  padding-left: 8px;
}

.average-bar {
  background-color: #8884d8;
}

.passed-bar {
  background-color: #82ca9d;
}

.spectral-value {
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}

.spectral-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-text {
  color: #fff;
  font-size: 12px;
}

/* CK Chart Styles */
.ck-chart {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1c1c28;
  border-radius: 6px;
  padding: 15px;
  color: #fff;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.chart-title {
  font-weight: bold;
  font-size: 16px;
}

.chart-legend {
  display: flex;
  gap: 15px;
}

.stock-chart-container {
  flex: 1;
  position: relative;
  margin-bottom: 10px;
}

.stock-details {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stock-info-item {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  width: 33.33%;
}

.subject-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.current-score {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.change {
  font-size: 14px;
  margin-left: 5px;
}

.positive {
  color: #4CAF50;
}

.negative {
  color: #F44336;
}

.mini-chart {
  display: flex;
  align-items: flex-end;
  height: 30px;
  gap: 2px;
}

.mini-chart-point {
  flex: 1;
  min-height: 2px;
  border-radius: 1px;
  transition: height 0.3s ease;
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
  
  .spectral-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .spectral-label {
    width: 100%;
    text-align: left;
    padding-right: 0;
    margin-bottom: 5px;
  }
  
  .stock-details {
    flex-direction: column;
    gap: 15px;
  }
  
  .stock-info-item {
    width: 100%;
  }
}
</style>