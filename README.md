/* Updated Color Palette */
:root {
  --primary-color: #2563EB;
  --primary-dark: #1E40AF;
  --primary-light: #DBEAFE;
  --accent-color: #10B981;
  --accent-orange: #F97316;
  --accent-purple: #8B5CF6;
  --text-dark: #1F2937;
  --text-light: #4B5563;
  --bg-light: #F3F4F6;
  --card-bg: #FFFFFF;
  --border-color: #CBD5E1;
  --border-hover: #94A3B8;
  --shadow-sm: rgba(0, 0, 0, 0.05);
  --shadow-md: rgba(0, 0, 0, 0.1);
  --shadow-lg: rgba(0, 0, 0, 0.15);
  --border-radius: 10px;
  --border-radius-sm: 6px;
  --button-color: #1E3A8A; /* Darker button color */
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
  padding: 14px 20px;
  margin: 25px auto;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 16px;
  box-shadow: 0 4px 6px var(--shadow-sm);
  display: block;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

/* Course Container Layout */
.course-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 25px;
  max-width: 1280px;
  margin: 0 auto;
}

/* Course Block Styling - Enhanced with clear borders */
.course-block {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 8px 16px var(--shadow-md);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 2px solid var(--border-color);
  position: relative;
  transform: translateY(0);
}

.course-block:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 24px var(--shadow-lg);
  border-color: var(--border-hover);
  border-width: 2px;
}

/* Category indicator - adds a splash of color */
.course-block::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-purple));
}

/* Alternate colors for variety */
.course-block:nth-child(3n+1)::before {
  background: linear-gradient(90deg, var(--primary-color), var(--accent-purple));
}

.course-block:nth-child(3n+2)::before {
  background: linear-gradient(90deg, var(--accent-orange), var(--accent-color));
}

.course-block:nth-child(3n+3)::before {
  background: linear-gradient(90deg, var(--accent-purple), var(--primary-dark));
}

/* Course Image Styling */
.course-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid var(--border-color);
  transition: transform 0.5s ease;
}

.course-block:hover .course-image {
  transform: scale(1.05);
}

/* Course Content Styling */
.course-block h4 {
  font-size: 18px;
  font-weight: 700;
  margin: 18px 18px 10px;
  color: var(--text-dark);
  line-height: 1.3;
}

/* Description - limited to two lines */
.course-block p {
  font-size: 14px;
  margin: 0 18px 12px;
  color: var(--text-light);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.8em; /* Approximately 2 lines of text */
}

/* Price tag with background */
.course-block p:last-of-type {
  font-weight: 700;
  color: var(--text-dark);
  margin-top: auto;
  padding: 8px 12px;
  background-color: var(--primary-light);
  border-radius: var(--border-radius-sm);
  display: inline-block;
  margin-left: 18px;
  font-size: 16px;
  height: auto;
  -webkit-line-clamp: initial;
}

/* Button Styling - with darker color */
.course-block button {
  background-color: var(--button-color);
  color: white;
  border: none;
  padding: 12px 24px;
  margin: 18px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(30, 58, 138, 0.2);
}

.course-block button:hover {
  background-color: #152C70; /* Even darker on hover */
  box-shadow: 0 6px 12px rgba(30, 58, 138, 0.3);
  transform: translateY(-2px);
}

.course-block button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(30, 58, 138, 0.2);
}

/* No Courses Message */
ng-template p {
  text-align: center;
  font-size: 18px;
  color: var(--text-light);
  margin: 40px 0;
  padding: 30px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px var(--shadow-sm);
  border: 2px solid var(--border-color);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .course-container {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    padding: 20px;
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
