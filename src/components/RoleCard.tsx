import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Role } from "@/data/workflows";

interface RoleCardProps {
  role: Role;
  workflowCount: number;
}

export function RoleCard({ role, workflowCount }: RoleCardProps) {
  const Icon = role.icon;
  return (
    <Link
      to={`/role/${role.id}`}
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
    >
      <div>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">{role.name}</h3>
        <p className="mb-1 text-sm font-medium text-primary">{role.tagline}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{role.description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="font-medium text-muted-foreground">
          {workflowCount} workflows
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-primary transition-transform group-hover:translate-x-0.5">
          Explore
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
