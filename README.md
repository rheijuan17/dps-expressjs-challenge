# Projects API

## Overview

This repository contains a very basic web application based on Typescript and Express.js. Main application file is `index.ts`. Node and npm are required.

## Environment Setup

Ensure you have Node.js (v14.x or later) and npm (v6.x or later) installed.  
To set up and run the application, execute the following commands:

```
npm install
npm run dev
```

The application will then be accessible at http://localhost:3000.

## Project Context

You will develop a backend system for managing data about a company's projects and their associated reports. Each project may have multiple reports linked to it, though having reports is not mandatory. Start your implementation using the provided SQLite database([db/db.sqlite3](./db/db.sqlite3)).

Refer to the database schema provided for understanding the data structure 👇

![Database schema](images/database_schema.png)

NOTE: You can use ([db.service.ts](./src/services/db.service.ts)) to handle SQL queries to the database.

## Challenge Tasks

-   **Fork this project:** Start by forking this repository
-   **REST API Development:** Design and implement a RESTful API to create, read, update, and delete projects and their reports.
-   **Special API Endpoint:** Create an API endpoint that retrieves all reports where the same word appears at least three times.
-   **Optional:** Secure all API routes with a hardcoded authentication token ("Password123").
-   **Submission:** After completing the challenge, email us the URL of your GitHub repository.
-   **Further information:**
    -   If there is anything unclear regarding requirements, contact us by replying to our email.
    -   Use small commits, we want to see your progress towards the solution.
    -   Code clean and follow the best practices.

\
Happy coding!

## API Documentation

