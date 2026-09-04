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
      className="hover-lift group flex h-full flex-col justify-between border border-rule bg-card p-6"
    >
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-rule bg-primary-soft text-primary">
            <Icon className="h-4 w-4" />
          </span>
          <span className="label-eyebrow">
            {workflowCount} {workflowCount === 1 ? "workflow" : "workflows"}
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">
          {role.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-accent">{role.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{role.description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 border-t border-rule pt-3 text-sm font-medium text-primary">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
