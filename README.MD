Subject Manager Frontend
________________________________________
*  Overview
This is a React-based frontend application used to manage Subjects.
It connects to a Spring Boot backend API and allows users to:
•	Add subjects
•	View all subjects
•	Edit subjects
•	Delete subjects
•	Track activity history
________________________________________
*  Tech Stack
•	React 18
•	Vite (fast build tool)
•	Axios (API calls)
•	React Router (navigation)
________________________________________
*  How to Start the Application
? Step 1: Install dependencies
npm install
________________________________________
? Step 2: Start development server
npm run dev
________________________________________
? Step 3: Open in browser
http://localhost:8000
________________________________________
*  Backend Requirement
Make sure backend is running:
http://localhost:8080
Frontend communicates with:
*  src/api/subjectApi.js
const API = "http://localhost:8080/subjects";
________________________________________
*  Application Entry Point
*  src/main.jsx
This is where the React app starts.
What it does:
•	Loads React into index.html
•	Wraps app with global state provider
•	Renders main application
ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>
);
________________________________________
*  Routing System
*  src/App.jsx
Defines navigation across pages.
Route	Page
/	Subject List
/add	Add Subject
/edit/:id	Edit Subject
/view/:id	View Subject
/history	Activity History
________________________________________
*  Project Structure & Explanation
*  src/api/
Contains all backend API calls.
*  subjectApi.js
•	Uses Axios to communicate with backend
•	Central place for all HTTP requests
________________________________________
*  src/components/
Reusable UI components.
*  SubjectForm.jsx
•	Used for both Add and Edit
•	Handles form input and submission
*  Navbar.jsx
•	Top navigation bar
•	Displays global messages
________________________________________
*  src/pages/
Each file represents a full page (screen).
*  SubjectList.jsx
•	Loads all subjects from backend
•	Displays data in table
•	Handles delete operation
*  AddSubject.jsx
•	Displays form
•	Sends POST request to backend
*  EditSubject.jsx
•	Loads existing subject
•	Allows editing
•	Sends PUT request
*  ViewSubject.jsx
•	Displays single subject details
*  History.jsx
•	Shows user activity (add/update/delete)
________________________________________
*  src/context/
*  AppContext.jsx
Global state management.
Stores:
•	Success/Error messages
•	User activity history
Used across entire app.
________________________________________
*  src/styles/
*  app.css
Contains all styling for UI.
________________________________________
*  Application Flow
________________________________________
? 1. Load Subjects (Home Page)
1.	App starts
2.	Route / loads SubjectList
3.	API call is made to backend
4.	Data is received and displayed
________________________________________
? 2. Add Subject
1.	User navigates to /add
2.	Fills form
3.	Clicks submit
4.	API POST request sent
5.	On success:
o	Message shown
o	History updated
o	Redirect to home
________________________________________
? 3. Edit Subject
1.	User navigates to /edit/:id
2.	Existing data is loaded
3.	User updates form
4.	API PUT request sent
5.	On success:
o	Message shown
o	Redirect to home
________________________________________
? 4. Delete Subject
1.	User clicks Delete
2.	API DELETE request sent
3.	Data is reloaded
4.	UI updates
________________________________________
? 5. View Subject
1.	User navigates to /view/:id
2.	API GET request sent
3.	Data displayed
________________________________________
*  End-to-End Flow
User Action
  * 
React Page (UI)
  * 
API Call (Axios)
  * 
Spring Boot Backend
  * 
Database
  * 
Response
  * 
React updates UI

