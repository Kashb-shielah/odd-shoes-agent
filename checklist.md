# Odd Shoes Agent — Build Checklist

> A step-by-step checklist for building and deploying the Odd Shoes AI chat agent using Next.js, Vercel AI SDK, and OpenAI.

---

## Phase 1: Environment & Setup (Minutes 0–5)

- [ ] **Generate OpenAI API Key**
  - Log into [OpenAI Dashboard](https://platform.openai.com/)
  - Navigate to API Keys → Create new secret key
  - Copy and store the key securely (you won't see it again)

- [ ] **Create GitHub Repository**
  - Create a new **public** repo named `odd-shoes-agent`
  - Do **not** initialize with README (the scaffold will create one)

- [ ] **Scaffold Next.js App**

  ```bash
  npx create-next-app@latest odd-shoes-agent
  ```

  - Select **Yes** for: TypeScript, Tailwind CSS, ESLint, App Router
  - Select **No** for: `src/` directory (optional, keep default)

- [ ] **Install Required Packages**

  ```bash
  cd odd-shoes-agent
  npm install ai @ai-sdk/openai lucide-react react-markdown
  ```

  - `ai` — Vercel AI SDK (streaming helpers)
  - `@ai-sdk/openai` — OpenAI provider for AI SDK
  - `lucide-react` — Icon library
  - `react-markdown` — Render markdown in chat bubbles

- [ ] **Create Environment Variables**
  - Create `.env.local` in project root
  - Add:
    ```
    OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
    ```
  - Verify `.env.local` is listed in `.gitignore`

---

## Phase 2: The Brain & Backend (Minutes 5–15)

- [ ] **Create API Route File**
  - Create folder structure: `app/api/chat/`
  - Create file: `app/api/chat/route.ts`

- [ ] **Implement Vercel AI SDK Backend**
  - Import `openai` from `@ai-sdk/openai`
  - Import `streamText` from `ai`
  - Export an async `POST` handler
  - Extract `messages` from the request body
  - Call `streamText()` with the OpenAI model and messages
  - Return the streaming response via `toDataStreamResponse()`

- [ ] **Craft the System Prompt**
      The system prompt must instruct the AI to:
  - [ ] Adopt a **professional, faith-driven tone** (implicitly channeling Colossians 3:23-24 — "Whatever you do, work at it with all your heart")
  - [ ] Have deep knowledge of the **three core services**:
    - **Genesis Build** — Full website/app builds from scratch
    - **Kingdom Builder** — Ongoing growth, SEO, and digital strategy
    - **AI & Automation** — Chatbots, workflows, and AI-powered tools
  - [ ] **Push the "Project Planner" CTA** naturally in conversation (e.g., "Ready to get started? Fill out our Project Planner!")
  - [ ] **Detect and acknowledge email addresses** when users share them (e.g., "Got it! We'll reach out to you at that address.")
  - [ ] Stay on-brand: concise, confident, and helpful

- [ ] **Set Edge Runtime (Optional but Recommended)**
  - Add `export const runtime = 'edge';` for fastest streaming response

---

## Phase 3: UI/UX & Frontend (Minutes 15–30)

- [ ] **Build the Chat Interface** (`app/page.tsx`)
  - [ ] Import `useChat` hook from `ai/react`
  - [ ] Import icons from `lucide-react` (e.g., `Send`, `Bot`, `User`)
  - [ ] Import `ReactMarkdown` from `react-markdown`
  - [ ] Destructure `messages`, `input`, `handleInputChange`, `handleSubmit`, `isLoading` from `useChat()`

- [ ] **Implement Message List**
  - [ ] Scrollable container with `overflow-y-auto`
  - [ ] Differentiate **user** vs **assistant** messages with distinct styling
  - [ ] Render assistant messages through `<ReactMarkdown>` for rich formatting
  - [ ] Auto-scroll to latest message on new content

- [ ] **Implement Chat Input**
  - [ ] Text input bound to `input` / `handleInputChange`
  - [ ] Submit button with `Send` icon
  - [ ] Disable input and button while `isLoading`
  - [ ] Support `Enter` key to send

- [ ] **Style with Tailwind — Odd Shoes Brand**
  - [ ] Clean, modern **grayscale** palette (`gray-50` → `gray-900`)
  - [ ] Subtle accent color for CTA button (e.g., `blue-600` or brand color)
  - [ ] Rounded message bubbles with appropriate padding
  - [ ] Responsive layout (works on mobile and desktop)
  - [ ] Professional typography (`font-sans`, proper sizing)

- [ ] **Add Persistent "Project Planner" CTA**
  - [ ] Visible button/banner near the chat input area
  - [ ] Links to the Odd Shoes Project Planner (external URL or form)
  - [ ] Styled distinctly so it stands out without being distracting
  - [ ] Always visible — does not scroll away with messages

- [ ] **Welcome State**
  - [ ] Show a branded welcome message when no messages exist
  - [ ] Include a brief description of what the agent can help with
  - [ ] Optionally show suggested starter prompts

---

## Phase 4: Local Testing (Minutes 30–33)

- [ ] **Run Development Server**
  ```bash
  npm run dev
  ```
- [ ] **Functional Tests**
  - [ ] Chat loads without errors at `http://localhost:3000`
  - [ ] Sending a message returns a streamed response
  - [ ] AI adopts the correct brand voice and tone
  - [ ] AI correctly describes the three services when asked
  - [ ] AI pushes the Project Planner CTA naturally
  - [ ] AI acknowledges email addresses (e.g., send "my email is test@example.com")
  - [ ] Messages render Markdown correctly (bold, lists, links)
  - [ ] Project Planner CTA button is visible and clickable
- [ ] **UI/UX Tests**
  - [ ] Responsive on mobile viewport (Chrome DevTools → Toggle device)
  - [ ] Auto-scroll works when new messages arrive
  - [ ] Input is disabled during streaming
  - [ ] No layout shifts or visual glitches

---

## Phase 5: Version Control & Deployment (Minutes 33–40)

- [ ] **Initialize Git & Push**

  ```bash
  git init
  git add .
  git commit -m "feat: initial Odd Shoes AI agent"
  git remote add origin https://github.com/YOUR_USERNAME/odd-shoes-agent.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **Deploy to Vercel**
  - Go to [vercel.com/new](https://vercel.com/new)
  - Import the `odd-shoes-agent` GitHub repository
  - Framework Preset should auto-detect **Next.js**

- [ ] **Add Environment Variables on Vercel**

  > ⚠️ **Critical — do this BEFORE clicking Deploy**
  - Key: `OPENAI_API_KEY`
  - Value: your OpenAI secret key
  - Environment: Production, Preview, Development

- [ ] **Trigger Deployment**
  - Click **Deploy** and wait for build to complete
  - Verify build logs show no errors

- [ ] **Connect Custom Domain**
  - Navigate to: Vercel Project → Settings → Domains
  - Add your custom domain
  - Update DNS at your registrar:
    - **Option A (recommended):** CNAME → `cname.vercel-dns.com`
    - **Option B:** A Record → `76.76.21.21`
  - Wait for SSL certificate provisioning (usually < 5 min)

---

## Phase 6: Production Verification & Pitch (Minutes 40–45)

- [ ] **Test Production**
  - [ ] Visit the live custom domain
  - [ ] Send a test message — confirm streaming works
  - [ ] Verify brand voice, CTA pushing, and email capture
  - [ ] Test on mobile browser
  - [ ] Check HTTPS is active (padlock icon)

- [ ] **Draft Pitch — 3 Key Talking Points**
  1. **Niche & Voice** — The agent captures the Christian founder niche and embodies Odd Shoes' professional, faith-driven brand identity
  2. **Technical Excellence** — Built on Next.js Edge Runtime with real-time streaming via Vercel AI SDK for instant, smooth responses
  3. **Automated Lead Generation** — Intelligent email capture and persistent Project Planner CTA drive conversions without human intervention

- [ ] **Submit Deliverables**
  - [ ] Vercel deployment URL
  - [ ] Custom domain URL
  - [ ] GitHub repository link

---

## Quick Reference — File Structure

```
odd-shoes-agent/
├── .env.local              # OPENAI_API_KEY (git-ignored)
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # AI backend — streaming endpoint
│   ├── globals.css          # Tailwind base styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Chat UI — main interface
├── public/                  # Static assets (logo, favicon)
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Key Dependencies

| Package          | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| `ai`             | Vercel AI SDK — `useChat` hook, streaming utilities |
| `@ai-sdk/openai` | OpenAI provider for AI SDK                          |
| `lucide-react`   | SVG icons (Send, Bot, User, etc.)                   |
| `react-markdown` | Render Markdown in assistant messages               |

---

_Built with Next.js + Vercel AI SDK + OpenAI — Odd Shoes Digital Agency_
