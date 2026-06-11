import HpBar from "./HpBar";
import BattleLog from "./BattleLog";
import AttackButtons from "./AttackButtons";
import { spriteFront, spriteBack } from "../utils/sprites";

function PokemonInfo({ pokemon, enemy }) {
  if (!pokemon) return null;
  return (
    <div
      style={{
        background: enemy ? "#CC0000" : "#1D2C5E",
        border: `2px solid ${enemy ? "#FF6B6B" : "#2A75BB"}`,
        borderRadius: 8,
        padding: "8px 10px",
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 7,
          color: "#FFCB05",
          textTransform: "uppercase",
          marginBottom: 5,
          letterSpacing: 1,
          fontWeight: 700,
        }}
      >
        {enemy ? "⚠ INIMIGO" : "★ SEU POKÉMON"}
      </div>
      <div
        style={{
          fontSize: 8,
          color: "#fff",
          textTransform: "uppercase",
          marginBottom: 6,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {pokemon.name}
      </div>
      <HpBar current={pokemon.hp} max={pokemon.maxHp} label="PS" />
    </div>
  );
}

export default function BattleArena({
  bs,
  log,
  busy,
  battleOver,
  onUseMove,
  onRestart,

  team,
  selectedIdx,
  enemyTeam,
  loadingEnemy,
  battleStarted,
  onToggleSelect,
  onStartBattle,
}) {
  const player = bs?.pQueue[bs.pIdx];
  const enemy = bs?.eQueue[bs.eIdx];

  const BattleField = ({ showPokemon }) => (
    <div
      style={{
        background:
          "linear-gradient(180deg,#1a3a6e 0%,#0d2040 55%,rgba(42,117,187,.3) 100%)",
        border: "3px solid #FFCB05",
        borderRadius: "10px 10px 0 0",
        padding: "12px 10px 0",
        minHeight: 190,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* chão */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 44,
          background:
            "linear-gradient(180deg,rgba(34,100,34,.4),rgba(20,60,20,.7))",
          borderTop: "2px solid rgba(100,200,100,.3)",
        }}
      />

      {showPokemon ? (
        <>
          {/* inimigo - frente */}
          {enemy && (
            <div
              style={{
                textAlign: "center",
                alignSelf: "flex-start",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 7,
                  color: "#FF9999",
                  textTransform: "uppercase",
                  marginBottom: 3,
                  letterSpacing: 1,
                }}
              >
                {enemy.name}
              </div>
              <img
                src={spriteFront(enemy.id)}
                alt={enemy.name}
                style={{
                  width: 120,
                  height: 120,
                  imageRendering: "pixelated",
                  filter: "drop-shadow(0 4px 8px rgba(255,0,0,.25))",
                }}
                onError={(e) => {
                  e.target.style.opacity = ".3";
                }}
              />
            </div>
          )}
          {/* jogador - costas */}
          {player && (
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <div
                style={{
                  fontSize: 7,
                  color: "#FFCB05",
                  textTransform: "uppercase",
                  marginBottom: 3,
                  letterSpacing: 1,
                }}
              >
                {player.name}
              </div>
              <img
                src={spriteBack(player.id)}
                alt={player.name}
                style={{
                  width: 120,
                  height: 120,
                  imageRendering: "pixelated",
                  filter: "drop-shadow(0 4px 8px rgba(255,203,5,.25))",
                }}
                onError={(e) => {
                  e.target.src = spriteFront(player.id);
                }}
              />
            </div>
          )}
        </>
      ) : (
        <>
          {loadingEnemy ? (
            <div
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,.4)",
                paddingBottom: 30,
                alignSelf: "center",
              }}
            >
              GERANDO INIMIGOS...
            </div>
          ) : (
            enemyTeam.map((p) => (
              <div key={p.id} style={{ textAlign: "center", zIndex: 1 }}>
                <img
                  src={spriteFront(p.id)}
                  alt={p.name}
                  style={{
                    width: 80,
                    height: 80,
                    imageRendering: "pixelated",
                    filter: "drop-shadow(0 2px 6px rgba(255,0,0,.3))",
                  }}
                />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );

  if (battleStarted) {
    return (
      <div>
        <BattleField showPokemon />

        {/* tela inferior: PS + ações */}
        <div
          style={{
            background: "rgba(13,32,64,.98)",
            border: "3px solid #FFCB05",
            borderTop: "none",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: "12px 14px 14px",
            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <PokemonInfo pokemon={enemy} enemy />
            <PokemonInfo pokemon={player} />
          </div>

          <BattleLog log={log} busy={busy} battleOver={battleOver} />

          {!battleOver && (
            <AttackButtons pokemon={player} busy={busy} onUseMove={onUseMove} />
          )}

          {battleOver && (
            <div
              style={{
                background:
                  battleOver === "win"
                    ? "linear-gradient(135deg,rgba(255,203,5,.22),rgba(255,203,5,.08))"
                    : "linear-gradient(135deg,rgba(204,0,0,.22),rgba(204,0,0,.08))",
                border: `3px solid ${battleOver === "win" ? "#FFCB05" : "#CC0000"}`,
                borderRadius: 10,
                padding: 18,
                textAlign: "center",
                boxShadow: `0 0 20px ${battleOver === "win" ? "rgba(255,203,5,.25)" : "rgba(204,0,0,.25)"}`,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: battleOver === "win" ? "#FFCB05" : "#FF4444",
                  marginBottom: 8,
                }}
              >
                {battleOver === "win" ? "🏆 VITÓRIA!" : "💀 DERROTA!"}
              </div>
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(255,255,255,.7)",
                  marginBottom: 14,
                  lineHeight: 1.9,
                }}
              >
                {battleOver === "win"
                  ? "Seu time derrotou todos os inimigos!"
                  : "Todos os seus Pokémon desmaiaram."}
              </div>
              <button
                onClick={onRestart}
                style={{
                  background: "#FFCB05",
                  color: "#1D2C5E",
                  border: "3px solid #1D2C5E",
                  fontFamily: '"Press Start 2P",monospace',
                  fontSize: 9,
                  padding: "10px 20px",
                  borderRadius: 8,
                  cursor: "pointer",
                  boxShadow: "0 3px 0 #1D2C5E",
                }}
              >
                JOGAR NOVAMENTE
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <BattleField showPokemon={false} />

      <div
        style={{
          background: "rgba(13,32,64,.98)",
          border: "3px solid #FFCB05",
          borderTop: "none",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          padding: "12px 14px 14px",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontSize: 8,
            color: "#FFCB05",
            marginBottom: 10,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          ESCOLHA 3 POKÉMON ({selectedIdx.length}/3)
        </div>

        {/* 2 colunas: seu time | inimigos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 14,
          }}
        >
          {/* seu time */}
          <div>
            <div
              style={{
                fontSize: 6,
                color: "#FFCB05",
                marginBottom: 6,
                letterSpacing: 1,
              }}
            >
              SEU TIME
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {team.map((p, i) => {
                const sel = selectedIdx.includes(i);
                return (
                  <div
                    key={p.id}
                    onClick={() => onToggleSelect(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: sel
                        ? "linear-gradient(135deg,rgba(255,203,5,.25),rgba(255,203,5,.08))"
                        : "rgba(29,44,94,.6)",
                      border: `2px solid ${sel ? "#FFCB05" : "rgba(255,255,255,.15)"}`,
                      borderRadius: 6,
                      padding: "5px 8px",
                      cursor: "pointer",
                      boxShadow: sel ? "0 0 8px rgba(255,203,5,.2)" : "none",
                    }}
                  >
                    <img
                      src={spriteFront(p.id)}
                      alt={p.name}
                      style={{
                        width: 36,
                        height: 36,
                        imageRendering: "pixelated",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 6,
                          color: sel ? "#FFCB05" : "#fff",
                          textTransform: "uppercase",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.name}
                      </div>
                    </div>
                    {sel && (
                      <span
                        style={{ fontSize: 9, color: "#FFCB05", flexShrink: 0 }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* inimigos */}
          <div>
            <div
              style={{
                fontSize: 6,
                color: "#FF9999",
                marginBottom: 6,
                letterSpacing: 1,
              }}
            >
              INIMIGOS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {loadingEnemy ? (
                <div
                  style={{
                    fontSize: 7,
                    color: "rgba(255,255,255,.4)",
                    padding: "8px 0",
                  }}
                >
                  CARREGANDO...
                </div>
              ) : (
                enemyTeam.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(204,0,0,.2)",
                      border: "2px solid rgba(204,0,0,.4)",
                      borderRadius: 6,
                      padding: "5px 8px",
                    }}
                  >
                    <img
                      src={spriteFront(p.id)}
                      alt={p.name}
                      style={{
                        width: 36,
                        height: 36,
                        imageRendering: "pixelated",
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 6,
                        color: "#fff",
                        textTransform: "uppercase",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.name}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onStartBattle}
          disabled={selectedIdx.length !== 3 || loadingEnemy}
          style={{
            width: "100%",
            background:
              selectedIdx.length === 3
                ? "linear-gradient(135deg,#FFCB05,#FFD940)"
                : "rgba(255,203,5,.18)",
            color: "#1D2C5E",
            border: "3px solid #1D2C5E",
            fontFamily: '"Press Start 2P",monospace',
            fontSize: 10,
            padding: 13,
            borderRadius: 8,
            letterSpacing: 1,
            cursor: selectedIdx.length === 3 ? "pointer" : "not-allowed",
            opacity: selectedIdx.length === 3 ? 1 : 0.5,
            boxShadow: selectedIdx.length === 3 ? "0 4px 0 #1D2C5E" : "none",
          }}
        >
          BATALHAR!
        </button>
      </div>
    </div>
  );
}
