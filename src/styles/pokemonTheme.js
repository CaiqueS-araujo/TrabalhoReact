export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  * { box-sizing: border-box; }

  body {
    margin: 0;
    padding: 0;
    background: #2A75BB;
    font-family: "Press Start 2P", monospace;
  }

  @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shake  {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-6px)} 40%{transform:translateX(6px)}
    60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}
  }

  .pokemon-card { animation: fadeIn 0.18s ease; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: rgba(255,255,255,.05); }
  ::-webkit-scrollbar-thumb { background: #FFCB05; border-radius: 3px; }
`;
