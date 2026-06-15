import { useRef, useState, useEffect } from 'react';
import * as styles from './style.module.css';
import music from '../../../public/music/PokemonRed-Blue_Opening.mp3';
 
export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.4);
 
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
    audio.loop = true;
  }, []);
 
  const toggleMute = () => {
    const audio = audioRef.current;
    if (muted) {
      audio.volume = volume;
      audio.play().catch(() => {});
      setMuted(false);
    } else {
      audio.pause();
      setMuted(true);
    }
  };
 
  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioRef.current.volume = val;
    if (val === 0) {
      audioRef.current.pause();
      setMuted(true);
    } else if (muted) {
      audioRef.current.play().catch(() => {});
      setMuted(false);
    }
  };
 
  return (
    <>
      <audio ref={audioRef} src={music} preload="auto" />
      <div className={styles.playerWrapper}>
        <button
          className={`${styles.muteBtn} ${muted ? styles.muteBtnOff : styles.muteBtnOn}`}
          onClick={toggleMute}
          aria-label={muted ? 'Ativar música' : 'Mutuar música'}
          title={muted ? 'Ativar música' : 'Mutuar música'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={handleVolume}
          className={styles.volumeRange}
          aria-label="Volume"
        />
      </div>
    </>
  );
}
