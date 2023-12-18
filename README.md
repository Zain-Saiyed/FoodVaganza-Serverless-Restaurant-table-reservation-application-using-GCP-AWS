# FoodVaganza - Serverless Restaurant table reservation application

A serverless Restaurant Table Reservation App for Halifax restaurants, on cloud using GCP & AWS services, for scalability, security, and cost-efficiency. Featuring Customer, Partner, and Admin apps with modules for Sign Up & Login, Reservations, Chatbot, and innovative components like dual deployment, email notifications, and regular data refresh.

Cloud Deployment Model: **Multi-Cloud**

## Technology Used:
### Cloud Providers:
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

### AWS Services:
![Amazon DynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-%23FFDD00?style=for-the-badge&logo=Amazon%20AWS&logoColor=white)
![AWS Step Functions](https://img.shields.io/badge/AWS%20Step%20Functions-FF9900?style=for-the-badge&logo=Amazon%20AWS&logoColor=white)
![Amazon EventBridge](https://img.shields.io/badge/Amazon%20EventBridge-232F3E?style=for-the-badge&logo=Amazon%20AWS&logoColor=white)
![Amazon Simple Notification Service](https://img.shields.io/badge/Amazon%20Simple%20Notification%20Service-FA528A?style=for-the-badge&logo=Amazon%20AWS&logoColor=white)
![AWS API Gateway](https://img.shields.io/badge/AWS%20API%20Gateway-CF1C1E?style=for-the-badge&logo=Amazon%20AWS&logoColor=white)

### GCP Services:
![Google Cloud Firestore](https://img.shields.io/badge/Google%20Cloud%20Firestore-FFAA19?style=for-the-badge&logo=google-cloud&logoColor=white)
![Google BigQuery](https://img.shields.io/badge/Google%20BigQuery-2D7BFF?style=for-the-badge&logo=google-cloud&logoColor=white) 
![Looker](https://img.shields.io/badge/Looker-FF652F?style=for-the-badge&logo=looker&logoColor=white)
![Cloud Functions](https://img.shields.io/badge/Cloud%20Functions-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

### Frontend Development:
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### Deployment & Hosting:
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Google Cloud Run](https://img.shields.io/badge/Google%20Cloud%20Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

### Other Tools:
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![NPM-Package Manager](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## Application Archietcture:
![Application Architecture](/images/Application-Architecture.png)


## Overview:
This project is a Restaurant table reservation application tailored for Halifax, Nova Scotia's vibrant restaurant scene. Built atop the robust Google Cloud Platform (GCP) and Amazon Web Services (AWS) serverless architecture, this application prioritizes scalability, security, and cost-effectiveness. It consists of three core elements - the Customer App, Partner App, and Admin App - each meticulously designed with Frontend, Backend Services, Database, Authentication, and APIs for seamless functionality. Various features include User Authentication, Restaurant-Menu item Listings, and Reservation Management, empowering users to book, edit, delete, and visualize reservations easily. Moreover, it also includes Chatbot functionality and Notifications for enhanced user engagement. Upholding data integrity and security standards, the app leverages Google FireStore, implements role-based access control, Personally Identifiable Information (PII) encryption, and Firebase Authentication. Throughout development, collaboration is fostered using Git for version control, ensuring a smooth deployment via Continuous Integration/Continuous Deployment (CI/CD) pipelines.

## Feature Components:
High-level overview of the various feature components categorized under the respective user applications, outlining different sprints for task completion.
### Customer App 
1. Sign Up & Login Module
2. List of all Restaurants 
3. Book, edit, delete, view a reservation
4. Book, edit, delete, view menu for a reservation
5. Chatbot
6. Notifications

### Partner App
1. Sign Up & Login Module
2. Restaurant details and add, view and edit menu items
3. View, edit, and delete a reservation
4. Holistic View
5. Chatbot
6. Notifications

### Admin App
1. Visualisations

## Application RoadMap (Flowcharts)
#### 1. User Authentication 
![User Authentication-1](/images/user-authentication_1.jpg)
_Figure : Sign Up Flow_
![User Authentication-2](/images/user-authentication_2.jpg)
_Figure : Sign In Flow_
![User Authentication-3](/images/user-authentication_3.jpg)
_Figure : Change password flow_
![User Authentication-4](/images/user-authentication_4.jpg)
_Figure : Delete Account Flow_
![User Authentication-5](/images/user-authentication_5.jpg)
_Figure : Reset Password Flow_
![User Authentication-6](/images/user-authentication_6.jpg)
_Figure : Google Sign In Flow_
#### 2. List of Restaurants
![List of Restaurants-1](/images/list-restaurant.png)
_Figure : View all restaurants and a restaurant homepage – flowchart_
#### 3. Book, Edit, Delete View Reservation
![Book, Edit, Delete View Reservation-1](/images/reserve-table.png)
_Figure : reserve table flowchart_
#### 4. Edit, Delete, View Menu 
![Edit, Delete, View Menu-1](/images/edit-restaurant.png)
_Figure : Edit restaurant, menu items functionality & image upload flow chart_
#### 5. Add, Remove menu-items 
![Add, Remove menu-items-1](/images/add-menu-item.png)
_Figure : Add menu item flowchart_
#### 6. Chatbot
![Chatbot-1](/images/chatbot.jpg)
_Figure : Chatbot flowchart_
#### 7. Visualization
![visualisation-1](/images/visualisation.png)
_Figure : Visualization flowchart_

---
