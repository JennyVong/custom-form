# Form Builder

## Getting Started

- go into ./backend and ./frontend to copy the ./.env.example files into new .env files
- `docker compose up --build`
- `npm run migrate`
- `npm run seed`
- see app running here [http://localhost:3000/](http://localhost:3000/)

## Access the Database

- `docker exec -it vial-backend-b bash -c "psql -U vial"`
- if you view your database, you should be able to see a populated form data table
- running the following in your terminal will perform a GET request to fetch the form data

```bash
curl --location 'http://127.0.0.1:8080/form/{insert your generated form id here}' --header 'Content-Type: application/json'
```

## Tech stack

- [Next.js](https://nextjs.org)
- [Node](https://nodejs.org/en/)
- [Typescript](www.google.com)
- [Fastify](https://www.fastify.io/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker and Compose](https://www.docker.com/)
- [PostMan](https://www.postman.com/) for testing APIs

## Design

- [Figma](https://www.figma.com/design/3rPmGytNsGuj4qWZj19482/Untitled?node-id=0-1&t=M4MtpwJCWGGLhpZe-1)
  All components and initial design were done in figma before developing frontend

  - Somewhat inspired by figma, there is a tab for viewing usable components, a tab to view created forms, tab for viewing filled out forms
  - components are draggable onto the form builder for more interactive feel and ease of use
  - components are categorized into general components that can be further customized if adding additional input fields (ex. name, time, file upload, etc. )

## REST API Documentation

### Form APIs

#### Endpoints:

##### 1. Create a Form

- **Method**: `POST`
- **URL**: `/`
- **Request Body**:
  ```json
  {
    "name": "string", // Required. Name of the form.
    "fields": {} // Required. An object representing the form fields.
  }
  ```

### 1. Create a Form

- **Method**: `POST`
- **URL**: `/`
- **Request Body**:
  ```json
  {
    "name": "string", // Required. Name of the form.
    "fields": {} // Required. An object representing the form fields.
  }
  ```
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
  {
    "name": "string", // Required. Name of the form.
    "fields": {} // Required. An object representing the form fields.
  }
  ```
- **Description**
  Creates a new form with specified name and fields

- **Error Handling**:
  - returns `400` status code with message: `Invalid form data: 'name' and 'fields' are required` if `name` or `fields` are missing or invalid
  - returns `400` status code with message `failed to create form` if there's a server error while creating form

### 2. Get Form by ID

- **Method**: `GET`
- **URL**: `/:id`
- **Request Parameters**: `id (string)`: The Id of the form to retrieve
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
  {
    "id": "string", // The ID of the form
    "name": "string", // Name of the form
    "fields": {} // Form fields
  }
  ```
- **Description**

  - fetched form by its ID

- **Error Handling**:
  - returns `400` status code with message: `failed to fetch form` if error occurs while fetching form
  - returns `404` status code with message `form not found` if form with given ID does nto exist

### 3. Get All Forms

- **Method**: `GET`
- **URL**: `/`
- **Response**:

  - **Status**: `200 OK`
  - **Body**:

  ```json
  [
    {
      "id": "string", // The ID of the form
      "name": "string", // Name of the form
      "fields": {} // Form fields
    }
  ]
  ```

  - **Description**
  - fetches all forms stored in database

- **Error Handling**:
  - returns `400` status code with message: `failed to fetch forms` if error occurs while fetching forms

### Source Record APIs

### 1. Create Source Record from Source Data

- **Method**: `POST`
- **URL**: `/`
- **Request Body**:
  ```json
  {
    "formId": "string", // Required. The ID of the form the source record is associated with.
    "sourceData": [
      {
        "question": "string", // Required. The question in the source data.
        "answer": "string" // Required. The answer to the question.
      }
    ] // Required. Array of source data containing question-answer pairs.
  }
  ```
  - **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
  {
    "id": "string", // Auto-generated ID of the source record
    "formId": "string", // ID of the form
    "sourceData": [
      // Array of source data
      {
        "question": "string",
        "answer": "string"
      }
    ]
  }
  ```
- **Description**

  - Creates a new source record based on the form ID and the provided source data (question-answer pairs).

- **Error Handling**:
  - returns `400` status code with message: `failed to create sourceRecord` if error occurs while creating source record

### 2. Get All Source Records

- **Method**: `GET`
- **URL**: `/`
  - **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
  [
    {
      "id": "string", // ID of the source record
      "formId": "string", // ID of the form
      "sourceData": [] // Array of source data for the record
    } // Array of source records
  ]
  ```
- **Description**

  - Fetches all source records stored in the database.

- **Error Handling**:
  - returns `400` status code with message: `failed to fetch records` if error occurs while creating fetching records

### 3. Get Source Data from Source Record ID

- **Method**: `GET`
- **URL**: `/:sourceRecordId`
- **Request Parameters**: sourceRecordId(`string`): the ID of the source record
  - **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
  [
    {
      "question": "string", // Question in the source data
      "answer": "string" // Answer to the question
    }
  ]
  ```
- **Description**

  - Fetches all source data associated with a specific source record ID.

- **Error Handling**:
  - returns `400` status code with message: `failed to fetch source data` if error occurs while fetching source data
  - returns `404` status code with the message `source record not found` if the sourceRecordId does not exist
