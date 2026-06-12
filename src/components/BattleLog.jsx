export default function BattleLog({ log, busy, battleOver }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "4px solid #1D2C5E",
        borderRadius: 6,
        padding: "10px 14px",
        fontSize: 9,
        color: "#1D2C5E",
        lineHeight: 2,
        minHeight: 52,
        marginBottom: 8,
        boxShadow: "0 4px 0 #1D2C5E",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -1,
          left: 12,
          background: "#2A75BB",
          color: "#FFCB05",
          fontSize: 6,
          padding: "1px 6px",
          borderRadius: "0 0 4px 4px",
          letterSpacing: 1,
        }}
      >
        BATALHA
      </div>
      {log}
      {!battleOver && !busy && (
        <span
          style={{
            animation: "blink .7s step-end infinite",
            display: "inline-block",
            marginLeft: 4,
          }}
        >
          ▼
        </span>
      )}
    </div>
  );
}
