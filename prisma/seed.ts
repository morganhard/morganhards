import { PrismaClient } from "../lib/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const INITIAL_PROJECTS = [
  {
    id: "ui-tars",
    name: "UI-TARS Sandbox",
    description: "Next-gen Native GUI Agent based on VLM. Executes complex desktop interactions via pure vision, bypassing fragile DOM-based automation.",
    type: "sandbox" as const,
    category: "DESKTOP_AUTO" as const,
    tags: ["VLM", "PyAutoGUI", "Computer Vision"],
    featured: true,
    imageUri: "/projects/ui-tars.png",
    status: "active" as const,
    resourceCostPerMin: 9.0,
    tokensPerInteraction: 1200,
    archDocs: {
      docsVersion: "v2.1",
      deploymentStrategy: "UI-TARS runs as a stateful K8s Job, using a VLM backend to interpret screen captures. Each session is isolated in a single-use ephemeral container provisioned on demand via the control plane API.",
      infrastructureRequirements: ["AWS EC2 g4dn.xlarge (Min 1x T4 GPU)", "16 GB RAM Sandbox Limit", "EFS Persistent Storage for model weights", "PyAutoGUI + xvfb virtual display"],
      integrationCode: `await fetch('/api/agents/dispatch', {\n  method: 'POST',\n  body: JSON.stringify({\n    agentId: 'ui-tars',\n    command: 'execute_workflow'\n  })\n});`,
    },
  },
  {
    id: "openbb",
    name: "OpenBB Terminal SDK",
    description: "AI-driven financial research terminal. Aggregates live market data and executes quantitative analysis via agentic workflows.",
    type: "sandbox" as const,
    category: "FINANCIAL" as const,
    tags: ["Quant", "FinGPT", "WebSockets"],
    featured: true,
    imageUri: "/projects/openbb.png",
    status: "active" as const,
    resourceCostPerMin: 4.8,
    tokensPerInteraction: 850,
    archDocs: {
      docsVersion: "v1.4",
      deploymentStrategy: "OpenBB runs as a persistent Docker container backed by a FastAPI proxy that streams live market data via WebSockets. The LLM agent layer is served through LiteLLM with a FinGPT adapter.",
      infrastructureRequirements: ["AWS EC2 t3.medium (CPU-only)", "8 GB RAM minimum", "WebSocket support on the load balancer", "Alpha Vantage + FRED API keys"],
      integrationCode: `await fetch('/api/agents/dispatch', {\n  method: 'POST',\n  body: JSON.stringify({\n    agentId: 'openbb',\n    command: 'execute_workflow'\n  })\n});`,
    },
  },
  {
    id: "higgfield",
    name: "Higgfield Video Gen",
    description: "High-fidelity, temporally consistent video generation pipeline running on scalable AWS g4dn instances. Provisioning required.",
    type: "sandbox" as const,
    category: "VIDEO_GEN" as const,
    tags: ["Diffusers", "NVIDIA A100", "CUDA"],
    featured: false,
    imageUri: "/projects/higgfield.png",
    status: "provisioning" as const,
    resourceCostPerMin: 75.0,
    tokensPerInteraction: 4000,
    archDocs: {
      docsVersion: "v0.8",
      deploymentStrategy: "Higgfield uses a Hugging Face Diffusers pipeline served via TorchServe on AWS g4dn instances. Frames are generated in parallel and assembled server-side before streaming to the client.",
      infrastructureRequirements: ["AWS EC2 g4dn.xlarge (NVIDIA A100 GPU)", "CUDA 12.1 + cuDNN 8.9", "40 GB VRAM minimum for full pipeline", "S3 bucket for output storage"],
      integrationCode: `await fetch('/api/agents/dispatch', {\n  method: 'POST',\n  body: JSON.stringify({\n    agentId: 'higgfield',\n    command: 'generate_video',\n    prompt: 'Your scene description here'\n  })\n});`,
    },
  },
  {
    id: "chatdev-v2",
    name: "ChatDev 2.0",
    description: "A virtual software company operating through communicating LLM agents. Auto-generates, tests, and deploys full-stack codebases.",
    type: "sandbox" as const,
    category: "CODING" as const,
    tags: ["Multi-Agent", "LangChain", "Docker"],
    featured: false,
    imageUri: "/projects/chatdev.png",
    status: "offline" as const,
    resourceCostPerMin: 3.0,
    tokensPerInteraction: 2000,
    archDocs: {
      docsVersion: "v1.1",
      deploymentStrategy: "ChatDev 2.0 orchestrates a multi-agent pipeline using LangChain and a custom role-assignment layer. Each agent (CEO, CTO, Dev, QA) runs as a separate LLM call chain within an isolated Docker environment.",
      infrastructureRequirements: ["Docker Compose stack (4 containers)", "OpenAI GPT-4o or compatible API", "8 GB RAM per agent container", "Git integration for automated commits"],
      integrationCode: `await fetch('/api/agents/dispatch', {\n  method: 'POST',\n  body: JSON.stringify({\n    agentId: 'chatdev-v2',\n    command: 'start_project',\n    spec: 'Build a REST API for a todo app'\n  })\n});`,
    },
  },
  {
    id: "infineon-multimodal",
    name: "Multimodal AI Diagnostic Agent",
    description: "Multimodal AI agent built with LangChain & CrewAI for SRAM/SCAN diagnostics on PSoC microcontrollers. Reduced manual analysis time by 40% at Infineon Technologies.",
    type: "showcase" as const,
    category: "AI_ML" as const,
    tags: ["LangChain", "CrewAI", "Silicon.da", "Multimodal"],
    featured: true,
    imageUri: "/projects/infineon-ai.png",
    githubUrl: "https://github.com/morganhard",
    showcaseStatus: "finished" as const,
    visibility: "confidential" as const,
  },
  {
    id: "infineon-rag",
    name: "Hybrid Search RAG Architecture",
    description: "Retrieval-Augmented Generation system on GCP Vertex AI processing 500GB+ of unstructured technical documents. Boosted EFA lab automation accuracy by 50%.",
    type: "showcase" as const,
    category: "AI_ML" as const,
    tags: ["Vertex AI", "RAG", "Python", "GCP"],
    featured: true,
    imageUri: "/projects/infineon-rag.png",
    githubUrl: "https://github.com/morganhard",
    showcaseStatus: "finished" as const,
    visibility: "confidential" as const,
  },
  {
    id: "badger-solar",
    name: "Solar Car Telemetry Dashboard",
    description: "Firmware-level C++ steering wheel dashboard for Badger Solar Racing CAR 2. Real-time CAN bus data visualization to optimize in-race power consumption.",
    type: "showcase" as const,
    category: "EMBEDDED" as const,
    tags: ["Firmware", "C++", "CAN bus", "Hardware UI"],
    featured: false,
    imageUri: "/projects/solar-racing.png",
    githubUrl: "https://github.com/morganhard",
    showcaseStatus: "finished" as const,
    visibility: "public" as const,
  },
  {
    id: "badger-drone",
    name: "Autonomous CV Drone Agent",
    description: "OpenCV + Python computer vision system for DJI Tello drones. Implements autonomous object tracking and a real-time hand gesture recognition controller.",
    type: "showcase" as const,
    category: "COMPUTER_VISION" as const,
    tags: ["OpenCV", "Python", "DJI SDK", "Computer Vision"],
    featured: false,
    imageUri: "/projects/drone-cv.png",
    githubUrl: "https://github.com/morganhard",
    showcaseStatus: "finished" as const,
    visibility: "public" as const,
  },
  {
    id: "course-planner",
    name: "Course Schedule Planner",
    description: "Full-stack Flask + React web application for course planning at Bellevue College. Served 200+ students using real-time data from the college's public API.",
    type: "showcase" as const,
    category: "WEB_FULLSTACK" as const,
    tags: ["React", "Flask", "Python", "REST API"],
    featured: false,
    imageUri: "/projects/course-planner.png",
    githubUrl: "https://github.com/morganhard",
    showcaseStatus: "finished" as const,
    visibility: "public" as const,
  },
];

async function main() {
  console.log("Seeding database...");

  for (const project of INITIAL_PROJECTS) {
    const { archDocs, ...projectData } = project;

    await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: {
        ...projectData,
        archDocs: archDocs ? { create: archDocs } : undefined,
      },
    });

    console.log(`  Seeded: ${project.name}`);
  }

  console.log("Seeding complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
