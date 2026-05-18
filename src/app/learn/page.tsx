import Link from "next/link";
import { fallacies } from "@/data/fallacies";

export const metadata = {
  title: "Learn — Dojo",
  description:
    "Learn the patterns of weak reasoning. Belt-by-belt lessons that teach before they test.",
};

const WHITE_BELT_FALLACY_IDS = [
  "ad_hominem",
  "straw_man",
  "appeal_to_authority",
  "appeal_to_emotion",
  "false_dilemma",
  "slippery_slope",
];

export default function LearnHub() {
  const whiteBeltFallacies = WHITE_BELT_FALLACY_IDS.map(
    (id) => fallacies.find((f) => f.id === id)!,
  );

  const lockedBelts = [
    {
      name: "Yellow Belt",
      color: "#F5D442",
      blurb:
        "Sharper distinctions — hasty generalizations, red herrings, false cause. The tricks that hide in plain sight.",
    },
    {
      name: "Orange Belt",
      color: "#FF9800",
      blurb:
        "Argument structure. Stop treating arguments as opinion. Start seeing the parts.",
    },
    {
      name: "Green Belt",
      color: "#4CAF50",
      blurb:
        "Statistical reasoning. Base rates, correlation vs. causation, and the numbers people use to lie to you.",
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="px-6 py-4 border-b border-dojo-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
          >
            ← Back
          </Link>
          <span className="text-sm font-bold text-dojo-text tracking-wide">
            Learn
          </span>
          <div className="w-12" />
        </div>
      </div>

      <section className="px-6 pt-16 pb-10">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-dojo-accent/30 bg-dojo-accent/10 text-dojo-accent text-sm font-medium tracking-wide">
            Belt-Graded Lessons
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-dojo-text mb-5">
            Learn the moves before you spar with them.
          </h1>
          <p className="text-lg text-dojo-muted leading-relaxed">
            We teach first, then test. Start with the White Belt — the six
            tricks that show up in almost every argument you&apos;ll ever have.
            Once you can name them, you can see them coming.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* White Belt — available */}
          <Link
            href="/learn/white-belt"
            className="block p-7 rounded-xl border border-dojo-border bg-dojo-card hover:border-dojo-accent/60 hover:bg-dojo-accent/5 transition-all group"
          >
            <div className="flex items-start gap-5">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: "#E8E8E8",
                  backgroundColor: "#E8E8E815",
                  boxShadow: "0 0 14px #E8E8E840",
                }}
              >
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: "#E8E8E8" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-2xl font-bold text-dojo-text">
                    White Belt
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-dojo-accent/20 text-dojo-accent font-semibold">
                    Available
                  </span>
                  <span className="text-xs text-dojo-muted/70 ml-auto">
                    6 lessons · ~15 min
                  </span>
                </div>
                <p className="text-sm font-medium text-dojo-accent/90 mb-3">
                  The six you&apos;ll meet first
                </p>
                <p className="text-dojo-muted leading-relaxed mb-4">
                  Attacking the person, twisting the argument, name-dropping
                  authority, pulling on feelings, forcing fake choices, and
                  predicting the apocalypse. Once you know these, you&apos;ll see
                  them everywhere.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {whiteBeltFallacies.map((f) => (
                    <span
                      key={f.id}
                      className="text-xs px-2 py-1 rounded bg-dojo-bg/50 text-dojo-muted border border-dojo-border/50"
                    >
                      {f.name}
                    </span>
                  ))}
                </div>
                <div className="text-sm font-semibold text-dojo-accent group-hover:text-dojo-accent-hover transition-colors inline-flex items-center gap-1.5">
                  Start lesson
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Locked belts */}
          {lockedBelts.map((belt) => (
            <div
              key={belt.name}
              className="block p-6 rounded-xl border border-dojo-border/40 bg-dojo-card/40 opacity-60"
            >
              <div className="flex items-start gap-5">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: belt.color,
                    backgroundColor: `${belt.color}10`,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: belt.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-dojo-muted">
                      {belt.name}
                    </h2>
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-dojo-border/50 text-dojo-muted font-semibold">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-dojo-muted/80 leading-relaxed">
                    {belt.blurb}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-sm text-dojo-muted mb-3">
            Already know the basics?
          </p>
          <Link
            href="/play/fallacy-flash"
            className="inline-block text-sm font-medium text-dojo-accent hover:text-dojo-accent-hover transition-colors underline-offset-4 hover:underline"
          >
            Skip to Fallacy Flash →
          </Link>
        </div>
      </section>
    </main>
  );
}
