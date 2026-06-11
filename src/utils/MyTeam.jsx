/* MyTeam — página principal
   Aba "MONTAR TIME" → catálogo + slots
   Aba "BATALHAR"   → seleção de 3 + arena estilo DS
*/
import { useState, useEffect, useCallback } from "react";
import Header       from "../components/Header";
import TeamSlots    from "../components/TeamSlots";
import PokemonGrid  from "../components/PokemonGrid";
import BattleArena  from "../components/BattleArena";
import { fetchGenCatalog, searchPokemon, fetchFullStats } from "../services/pokeApi";
import { GEN_RANGES, MAX_TEAM } from "../utils/constants";
import { calcDmg, sleep } from "../utils/calcDmg";
import { globalStyles } from "../styles/pokemonTheme";

export default function MyTeam() {
  /* ── catálogo ── */
  const [catalog,       setCatalog]      = useState([]);
  const [loadingCat,    setLoadingCat]   = useState(false);
  const [genIdx,        setGenIdx]       = useState(0);
  const [search,        setSearch]       = useState("");
  const [searchResult,  setSearchResult] = useState(null);
  const [searching,     setSearching]    = useState(false);

  /* ── time ── */
  const [team, setTeam] = useState([]);

  /* ── navegação ── */
  const [view, setView] = useState("team"); // "team" | "battle"

  /* ── batalha ── */
  const [selectedIdx,    setSelectedIdx]   = useState([]);
  const [enemyTeam,      setEnemyTeam]     = useState([]);
  const [loadingEnemy,   setLoadingEnemy]  = useState(false);
  const [battleStarted,  setBattleStarted] = useState(false);
  const [bs,             setBs]            = useState(null);
  const [log,            setLog]           = useState("Escolha um ataque.");
  const [busy,           setBusy]          = useState(false);
  const [battleOver,     setBattleOver]    = useState(null); // "win" | "loss"

  /* ── carregar geração ── */
  const loadGen = useCallback(async (idx) => {
    const { start, end } = GEN_RANGES[idx];
    setLoadingCat(true);
    setSearchResult(null);
    setSearch("");
    try {
      const data = await fetchGenCatalog(start, end);
      setCatalog(data);
    } catch {
      setCatalog([]);
    }
    setLoadingCat(false);
  }, []);

  useEffect(() => { loadGen(0); }, [loadGen]);

  const handleGenChange = (i) => { setGenIdx(i); loadGen(i); };

  /* ── busca ── */
  const doSearch = async () => {
    const q = search.trim().toLowerCase();
    if (!q) return;
    setSearching(true);
    try {
      const result = await searchPokemon(q);
      setSearchResult(result);
    } catch {
      setSearchResult(null);
    }
    setSearching(false);
  };
  const clearSearch = () => { setSearchResult(null); setSearch(""); };

  /* ── time ── */
  const inTeam       = (id) => team.some((p) => p.id === id);
  const addToTeam    = (p)  => {
    if (inTeam(p.id) || team.length >= MAX_TEAM) return;
    setTeam((prev) => [...prev, p]);
  };
  const removeFromTeam = (id) => setTeam((prev) => prev.filter((p) => p.id !== id));

  /* ── ir para batalha ── */
  const goToBattle = async () => {
    setView("battle");
    setSelectedIdx([]);
    setBattleStarted(false);
    setBattleOver(null);
    setLog("Escolha 3 Pokémon para batalhar.");
    setLoadingEnemy(true);
    const ids = [];
    while (ids.length < 3) {
      const n = Math.floor(Math.random() * 386) + 1;
      if (!ids.includes(n)) ids.push(n);
    }
    try {
      const details = await Promise.all(ids.map(fetchFullStats));
      setEnemyTeam(details);
    } catch {
      setEnemyTeam([]);
    }
    setLoadingEnemy(false);
  };

  /* ── selecionar para batalha ── */
  const toggleSelect = (idx) => {
    setSelectedIdx((prev) => {
      if (prev.includes(idx)) return prev.filter((i) => i !== idx);
      if (prev.length >= 3)   return prev;
      return [...prev, idx];
    });
  };

  /* ── iniciar batalha ── */
  const startBattle = async () => {
    const pQueue = await Promise.all(
      selectedIdx.map((i) => fetchFullStats(team[i].id))
    );
    const eQueue = enemyTeam.map((p) => ({ ...p }));
    setBs({ pQueue, eQueue, pIdx: 0, eIdx: 0 });
    setBattleStarted(true);
    setLog(`${pQueue[0].name.toUpperCase()} vs ${eQueue[0].name.toUpperCase()}! Escolha um ataque.`);
    setBusy(false);
    setBattleOver(null);
  };

  /* ── usar golpe ── */
  const useMove = async (moveIdx) => {
    if (!bs || busy || battleOver) return;
    setBusy(true);

    const state  = JSON.parse(JSON.stringify(bs));
    const { pQueue, eQueue } = state;
    let { pIdx, eIdx } = state;
    const pl = pQueue[pIdx];
    const en = eQueue[eIdx];

    // ataque do jogador
    const moveName = pl.moves[moveIdx] || "investida";
    const power    = moveIdx === 0
      ? Math.round(40 + pl.atk * 0.3)
      : Math.round(60 + pl.atk * 0.2);
    const dmg = calcDmg(pl.atk, en.def, power);
    en.hp = Math.max(0, en.hp - dmg);
    setLog(`${pl.name.toUpperCase()} usou ${moveName.replace(/-/g," ").toUpperCase()}! Causou ${dmg} de dano.`);
    setBs({ pQueue, eQueue, pIdx, eIdx });
    await sleep(1400);

    // inimigo desmaiou?
    if (en.hp <= 0) {
      eIdx++;
      if (eIdx >= eQueue.length) {
        setLog("Todos os inimigos derrotados! VOCÊ VENCEU!");
        setBattleOver("win");
        setBusy(false);
        return;
      }
      setLog(`${en.name.toUpperCase()} desmaiou! ${eQueue[eIdx].name.toUpperCase()} entrou em campo!`);
      setBs({ pQueue, eQueue, pIdx, eIdx });
      setBusy(false);
      return;
    }

    // contra-ataque
    const ePower = Math.round(40 + en.atk * 0.25);
    const eMove  = en.moves[Math.floor(Math.random() * en.moves.length)] || "tackle";
    const eDmg   = calcDmg(en.atk, pl.def, ePower);
    pl.hp = Math.max(0, pl.hp - eDmg);
    setLog(`${en.name.toUpperCase()} usou ${eMove.replace(/-/g," ").toUpperCase()}! Causou ${eDmg} de dano.`);
    setBs({ pQueue, eQueue, pIdx, eIdx });
    await sleep(1400);

    // jogador desmaiou?
    if (pl.hp <= 0) {
      pIdx++;
      if (pIdx >= pQueue.length) {
        setLog("Todos os seus Pokémon desmaiaram! VOCÊ PERDEU.");
        setBattleOver("loss");
        setBusy(false);
        return;
      }
      setLog(`${pl.name.toUpperCase()} desmaiou! ${pQueue[pIdx].name.toUpperCase()} vai para batalha!`);
    } else {
      setLog("Escolha um ataque.");
    }
    setBs({ pQueue, eQueue, pIdx, eIdx });
    setBusy(false);
  };

  /* ─────── RENDER ─────── */
  return (
    <div style={{
      minHeight:"100vh",
      background:"#2A75BB",
      fontFamily:'"Press Start 2P", monospace',
      maxWidth:640, margin:"0 auto",
    }}>
      <Header
        teamCount={team.length}
        view={view}
        setView={setView}
        goToBattle={goToBattle}
      />

      <TeamSlots team={team} removeFromTeam={removeFromTeam} />

      {/* ── ABA MONTAR TIME ── */}
      {view === "team" && (
        <PokemonGrid
          catalog={catalog}
          loadingCat={loadingCat}
          team={team}
          genIdx={genIdx}
          search={search}
          searchResult={searchResult}
          searching={searching}
          onAdd={addToTeam}
          onSearch={doSearch}
          onSearchChange={setSearch}
          onClearSearch={clearSearch}
          onGenChange={handleGenChange}
          onGoToBattle={goToBattle}
        />
      )}

      {/* ── ABA BATALHAR ── */}
      {view === "battle" && (
        <div style={{ padding:14 }}>
          <BattleArena
            bs={bs}
            log={log}
            busy={busy}
            battleOver={battleOver}
            onUseMove={useMove}
            onRestart={goToBattle}
            team={team}
            selectedIdx={selectedIdx}
            enemyTeam={enemyTeam}
            loadingEnemy={loadingEnemy}
            battleStarted={battleStarted}
            onToggleSelect={toggleSelect}
            onStartBattle={startBattle}
          />
        </div>
      )}

      <style>{globalStyles}</style>
    </div>
  );
}
