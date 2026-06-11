export default function HpBar({ current, max, label, mini = false }) {
  const pct = Math.max(0, Math.round((current / max) * 100));
  const color = pct <= 20 ? "#FF0000" : pct <= 50 ? "#FFCB05" : "#4CAF50";

  if (mini) {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <span
            style={{
              fontSize: 6,
              color: "#1D2C5E",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
          <span style={{ fontSize: 6, color, fontWeight: 700 }}>
            {Math.max(0, current)}/{max}
          </span>
        </div>
        <div
          style={{
            height: 8,
            background: "rgba(0,0,0,.3)",
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,.3)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: color,
              borderRadius: 3,
              transition: "width .5s ease",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 8,
            fontWeight: 700,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 8,
            color,
            fontWeight: 700,
            background: "rgba(0,0,0,.4)",
            padding: "2px 6px",
            borderRadius: 4,
            border: `1px solid ${color}`,
          }}
        >
          {Math.max(0, current)}/{max}
        </span>
      </div>
      <div
        style={{
          height: 16,
          background: "rgba(0,0,0,.5)",
          borderRadius: 8,
          border: "2px solid rgba(255,255,255,.15)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg,${color}bb,${color})`,
            borderRadius: 6,
            transition: "width .5s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "rgba(255,255,255,.2)",
              borderRadius: "6px 6px 0 0",
            }}
          />
        </div>
        <span
          style={{
            position: "absolute",
            right: 5,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 6,
            color: "rgba(255,255,255,.6)",
          }}
        >
          {pct}%
        </span>
      </div>
    </div>
  );
}
