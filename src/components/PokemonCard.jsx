import { TYPE_COLORS } from "../utils/constants";
import { spriteFront } from "../utils/sprites";

export default function PokemonCard({ pokemon, inTeam, teamFull, onAdd }) {
  const disabled = inTeam || teamFull;

  return (
    <div
      className="pokemon-card"
      onClick={() => !disabled && onAdd(pokemon)}
      style={{
        background: inTeam
          ? "linear-gradient(135deg,rgba(255,203,5,.22),rgba(255,203,5,.08))"
          : "linear-gradient(135deg,rgba(42,117,187,.45),rgba(29,44,94,.55))",
        border: `2px solid ${inTeam ? "#FFCB05" : "rgba(255,255,255,.12)"}`,
        borderRadius: 8,
        padding: "8px 6px",
        textAlign: "center",
        cursor: disabled ? "default" : "pointer",
        opacity: teamFull && !inTeam ? 0.45 : 1,
        transition: "all .15s",
        position: "relative",
        boxShadow: inTeam ? "0 0 8px rgba(255,203,5,.25)" : "none",
      }}
    >
      {inTeam && (
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 3,
            background: "#FFCB05",
            color: "#1D2C5E",
            fontSize: 5,
            padding: "1px 4px",
            borderRadius: 3,
            fontWeight: 700,
          }}
        >
          TIME
        </div>
      )}

      <img
        src={spriteFront(pokemon.id)}
        alt={pokemon.name}
        loading="lazy"
        style={{
          width: 62,
          height: 62,
          imageRendering: "pixelated",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,.5))",
        }}
        onError={(e) => {
          e.target.style.opacity = ".2";
        }}
      />

      <div
        style={{
          fontSize: 6,
          color: inTeam ? "#FFCB05" : "#fff",
          textTransform: "uppercase",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          marginTop: 4,
          fontWeight: 700,
        }}
      >
        {pokemon.name}
      </div>
      <div
        style={{ fontSize: 5, color: "rgba(255,255,255,.35)", marginBottom: 5 }}
      >
        #{String(pokemon.id).padStart(3, "0")}
      </div>

      <div
        style={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {pokemon.types.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 5,
              background: TYPE_COLORS[t] || "#666",
              color: "#fff",
              padding: "2px 5px",
              borderRadius: 3,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
