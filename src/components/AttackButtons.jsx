export default function AttackButtons({ pokemon, busy, onUseMove }) {
  if (!pokemon) return null;

  const slots = [0, 1, 2, 3];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 6,
        marginBottom: 8,
      }}
    >
      {slots.map((i) => {
        const move = pokemon.moves[i];
        const hasMove = !!move;
        const power =
          i === 0
            ? Math.round(40 + pokemon.atk * 0.3)
            : Math.round(60 + pokemon.atk * 0.2);

        return (
          <button
            key={i}
            onClick={() => hasMove && !busy && onUseMove(i)}
            disabled={!hasMove || busy}
            style={{
              background:
                busy || !hasMove
                  ? "rgba(29,44,94,.35)"
                  : "linear-gradient(135deg,#1D2C5E,#2A3F7E)",
              border: `2px solid ${!hasMove ? "rgba(255,255,255,.08)" : busy ? "rgba(42,117,187,.3)" : "#2A75BB"}`,
              color: !hasMove ? "rgba(255,255,255,.2)" : "#fff",
              fontFamily: '"Press Start 2P",monospace',
              fontSize: 7,
              padding: "10px 5px",
              borderRadius: 8,
              cursor: hasMove && !busy ? "pointer" : "not-allowed",
              lineHeight: 1.8,
              opacity: busy && hasMove ? 0.45 : 1,
              transition: "all .15s",
              boxShadow: hasMove && !busy ? "0 3px 0 rgba(0,0,0,.4)" : "none",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              if (hasMove && !busy) {
                e.currentTarget.style.background =
                  "linear-gradient(135deg,#2A75BB,#1D2C5E)";
                e.currentTarget.style.borderColor = "#FFCB05";
              }
            }}
            onMouseLeave={(e) => {
              if (hasMove && !busy) {
                e.currentTarget.style.background =
                  "linear-gradient(135deg,#1D2C5E,#2A3F7E)";
                e.currentTarget.style.borderColor = "#2A75BB";
              }
            }}
          >
            {hasMove ? move.replace(/-/g, " ").toUpperCase() : "—"}
            {hasMove && (
              <span
                style={{
                  display: "block",
                  fontSize: 6,
                  color: "#FFCB05",
                  marginTop: 2,
                }}
              >
                POD: {power}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
