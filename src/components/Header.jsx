import { useNavigate } from "react-router-dom";

export default function Header({ teamCount, view, setView, goToBattle }) {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#FFCB05", borderBottom: "4px solid #1D2C5E" }}>
      {/* topo */}
      <div
        style={{
          background: "#2A75BB",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "4px solid #FFCB05",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#1D2C5E",
            color: "#FFCB05",
            border: "2px solid #FFCB05",
            padding: "8px 12px",
            fontSize: 8,
            fontFamily: '"Press Start 2P",monospace',
            cursor: "pointer",
            borderRadius: 4,
            letterSpacing: 1,
            whiteSpace: "nowrap",
          }}
        >
          ← INICIO
        </button>
        <span
          style={{
            color: "#FFCB05",
            fontSize: 11,
            letterSpacing: 2,
            fontWeight: 700,
            flex: 1,
            textAlign: "center",
          }}
        >
          MEU TIME
        </span>
        <span
          style={{
            color: "rgba(255,255,255,.85)",
            fontSize: 8,
            whiteSpace: "nowrap",
            background: "rgba(0,0,0,.3)",
            padding: "4px 8px",
            borderRadius: 4,
            border: "1px solid rgba(255,203,5,.4)",
          }}
        >
          {teamCount}/6
        </span>
      </div>

      {/* abas */}
      <div style={{ display: "flex", background: "#1D2C5E" }}>
        {[
          { label: "MONTAR TIME", key: "team" },
          { label: "BATALHAR", key: "battle" },
        ].map(({ label, key }) => {
          const active = view === key;
          return (
            <button
              key={key}
              onClick={() => (key === "team" ? setView("team") : goToBattle())}
              style={{
                flex: 1,
                padding: "10px 0",
                fontSize: 8,
                fontFamily: '"Press Start 2P",monospace',
                fontWeight: 700,
                letterSpacing: 1,
                background: active ? "#FFCB05" : "transparent",
                color: active ? "#1D2C5E" : "rgba(255,203,5,.5)",
                border: "none",
                borderBottom: active
                  ? "3px solid #1D2C5E"
                  : "3px solid transparent",
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
