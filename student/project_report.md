# Project Report Summary

## 1. Overview
The project is a school management system focused on managing students, grades, and subjects. It utilizes Vue.js for the frontend and communicates with a backend API to fetch and manage data.

## 2. Key Components
- **StudentManagement.vue**: 
  - Displays a list of students and their details.
  - Fetches student data from an API.
  - Provides statistics on total students, highest average score, and number of classes.

- **GradeManagement.vue**: 
  - Similar to the Student Management component, it fetches and displays student data.
  - Intended for managing grades.

- **SubjectManagement.vue**: 
  - Allows users to add, edit, and delete subjects.
  - Uses local storage for data persistence.
  - Validates input to prevent duplicate subjects and ensure completeness.

- **AdminDashboard.vue**: 
  - Provides an overview of the system for administrators, likely including statistics and management options.

## 3. Data Handling
- The components utilize Axios for API calls to fetch student data.
- The Subject Management component uses local storage to save and retrieve subject data.

## 4. User Interface
- The components are styled using scoped CSS, providing a responsive and user-friendly interface.
- Each component has a clear structure for displaying data and handling user interactions.

## Backend Overview
- **Controllers**:
  - **AuthController.php**: Handles authentication.
  - **DashboardController.php**: Manages the dashboard view.
  - **HocKyController.php**: Manages academic terms.
  - **HocSinhController.php**: Manages student data.
  - **LoginController.php**: Handles user login.
  - **LopController.php**: Manages class data.
  - **MonHocController.php**: Manages subject data.
  - **TeacherController.php**: Likely manages teacher-related functionality.

## Conclusion
The project is structured to provide a comprehensive school management system, with clear separation of concerns between the frontend and backend. Each component and controller is designed to handle specific functionalities, ensuring maintainability and scalability.
