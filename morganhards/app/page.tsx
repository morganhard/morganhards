import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-50 font-sans">

      {/* Sidebar Navigation (For your future SaaS Apps) */}
      <aside className="w-64 border-r border-neutral-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold tracking-tight mb-8">Platform OS</h2>
        <nav className="space-y-4">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Portfolio</p>
          <Link href="#" className="block hover:text-blue-400 transition-colors">Overview</Link>
          <Link href="#" className="block hover:text-blue-400 transition-colors">Experience</Link>

          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pt-6">AI Workspace</p>
          <Link href="#" className="block text-neutral-400 hover:text-blue-400 transition-colors">Terminal Control</Link>
          <Link href="#" className="block text-neutral-400 hover:text-blue-400 transition-colors">Video Generation</Link>
          <Link href="#" className="block text-neutral-400 hover:text-blue-400 transition-colors">n8n Workflows</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 lg:p-24 overflow-y-auto">

        {/* Hero Section */}
        <header className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Software Engineer & <br /> <span className="text-blue-500">Cloud Infrastructure</span>
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Building scalable AI orchestration platforms, edge computing solutions, and dynamic web applications. Welcome to my portfolio and personal cloud environment.
          </p>
        </header>

        {/* Projects Grid */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 border-b border-neutral-800 pb-2">Featured Engineering</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Project Card 1 */}
            <div className="p-6 border border-neutral-800 rounded-xl bg-neutral-900/50 hover:border-neutral-700 transition-all">
              <h4 className="text-xl font-bold mb-2">Cortex-Connect</h4>
              <p className="text-sm text-neutral-400 mb-4">
                Retrofitting legacy industrial machinery with NVIDIA Jetson Orin Nano. Bridged low-power edge AI logic with high-power motor systems for real-time analytics.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-neutral-800 px-2 py-1 rounded">C++</span>
                <span className="text-xs bg-neutral-800 px-2 py-1 rounded">Embedded Systems</span>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="p-6 border border-neutral-800 rounded-xl bg-neutral-900/50 hover:border-neutral-700 transition-all">
              <h4 className="text-xl font-bold mb-2">Automated EFA & Diagnostics</h4>
              <p className="text-sm text-neutral-400 mb-4">
                Engineered AI solutions and automated SRAM/SCAN diagnostics at Infineon Technologies, drastically reducing manual failure analysis time.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-neutral-800 px-2 py-1 rounded">Python</span>
                <span className="text-xs bg-neutral-800 px-2 py-1 rounded">AI Models</span>
                <span className="text-xs bg-neutral-800 px-2 py-1 rounded">Automation</span>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}