-   [Projects](#projects)
    -   [Get Project](#get-project)
        -   [Get All Projects](#get-all-projects)
        -   [Get Project By Id](#get-project-by-id)
    -   [Create Project](#create-project)
    -   [Update Project](#update-project)
    -   [Delete Project](#delete-project)
-   [Reports](#reports)
    -   [Get Report](#get-report)
        -   [Get All Reports](#get-all-reports)
        -   [Get Report By Id](#get-report-by-id)
        -   [Get Reports By Project ID](#get-by-project-id)
        -   [Get Reports with a word repeated for three (3) times](#get-by-word)
    -   [Create Report](#create-report)
    -   [Update Report](#update-report)
    -   [Delete Report](#delete-report)
        -   [Delete Reports By Project ID](#delete-by-project-id)

# Projects

## 1. Get project

### 1.1 Get All Projects

Retrieves all projects in the database

Sample Request

```
curl --location 'http://localhost:3000/projects' \
--header 'Authorization: Password123'
```

Sample Response

```
[
    {
        "id": "1",
        "name": "Project 1",
        "description": "Description 1"
    },
    {
        "id": "2",
        "name": "Project 2",
        "description": "Description 2"
    }
]
```

### 1.2 Get Project By Id

Retrieves a project given a projectId

Sample Request

```
curl --location 'http://localhost:3000/projects/ad6253d9-629b-4726-be3a-3a9a29fca695' \
--header 'Authorization: Password123'
```

Sample Response

```
{
    "id": "ad6253d9-629b-4726-be3a-3a9a29fca695",
    "name": "Project Nemo",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}
```

## 2. Create Project

Create a project with the given attributes

Sample Request

```
curl --location 'http://localhost:3000/projects' \
--header 'Authorization: Password123' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Complete Project",
    "description": "A Sample Complete project"
}'
```

Sample Response

```
{
    "id": "1549690f-3fa1-4e25-90ec-6e1e150587a3",
    "name": "Complete Project",
    "description": "A Sample Complete project"
}
```

## 3. Update Project

Update a details of a project. Name and description can be updated but ID cannot be.

Sample Request

```
curl --location --request PATCH 'http://localhost:3000/projects/1549690f-3fa1-4e25-90ec-6e1e150587a3' \
--header 'Authorization: Password123' \
--header 'Content-Type: application/json' \
--data '{
    "description": "Updated Description",
    "name": "Updated Project"
}'
```

Sample Response

```
204 No Content
```

## 4. Delete Project

Delete a project with the given ID

Sample Request

```
curl --location --request DELETE 'http://localhost:3000/projects/a65e36cb-bc14-45d0-86b9-2d26e429e402aaa' \
--header 'Authorization: Password123'
```

Sample Response

```
204 No Content
```

# Reports

## 1. Get report

### 1.1 Get All Reports

Retrieves all reports in the database

Sample Request

```
curl --location 'http://localhost:3000/reports' \
--header 'Authorization: Password123'
```

Sample Response

```
[
    {
        "id": "b91a4002-12fa-474c-803a-796acff20eb8",
        "text": "This is a report",
        "projectid": "1234"
    },
    {
        "id": "5447dd0f-ce75-4220-9a94-6dd6c5ae2e62",
        "text": "This is another report",
        "projectid": "114"
    }
]
```

### 1.2 Get Report By Id

Retrieve all reports in the database

Sample Request

```
curl --location 'http://localhost:3000/reports/26c6e474-a479-40c1-a5fc-e8329c929779' \
--header 'Authorization: Password123'
```

Sample Response

```
{
    "id": "26c6e474-a479-40c1-a5fc-e8329c929779",
    "text": "This is a Sample Report",
    "projectid": "Project-ID-1"
}
```

### 1.3 Get Reports By Project ID

Retrieve all reports with the same project ID

Sample Request

```
curl --location 'http://localhost:3000/reports?projectid=1' \
--header 'Authorization: Password123'
```

Sample Response

```
[
    {
        "id": "1",
        "text": "Dive into the Quantum Quiche Quest, where culinary arts meet quantum physics. This project explores the tantalizing effects of quantum principles on baking techniques, aiming to uncover the perfect quiche formula. By manipulating matter at the subatomic level, we strive to enhance flavor profiles and textures that defy conventional cooking wisdom. Join us as we entangle particles and palates in a daring dance of deliciousness, charting a course through unexplored culinary territories with scientific rigor and a pinch of fun.",
        "projectid": "1"
    },
    {
        "id": "2",
        "text": "Embark on the Quantum Quiche Expedition, where culinary innovation intersects with quantum physics. This project investigates the intriguing impact of quantum mechanics on baking methods, seeking to discover the ultimate quiche recipe. By altering matter at the subatomic scale, we aim to elevate flavors and textures beyond traditional culinary boundaries. Join us as we entwine particles and palates in a bold journey of gastronomic delight, navigating new culinary landscapes with scientific precision and a dash of whimsy.",
        "projectid": "1"
    }
]
```

### 1.4 Get Reports with a word repeating for at least three (3) times

Retrieve a list of report where a word appears for three (3) times

Sample Request

```
curl --location 'http://localhost:3000/reports?word=this' \
--header 'Authorization: Password123'
```

Sample Response

```
[
    {
        "id": "2521c1d7-a1f2-4b02-9608-fe0cd3a7d654",
        "text": "this this this",
        "projectid": "1234444"
    },
    {
        "id": "404a6ff5-8a12-4cfb-8a06-fb2b8e0435a6",
        "text": "this this this 2",
        "projectid": "10101"
    }
]
```

## 2. Create report

Create a report with the given attributes. Project must be existing before creation of report.

Sample Request

```
curl --location 'http://localhost:3000/reports' \
--header 'Authorization: Password123' \
--header 'Content-Type: application/json' \
--data '{
    "text": "Something report",
    "projectid": "c942e2f1-4d62-4f4b-82b8-953e9e000453"
}'
```

Sample Response

```
{
    "id": "4e25924a-9e59-4602-87f5-321da0ec658c",
    "text": "Something report",
    "projectid": "c942e2f1-4d62-4f4b-82b8-953e9e000453"
}
```

## 3. Update Report

Update a report with the given attributes. Project must be existing before creation of report..

Sample Request

```
curl --location --request PATCH 'http://localhost:3000/reports/4e25924a-9e59-4602-87f5-321da0ec658c' \
--header 'Authorization: Password123' \
--header 'Content-Type: application/json' \
--data '{
    "text": "New text 100",
    "projectid": "Non-existing project"
}'
```

Sample Response

```
204 No Content
```

## 4. Delete Report

### 4.1 Delete Report By Id

Delete a report with the given ID
Sample Request

```
curl --location --request DELETE 'http://localhost:3000/reports/4e25924aadasdas-9e59-4602-87f5-321da0ec658c' \
--header 'Authorization: Password123'
```

Sample Response

```
204 No Content
```

### 4.2 Delete Report By Project Id

Delete all reports with the given project ID

Sample Request

```
curl --location --request DELETE 'http://localhost:3000/reports?projectid=c942e2f1-4d62-4f4b-82b8-953e9e000453' \
--header 'Authorization: Password123'
```

Sample Response

```
204 No Content
```
