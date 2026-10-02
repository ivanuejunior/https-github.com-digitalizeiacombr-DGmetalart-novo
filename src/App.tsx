import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Menu, X, MessageCircle, Hammer, 
  ShieldCheck, PenTool, MapPin, 
  ArrowRight, Phone, Mail, Clock, Calendar,
  Instagram, Heart, Eye, ExternalLink
} from 'lucide-react';
import PortfolioVideo from './components/PortfolioVideo';

const logoUrl = '/Logo-original-jpeg-removebg-preview.png';
const secao2Url = '/foto-2-secao.jpg';
const secao3aUrl = '/foto-3-secao-a.png';
const secao3bUrl = '/foto-3-secao-b.png';
const secao3cUrl = '/foto-3-secao-c.png';

const WHATSAPP_NUMBER = "5511971622854";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20gr%C3%A1tis%20com%20a%20DG%20Metal%20Art.`;

const INSTAGRAM_POSTS = [
  {
    id: 1,
    title: "Mesa de Jantar Robust",
    category: "Móveis Industriais",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    likes: 247,
    comments: 29,
    caption: "Mesa de jantar sob medida em metal com pintura eletrostática preta e tampo de madeira maciça de alta resistência. O casamento perfeito entre o aço industrial e o calor do rústico. 🔨📐 #moveisindustriais #serralheriaartisticas #metal #vilasema #designindustrial #dgmetalart",
    date: "25 de Maio, 2026",
    whatsappMsg: "Olá! Vi a 'Mesa de Jantar Robust' no portfólio de vocês e gostaria de solicitar um orçamento para um tamanho personalizado!"
  },
  {
    id: 2,
    title: "Estante Grid Pinus",
    category: "Móveis Industriais",
    url: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800",
    likes: 198,
    comments: 15,
    caption: "Estante modular estruturada em perfis de aço metal preto fosco com prateleiras de madeira clara tratada. Organização, design contemporâneo e extrema leveza visual. Perfeita para salas de estar ou escritórios modernos! 📐📚 #estanterustica #decoracaoindustrial #metal #madeiraeferro #vilaema #saopaulo",
    date: "14 de Maio, 2026",
    whatsappMsg: "Olá! Gostei muito da 'Estante Grid Pinus' do catálogo de vocês. Vocês fabricam em outras medidas?"
  },
  {
    id: 3,
    title: "Divisória Geométrica Loft",
    category: "Projetos Especiais",
    url: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=800",
    likes: 312,
    comments: 42,
    caption: "Divisória de ambientes com design geométrico em ferro sob medida. Uma solução sofisticada para criar ritmo e delimitar espaços sem perder a iluminação natural e a amplitude. Estilo nova-iorquino ao seu alcance! 📐🔩 #projetosespeciais #arquiteturasp #divisoriaferro #loftlifestyle #saopaulo #serralheriasp",
    date: "02 de Maio, 2026",
    whatsappMsg: "Olá, gostaria de conversar sobre um projeto de divisória de ferro parecida com a 'Divisória Geométrica Loft'!"
  },
  {
    id: 4,
    title: "Banqueta Industrial Alta",
    category: "Móveis Industriais",
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
    likes: 154,
    comments: 8,
    caption: "Conjunto de banquetas altas estruturadas em metal com tratamento antiferrugem e assento ergonômico em madeira de demolição. Ideal para balcões gourmet, copas ou comércio. Robustez para a vida inteira! 🔨🍕 #áreagourmet #cozinhaindustrial #banquetametalo #ferroemadeira #vilasema #serralheria",
    date: "28 de Abril, 2026",
    whatsappMsg: "Olá! Gostaria de saber os valores e prazos de entrega para um jogo de Banquetas Industriais Altas."
  },
  {
    id: 5,
    title: "Processo de Solda TIG",
    category: "Bastidores",
    url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
    likes: 420,
    comments: 56,
    caption: "Nosso dia a dia na fábrica! Emendas polidas perfeitamente para esconder as soldas comuns, mantendo a robustez do metal e do ferro. Pintura eletrostática fosca e acabamento impecável. 💥🛠️ #serralheriasp #soldatig #bastidores #producaoartesanal #metal #portões #vilaema",
    date: "15 de Abril, 2026",
    whatsappMsg: "Olá! Vi que vocês fazem soldagem e polimento impecável. Gostaria de cotar uma estrutura metálica sob medida."
  },
  {
    id: 6,
    title: "Balcão Aparador Dark",
    category: "Móveis Industriais",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    likes: 215,
    comments: 19,
    caption: "Balcão aparador com portas teladas e estrutura rígida de metal e chapas expandidas de aço. Toque industrial brutalista maravilhoso, perfeito como buffet residencial ou suporte comercial de alto fluxo! 📐🦾 #moveisemmetal #aparadorindustrial #buffetindustrial #serralheriadesign #vilaema #saopaulo",
    date: "05 de Abril, 2026",
    whatsappMsg: "Olá! Achei sensacional o 'Balcão Aparador Dark'. Qual é a largura padrão dele e qual o prazo de entrega para SP?"
  },
  {
    id: 7,
    title: "Escada Helicoidal Metálica",
    category: "Serralheria",
    url: "https://images.unsplash.com/photo-15053387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    likes: 388,
    comments: 47,
    caption: "Projeto especial de escada caracol / helicoidal estruturada em viga central reforçada de aço com degraus em chapa xadrez antiderrapante. Engenharia e serralheria artística trabalhando em harmonia. Segurança garantida! 📐 de alto padrão! #escadametalica #serralheriasp #engenhariametalica #guardacorpo #corrimao #vilaema",
    date: "25 de Março, 2026",
    whatsappMsg: "Olá, preciso de um orçamento para uma escada metálica sob medida em São Paulo!"
  },
  {
    id: 8,
    title: "Guarda-Corpo Industrial",
    category: "Serralheria",
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800",
    likes: 182,
    comments: 11,
    caption: "Guarda-corpo em perfis tubulares pretos de aço galvanizado. Segurança residencial e comercial com linhas retas minimalistas que agregam valor e modernidade ao ambiente. Instalação limpa e rápida! 📐🔒 #guardacorpo #corrimao #segurancaresidencial #arquiteturasp #projetovilaema #dgmetalart",
    date: "10 de Março, 2026",
    whatsappMsg: "Olá! Gostaria de fazer um orçamento de guarda-corpo / corrimão em tubo preto para minha residência."
  },
  {
    id: 9,
    title: "Estrutura Metálica Grelhada",
    category: "Projetos Especiais",
    url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800",
    likes: 274,
    comments: 24,
    caption: "Suportes industriais em aço estrutural de alta resistência mecânica para reforços especiais e mezaninos. Fabricação sob normas técnicas rigorosas e engenharia apurada. Há 25 anos edificando ideias robustas! 📐⚡ #mezaninometalica #reforcoestrutural #serralheriapesada #vilaemasp #dgmetalart",
    date: "01 de Março, 2026",
    whatsappMsg: "Olá! Vi a parte de estruturas pesadas e mezanino. Gostaria de solicitar uma visita técnica ou orçamento para minha obra."
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [secao3aUrl, secao3bUrl, secao3cUrl, secao2Url];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      // Cabeçalho móvel dinâmico:
      // Ao rolar para baixo, recolhe o cabeçalho para liberar espaço da tela
      // Ao rolar para cima ou no topo da página, o cabeçalho reaparece suavemente
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsHeaderVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Rotating hero image interval
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [lastScrollY, heroImages.length]);

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-zinc-900 overflow-x-hidden selection:bg-[#dc2626]/20 selection:text-[#dc2626]">
      
      {/* 1. Header (Cabeçalho Móvel e Responsivo) */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-2 sm:py-2.5 shadow-lg' 
          : 'bg-zinc-950/70 md:bg-transparent py-2.5 md:py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logotipo */}
          <a href="#hero" className="flex items-center group">
            <div className="h-10 sm:h-12 md:h-18 w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img src={logoUrl} alt="Logo DG Metal Art" className="h-full w-auto object-contain" />
            </div>
          </a>

          {/* Menu de Navegação Âncora (Scroll Suave) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase text-zinc-100">
            <a href="#hero" className="hover:text-[#dc2626] transition-colors drop-shadow-[0_0_3px_#c0c0c0]">Início</a>
            <a href="#sobre" className="hover:text-[#dc2626] transition-colors drop-shadow-[0_0_3px_#c0c0c0]">A Empresa</a>
            <a href="#servicos" className="hover:text-[#dc2626] transition-colors drop-shadow-[0_0_3px_#c0c0c0]">Serviços</a>
            <a href="#portfolio" className="hover:text-[#dc2626] transition-colors drop-shadow-[0_0_3px_#c0c0c0]">Portfólio</a>
            <a href="#contato" className="hover:text-[#dc2626] transition-colors drop-shadow-[0_0_3px_#c0c0c0]">Contato</a>
          </div>

          {/* Botão de Ação CTA Topo */}
          <div className="hidden md:flex">
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#dc2626] text-white px-6 py-2.5 rounded-full font-display font-medium tracking-wide uppercase text-xs transition-all duration-300 hover:bg-zinc-800 hover:text-white hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Fazer Orçamento Grátis</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-[#c0c0c0] p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#dc2626] font-semibold uppercase tracking-wider text-sm py-2">Início</a>
            <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#dc2626] font-semibold uppercase tracking-wider text-sm py-2">A Empresa</a>
            <a href="#servicos" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#dc2626] font-semibold uppercase tracking-wider text-sm py-2">Serviços</a>
            <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#dc2626] font-semibold uppercase tracking-wider text-sm py-2">Portfólio</a>
            <a href="#contato" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#dc2626] font-semibold uppercase tracking-wider text-sm py-2">Contato</a>
            
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#dc2626] text-white py-3 rounded-sm font-display font-bold tracking-wider text-center uppercase text-sm mt-4 transition-all duration-300 hover:bg-zinc-200 hover:text-black flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Fazer Orçamento Grátis</span>
            </a>
          </motion.div>
        )}
      </nav>

      {/* 2. Seção Hero (Banner Principal) */}
      <section id="hero" className="relative min-h-screen flex items-center bg-[#e5e7eb] overflow-hidden select-none">
        {/* Background Image / Metal Texture with low opacity */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#e5e7eb] via-[#e5e7eb]/85 to-[#e5e7eb]/95 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2000" 
            alt="Textura de oficina metalúrgica industrial moderna" 
            className="w-full h-full object-cover opacity-20 filter grayscale"
          />
        </div>

        {/* Carousel Rotating Images Background (Right Side Integration with Smoke Effect) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] z-0 overflow-hidden opacity-[0.85] lg:opacity-90">
          {/* Gradient Masks for blending (Smoke effect) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#e5e7eb] via-[#e5e7eb]/80 lg:via-[#e5e7eb]/40 to-transparent z-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e5e7eb] via-[#e5e7eb]/80 lg:via-[#e5e7eb]/10 to-transparent z-20" />
          
          {heroImages.map((imgUrl, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${index === currentHeroImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#e5e7eb] via-transparent to-black/20 z-10" />
              <img src={imgUrl} alt={`Destaque DG Metal Art ${index}`} className="w-full h-full object-cover object-center lg:object-right filter grayscale-[30%] contrast-125 transition-transform duration-[10000ms] ease-linear scale-110" style={{ transform: index === currentHeroImage ? 'scale(1.05)' : 'scale(1.1)' }} />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col pt-8 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-3xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left relative z-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 bg-zinc-200/80 lg:bg-zinc-200/60 backdrop-blur-sm mb-4 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
              <span className="text-[9px] font-bold tracking-widest text-[#dc2626] uppercase">Serralheria Artística Vila Ema - SP</span>
            </div>
            
            <h1 className="font-display text-[2.25rem] sm:text-5xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider leading-[1.05] mb-5 bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-900 bg-clip-text text-transparent text-center lg:text-left drop-shadow-sm">
              FABRICAMOS MÓVEIS INDUSTRIAIS E PROJETOS SOB MEDIDA, PARA <span className="text-[#dc2626] relative inline-block">
                SUA CASA OU EMPRESA.
                <span className="absolute bottom-1 left-0 w-full h-1 lg:h-1.5 bg-[#dc2626]/20" />
              </span>
            </h1>
            
            <h2 className="text-zinc-800 lg:text-zinc-700 font-medium lg:font-light w-full text-xs sm:text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-center lg:text-left">
              Transformamos metal em peças exclusivas, robustas e com acabamento de alto padrão. Do desenho à instalação.
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2 w-full">
              {/* Botão de Ação Principal (Pulsante) */}
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#dc2626] text-white px-8 py-4 sm:py-3.5 rounded-full font-display font-bold uppercase tracking-wider text-xs transition-all duration-300 animate-pulse-slow inline-flex items-center justify-center gap-2 shadow-lg hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>SOLICITAR ORÇAMENTO</span>
              </a>
              
              {/* Botão Secundário */}
              <a 
                href="#servicos"
                className="w-full sm:w-auto bg-zinc-100/80 lg:bg-zinc-200/50 backdrop-blur-md border border-zinc-500 text-zinc-950 px-8 py-4 sm:py-3.5 rounded-full font-display font-bold lg:font-semibold uppercase tracking-wider text-xs transition-all duration-300 hover:bg-zinc-200 hover:text-black hover:border-zinc-300 inline-flex items-center justify-center gap-2 text-center shadow-sm"
              >
                <span>CONHECER NOSSO TRABALHO</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* 3. Seção Sobre Nós (Autoridade e Confiança) */}
      <section id="sobre" className="py-24 md:py-32 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Bloco de Imagens com Layout Robusto */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative z-10 shadow-2xl border border-zinc-100">
                <img 
                  src={secao2Url} 
                  alt="Processo profissional de corte e soldagem em metalurgia na fábrica de serralheria artística" 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 aspect-square border-4 border-[#dc2626]/20 z-0 pointer-events-none" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-zinc-200/50 rounded-full blur-3xl z-0" />
            </motion.div>

            {/* Conteúdo Institucional */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626] block">A Empresa e Legado</span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black leading-none">
                  Tradição e Arte <br />em Serralheria
                </h2>
                <div className="w-16 h-1 bg-[#dc2626]" />
              </div>
              
              <div className="space-y-6 text-zinc-800 text-lg font-light leading-relaxed">
                <p>
                  Com um legado de <strong className="font-semibold text-black">25 anos de experiência no ramo</strong>, a <strong className="font-medium text-[#dc2626]">DG Metal Art</strong> é especialista na elaboração e execução de projetos especiais. 
                </p>
                <p>
                  Unimos a robustez do metal à sofisticação do design moderno para entregar móveis e estruturas que transformam ambientes residenciais e comerciais de forma impactante.
                </p>
              </div>

              {/* Grid de Diferenciais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-100">
                
                {/* Diferencial 1 */}
                <div className="space-y-3 flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="w-12 h-12 rounded-sm bg-zinc-50 border border-zinc-200 flex items-center justify-center text-[#dc2626]">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-black uppercase tracking-wider">25 Anos no Ramo</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">Experiência comprovada que garante segurança na entrega.</p>
                </div>

                {/* Diferencial 2 */}
                <div className="space-y-3 flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="w-12 h-12 rounded-sm bg-zinc-50 border border-zinc-200 flex items-center justify-center text-[#dc2626]">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-black uppercase tracking-wider">Projetos Especiais</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">Elaboração sob medida para a real necessidade do seu espaço.</p>
                </div>

                {/* Diferencial 3 */}
                <div className="space-y-3 flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="w-12 h-12 rounded-sm bg-zinc-50 border border-zinc-200 flex items-center justify-center text-[#dc2626]">
                    <Hammer className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-black uppercase tracking-wider">Fabricação Própria</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">Móveis em metal com solda e acabamentos impecáveis.</p>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Seção de Serviços e Especialidades */}
      <section id="servicos" className="py-24 md:py-32 bg-[#e5e7eb] border-y border-[#c0c0c0] text-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626] mb-3 block">Nossa Expertise</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-4">
              O Que Fabricamos
            </h2>
            <div className="w-14 h-1 bg-[#dc2626] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Serviço 1: Móveis Industriais em Metal */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative bg-[#ffffff] border border-[#c0c0c0] transition-all duration-300 hover:border-[#dc2626] hover:scale-105 overflow-hidden rounded-sm min-h-[460px] flex flex-col justify-between shadow-sm hover:shadow-2xl cursor-pointer"
            >
              <div>
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-transparent z-10 transition-all" />
                  <img 
                    src={secao3aUrl} 
                    alt="Mesa de jantar, cadeiras e estantes estilo industrial em ferro e madeira" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="p-8">
                  <span className="font-display font-medium tracking-widest text-xs text-[#dc2626] block mb-2 uppercase">Altíssimo Padrão</span>
                  <h3 className="font-display text-2xl font-bold tracking-normal mb-3 text-zinc-900 uppercase">Móveis Industriais em Metal</h3>
                  <p className="text-zinc-700 text-sm leading-relaxed font-light">Mesas de jantar, estantes, aparadores, balcões e banquetas estruturadas de extrema robustez.</p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <div className="w-10 h-1 bg-zinc-400 group-hover:bg-[#dc2626] transition-colors duration-300 w-12" />
              </div>
            </motion.div>

            {/* Serviço 2: Elaboração de Projetos Especiais */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-[#ffffff] border border-[#c0c0c0] transition-all duration-300 hover:border-[#dc2626] hover:scale-105 overflow-hidden rounded-sm min-h-[460px] flex flex-col justify-between shadow-sm hover:shadow-2xl cursor-pointer"
            >
              <div>
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-transparent z-10 transition-all" />
                  <img 
                    src={secao3bUrl} 
                    alt="Estrutura metálica personalizada e mezanino" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="p-8">
                  <span className="font-display font-medium tracking-widest text-xs text-[#dc2626] block mb-2 uppercase">Sob Medida</span>
                  <h3 className="font-display text-2xl font-bold tracking-normal mb-3 text-zinc-900 uppercase">Elaboração de Projetos Especiais</h3>
                  <p className="text-zinc-700 text-sm leading-relaxed font-light">Estruturas metálicas personalizadas, painéis decorativos geométricos e biombos / divisórias de ambiente.</p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <div className="w-10 h-1 bg-zinc-400 group-hover:bg-[#dc2626] transition-colors duration-300 w-12" />
              </div>
            </motion.div>

            {/* Serviço 3: Serralheria Comercial e Residencial */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative bg-[#ffffff] border border-[#c0c0c0] transition-all duration-300 hover:border-[#dc2626] hover:scale-105 overflow-hidden rounded-sm min-h-[460px] flex flex-col justify-between shadow-sm hover:shadow-2xl cursor-pointer"
            >
              <div>
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-transparent z-10 transition-all" />
                  <img 
                    src={secao3cUrl} 
                    alt="Portas, portões e grades de serralheria de segurança de alto padrão" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="p-8">
                  <span className="font-display font-medium tracking-widest text-xs text-[#dc2626] block mb-2 uppercase">Segurança & Design</span>
                  <h3 className="font-display text-2xl font-bold tracking-normal mb-3 text-zinc-900 uppercase">Serralheria Comercial e Residencial</h3>
                  <p className="text-zinc-700 text-sm leading-relaxed font-light font-light">Soluções arquitetônicas de alto nível: portões, corrimãos, guarda-corpos e soluções modernas sob demanda.</p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <div className="w-10 h-1 bg-zinc-400 group-hover:bg-[#dc2626] transition-colors duration-300 w-12" />
              </div>
            </motion.div>

          </div>

          {/* Chamada interna CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-sm bg-[#ffffff] border border-[#c0c0c0] shadow-lg"
          >
            <p className="text-base text-zinc-700 font-light mb-4">
              Tem um desenho, rascunho de arquiteto ou projeto técnico pronto no computador?
            </p>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white bg-[#dc2626] hover:bg-zinc-200 hover:text-black font-display font-black uppercase text-sm tracking-widest py-3.5 px-8 rounded-full transition-all shadow-md group"
            >
              <span>Envie sua ideia pelo WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* Seção 4.5: Portfólio (Feed do Instagram Simulado) */}
      <section id="portfolio" className="py-12 md:py-16 bg-zinc-50 border-b border-zinc-200 relative select-none">
        
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-8 md:mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626] mb-2 block">Portfólio Oficial</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-3xl font-black uppercase tracking-tight text-black leading-none mb-3">
              Siga Nosso Feed no Instagram
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm max-w-xl mx-auto font-light">
              Conecte-se com nosso perfil oficial e acompanhe nossas publicações, novidades e catálogo completo.
            </p>
            <div className="w-12 h-1 bg-[#dc2626] mx-auto mt-4" />
          </div>

          {/* Instagram Simulated Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-5 p-5 md:p-6 rounded-sm bg-white border border-zinc-200 shadow-md max-w-3xl mx-auto mb-6">
            
            {/* Instagram Story Gradient Ring */}
            <div className="relative p-0.5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full shrink-0">
              <div className="p-0.5 bg-white rounded-full">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black flex items-center justify-center overflow-hidden shadow-inner">
                  <img src={logoUrl} alt="DG Metal Art" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded-sm shadow-md border border-white whitespace-nowrap">
                FÁBRICA (25 anos)
              </span>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 justify-center md:justify-start">
                <h3 className="font-display font-black tracking-tight text-lg text-black flex items-center gap-1 justify-center sm:justify-start">
                  dg.metal.art
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-[#3897f0] text-white rounded-full text-[7px] font-black" title="Perfil Comercial Verificado">✓</span>
                </h3>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <a 
                    href="https://www.instagram.com/dg.metal.art" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-[#3897f0] hover:bg-[#2980b9] text-white text-[10px] font-bold py-1 px-3 rounded-sm transition-all"
                  >
                    Seguir Perfil
                  </a>
                  <a 
                    href={WHATSAPP_LINK}
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-zinc-100 hover:bg-zinc-200 text-black text-[10px] font-bold py-1 px-3 rounded-sm border border-zinc-200 transition-all flex items-center gap-1 shadow-sm"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Orçamento</span>
                  </a>
                </div>
              </div>

              {/* Instagram Feed Stats */}
              <div className="flex items-center gap-5 text-[11px] text-zinc-600 justify-center md:justify-start">
                <span><strong className="font-bold text-black">9</strong> publicações</span>
                <span><strong className="font-bold text-black">14.2k</strong> seguidores</span>
                <span><strong className="font-bold text-black">250</strong> seguindo</span>
              </div>

              {/* Company Bio */}
              <div className="text-zinc-700 text-[11px] leading-relaxed space-y-0.5">
                <p className="font-bold text-black text-xs">DG Metal Art • Mobiliário e Estruturas Metálicas</p>
                <p>⚙️ Unindo estética industrial, robustez de metal e acabamento impecável.</p>
                <p>📍 Vila Ema - São Paulo/SP. 🔨 Atendemos sob medida em toda SP.</p>
              </div>
            </div>
          </div>

          {/* Botão do Instagram Abaixo do Card */}
          <div className="text-center">
            <a 
              href="https://www.instagram.com/dg.metal.art" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-850 hover:from-black hover:to-black text-white hover:text-[#ee2a7b] font-display font-black uppercase text-xs tracking-widest py-2.5 px-7 border border-zinc-700/80 rounded-full shadow-sm transition-all"
            >
              <Instagram className="w-4 h-4 text-[#ee2a7b]" />
              <span>Ver Feed Completo no Instagram</span>
            </a>
          </div>

        </div>

      </section>

      {/* Seção 4.6: Vídeo de Projeto Executado (Seção Separada) */}
      <section id="video" className="py-12 md:py-16 bg-white border-b border-zinc-200 relative select-none">
        
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-6 md:mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626] mb-2 block">Bastidores & Produção</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-3xl font-black uppercase tracking-tight text-black leading-none mb-3">
              Projeto executado
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm max-w-xl mx-auto font-light">
              Entrega e instalação
            </p>
            <div className="w-12 h-1 bg-[#dc2626] mx-auto mt-4" />
          </div>

          {/* Vídeo do Portfólio Clean com Somente os Botões "Ativar som" e "Veja outros projetos" */}
          <PortfolioVideo instagramLink="https://www.instagram.com/dg.metal.art/" />

        </div>

      </section>

      {/* 5. Seção de Localização e Contato Exclusivo */}
      <section id="contato" className="py-24 bg-[#efeff1] text-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Bloco de Contato (Lado Esquerdo) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 bg-white p-8 md:p-12 border border-zinc-200 rounded-sm flex flex-col justify-between shadow-xl text-center lg:text-left"
            >
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626] block mb-2">Fale Conosco</span>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none text-black">
                    Comece Seu Projeto
                  </h2>
                </div>
                <p className="text-zinc-600 text-base leading-relaxed font-light">
                  Seja atendido de forma personalizada. Estamos localizados na Vila Ema e atendemos com excelência em São Paulo.
                </p>

                <div className="space-y-6 pt-6 border-t border-zinc-100">
                  {/* WhatsApp */}
                  <a 
                    href={WHATSAPP_LINK}
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex flex-col items-center text-center lg:flex-row lg:items-start gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 group-hover:bg-[#dc2626]/10 group-hover:border-[#dc2626] rounded-sm flex items-center justify-center text-[#dc2626] transition-colors shrink-0 mx-auto lg:mx-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold uppercase tracking-wider text-sm text-black mb-1">WhatsApp Oficial</h4>
                      <p className="text-[#dc2626] font-semibold text-lg hover:underline transition-all">
                        (11) 97162-2854
                      </p>
                      <span className="text-xs text-zinc-500 font-light block mt-0.5">Clique para iniciar conversa</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:contato@dgmetalart.com.br"
                    className="flex flex-col items-center text-center lg:flex-row lg:items-start gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 group-hover:bg-[#dc2626]/10 group-hover:border-[#dc2626] rounded-sm flex items-center justify-center text-[#dc2626] transition-colors shrink-0 mx-auto lg:mx-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold uppercase tracking-wider text-sm text-black mb-1">E-mail</h4>
                      <p className="text-[#dc2626] font-semibold text-lg hover:underline transition-all">
                        contato@dgmetalart.com.br
                      </p>
                      <span className="text-xs text-zinc-500 font-light block mt-0.5">Envie uma mensagem</span>
                    </div>
                  </a>

                  {/* Endereço */}
                  <div className="flex flex-col items-center lg:flex-row lg:items-start gap-4">
                    <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 rounded-sm flex items-center justify-center text-[#dc2626] shrink-0 mx-auto lg:mx-0 font-light">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase tracking-wider text-sm text-black mb-1">Nosso Endereço</h3>
                      <p className="text-zinc-700 leading-normal text-sm font-medium">
                        Rua Galeão, nº 244 <br />
                        Vila Ema, Zona Leste – São Paulo/SP.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-zinc-100 flex items-center gap-2 text-xs text-zinc-500">
                <Clock className="w-4 h-4 text-[#dc2626]" />
                <span>Atendimento: Seg a Sex - Horário Comercial</span>
              </div>
            </motion.div>

            {/* Elemento Interativo: Google Maps Iframe (Lado Direito) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 flex flex-col justify-between"
            >
              <div className="space-y-4 mb-3 text-center lg:text-left">
                <span className="text-[11px] font-bold tracking-widest text-[#dc2626] uppercase flex items-center gap-1.5 justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-ping" />
                  Localização no Google Maps
                </span>
              </div>

              <div className="relative w-full h-[350px] md:h-full min-h-[350px] bg-zinc-200 rounded-sm overflow-hidden border border-zinc-300 shadow-xl group">
                <iframe 
                  title="Localização DG Metal Art"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7643579047976!2d-46.549216!3d-23.5768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5daf2e83fb99%3A0xc6cb12932fe4cb34!2sRua%20Gale%C3%A3o%2C%20244%20-%20Vila%20Ema%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003276-050!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full transition-all duration-700 pointer-events-auto"
                ></iframe>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 7. Footer (Rodapé) */}
      <footer className="bg-[#e5e7eb] text-zinc-600 py-16 border-t border-[#c0c0c0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#c0c0c0]">
            
            {/* Logo/Legenda */}
            <div className="text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="h-10 w-auto flex items-center justify-center">
                  <img src={logoUrl} alt="Logo DG Metal Art" className="h-full w-auto object-contain" />
                </div>
                <span className="font-display font-bold tracking-widest uppercase text-base text-zinc-900">DG Metal Art</span>
              </div>
              <p className="text-zinc-700 text-sm max-w-sm">
                Especialistas em Metal e Projetos Especiais.
              </p>
            </div>

            {/* Endereço/Contato */}
            <div className="text-center md:text-right space-y-2 text-sm text-zinc-600">
              <p className="font-medium text-zinc-900">Rua Galeão, 244 - Vila Ema, SP.</p>
              <p className="text-zinc-700 text-xs">Atendimento presencial mediante agendamento via WhatsApp.</p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-xs text-zinc-700">
            <p className="font-light">
              &copy; {new Date().getFullYear()} DG Metal Art. Todos os direitos reservados.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="font-light hover:text-black transition-colors duration-300">
                Serralheria Artística & Industrial SP
              </p>
              <a href="https://www.digitalizeia.com.br" target="_blank" rel="noreferrer" className="text-[#dc2626] font-bold hover:underline transition-all animate-pulse duration-2000">
                Site desenvolvido por Digitalize IA
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante do WhatsApp permanente */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group animate-pulse-slow"
        aria-label="Iniciar conversa no WhatsApp Oficial"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-[#e5e7eb] text-zinc-900 text-xs tracking-widest uppercase font-bold px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#c0c0c0]">
          Orçamento WhatsApp
        </span>
      </a>

    </div>
  );
}
