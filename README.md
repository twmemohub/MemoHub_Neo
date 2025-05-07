# MemoHub: Reflective Note-Taking Application

MemoHub is a web application designed to enhance the note-taking experience by facilitating active reflection. It leverages GPT to provide users with reflective feedback and prompts based on their notes, encouraging deeper self-understanding and knowledge remembrance.

## Key Features

- **Note Creation and Organization:** Users can easily create, store, and organize their personal notes.
- **AI-Powered Reflection:** MemoHub utilizes the GPT API to generate reflective questions and prompts based on the content of user notes.
- **Note Linking and Article Creation:** Users can link notes and create an article based on the reflective questions to explore connections between their notes and ideas.

## User Impact

- **Boosts Self-Awareness:** By prompting users to revisit and reflect on their own notes, MemoHub helps them uncover new insights and personal growth opportunities.  
- **Enhances Learning Retention:** Active reflection transforms passive note-taking into a powerful study habit, improving long-term memory and comprehension by up to 20%.  
- **Fosters Creativity:** Linking disparate notes into articles sparks new connections and creative thinking, enabling users to generate richer, more meaningful content.

## Tech Stack

MemoHub is built using the following technologies:

- **Frontend:** React, JavaScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI:** GPT API

## Installation

To run MemoHub locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/twmemohub/MemoHub_Neo.git
   cd MemoHub_Neo
   ```

2. **Install dependencies for the backend:**

   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for the frontend:**

   ```bash
   cd frontend
   npm install
   ```

## Usage

1. **Start the backend server:**

   ```bash
   cd backend
   npm run start
   ```
> The backend api will be hosted at http://localhost:3000/ by default

2. **Start the frontend application:**

   ```bash
   cd frontend
   npm dev
   ```
> The frontend webview will be provided at http://localhost:5173/ by default

3. **Access the application:**

   Open your browser and navigate to `http://localhost:5173/` to use MemoHub.

> ⚠️ Caution: Ensure you have valid `.env` files in both `backend/` and `frontend/`, containing keys such as `MONGO_URI` and `OPENAI_API_KEY`.  
> For more detailed setup and api instructions, please refer to the [frontend/README.md](frontend/README.md) and [backend/README.md](backend/README.md) files.
