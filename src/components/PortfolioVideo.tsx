import { useState, useRef, useEffect, MouseEvent } from 'react';
import { Volume2, VolumeX, Play, Pause, Instagram } from 'lucide-react';

interface PortfolioVideoProps {
  instagramLink?: string;
}

export default function PortfolioVideo({ instagramLink = 'https://www.instagram.com/dg.metal.art/' }: PortfolioVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlaySplash, setShowPlaySplash] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const toggleSound = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    setShowPlaySplash(true);
    setTimeout(() => setShowPlaySplash(false), 500);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center select-none">
      
      {/* Player de Vídeo em Formato Completo (Sem cortes nas extremidades) */}
      <div 
        onClick={togglePlay}
        className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl border border-zinc-200 cursor-pointer group"
      >
        <video
          ref={videoRef}
          src="/video-portfolio.mp4"
          poster="/video-poster.jpg"
          loop
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain bg-black"
        />

        {/* Botão "Ativar o som" no canto inferior esquerdo do vídeo */}
        <button
          type="button"
          onClick={toggleSound}
          className={`absolute bottom-3.5 left-3.5 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-md border ${
            isMuted
              ? 'bg-[#dc2626]/90 border-red-400 text-white hover:bg-red-700 animate-pulse'
              : 'bg-black/75 border-emerald-500/50 text-emerald-400 hover:bg-black'
          }`}
          title={isMuted ? 'Ativar o som' : 'Silenciar som'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-white" />
              <span>Ativar som</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Som ativado</span>
            </>
          )}
        </button>

        {/* Indicador sutil de Play / Pause ao tocar no vídeo */}
        {showPlaySplash && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white scale-110 transition-transform">
              {isPlaying ? <Play className="w-8 h-8 ml-0.5 text-white" /> : <Pause className="w-8 h-8 text-white" />}
            </div>
          </div>
        )}

        {/* Botão de play quando pausado */}
        {!isPlaying && !showPlaySplash && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[1px] z-10">
            <div className="w-14 h-14 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Play className="w-7 h-7 ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Botão "Veja outros projetos" com link para o Instagram abaixo do vídeo */}
      <div className="mt-6 flex items-center justify-center w-full">
        <a
          href={instagramLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-850 hover:from-black hover:to-black text-white hover:text-[#ee2a7b] font-display font-bold uppercase text-xs sm:text-sm tracking-wider py-3 px-7 rounded-full border border-zinc-700/80 shadow-md hover:shadow-lg transition-all duration-300 group"
        >
          <Instagram className="w-4 h-4 text-[#ee2a7b] group-hover:scale-110 transition-transform" />
          <span>Veja outros projetos</span>
        </a>
      </div>

    </div>
  );
}
