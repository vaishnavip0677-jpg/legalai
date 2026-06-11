import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ----------------------------------------------------
// AI API Endpoints
// ----------------------------------------------------

// Chat endpoint proxying requests to Gemini API
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], documentContext = "" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a smart fallback response when GEMINI_API_KEY is not configured
      console.log("GEMINI_API_KEY is not configured. Returning high-fidelity sandbox response.");
      return res.json({
        text: `[Sandbox Mode - Key Not Configured] \n\nI received your query: "${message}". To unlock full real-time Gemini intelligence, configure your GEMINI_API_KEY in the Secrets panel.\n\nIn the meantime, based on the uploaded document, there are key indemnification clauses in Section 4 and Section 12 that outline risk exposures exceeding corporate guidelines by 15%.`,
        sandbox: true
      });
    }

    const ai = getGeminiClient();

    // Construct robust prompt with systemic instructions and document context (if any)
    let systemInstruction = "You are Lumina Lex, an expert Legal AI Assistant. Assist the user with precise legal query auditing, risk summaries, and analytical contract reviews. Be objective, neutral, professional, and clear.";
    if (documentContext) {
      systemInstruction += `\n\nYou are answering questions regarding this document context:\n=== DOCUMENT START ===\n${documentContext}\n=== DOCUMENT END ===\nOnly answer based on the document if applicable, but do not hallucinate clauses that do not exist.`;
    }

    const contents = [...history, { role: "user", parts: [{ text: message }] }];

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.2
      }
    });

    return res.json({ text: result.text || "No response received from model." });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return res.status(500).json({ error: error.message || "An error occurred with Gemini." });
  }
});

// Dynamic document text analysis endpoint
app.post("/api/analyze", async (req, res) => {
  try {
    const { documentName, documentContent } = req.body;

    if (!documentContent) {
      return res.status(400).json({ error: "Document content is required for analysis." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Simulate real-time progress & smart mock analysis when API key is missing
      return res.json({
        documentId: "doc-temp-" + Date.now(),
        executiveSummary: {
          text: `[Sandbox Mode] Automated overview of: ${documentName || "document"}.\n\nThis contract is a detailed legal service layout. Standard fee allocation is outlined with standard termination and support policies. Review liability clauses prior to signature.`,
          highlightedSection: "Section 4"
        },
        obligations: [
          { title: "Service Standard", description: "Duties must be discharged with industry-acceptable performance." },
          { title: "Confidentiality Duration", description: "Non-disclosures bind the receiving party for 3 years post-expiration." }
        ],
        risks: [
          { title: "Unilateral Amendment Right", description: "Clause 14.5 lets the publisher alter terms post 30 days notice.", level: "high" },
          { title: "Indemnity Asymmetry", description: "One-way defense obligation favored towards provider.", level: "medium" }
        ],
        actions: [
          { id: "act-temp-1", title: "Review Clause 14.5 Amendments", description: "Request mutual agreement for modifications.", type: "edit" }
        ],
        parties: [
          { id: "party-temp-1", name: "Contractor Org", role: "Service Provider", description: "Vendor Entity", verified: true },
          { id: "party-temp-2", name: "User Client", role: "Receiver", description: "Client Entity", verified: false }
        ],
        criticalDates: [
          { id: "date-temp-1", label: "Signed Date", date: "Present", description: "Instant commencement upon execution", isHighRisk: false }
        ],
        keyClauses: [
          { id: "clause-temp-1", name: "Indemnification", status: "STANDARD", text: "Client indemnifies provider from general damages arising outside of gross negligence." }
        ],
        sandbox: true
      });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are a Legal QA Parser. Analyze the following contract and extract the details strictly in a JSON schema with exact fields:
    {
      "executiveSummary": { "text": string, "highlightedSection": string },
      "obligations": [ { "title": string, "description": string } ],
      "risks": [ { "title": string, "description": string, "level": "high" | "medium" | "low" } ],
      "actions": [ { "title": string, "description": string, "type": "edit" | "signature" | "attachment" } ],
      "parties": [ { "name": string, "role": string, "description": string, "verified": boolean } ],
      "criticalDates": [ { "label": string, "date": string, "description": string, "isHighRisk": boolean } ],
      "keyClauses": [ { "name": string, "status": "STANDARD" | "REVIEW REQ" | "CRITICAL", "text": string } ]
    }`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Perform detailed legal audit and analysis on the contract text below:\n\n${documentContent}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.1
      }
    });

    const parsedData = JSON.parse(result.text || "{}");
    return res.json({
      documentId: "doc-live-" + Date.now(),
      ...parsedData,
      live: true
    });
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    return res.status(500).json({ error: error.message || "An error occurred with Gemini." });
  }
});


// ----------------------------------------------------
// Serve Static Assets & SPA Handling (Express + Vite)
// ----------------------------------------------------

async function start() {
  if (process.env.NODE_ENV !== "production") {
    // Development server using Vite's direct middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production compiled static hosting
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lumina Lex server successfully listening on http://localhost:${PORT}`);
  });
}

start();
