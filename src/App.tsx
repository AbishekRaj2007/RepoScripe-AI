import { useState } from "react";

type ReadmeStyle = "professional" | "minimal" | "detailed";

const App = () => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<ReadmeStyle>("professional");
  const [generatedReadme, setGeneratedReadme] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // ----------------------------
  // Helpers
  // ----------------------------
  const validateGitHubUrl = (url: string): boolean => {
    const regex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;
    return regex.test(url.trim());
  };

  // ----------------------------
  // Main handler (STREAMING)
  // ----------------------------
  const handleGenerate = async () => {
    setError("");

    if (!repoUrl.trim()) {
      setError("Please enter a GitHub repository URL");
      return;
    }

    if (!validateGitHubUrl(repoUrl)) {
      setError("Please enter a valid GitHub repo URL (https://github.com/user/repo)");
      return;
    }

    setIsLoading(true);
    setGeneratedReadme("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-readme-stream",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            repoUrl: repoUrl.trim(),
            style: selectedStyle,
          }),
        }
      );

      if (!response.body) {
        throw new Error("No response body received");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setGeneratedReadme((prev) => prev + decoder.decode(value));
      }
    } catch (err) {
      setError("Failed to generate README. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        fontFamily: "monospace",
        background: "#0b0b0b",
        color: "#eaeaea",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "12px" }}>🚀 RepoScribe AI</h1>
        <p style={{ opacity: 0.8 }}>
          Generate a professional README.md from a GitHub repository using AI.
        </p>

        {/* Repo URL Input */}
        <input
          type="text"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "16px",
            borderRadius: "6px",
            border: "1px solid #333",
            background: "#111",
            color: "#fff",
          }}
        />

        {/* Style Selector */}
        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value as ReadmeStyle)}
          style={{
            marginTop: "12px",
            padding: "10px",
            borderRadius: "6px",
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
          }}
        >
          <option value="professional">Professional</option>
          <option value="minimal">Minimal</option>
          <option value="detailed">Detailed</option>
        </select>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          style={{
            display: "block",
            marginTop: "16px",
            padding: "12px 18px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: isLoading ? "#444" : "#00ff9c",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {isLoading ? "Generating..." : "Generate README"}
        </button>

        {/* Error */}
        {error && (
          <p style={{ color: "#ff6b6b", marginTop: "12px" }}>{error}</p>
        )}

        {/* Output */}
        <pre
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "#050505",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
            minHeight: "200px",
            border: "1px solid #222",
            color: "#00ff9c",
          }}
        >
          {generatedReadme || "README output will appear here..."}
        </pre>
      </div>
    </div>
  );
};

export default App;
