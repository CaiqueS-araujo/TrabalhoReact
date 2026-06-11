import { MAX_TEAM } from "../utils/constants";
import { spriteFront } from "../utils/sprites";

export default function TeamSlots({ team, removeFromTeam }) {
  return (
    <div
      style={{
        background: "#FFCB05",
        borderBottom: "4px solid #1D2C5E",
        padding: "8px 14px",
      }}
    >
      <div
        style={{
          fontSize: 7,
          color: "#1D2C5E",
          marginBottom: 6,
          letterSpacing: 1,
          fontWeight: 700,
        }}
      >
        SEU TIME
      </div>
      <div
        style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 2 }}
      >
        {Array.from({ length: MAX_TEAM }).map((_, i) => {
          const p = team[i];
          return (
            <div
              key={i}
              style={{
                width: 64,
                height: 64,
                flexShrink: 0,
                background: p
                  ? "linear-gradient(135deg,#2A75BB,#1D2C5E)"
                  : "rgba(29,44,94,.15)",
                border: `3px solid ${p ? "#1D2C5E" : "rgba(29,44,94,.3)"}`,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: p ? "0 3px 8px rgba(0,0,0,.3)" : "none",
              }}
            >
              {p ? (
                <>
                  <img
                    src={spriteFront(p.id)}
                    alt={p.name}
                    style={{
                      width: 48,
                      height: 48,
                      imageRendering: "pixelated",
                      filter: "drop-shadow(0 2px 3px rgba(0,0,0,.4))",
                    }}
                  />
                  <button
                    onClick={() => removeFromTeam(p.id)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "#CC0000",
                      color: "#fff",
                      border: "none",
                      fontSize: 7,
                      width: 16,
                      height: 16,
                      cursor: "pointer",
                      fontFamily: '"Press Start 2P",monospace',
                      lineHeight: "16px",
                      textAlign: "center",
                      padding: 0,
                      borderBottomLeftRadius: 4,
                    }}
                  >
                    ✕
                  </button>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,.65)",
                      fontSize: 5,
                      color: "#FFCB05",
                      textAlign: "center",
                      padding: "1px 2px",
                      textTransform: "uppercase",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.name}
                  </div>
                </>
              ) : (
                <span style={{ fontSize: 18, color: "rgba(29,44,94,.22)" }}>
                  +
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
