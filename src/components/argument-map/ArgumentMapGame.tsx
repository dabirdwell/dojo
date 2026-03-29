"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  argumentScenarios,
  type ArgumentScenario,
  type NodeType,
  type ConnectionType,
} from "@/data/arguments";
import { type Belt, getBeltForXP } from "@/data/belts";
import { awardXP, loadProgress } from "@/lib/progress";
import ArgumentMap, { type MapNode, type MapConnection } from "@/components/ArgumentMap";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltUpCelebration from "@/components/belt-up/BeltUpCelebration";
import ShareScore from "@/components/share-score/ShareScore";

type Phase = "claim" | "classify" | "connect" | "fallacies" | "result";

const NODE_LABELS: Record<NodeType, string> = {
  claim: "Claim",
  premise: "Premise",
  evidence: "Evidence",
  assumption: "Assumption",
};

const CONN_LABELS: Record<ConnectionType, { label: string; icon: string; color: string }> = {
  supports: { label: "Supports", icon: "↑", color: "text-green-400" },
  contradicts: { label: "Contradicts", icon: "✗", color: "text-red-400" },
  qualifies: { label: "Qualifies", icon: "~", color: "text-amber-400" },
};

function pickScenario(): ArgumentScenario {
  const progress = loadProgress();
  const belt = getBeltForXP(progress.totalXP);
  let target: "white" | "green" | "black";
  if (["White Belt", "Yellow Belt", "Orange Belt"].includes(belt.name)) {
    target = "white";
  } else if (["Green Belt", "Blue Belt"].includes(belt.name)) {
    target = "green";
  } else {
    target = "black";
  }
  const eligible = argumentScenarios.filter((s) => s.belt === target);
  return eligible[Math.floor(Math.random() * eligible.length)];
}

