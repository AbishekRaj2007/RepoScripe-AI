# RepoScribe AI 🧠📄

An AI-powered tool that analyzes any public GitHub repository and automatically generates a clean, professional README.md file.

---

## 📌 Overview

Writing good documentation is time-consuming, and many great projects suffer from poorly written or missing READMEs. RepoScribe AI solves this problem by analyzing a GitHub repository’s structure, codebase, and configuration files to generate a well-structured, professional README suitable for recruiters, collaborators, and open-source users.

Users simply paste a GitHub repository URL, and the system generates a complete README using AI.

---

## ✨ Features

- Accepts public GitHub repository URLs  
- Analyzes repository structure and files  
- Detects tech stack and project purpose  
- Generates a professional README.md using AI  
- Live Markdown preview  
- Download README.md  
- Regenerate README if needed  

---

## 🧰 Tech Stack

### Frontend
- React / Next.js  
- Tailwind CSS  
- Markdown Preview  

### Backend
- Python  
- FastAPI  
- GitHub REST API  

### AI
- Large Language Model (Gemini / Open-source LLM)  
- Prompt Engineering  

---

## 🏗️ System Architecture

User
↓
Frontend (GitHub Repo URL Input)
↓
Backend API (FastAPI)
↓
GitHub API (Fetch Repository Data)
↓
AI Engine (Analyze + Generate README)
↓
Markdown Preview & Download


---

---

## ⚙️ Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/your-username/RepoScribe-AI.git
cd RepoScribe-AI

Backend Setup
cd backend
pip install -r requirements.txt
uvicorn api:app --reload

Frontend Setup
cd frontend
npm install
npm run dev

