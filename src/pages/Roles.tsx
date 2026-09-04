import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RoleCard } from "@/components/RoleCard";
import { getWorkflowsByRole, roles } from "@/data/workflows";

const Roles = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <SiteHeader />
    <main id="main" className="flex-1">
      <section className="border-b border-rule">
        <div className="container mx-auto px-6 py-12">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Workflows by role
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Each library is built around the real tasks that role does every week — independent of
            which AI assistant your company has approved.
          </p>
        </div>
      </section>

      <section id="roles" className="container mx-auto scroll-mt-20 px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, idx) => (
            <div key={role.id} className="fade-in-up h-full" style={{ ["--i" as string]: idx }}>
              <RoleCard role={role} workflowCount={getWorkflowsByRole(role.id).length} />
            </div>
          ))}
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
);

export default Roles;