export default function ArgumentMapGame() {
  const [scenario] = useState(pickScenario);
  const [phase, setPhase] = useState<Phase>("claim");
  const [feedback, setFeedback] = useState(false);

  // Phase 1: Claim
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);

  // Phase 2: Classify
  const nonClaimComponents = useMemo(
    () => scenario.components.filter((c) => c.id !== scenario.claimId),
    [scenario]
  );
  const [classifyIdx, setClassifyIdx] = useState(0);
  const [classifications, setClassifications] = useState<Record<string, NodeType>>({});

  // Phase 3: Connect
  const [connectIdx, setConnectIdx] = useState(0);
  const [pendingTarget, setPendingTarget] = useState("");
  const [userConnections, setUserConnections] = useState<
    { fromId: string; toId: string; type: ConnectionType }[]
  >([]);

  // Phase 4: Fallacies
  const [markedFallacies, setMarkedFallacies] = useState<Set<string>>(new Set());

  // Scores
  const [claimScore, setClaimScore] = useState(0);
  const [classifyScore, setClassifyScore] = useState(0);
  const [connectScore, setConnectScore] = useState(0);
  const [fallacyScore, setFallacyScore] = useState(0);

  // Belt
  const [xpAwarded, setXpAwarded] = useState(false);
  const [earnedBelt, setEarnedBelt] = useState<Belt | null>(null);

  // AI evaluation (Green+ belt)
  const [aiEval, setAiEval] = useState<{
    structure: number;
    connections: number;
    fallacies: number;
    feedback: string;
  } | null>(null);

  // ── Build map from user choices ──────────────────────────
  const mapNodes = useMemo<MapNode[]>(() => {
    const nodes: MapNode[] = [];
    if (selectedClaimId) {
      const comp = scenario.components.find((c) => c.id === selectedClaimId);
      if (comp)
        nodes.push({
          id: comp.id,
          text: comp.text,
          type: "claim",
          isFallacious: markedFallacies.has(comp.id),
        });
    }
    for (const [compId, type] of Object.entries(classifications)) {
      const comp = scenario.components.find((c) => c.id === compId);
      if (comp)
        nodes.push({
          id: comp.id,
          text: comp.text,
          type,
          isFallacious: markedFallacies.has(comp.id),
        });
    }
    return nodes;
  }, [selectedClaimId, classifications, markedFallacies, scenario]);

  const mapConnections = useMemo<MapConnection[]>(
    () => userConnections.map((c) => ({ fromId: c.fromId, toId: c.toId, type: c.type })),
    [userConnections]
  );

  // ── Correct map for results ──────────────────────────────
  const correctNodes = useMemo<MapNode[]>(() => {
    const claim = scenario.components.find((c) => c.id === scenario.claimId)!;
    return [
      {
        id: claim.id,
        text: claim.text,
        type: "claim" as const,
        isFallacious: scenario.fallacies.some((f) => f.componentId === claim.id),
      },
      ...scenario.classifications.map((cl) => {
        const comp = scenario.components.find((c) => c.id === cl.componentId)!;
        return {
          id: comp.id,
          text: comp.text,
          type: cl.type,
          isFallacious: scenario.fallacies.some((f) => f.componentId === comp.id),
        };
      }),
    ];
  }, [scenario]);

  const correctConnections = useMemo<MapConnection[]>(
    () => scenario.connections.map((c) => ({ fromId: c.fromId, toId: c.toId, type: c.type })),
    [scenario]
  );

  // ── Phase handlers ───────────────────────────────────────
  const handleClaimSelect = useCallback(
    (id: string) => {
      if (feedback) return;
      setSelectedClaimId(id);
      const correct = id === scenario.claimId;
      if (correct) setClaimScore(1);
      setFeedback(true);
    },
    [feedback, scenario.claimId]
  );

  const advanceFromClaim = useCallback(() => {
    setFeedback(false);
    // If wrong, fix the claim for subsequent phases
    if (selectedClaimId !== scenario.claimId) {
      setSelectedClaimId(scenario.claimId);
    }
    setPhase("classify");
  }, [selectedClaimId, scenario.claimId]);

  const handleClassify = useCallback(
    (type: NodeType) => {
      if (feedback) return;
      const comp = nonClaimComponents[classifyIdx];
      const correct = scenario.classifications.find(
        (c) => c.componentId === comp.id
      );
      setClassifications((prev) => ({ ...prev, [comp.id]: type }));
      if (correct && correct.type === type) {
        setClassifyScore((s) => s + 1);
      }
      setFeedback(true);
    },
    [feedback, classifyIdx, nonClaimComponents, scenario.classifications]
  );

  const advanceFromClassify = useCallback(() => {
    setFeedback(false);
    // Fix incorrect classifications for the map
    const comp = nonClaimComponents[classifyIdx];
    const correct = scenario.classifications.find((c) => c.componentId === comp.id);
    if (correct) {
      setClassifications((prev) => ({ ...prev, [comp.id]: correct.type }));
    }
    if (classifyIdx < nonClaimComponents.length - 1) {
      setClassifyIdx((i) => i + 1);
    } else {
      setPhase("connect");
    }
  }, [classifyIdx, nonClaimComponents, scenario.classifications]);

  const handleConnect = useCallback(
    (type: ConnectionType) => {
      if (feedback || !pendingTarget) return;
      const comp = nonClaimComponents[connectIdx];
      setUserConnections((prev) => [
        ...prev,
        { fromId: comp.id, toId: pendingTarget, type },
      ]);
      const correct = scenario.connections.find((c) => c.fromId === comp.id);
      if (correct) {
        if (correct.toId === pendingTarget && correct.type === type) {
          setConnectScore((s) => s + 1);
        } else if (correct.toId === pendingTarget) {
          setConnectScore((s) => s + 0.5);
        }
      }
      setFeedback(true);
    },
    [feedback, pendingTarget, connectIdx, nonClaimComponents, scenario.connections]
  );

  const advanceFromConnect = useCallback(() => {
    setFeedback(false);
    setPendingTarget("");
    // Fix incorrect connections for the map
    const comp = nonClaimComponents[connectIdx];
    const correct = scenario.connections.find((c) => c.fromId === comp.id);
    if (correct) {
      setUserConnections((prev) => {
        const filtered = prev.filter((c) => c.fromId !== comp.id);
        return [...filtered, { fromId: correct.fromId, toId: correct.toId, type: correct.type }];
      });
    }
    if (connectIdx < nonClaimComponents.length - 1) {
      setConnectIdx((i) => i + 1);
    } else {
      setPhase("fallacies");
    }
  }, [connectIdx, nonClaimComponents, scenario.connections]);

  const toggleFallacy = useCallback((id: string) => {
    setMarkedFallacies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const submitFallacies = useCallback(() => {
    const correctIds = new Set(scenario.fallacies.map((f) => f.componentId));
    let score = 0;
    Array.from(markedFallacies).forEach((id) => {
      if (correctIds.has(id)) score += 1;
      else score -= 0.5;
    });
    setFallacyScore(Math.max(0, score));
    setPhase("result");
  }, [scenario.fallacies, markedFallacies]);

  // ── Scoring & XP ────────────────────────────────────────
  const maxScore =
    1 + nonClaimComponents.length + nonClaimComponents.length + scenario.fallacies.length;
  const totalScore = claimScore + classifyScore + connectScore + fallacyScore;
  const pct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 100;
  const xpEarned = 15 + Math.round(pct * 0.35);

  useEffect(() => {
    if (phase !== "result" || xpAwarded) return;
    const result = awardXP(
      "argument-map",
      xpEarned,
      Math.round(totalScore),
      maxScore
    );
    if (result.beltChanged && result.newBelt) {
      setEarnedBelt(result.newBelt);
    }
    setXpAwarded(true);

    // AI evaluation for Green+ belt
    const progress = loadProgress();
    const belt = getBeltForXP(progress.totalXP);
    if (!["White Belt", "Yellow Belt", "Orange Belt"].includes(belt.name)) {
      fetch("/api/evaluate-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          argumentText: scenario.text,
          userMap: {
            claim: selectedClaimId,
            classifications,
            connections: userConnections,
            fallacies: Array.from(markedFallacies),
          },
          correctMap: {
            claim: scenario.claimId,
            classifications: scenario.classifications,
            connections: scenario.connections,
            fallacies: scenario.fallacies,
          },
        }),
      })
        .then((r) => r.json())
        .then(setAiEval)
        .catch(() => {});
    }
  }, [
    phase, xpAwarded, xpEarned, totalScore, maxScore, scenario,
    selectedClaimId, classifications, userConnections, markedFallacies,
  ]);

  // ── Render ───────────────────────────────────────────────
  const phaseProgress =
    phase === "claim"
      ? 0
      : phase === "classify"
        ? 1
        : phase === "connect"
          ? 2
          : phase === "fallacies"
            ? 3
            : 4;

  const phaseLabels = ["Identify Claim", "Classify", "Connect", "Fallacies", "Result"];

  // ── RESULT SCREEN ────────────────────────────────────────
  if (phase === "result") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        {earnedBelt && (
          <BeltUpCelebration newBelt={earnedBelt} onDismiss={() => setEarnedBelt(null)} />
        )}
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">
              {pct >= 80 ? "🗺️" : pct >= 50 ? "📐" : "📖"}
            </div>
            <h2 className="text-3xl font-bold mb-1">Map Complete</h2>
            <p className="text-dojo-muted">
              {scenario.title} — {pct}% accuracy
            </p>
          </div>

          <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-6 text-center">
            <div className="text-4xl font-bold text-dojo-accent mb-1">+{xpEarned} XP</div>
            <div className="text-sm text-dojo-muted">15 base + {xpEarned - 15} accuracy</div>
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Claim", val: claimScore, max: 1 },
              { label: "Classify", val: classifyScore, max: nonClaimComponents.length },
              { label: "Connect", val: connectScore, max: nonClaimComponents.length },
              { label: "Fallacies", val: fallacyScore, max: scenario.fallacies.length },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-dojo-surface border border-dojo-border rounded-lg p-3 text-center"
              >
                <div className="text-xs text-dojo-muted mb-1">{s.label}</div>
                <div className="font-bold">
                  {Math.round(s.val * 10) / 10}/{s.max}
                </div>
              </div>
            ))}
          </div>

          {/* AI evaluation */}
          {aiEval && (
            <div className="bg-dojo-surface border border-dojo-border rounded-xl p-4 mb-6">
              <div className="text-xs uppercase tracking-wider text-dojo-muted mb-2">
                AI Analysis
              </div>
              <div className="flex gap-4 mb-3">
                {(["structure", "connections", "fallacies"] as const).map((k) => (
                  <div key={k} className="text-center">
                    <div className="text-lg font-bold">{aiEval[k]}/5</div>
                    <div className="text-[10px] text-dojo-muted capitalize">{k}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-dojo-muted">{aiEval.feedback}</p>
            </div>
          )}

          {/* Correct map */}
          <div className="mb-6">
            <div className="text-xs text-dojo-muted uppercase tracking-wider mb-2">
              Correct Structure
            </div>
            <ArgumentMap nodes={correctNodes} connections={correctConnections} />
          </div>

          {/* Fallacy explanations */}
          {scenario.fallacies.length > 0 && (
            <div className="space-y-2 mb-6">
              {scenario.fallacies.map((f) => {
                const comp = scenario.components.find((c) => c.id === f.componentId);
                return (
                  <div
                    key={f.componentId}
                    className="p-3 rounded-lg border border-red-800/50 bg-red-900/10 text-sm"
                  >
                    <div className="font-medium text-red-300 mb-1">{f.fallacyName}</div>
                    <div className="text-dojo-muted text-xs mb-1">
                      &ldquo;{comp?.text}&rdquo;
                    </div>
                    <div className="text-dojo-muted text-xs">{f.explanation}</div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-col items-center gap-3">
            <ShareScore score={pct} maxScore={100} modeName="Argument Map" />
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
            >
              Map Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME PHASES ──────────────────────────────────────────
  const currentClassifyComp =
    phase === "classify" ? nonClaimComponents[classifyIdx] : null;
  const currentConnectComp =
    phase === "connect" ? nonClaimComponents[connectIdx] : null;
  const correctClassify =
    currentClassifyComp
      ? scenario.classifications.find((c) => c.componentId === currentClassifyComp.id)
      : null;
  const correctConnect =
    currentConnectComp
      ? scenario.connections.find((c) => c.fromId === currentConnectComp.id)
      : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4 border-b border-dojo-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
          >
            ← Back
          </a>
          <div className="text-sm text-dojo-muted">{scenario.title}</div>
          <BeltBadge />
        </div>
        {/* Phase progress */}
        <div className="max-w-3xl mx-auto mt-3 flex gap-1">
          {phaseLabels.slice(0, 4).map((label, i) => (
            <div key={label} className="flex-1">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  i < phaseProgress
                    ? "bg-dojo-accent"
                    : i === phaseProgress
                      ? "bg-dojo-accent/50"
                      : "bg-dojo-card"
                }`}
              />
              <div
                className={`text-[9px] mt-1 text-center ${
                  i <= phaseProgress ? "text-dojo-muted" : "text-dojo-muted/40"
                }`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {/* Argument text */}
          <blockquote className="text-sm sm:text-base leading-relaxed text-dojo-text border-l-2 border-dojo-accent pl-4 mb-6">
            {scenario.text}
          </blockquote>

          {/* Live map */}
          <div className="mb-6">
            <ArgumentMap
              nodes={mapNodes}
              connections={mapConnections}
              selectedNodeId={
                phase === "fallacies" ? null : undefined
              }
              onNodeClick={phase === "fallacies" ? toggleFallacy : undefined}
            />
          </div>

          {/* ── PHASE 1: Identify Claim ───────────────── */}
          {phase === "claim" && (
            <div className="animate-fade-in">
              <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
                Phase 1 — Which statement is the main conclusion?
              </div>
              <div className="space-y-2">
                {scenario.components.map((comp) => {
                  const isSelected = selectedClaimId === comp.id;
                  const isCorrect = comp.id === scenario.claimId;
                  let classes =
                    "w-full text-left p-3 rounded-lg border text-sm transition-all ";
                  if (!feedback) {
                    classes +=
                      "border-dojo-border bg-dojo-card hover:border-dojo-accent/60 cursor-pointer";
                  } else if (isCorrect) {
                    classes += "border-green-600 bg-green-900/20 text-green-300";
                  } else if (isSelected && !isCorrect) {
                    classes += "border-red-600 bg-red-900/20 text-red-300";
                  } else {
                    classes += "border-dojo-border/50 bg-dojo-card/50 text-dojo-muted/50";
                  }
                  return (
                    <button
                      key={comp.id}
                      onClick={() => handleClaimSelect(comp.id)}
                      disabled={feedback}
                      className={classes}
                    >
                      {comp.text}
                    </button>
                  );
                })}
              </div>
              {feedback && (
                <div className="mt-4 animate-fade-in">
                  <div
                    className={`p-3 rounded-lg border text-sm ${
                      claimScore
                        ? "border-green-800/50 bg-green-900/10"
                        : "border-red-800/50 bg-red-900/10"
                    }`}
                  >
                    {claimScore
                      ? "Correct! The main conclusion is what the argument ultimately tries to prove."
                      : "Not quite. The claim is the overall conclusion — everything else supports or opposes it."}
                  </div>
                  <button
                    onClick={advanceFromClaim}
                    className="mt-4 w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
                  >
                    Continue to Classification
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── PHASE 2: Classify ─────────────────────── */}
          {phase === "classify" && currentClassifyComp && (
            <div className="animate-fade-in">
              <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
                Phase 2 — Classify component {classifyIdx + 1}/{nonClaimComponents.length}
              </div>
              <div className="bg-dojo-card border border-dojo-border rounded-lg p-4 mb-4">
                <p className="text-dojo-text font-medium">
                  &ldquo;{currentClassifyComp.text}&rdquo;
                </p>
              </div>
              <div className="text-xs text-dojo-muted mb-2">
                What role does this play in the argument?
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["premise", "evidence", "assumption"] as NodeType[]).map((type) => {
                  const userPicked = classifications[currentClassifyComp.id];
                  const isThis = userPicked === type;
                  const isCorrect = correctClassify?.type === type;
                  let classes =
                    "p-3 rounded-lg border text-center text-sm font-medium transition-all ";
                  if (!feedback) {
                    classes +=
                      "border-dojo-border bg-dojo-card hover:border-dojo-accent/60 cursor-pointer";
                  } else if (isCorrect) {
                    classes += "border-green-600 bg-green-900/20 text-green-300";
                  } else if (isThis && !isCorrect) {
                    classes += "border-red-600 bg-red-900/20 text-red-300";
                  } else {
                    classes += "border-dojo-border/50 bg-dojo-card/50 text-dojo-muted/50";
                  }
                  return (
                    <button
                      key={type}
                      onClick={() => handleClassify(type)}
                      disabled={feedback}
                      className={classes}
                    >
                      {NODE_LABELS[type]}
                    </button>
                  );
                })}
              </div>
              {feedback && (
                <div className="mt-4 animate-fade-in">
                  <button
                    onClick={advanceFromClassify}
                    className="w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
                  >
                    {classifyIdx < nonClaimComponents.length - 1
                      ? "Next Component"
                      : "Continue to Connections"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── PHASE 3: Connect ──────────────────────── */}
          {phase === "connect" && currentConnectComp && (
            <div className="animate-fade-in">
              <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
                Phase 3 — Connect component {connectIdx + 1}/{nonClaimComponents.length}
              </div>
              <div className="bg-dojo-card border border-dojo-border rounded-lg p-4 mb-4">
                <p className="text-dojo-text font-medium">
                  &ldquo;{currentConnectComp.text}&rdquo;
                </p>
              </div>

              {!feedback && (
                <>
                  <div className="text-xs text-dojo-muted mb-2">
                    This component relates to:
                  </div>
                  <select
                    value={pendingTarget}
                    onChange={(e) => setPendingTarget(e.target.value)}
                    className="w-full p-3 rounded-lg border border-dojo-border bg-dojo-card text-dojo-text text-sm mb-3 appearance-none"
                  >
                    <option value="">Select a component...</option>
                    {scenario.components
                      .filter((c) => c.id !== currentConnectComp.id)
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.text.length > 50 ? c.text.slice(0, 50) + "…" : c.text}
                        </option>
                      ))}
                  </select>
                  <div className="text-xs text-dojo-muted mb-2">Relationship:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {(["supports", "contradicts", "qualifies"] as ConnectionType[]).map(
                      (type) => (
                        <button
                          key={type}
                          onClick={() => handleConnect(type)}
                          disabled={!pendingTarget}
                          className={`p-3 rounded-lg border text-center text-sm font-medium transition-all ${
                            pendingTarget
                              ? "border-dojo-border bg-dojo-card hover:border-dojo-accent/60 cursor-pointer"
                              : "border-dojo-border/30 bg-dojo-card/30 text-dojo-muted/30 cursor-not-allowed"
                          }`}
                        >
                          <span className={CONN_LABELS[type].color}>
                            {CONN_LABELS[type].icon}
                          </span>{" "}
                          {CONN_LABELS[type].label}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}

              {feedback && correctConnect && (
                <div className="mt-4 animate-fade-in">
                  <div className="p-3 rounded-lg border border-dojo-border bg-dojo-surface text-sm">
                    <span className="text-dojo-muted">Correct: </span>
                    <span className={CONN_LABELS[correctConnect.type].color}>
                      {CONN_LABELS[correctConnect.type].label}
                    </span>
                    <span className="text-dojo-muted"> → </span>
                    <span className="text-dojo-text">
                      {scenario.components.find((c) => c.id === correctConnect.toId)?.text}
                    </span>
                  </div>
                  <button
                    onClick={advanceFromConnect}
                    className="mt-4 w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
                  >
                    {connectIdx < nonClaimComponents.length - 1
                      ? "Next Connection"
                      : "Continue to Fallacies"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── PHASE 4: Fallacies ────────────────────── */}
          {phase === "fallacies" && (
            <div className="animate-fade-in">
              <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
                Phase 4 — Click any nodes above that contain fallacious reasoning
              </div>
              <p className="text-sm text-dojo-muted mb-4">
                {markedFallacies.size === 0
                  ? "No nodes marked yet. Click nodes in the map, or submit if the argument is sound."
                  : `${markedFallacies.size} node${markedFallacies.size > 1 ? "s" : ""} marked as fallacious.`}
              </p>
              {markedFallacies.size > 0 && (
                <div className="space-y-1 mb-4">
                  {Array.from(markedFallacies).map((id) => {
                    const comp = scenario.components.find((c) => c.id === id);
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 text-sm text-red-300 bg-red-900/10 border border-red-800/30 rounded-lg px-3 py-2"
                      >
                        <span>⚠</span>
                        <span className="flex-1 truncate">{comp?.text}</span>
                        <button
                          onClick={() => toggleFallacy(id)}
                          className="text-dojo-muted hover:text-dojo-text text-xs"
                        >
                          remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <button
                onClick={submitFallacies}
                className="w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
              >
                Submit{scenario.fallacies.length === 0 ? " (No Fallacies)" : ""}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
