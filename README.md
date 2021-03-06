# Task Tracker
The Task Tracker is an application that allows users to manager their tasks. In addition to basic CRUD functions, filters in the app allow the user to view tasks by urgency. 

![Tasks](task_view.png)
![Create Task](create_task.png)

# Technologies
MongoDB, Express, React, Node.js, Docker

Testing: React Testing Library, Jest

# Running the Application
To run the frontend and backend concurrently:
  1) Install dependencies
      - cd frontend && npm i
      - cd backend && npm i
  2) In the backend folder, create a .env file.
  3) In the .env file, insert MongoDB server url:
      - `ATLAS_URI=[put your MongoDB URI here]`
  2) At the root level run:
      - `npm run dev`
    
  To run locally, go to http://localhost:3000
  
Backend: runs on port 5000
Frontend: runs on port 3000

# Future Features
- Add more robust testing on the backend
- Form validation 
- Additional filters (categorize tasks)

