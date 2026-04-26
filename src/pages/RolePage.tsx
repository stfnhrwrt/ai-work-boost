import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkflowCard } from "@/components/WorkflowCard";
import { getRole, getWorkflowsByRole } from "@/data/workflows";

const RolePage = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const role = roleId ? getRole(roleId) : undefined;

  if (!role) return <Navigate to="/" replace />;

  const workflows = getWorkflowsByRole(role.id);
  const Icon = role.icon;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-hero-gradient">
          <div className="container mx-auto px-6 py-12">
            <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{role.name}</span>
            </nav>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="mb-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {role.name}
                </h1>
                <p className="text-lg text-muted-foreground">{role.tagline}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {workflows.length} workflows
            </h2>
            <p className="text-sm text-muted-foreground">All take 5–10 minutes</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map((w) => (
              <WorkflowCard key={w.id} workflow={w} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default RolePage;
