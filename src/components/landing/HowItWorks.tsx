const steps = [
  {
    number: "1",
    title: "Pick a mode",
    description: "Choose from five training modes, each targeting a different critical thinking skill.",
    icon: "🎯",
  },
  {
    number: "2",
    title: "Answer challenges",
    description: "Spot fallacies, evaluate sources, build arguments, and question assumptions.",
    icon: "🧠",
  },
  {
    number: "3",
    title: "Earn XP and advance belts",
    description: "Every correct answer earns XP. Progress from White Belt to Black Belt across nine ranks.",
    icon: "🥋",
  },
  {
    number: "4",
    title: "Track your streak",
    description: "Daily challenges keep you sharp. Build a streak and watch your reasoning improve.",
    icon: "🔥",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          How It Works
        </h2>
        <p className="text-dojo-muted text-center mb-16 max-w-xl mx-auto">
          Martial arts training for your mind — structured, progressive, and rewarding.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-dojo-card border border-dojo-border rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-3">{step.icon}</div>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-dojo-accent/15 text-dojo-accent text-sm font-bold mb-3">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-dojo-text mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-dojo-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
