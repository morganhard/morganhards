"use client";

import { AdminHeader } from "./_components/admin-header";
import { InfraStats } from "./_components/infra-stats";
import { ActiveDeployments } from "./_components/active-deployments";
import { SystemResources } from "./_components/system-resources";
import { ProjectManagement } from "./_components/project-management";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">
      <AdminHeader />
      <InfraStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <ActiveDeployments />
        <SystemResources />
      </div>
      <ProjectManagement />
    </div>
  );
}
