# 🚀 AI-Powered Research Tool

## 📌 Overview
The **AI-Powered Research Tool** helps researchers and students analyze academic papers and YouTube videos efficiently. This web-based application is built using **Next.js** and leverages AI-powered capabilities to extract key insights from research content.

## ✨ Features
✅ **Analyze Research Papers**: Upload PDF or DOCX files to extract and summarize key insights.
✅ **Analyze YouTube Videos**: Paste a YouTube URL to extract and analyze the video transcript for key takeaways.
✅ **Fast & AI-Powered**: Uses cutting-edge AI models for intelligent content analysis.
✅ **User-Friendly Interface**: Clean, modern UI built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack
- **Frontend**: Next.js, Tailwind CSS, Framer Motion
- **AI Services**: Gemini API
- **Data Processing**:
  - YouTube Data V3 API (for transcript extraction)
  - Mammoth (for DOCX parsing)
  - pdf-parse (for PDF extraction)
  - youtube-transcript (for video transcript processing)

## 🚀 Installation
### 📌 Prerequisites
Ensure you have the following installed:
- **Node.js** (latest LTS recommended)
- **npm** or **yarn**

### 🔧 Steps
1️⃣ **Clone the Repository**
   ```sh
   git https://github.com/SaimaSyeda/AI-powered-research-tool.git
   cd project
   ```
2️⃣ **Install Dependencies**
   ```sh
   npm install  
   # or
   yarn install
   ```
3️⃣ **Set Up Environment Variables**
   Create a `.env.local` file and add the following keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   YOUTUBE_API_KEY=your_youtube_api_key
   ```
4️⃣ **Run the Development Server**
   ```sh
   npm run dev  
   # or
   yarn dev
   ```
   The app will be available at [`http://localhost:3000`](http://localhost:3000)

## 🎯 Usage
🔹 **Upload a Research Paper**: Click on the "Upload Paper" button and select a PDF or DOCX file.
🔹 **Analyze a YouTube Video**: Paste the video URL in the input field and let the tool generate insights.

## 🤝 Contributing
💡 Contributions are welcome! Feel free to open issues and submit pull requests.

## 📜 License
This project is licensed under the **MIT License**.


