import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/lib/api";
import { useCountUp } from "@/hooks/useCountUp";
import type { Stat } from "@/lib/types";

function StatItem({ stat }: { stat: Stat }) {
  // Parse numeric part from value like "5+", "99.9%", "12+"
  const numericMatch = stat.value.match(/[\d.]+/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const suffix = stat.value.replace(/[\d.]+/, "");
  const isDecimal = stat.value.includes(".");

  const { count, ref } = useCountUp(
    isDecimal ? Math.floor(numericValue) : numericValue,
    1600
  );

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center px-6 py-2 group"
    >
      <div className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-1 tabular-nums">
        <span className="text-gradient-primary">
          {isDecimal ? `${count}.${stat.value.split(".")[1]?.replace(/\D/g, "") ?? ""}` : count}
        </span>
        <span className="text-primary text-2xl md:text-3xl">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm text-muted-foreground font-medium tracking-wide uppercase">
        {stat.label}
      </div>
    </div>
  );
}

const SignalBar = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading || !stats?.length) return null;

  return (
    <section className="relative border-y border-border bg-card/60 backdrop-blur-sm">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            {stats.map((stat: Stat) => (
              <StatItem key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignalBar;
