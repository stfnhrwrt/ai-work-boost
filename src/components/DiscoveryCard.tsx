import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, TrendingDown } from "lucide-react";
import { DiscoveryItem } from "@/data/discovery";

interface DiscoveryCardProps {
  item: DiscoveryItem;
}

export function DiscoveryCard({ item }: DiscoveryCardProps) {
  return (
    <Link
      to={item.href}
      className="group flex h-full min-w-0 flex-col break-words rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover sm:p-6"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {item.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mb-2 text-base font-semibold leading-snug text-foreground sm:text-lg">
        {item.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      {item.effortAvoided && (
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
          <TrendingDown className="h-3 w-3" />
          Avoids {item.effortAvoided}
        </span>
      )}
      <div className="flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
        <span className="inline-flex items-center gap-1.5 truncate text-muted-foreground">
          {item.effort ? (
            <>
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {item.effort}
            </>
          ) : (
            <span className="truncate">{item.sourceLabel}</span>
          )}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 font-medium text-primary transition-transform group-hover:translate-x-0.5">
          Open
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
