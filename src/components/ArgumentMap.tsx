import { useMemo } from "react";

export interface MapNode {
  id: string;
  text: string;
  type: "claim" | "premise" | "evidence" | "assumption";
  isFallacious?: boolean;
}

export interface MapConnection {
  fromId: string;
  toId: string;
  type: "supports" | "contradicts" | "qualifies";
}

interface ArgumentMapProps {
  nodes: MapNode[];
  connections: MapConnection[];
  onNodeClick?: (nodeId: string) => void;
  selectedNodeId?: string | null;
  connectingFromId?: string | null;
}

const NODE_W = 192;
const NODE_H = 56;
const LEVEL_GAP = 96;
const H_GAP = 16;
const PAD = 32;

const TYPE_STYLES: Record<string, { border: string; bg: string; label: string }> = {
  claim: { border: "#D97706", bg: "rgba(120,53,15,0.5)", label: "CLAIM" },
  premise: { border: "#3B82F6", bg: "rgba(30,58,95,0.5)", label: "PREMISE" },
  evidence: { border: "#10B981", bg: "rgba(6,78,59,0.5)", label: "EVIDENCE" },
  assumption: { border: "#8B5CF6", bg: "rgba(59,7,100,0.5)", label: "ASSUMPTION" },
};

const CONN_COLORS: Record<string, string> = {
  supports: "#10B981",
  contradicts: "#EF4444",
  qualifies: "#F59E0B",
};

function computeLayout(nodes: MapNode[]) {
  const claims = nodes.filter((n) => n.type === "claim");
  const premises = nodes.filter((n) => n.type === "premise");
  const rest = nodes.filter((n) => n.type === "evidence" || n.type === "assumption");

  const levels = [claims, premises, rest].filter((l) => l.length > 0);
  const maxInLevel = Math.max(...levels.map((l) => l.length), 1);
  const canvasW = Math.max(maxInLevel * (NODE_W + H_GAP) - H_GAP + PAD * 2, 380);
  const canvasH = levels.length * LEVEL_GAP + PAD;

  const positions: Record<string, { x: number; y: number }> = {};
  levels.forEach((level, li) => {
    const totalW = level.length * NODE_W + (level.length - 1) * H_GAP;
    const startX = (canvasW - totalW) / 2;
    level.forEach((node, ni) => {
      positions[node.id] = {
        x: startX + ni * (NODE_W + H_GAP),
        y: PAD + li * LEVEL_GAP,
      };
    });
  });

  return { positions, canvasW, canvasH };
}

export default function ArgumentMap({
  nodes,
  connections,
  onNodeClick,
  selectedNodeId,
}: ArgumentMapProps) {
  const { positions, canvasW, canvasH } = useMemo(
    () => computeLayout(nodes),
    [nodes]
  );

  if (nodes.length === 0) {
    return (
      <div className="border border-dojo-border rounded-xl bg-dojo-surface/50 flex items-center justify-center h-48">
        <span className="text-dojo-muted text-sm">Map builds as you progress</span>
      </div>
    );
  }

  return (
    <div className="border border-dojo-border rounded-xl bg-dojo-surface/50 overflow-x-auto">
      <svg
        viewBox={`0 0 ${canvasW} ${canvasH}`}
        className="w-full"
        style={{ minHeight: 160, maxHeight: 420 }}
      >
        <defs>
          {Object.entries(CONN_COLORS).map(([type, color]) => (
            <marker
              key={type}
              id={`arrow-${type}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 Z" fill={color} />
            </marker>
          ))}
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const from = positions[conn.fromId];
          const to = positions[conn.toId];
          if (!from || !to) return null;

          let x1: number, y1: number, x2: number, y2: number;

          if (to.y + NODE_H <= from.y) {
            // Target above source
            x1 = from.x + NODE_W / 2;
            y1 = from.y;
            x2 = to.x + NODE_W / 2;
            y2 = to.y + NODE_H;
          } else if (to.y >= from.y + NODE_H) {
            // Target below source
            x1 = from.x + NODE_W / 2;
            y1 = from.y + NODE_H;
            x2 = to.x + NODE_W / 2;
            y2 = to.y;
          } else {
            // Same level
            const goRight = to.x > from.x;
            x1 = goRight ? from.x + NODE_W : from.x;
            x2 = goRight ? to.x : to.x + NODE_W;
            y1 = from.y + NODE_H / 2;
            y2 = to.y + NODE_H / 2;
          }

          const dy = y2 - y1;
          const sameLevel = Math.abs(dy) < NODE_H;
          const cpOffset = sameLevel ? 40 : Math.abs(dy) * 0.4;

          const d = sameLevel
            ? `M ${x1} ${y1} C ${x1} ${y1 - cpOffset}, ${x2} ${y2 - cpOffset}, ${x2} ${y2}`
            : `M ${x1} ${y1} C ${x1} ${y1 + (dy > 0 ? cpOffset : -cpOffset)}, ${x2} ${y2 - (dy > 0 ? cpOffset : -cpOffset)}, ${x2} ${y2}`;

          const color = CONN_COLORS[conn.type] || "#666";

          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeDasharray={conn.type === "qualifies" ? "6 3" : undefined}
              markerEnd={`url(#arrow-${conn.type})`}
              opacity={0.8}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = positions[node.id];
          if (!pos) return null;

          const style = TYPE_STYLES[node.type] || TYPE_STYLES.premise;
          const isSelected = selectedNodeId === node.id;
          const interactive = !!onNodeClick;

          return (
            <g
              key={node.id}
              onClick={() => onNodeClick?.(node.id)}
              style={{ cursor: interactive ? "pointer" : "default" }}
            >
              {/* Fallacy glow */}
              {node.isFallacious && (
                <rect
                  x={pos.x - 3}
                  y={pos.y - 3}
                  width={NODE_W + 6}
                  height={NODE_H + 6}
                  rx={12}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth={2}
                  opacity={0.6}
                />
              )}

              {/* Node background */}
              <rect
                x={pos.x}
                y={pos.y}
                width={NODE_W}
                height={NODE_H}
                rx={8}
                fill={style.bg}
                stroke={isSelected ? "#fff" : style.border}
                strokeWidth={isSelected ? 2.5 : 1.5}
                strokeDasharray={node.type === "assumption" ? "4 2" : undefined}
              />

              {/* Type label */}
              <text
                x={pos.x + 8}
                y={pos.y + 14}
                fontSize={9}
                fontWeight={600}
                letterSpacing={0.8}
                fill={style.border}
              >
                {style.label}
              </text>

              {/* Node text via foreignObject */}
              <foreignObject
                x={pos.x + 6}
                y={pos.y + 18}
                width={NODE_W - 12}
                height={NODE_H - 22}
              >
                <div
                  style={{
                    color: "#f0e6d6",
                    fontSize: 11,
                    lineHeight: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical" as const,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {node.text}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 py-2 border-t border-dojo-border/50 text-[10px]">
        {Object.entries(TYPE_STYLES).map(([type, s]) => (
          <span key={type} className="flex items-center gap-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm border"
              style={{ borderColor: s.border, background: s.bg }}
            />
            <span className="text-dojo-muted">{s.label}</span>
          </span>
        ))}
        <span className="text-dojo-muted">│</span>
        {Object.entries(CONN_COLORS).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-0.5"
              style={{
                background: color,
                borderBottom: type === "qualifies" ? `1px dashed ${color}` : undefined,
              }}
            />
            <span className="text-dojo-muted">{type}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
