/* Global Styles */
:root {
  --primary-color: #2563EB;
  --primary-dark: #1E40AF;
  --accent-color: #10B981;
  --text-dark: #1F2937;
  --text-light: #4B5563;
  --bg-light: #F3F4F6;
  --white: #FFFFFF;
  --shadow: rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
}

body {
  font-family: 'Roboto', 'Arial', sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);
  margin: 0;
  padding: 0;
}

/* Search Input Styling */
.search-input {
  width: 100%;
  max-width: 600px;
  padding: 12px 20px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 16px;
  box-shadow: 0 2px 4px var(--shadow);
  display: block;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* Course Container Layout */
.course-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Course Block Styling */
.course-block {
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.course-block:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Course Image Styling */
.course-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

/* Course Content Styling */
.course-block h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 16px 16px 8px;
  color: var(--text-dark);
  line-height: 1.3;
}

.course-block p {
  font-size: 14px;
  margin: 0 16px 10px;
  color: var(--text-light);
  line-height: 1.5;
}

.course-block p:last-of-type {
  font-weight: 600;
  color: var(--text-dark);
  margin-top: auto;
  padding-top: 10px;
}

/* Button Styling */
.course-block button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 16px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.course-block button:hover {
  background-color: var(--primary-dark);
}

/* No Courses Message */
ng-template p {
  text-align: center;
  font-size: 18px;
  color: var(--text-light);
  margin: 40px 0;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .course-container {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
    padding: 16px;
  }
  
  .search-input {
    margin: 16px auto;
  }
}

@media (max-width: 480px) {
  .course-container {
    grid-template-columns: 1fr;
  }
}
