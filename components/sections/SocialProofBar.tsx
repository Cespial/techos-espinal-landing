import { Award, Clock, Star } from "lucide-react";
import { SOCIAL_PROOF_STATS } from "@/lib/conversion";

const stats = [
  {
    value: `${SOCIAL_PROOF_STATS.jobsCompleted}+`,
    label: "trabajos realizados",
    icon: Award,
  },
  {
    value: `${SOCIAL_PROOF_STATS.avgRating}/5`,
    label: "calificación de clientes",
    icon: Star,
  },
  {
    value: `${SOCIAL_PROOF_STATS.yearsExperience}+ años`,
    label: "de experiencia",
    icon: Clock,
  },
];

export default function SocialProofBar() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className="h-5 w-5 text-orange-600"
                    aria-hidden="true"
                  />
                  <span className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </span>
                </div>
                <span className="text-sm text-slate-600">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
