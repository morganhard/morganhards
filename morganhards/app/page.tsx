import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Terminal, Video, Workflow, Cpu, Database, Network } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-50 font-sans">

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-900/20 p-6 hidden md:flex md:flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold tracking-tight">Platform OS</h2>
          <p className="text-xs text-neutral-500">v1.0.0-beta</p>
        </div>

        <nav className="space-y-6 flex-1">
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Portfolio</p>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-neutral-300 hover:text-white">Overview</Button>
              <Button variant="ghost" className="w-full justify-start text-neutral-300 hover:text-white">Architecture</Button>
            </div>
          </div>

          <Separator className="bg-neutral-800" />

          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Active Workspaces</p>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-neutral-400 hover:text-blue-400">
                <Terminal className="mr-2 h-4 w-4" /> Local Daemon
              </Button>
              <Button variant="ghost" className="w-full justify-start text-neutral-400 hover:text-purple-400">
                <Video className="mr-2 h-4 w-4" /> GPU Cluster
              </Button>
              <Button variant="ghost" className="w-full justify-start text-neutral-400 hover:text-green-400">
                <Workflow className="mr-2 h-4 w-4" /> n8n Orchestration
              </Button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 lg:p-24 overflow-y-auto">

        {/* Hero Section */}
        <header className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4 border-neutral-700 text-neutral-300">
            Available for Fall 2026 MEng Programs
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Morgan Hardjadinata
          </h1>
          <h2 className="text-2xl text-blue-500 font-semibold mb-6">
            Computer & Data Science | UW-Madison
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Specializing in bridging the gap between low-power edge AI logic and high-power compute.
            Building scalable orchestration platforms, microservices, and dynamic web applications.
          </p>
        </header>

        {/* Projects Grid */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-2">
            <h3 className="text-2xl font-bold">Engineering Showcases</h3>
            <Button variant="outline" size="sm">View GitHub</Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* Project Card 1 */}
            <Card className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-blue-500/10 rounded-lg w-fit mb-4">
                    <Cpu className="h-6 w-6 text-blue-500" />
                  </div>
                  <Badge className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-0">Hardware/Software</Badge>
                </div>
                <CardTitle>Cortex-Connect</CardTitle>
                <CardDescription className="text-neutral-400 mt-2">
                  Retrofitting legacy industrial machinery with an NVIDIA Jetson Orin Nano for edge AI capabilities. Navigated the complex electrical engineering challenges of interfacing low-power logic with high-power motors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">Embedded Systems</Badge>
                  <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">Edge AI</Badge>
                  <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">C++</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Project Card 2 */}
            <Card className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-purple-500/10 rounded-lg w-fit mb-4">
                    <Network className="h-6 w-6 text-purple-500" />
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-0">MLOps</Badge>
                </div>
                <CardTitle>Automated EFA & SRAM Diagnostics</CardTitle>
                <CardDescription className="text-neutral-400 mt-2">
                  Engineered AI solutions for Infineon Technologies across Singapore, Tokyo, and San Jose. Developed systems to fully automate Electrical Failure Analysis and diagnostic workflows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">Python</Badge>
                  <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">PyTorch</Badge>
                  <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">Automation</Badge>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

      </main>
    </div>
  );
}