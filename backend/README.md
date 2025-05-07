# MemoHub Backend

This README describes how to set up and use the MemoHub backend API, which provides endpoints for creating, reading, updating, and deleting notes and articles, as well as generating AI-driven reflection prompts.

---

## Prerequisites

- **Node.js** (LTS) 
- **npm** package manager  
- A running **MongoDB** instance (local or cloud)  
- A valid `.env` file with:
  ```
  MONGO_URI=<your-mongodb-connection-string>
  PORT=3000
  OPENAI_API_KEY=<your-openai-api-key>
  ```

# Setup (Detailed)
  ```
  npm install express mongoose body-parser dotenv axios nodemon cors
  ```
# Run
`cd backend`  
`npm run start:dev`
or
`npm run start`

## Data Models

**Note**

- **noteId** (ObjectId): Auto-generated MongoDB `_id`.
- **userId** (String): ID of the user owning this note.
- **title** (String): Note title.
- **content** (String): Note content.
- **isLinked** (Boolean): Whether this note is linked to an article.
- **createdAt** (Date): Timestamp when the note was created.

**Article**

- **articleId** (ObjectId): Auto-generated MongoDB `_id`.
- **userId** (String): ID of the user owning this article.
- **title** (String): Article title.
- **content** (String): Article content.
- **category** (String): Article category for classification.
- **linkedNotes** (String[]): Array of linked `noteId`s.
- **createdAt** (Date): Timestamp when the article was created.

## API Endpoints

_Base URL: `http://localhost:3000`_ for local testing

### Notes

- **POST** `/user/:userId/note`  
  Create a new note.  
  **Body:** `{ title, content }`

- **GET** `/note/:noteId`  
  Retrieve a single note by ID.

- **GET** `/user/:userId/notes`  
  List all notes for a user.

- **GET** `/user/:userId/notes?isLinked=true|false`  
  List notes filtered by `isLinked` status.

- **PUT** `/note/:noteId/title?title=newTitle`  
  Update note title.

- **PUT** `/note/:noteId/content`  
  Update note content.  
  **Body:** `{ content: newContent }`

- **PUT** `/note/:noteId/link?isLinked=true|false`  
  Toggle note’s linked status.

- **DELETE** `/note/:noteId`  
  Delete a note.  
  **Response:** `{ msg: "Deleted" }`

### Articles

- **POST** `/user/:userId/article`  
  Create an article.  
  **Body:** `{ title, content, category, linkedNotes }`

- **GET** `/article/:articleId`  
  Retrieve an article by ID.

- **GET** `/article/:articleId/linkedNotes`  
  Get notes linked to an article.

- **GET** `/user/:userId/articles`  
  List all articles for a user.

- **PUT** `/article/:articleId/title?title=newTitle`  
  Update article title.

- **PUT** `/article/:articleId/content`  
  Update article content.  
  **Body:** `{ content: newContent }`

- **PUT** `/article/:articleId/category?category=newCategory`  
  Update article category.

- **PUT** `/article/:articleId/linkedNotes`  
  Update linked notes.  
  **Body:** `{ linkedNotes: [noteId1, noteId2] }`

- **DELETE** `/article/:articleId`  
  Delete an article.  
  **Response:** `{ msg: "Deleted" }`

### AI Prompt

- **POST** `/questions`  
  Generate reflective questions for an article.  
  **Body:** `{ linkedNotes: [noteId1, noteId2] }`

### Danger Operation

- **DELETE** `/user/:userId/danger/clear-all`  
  Delete all notes and articles owned by the user.  
