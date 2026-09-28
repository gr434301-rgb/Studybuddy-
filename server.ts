import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Route: AI Quick Doubt solver
  app.post('/api/explain-doubt', async (req, res) => {
    try {
      const { question, userDoubt, chatHistory } = req.body;

      if (!question) {
        return res.status(400).json({ error: 'Question data is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      const systemPrompt = `You are "EduPulse Guru", an empathetic, expert CBSE Class 10 educator and board topper mentor.
Your job is to clarify students' doubts with crystal-clear conceptual explanations, step-by-step reasoning, NCERT references, and exam tips.
Keep explanations concise, encouraging, and easy to understand for a 10th-grade student. Use bullet points or numbered steps where helpful.
If asked in Hinglish or Hindi, respond naturally in bilingual Hindi/English or English as appropriate for Indian students.

Current Context:
Subject: ${question.subjectName}
Chapter: ${question.chapter}
Question: ${question.question}
Options:
${question.options?.map((opt: string, i: number) => `(${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}
Correct Answer: (${String.fromCharCode(65 + (question.correctAnswer ?? 0))}) ${question.options?.[question.correctAnswer ?? 0]}
Official Explanation: ${question.explanation}
Key Rule / Formula: ${question.formulaOrConcept || 'None'}`;

      if (apiKey) {
        const ai = new GoogleGenAI();
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        // Add system / context
        contents.push({
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nStudent's Doubt: ${userDoubt || 'Please explain why the correct answer is right, why the other options are wrong, and give me a trick or mnemonic to remember this for the board exam.'}` }]
        });

        // Add history if present
        if (Array.isArray(chatHistory)) {
          for (const msg of chatHistory) {
            contents.push({
              role: msg.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: msg.content }]
            });
          }
          if (userDoubt) {
            contents.push({
              role: 'user',
              parts: [{ text: userDoubt }]
            });
          }
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents
        });

        return res.json({
          reply: response.text || 'Explanation generated successfully.',
          source: 'gemini'
        });
      } else {
        // Fallback pedagogical answer when API key is not yet set
        const defaultReply = `### 💡 Concept Breakdown (EduPulse AI Tutor)

**1. Core Concept & Formula:**
${question.formulaOrConcept ? `• **Rule:** ${question.formulaOrConcept}` : `• This question tests core concepts from **${question.chapter}** (${question.subjectName}).`}

**2. Why (${String.fromCharCode(65 + (question.correctAnswer ?? 0))}) is Correct:**
• ${question.explanation}

**3. Common Board Exam Trap:**
• Board examiners often frame distractors that look mathematically or logically plausible if you skip sign conventions or skip balanced stoichiometric coefficients. Always write down the initial formula before substituting values!

**4. Quick Revision Tip:**
• Practice 2-3 similar NCERT Exemplar questions to reinforce this pattern for your final CBSE board paper.`;

        return res.json({
          reply: defaultReply,
          source: 'local'
        });
      }
    } catch (err: unknown) {
      console.error('Error generating AI explanation:', err);
      // Fallback response with helpful explanation
      const q = req.body?.question;
      return res.json({
        reply: `### 💡 Step-by-Step Concept Resolution

**Subject:** ${q?.subjectName || 'Class 10'} • **Chapter:** ${q?.chapter || 'General'}

**Key Solution Insight:**
${q?.explanation || 'Review the NCERT textbook definitions and formulas for this chapter.'}

${q?.formulaOrConcept ? `**Formula to Remember:** ${q.formulaOrConcept}` : ''}

*Tip:* Always check the units and conditions given in the problem statement before selecting your answer.`,
        source: 'fallback'
      });
    }
  });

  if (!isProd) {
    // Development mode with Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduPulse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
