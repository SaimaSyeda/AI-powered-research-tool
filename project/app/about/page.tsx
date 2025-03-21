export default function AboutPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">How ResearchAI Works</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Powerful AI Research Assistant</h2>
        <p>
          ResearchAI combines cutting-edge artificial intelligence with intuitive design
          to help researchers, students, and professionals process and understand complex
          content more effectively.
        </p>

        <h3>Paper Processing Technology</h3>
        <p>
          Our paper processing engine uses advanced natural language processing to analyze
          academic papers and research documents. It can understand complex academic
          terminology, research methodologies, and citation patterns to provide
          meaningful insights.
        </p>

        <h3>Video Analysis System</h3>
        <p>
          The video processing system combines speech recognition, natural language
          understanding, and temporal analysis to convert video content into
          structured, searchable information with precise timestamp linking.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Smart Summarization:</strong> Get concise, accurate summaries
            that capture the essence of papers and videos
          </li>
          <li>
            <strong>Key Point Extraction:</strong> Automatically identify and
            organize the most important points and findings
          </li>
          <li>
            <strong>Interactive Navigation:</strong> Easily move between different
            sections of papers or video timestamps
          </li>
          <li>
            <strong>Citation Support:</strong> Generate properly formatted
            citations for academic papers
          </li>
        </ul>

        <h2>Privacy & Security</h2>
        <p>
          We take your privacy seriously. All uploaded content is processed securely
          and is never shared with third parties. Our systems use state-of-the-art
          encryption to protect your research materials.
        </p>
      </div>
    </div>
  );
}