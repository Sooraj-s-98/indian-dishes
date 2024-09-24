# Indian Dishes - Full Stack App

This is a full-stack application to explore and manage a variety of Indian dishes. It includes both front-end and back-end components for handling the dish data, utilizing modern web technologies.

## Installation

Follow these steps to set up the development environment:

### 1. Clone the Repository
First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/Sooraj-s-98/indian-dishes.git
```

### 2. Navigate to the Project Directory
Move into the project directory where the code is located:

```bash
cd indian-dishes
```

### 3. Set Up Configuration
Copy the sample configuration file, then rename it and add your MySQL database credentials:

```bash
cp scripts/config.json.sample scripts/config.json
```
After copying, open the 'scripts/config.json' file and enter your database credentials.

### 4. Install Dependencies
Install all the required dependencies for both front-end and back-end using:

```bash
npm install
```

### 5. Setup databse data
To insert initial data into the database, run the following command:

```bash
node scripts/insertData.js
```
### 6. Set Up Environment Variables
Copy the `.env.example` file, rename it to `.env.local`, and add your environment-specific values:

```bash
cp .env.example .env.local
```

### 7. Start the Application
To run the application in development mode, use the following command:

```bash
npm run dev
```




https://github.com/user-attachments/assets/451b498d-25e9-4e98-a5e3-d58640aa80d8




https://github.com/user-attachments/assets/feed8f62-b981-465f-8ad7-e3e51c33690f







