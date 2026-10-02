import { useState, useRef, useEffect, MouseEvent } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, MessageCircle, Sparkles } from 'lucide-react';

interface PortfolioVideoProps {
  whatsappLink: string;
}

export default function PortfolioVideo({ whatsappLink }: PortfolioVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPlaySplash, setShowPlaySplash] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Garante início automático em mudo (requisito dos navegadores)
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay foi bloqueado inicialmente
          setIsPlaying(false);
        });
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const toggleSound = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      // Ao ativar o som, garante que o vídeo esteja reproduzindo
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
    setTimeout(() => setShowPlaySplash(false), 600);
  };

  const restartVideo = (e: MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      
      {/* Barra Superior Acima do Vídeo (para não tampar a logo no vídeo) */}
      <div className="w-full max-w-[380px] sm:max-w-[420px] mb-3.5 flex items-center justify-between gap-3 px-1">
        <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/80 px-3.5 py-1.5 rounded-full text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>Vídeo projeto executado</span>
        </div>

        {/* Botão de Som Acima do Vídeo */}
        <button
          type="button"
          onClick={toggleSound}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-md border ${
            isMuted
              ? 'bg-[#dc2626] border-red-500 text-white hover:bg-red-700 animate-pulse'
              : 'bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800'
          }`}
          title={isMuted ? 'Ativar Som' : 'Silenciar'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Ativar Som</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">Som Ativo</span>
            </>
          )}
        </button>
      </div>

      {/* Container Principal do Player de Vídeo */}
      <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl border-4 border-zinc-900 group select-none">
        
        {/* Elemento de Vídeo com Looping Infinito */}
        <video
          ref={videoRef}
          src="/video-portfolio.mp4"
          poster="/video-poster.jpg"
          loop
          autoPlay
          muted
          playsInline
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Gradiente inferior para controles e títulos */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

        {/* Feedback visual ao clicar (Play / Pause splash) */}
        {showPlaySplash && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="w-20 h-20 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-110 transition-transform">
              {isPlaying ? <Play className="w-10 h-10 ml-1 text-white" /> : <Pause className="w-10 h-10 text-white" />}
            </div>
          </div>
        )}

        {/* Botão de Pausar/Iniciar no Centro quando pausado */}
        {!isPlaying && (
          <div 
            onClick={togglePlay}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer z-20"
          >
            <div className="w-16 h-16 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
              <Play className="w-8 h-8 ml-1" />
            </div>
            <span className="mt-3 text-white text-xs font-bold uppercase tracking-wider bg-black/70 px-3 py-1 rounded-full">
              Vídeo Pausado • Clique para continuar
            </span>
          </div>
        )}

        {/* Informações e Controles Inferiores */}
        <div className="absolute bottom-4 inset-x-4 z-20 text-white">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-display font-black text-sm uppercase tracking-wider text-white drop-shadow-md">
                DG Metal Art • Vila Ema
              </p>
              <p className="text-[11px] text-zinc-300 drop-shadow-sm font-light">
                Mobiliário & Estruturas Metálicas Sob Medida
              </p>
            </div>
            
            <button
              type="button"
              onClick={restartVideo}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Reiniciar vídeo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Barra de Progresso do Loop */}
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-[#dc2626] h-full transition-all duration-150 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Rodapé do Bloco de Vídeo: Botão de Conversão para WhatsApp */}
      <div className="mt-8 text-center flex flex-col sm:flex-row items-center gap-3">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-zinc-900 text-white font-display font-bold uppercase text-xs sm:text-sm tracking-wider py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Solicitar Projeto Sob Medida</span>
        </a>
      </div>

    </div>
  );
}
