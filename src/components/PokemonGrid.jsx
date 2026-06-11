import { GEN_RANGES } from "../utils/constants";
import PokemonCard from "./PokemonCard";

export default function PokemonGrid({
  catalog,
  loadingCat,
  team,
  genIdx,
  search,
  searchResult,
  searching,
  onAdd,
  onSearch,
  onSearchChange,
  onClearSearch,
  onGenChange,
  onGoToBattle,
}) {
  const inTeam = (id) => team.some((p) => p.id === id);
  const display = searchResult ? [searchResult] : catalog;

  return (
    <div style={{ padding: 14 }}>
      {/* barra de busca */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Nome ou número..."
          style={{
            flex: 1,
            minWidth: 0,
            background: "#fff",
            border: "3px solid #1D2C5E",
            color: "#1D2C5E",
            fontFamily: '"Press Start 2P",monospace',
            fontSize: 8,
            padding: "10px 12px",
            borderRadius: 6,
            outline: "none",
          }}
        />
        <button
          onClick={onSearch}
          disabled={searching}
          style={{
            background: "#1D2C5E",
            color: "#FFCB05",
            border: "2px solid #FFCB05",
            padding: "10px 12px",
            fontSize: 10,
            fontFamily: '"Press Start 2P",monospace',
            cursor: "pointer",
            borderRadius: 6,
          }}
        >
          {searching ? "..." : "🔍"}
        </button>
        {searchResult && (
          <button
            onClick={onClearSearch}
            style={{
              background: "#CC0000",
              color: "#fff",
              border: "2px solid #1D2C5E",
              padding: "10px 10px",
              fontSize: 10,
              fontFamily: '"Press Start 2P",monospace',
              cursor: "pointer",
              borderRadius: 6,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* filtro de geração */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 12,
          overflowX: "auto",
          paddingBottom: 3,
        }}
      >
        {GEN_RANGES.map((g, i) => (
          <button
            key={g.label}
            onClick={() => onGenChange(i)}
            style={{
              background: genIdx === i ? "#FFCB05" : "#1D2C5E",
              color: genIdx === i ? "#1D2C5E" : "rgba(255,203,5,.7)",
              border: "2px solid #FFCB05",
              padding: "6px 10px",
              fontSize: 7,
              fontFamily: '"Press Start 2P",monospace',
              cursor: "pointer",
              borderRadius: 20,
              whiteSpace: "nowrap",
              flexShrink: 0,
              fontWeight: genIdx === i ? 700 : 400,
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* grade de pokémon */}
      <div
        style={{
          background: "#1D2C5E",
          borderRadius: 10,
          padding: 10,
          border: "3px solid #FFCB05",
        }}
      >
        {loadingCat ? (
          <div
            style={{
              textAlign: "center",
              padding: 30,
              fontSize: 8,
              color: "rgba(255,203,5,.6)",
            }}
          >
            CARREGANDO...
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(108px,1fr))",
              gap: 8,
              maxHeight: "50vh",
              overflowY: "auto",
              paddingRight: 3,
            }}
          >
            {display.map((p) => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                inTeam={inTeam(p.id)}
                teamFull={team.length >= 6}
                onAdd={onAdd}
              />
            ))}
          </div>
        )}
      </div>

      {team.length > 0 && (
        <button
          onClick={onGoToBattle}
          style={{
            width: "100%",
            marginTop: 14,
            background: "linear-gradient(135deg,#FFCB05,#FFD940)",
            color: "#1D2C5E",
            border: "3px solid #1D2C5E",
            fontFamily: '"Press Start 2P",monospace',
            fontSize: 10,
            padding: 14,
            borderRadius: 8,
            cursor: "pointer",
            letterSpacing: 1,
            boxShadow: "0 4px 0 #1D2C5E",
          }}
        >
          BATALHAR
        </button>
      )}
    </div>
  );
}
