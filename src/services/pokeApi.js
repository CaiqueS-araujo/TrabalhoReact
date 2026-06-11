import axios from "axios";
import { BASE_URL, PAGE_SIZE } from "../utils/constants";

export async function fetchGenCatalog(start, end) {
  const res = await axios.get(
    `${BASE_URL}/pokemon?limit=${end - start + 1}&offset=${start - 1}`,
  );
  const chunk = res.data.results.slice(0, PAGE_SIZE);
  const details = await Promise.all(
    chunk.map((p) => axios.get(p.url).then((r) => r.data)),
  );
  return details.map((p) => ({
    id: p.id,
    name: p.name,
    types: p.types.map((t) => t.type.name),
    moves: p.moves.slice(0, 2).map((m) => m.move.name),
  }));
}

export async function searchPokemon(query) {
  const res = await axios.get(`${BASE_URL}/pokemon/${query}`);
  const p = res.data;
  return {
    id: p.id,
    name: p.name,
    types: p.types.map((t) => t.type.name),
    moves: p.moves.slice(0, 2).map((m) => m.move.name),
  };
}

export async function fetchFullStats(id) {
  const res = await axios.get(`${BASE_URL}/pokemon/${id}`);
  const p = res.data;
  const hp = p.stats.find((s) => s.stat.name === "hp")?.base_stat || 50;
  const atk = p.stats.find((s) => s.stat.name === "attack")?.base_stat || 45;
  const def = p.stats.find((s) => s.stat.name === "defense")?.base_stat || 45;
  return {
    id,
    name: p.name,
    types: p.types.map((t) => t.type.name),
    moves: p.moves.slice(0, 2).map((m) => m.move.name),
    hp,
    maxHp: hp,
    atk,
    def,
  };
}
