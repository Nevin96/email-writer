# 📧 AI Email Reply Generator

An AI-powered email reply generator built with **Spring Boot**, **React**, and the **Google Gemini API**, featuring a **Gmail Chrome Extension** that generates intelligent email replies directly inside Gmail.

---

## ✨ Features

- 🤖 AI-generated email replies using Google Gemini
- 🎭 Multiple reply tones (Professional, Friendly, Casual, Sarcastic, etc.)
- 🌐 React web application
- 📬 Gmail Chrome Extension
- ⚡ REST API built with Spring Boot
- 🔄 Real-time communication between frontend and backend
- 📋 One-click insertion of generated replies into Gmail

---

## 🖼️ Demo

### Web Application
> Add screenshots or GIF here

### Gmail Chrome Extension
> Add screenshots or GIF here

---

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring WebFlux (WebClient)
- Jackson
- Maven

### Frontend
- React
- Material UI
- Axios

### Browser Extension
- JavaScript
- Chrome Extension Manifest V3
- MutationObserver API
- DOM Manipulation

### AI
- Google Gemini API

---

## 📂 Project Structure

```
email-writer/
│
├── src/                  # Spring Boot Backend
├── frontend/             # React Frontend
├── extension/            # Gmail Chrome Extension
├── pom.xml
└── README.md
```

---

## 🚀 How It Works

### Web Application

1. User enters the original email.
2. Selects the desired tone.
3. React sends a POST request to the Spring Boot backend.
4. Spring Boot builds a prompt and sends it to Gemini.
5. Gemini generates a reply.
6. The generated reply is displayed in the UI.

### Gmail Extension

1. Detects when a Gmail compose/reply window opens.
2. Injects an **AI Reply** button beside Gmail's Send button.
3. Reads the email content from Gmail.
4. Sends it to the Spring Boot backend.
5. Receives the AI-generated reply.
6. Automatically inserts the reply into the compose box.

---

## 📡 API

### Generate Reply

```
POST /api/email/generate
```

### Request

```json
{
  "content": "Thank you for reaching out regarding the project.",
  "tone": "Professional"
}
```

### Response

```text
Dear John,

Thank you for reaching out. I appreciate your message and will review the details shortly.

Best regards,
Nevin
```

---

## ⚙️ Running the Project

### Clone the repository

```bash
git clone https://github.com/<your-username>/email-writer.git
cd email-writer
```

### Backend

Set the following environment variables:

```properties
GEMINI_URL=<Gemini API Endpoint>
GEMINI_API=<Your API Key>
```

Run:

```bash
mvn spring-boot:run
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### Chrome Extension

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Enable **Developer Mode**.
4. Click **Load unpacked**.
5. Select the `extension` folder.

---

## 🔮 Future Improvements

- Streaming AI responses
- Reply regeneration
- Custom prompt templates
- Dark mode
- Reply history
- Authentication
- Support for Outlook
- Support for multiple AI providers

---

