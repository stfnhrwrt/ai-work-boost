import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { taskTypes } from "@/data/taskTypes";
import { getTaskTypeCounts, taskTypeCountLabel } from "@/data/discovery";

const TaskTypes = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <SiteHeader />
    <main id="main" className="flex-1">
      <section className="border-b border-rule">
        <div className="container mx-auto px-6 py-12">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Workflows by task type
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Start from the work you need to get done. Counts show general workflows first, then
            Microsoft 365 app workflows, which are Copilot-specific.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {taskTypes.map((task, idx) => {
            const Icon = task.icon;
            const counts = getTaskTypeCounts(task.id);
            return (
              <Link
                key={task.id}
                to={`/workflows?task=${task.id}`}
                className="hover-lift fade-in-up group flex h-full flex-col border border-rule bg-card p-6 shadow-card"
                style={{ ["--i" as string]: idx }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mb-1 text-lg font-semibold text-foreground">{task.name}</h2>
                <p className="mb-4 text-sm text-muted-foreground">{task.description}</p>
                <div className="mt-auto flex items-center justify-between border-t border-rule pt-4 text-sm">
                  <span className="text-muted-foreground">{taskTypeCountLabel(counts)}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-primary transition-transform group-hover:translate-x-0.5">
                    Browse
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
);

export default TaskTypes;
