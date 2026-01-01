import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Menu, X, Heart, Clock, Shield, Star, CheckCircle2, 
  ArrowRight, Sparkles, BookOpen, Users, Sun, ChevronDown, Check, Lock,
  Play, Pause, Flame, CreditCard, XCircle, Plus, Minus, HelpCircle, Gift, Mail,
  Moon, Target, Brain, Activity, Map, TrendingUp, Infinity, RefreshCw, Calendar,
  ShieldCheck, Zap 
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// --- Utility Components ---

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Helper para número aleatório
function getRandomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Componente Photo (Novo)
const Photo = ({ src, alt, className, direction = "left", width = 220, height = 220 }: { src: string, alt: string, className?: string, direction?: "left"|"right", width?: number, height?: number }) => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    // Define uma rotação inicial orgânica
    const randomRotation = getRandomNumberInRange(1, 6) * (direction === "left" ? -1 : 1);
    setRotation(randomRotation);
  }, [direction]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.15, zIndex: 100 }}
      whileHover={{
        scale: 1.1,
        rotateZ: direction === "left" ? -3 : 3,
        zIndex: 100,
      }}
      initial={{ rotate: 0, opacity: 0, y: 20 }}
      animate={{ rotate: rotation, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        width,
        height,
        perspective: 1000,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing",
        className
      )}
    >
      <div className="relative h-full w-full rounded-[2rem] shadow-xl border-4 border-white bg-white">
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-[1.8rem] object-cover pointer-events-none"
          draggable={false}
        />
      </div>
    </motion.div>
  );
};

// Scroll Progress Bar
const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollWidth(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 bg-brand-gold z-[60] transition-all duration-100 ease-out" style={{ width: `${scrollWidth}%` }} />
  );
};

// Hook for scroll animations
const useOnScreen = (ref: React.RefObject<Element>, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
};

const FadeIn: React.FC<{ children?: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref, "-50px");
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${onScreen ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-1'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Sticky Mobile CTA
const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white/95 backdrop-blur-lg border-t border-gray-100 md:hidden z-50 animate-slide-up shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
      <Button href="#oferta" fullWidth variant="gold" className="shadow-lg py-3 text-sm">
        Começar Agora — R$ 37
      </Button>
    </div>
  );
};

// Mockup of the App Phone Screen
const PhoneMockup = ({ className = "" }: { className?: string }) => (
  <div className={`relative mx-auto border-gray-900 bg-gray-900 border-[8px] rounded-[3rem] h-[580px] w-[300px] shadow-2xl flex flex-col overflow-hidden transform transition-transform duration-700 hover:scale-[1.01] ${className}`}>
    {/* Dynamic Island / Notch */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-7 bg-black rounded-b-2xl z-20"></div>
    
    <div className="rounded-[2.5rem] overflow-hidden w-full h-full bg-white relative">
      {/* Status Bar */}
      <div className="h-10 bg-brand-bgAlt w-full flex justify-between items-center px-6 pt-2 text-[10px] text-gray-500 font-bold">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-3 bg-gray-300 rounded-sm"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      
      {/* App Content */}
      <div className="p-5 flex flex-col h-full overflow-hidden relative">
        {/* Header App */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Bom dia,</span>
            <span className="text-brand-dark font-bold text-lg">Mamãe</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
             <Users size={16} className="text-gray-400" />
          </div>
        </div>
        
        {/* Main Card */}
        <div className="space-y-4 relative z-10">
          <div className="bg-brand-blueLight p-5 rounded-2xl border border-brand-blue/20 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-white/60 text-brand-blue text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Hoje</span>
              <Heart size={16} className="text-brand-blue fill-brand-blue/20" />
            </div>
            <h4 className="text-brand-dark font-bold text-xl mb-1 font-serif">Davi</h4>
            <p className="text-xs text-gray-500 mb-4">7 anos • Bênção da Coragem</p>
            
            <div className="bg-white p-3 rounded-xl flex items-center gap-3 shadow-sm border border-brand-blue/10">
               <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center text-white pl-0.5">
                 <Play size={12} fill="currentColor" />
               </div>
               <div className="flex-1">
                 <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full w-1/3 bg-brand-blue"></div>
                 </div>
                 <div className="flex justify-between mt-1">
                   <span className="text-[8px] text-gray-400">0:42</span>
                   <span className="text-[8px] text-gray-400">2:15</span>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Verse Card */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-brand-gold/10 rounded-bl-full -mr-4 -mt-4"></div>
            <h5 className="font-bold text-gray-800 mb-2 text-sm">Versículo Base</h5>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              "Não fui eu que ordenei a você? Seja forte e corajoso..."
              <br/><span className="font-semibold not-italic text-brand-blue mt-1 block">- Josué 1:9</span>
            </p>
          </div>

          {/* List */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Histórico</p>
            <div className="bg-brand-bgAlt p-3 rounded-xl flex items-center gap-3 border border-gray-100">
               <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                 <Check size={14}/>
               </div>
               <div className="flex-1">
                 <p className="text-xs font-bold text-gray-700">Ontem</p>
                 <p className="text-[10px] text-gray-500">Bênção da Sabedoria</p>
               </div>
            </div>
          </div>
        </div>
        
        {/* Background gradient in app */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
        <div className="mt-auto mb-8 mx-auto w-1/3 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
);

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost';
  fullWidth?: boolean;
  href?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '', 
  href,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all duration-300 transform active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-blue-600 shadow-lg shadow-blue-200 focus:ring-brand-blue hover:-translate-y-1",
    gold: "bg-brand-gold text-white hover:bg-brand-goldHover shadow-xl shadow-orange-100 focus:ring-brand-gold uppercase tracking-wide hover:-translate-y-1 hover:shadow-orange-200",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-blue-50 focus:ring-brand-blue",
    ghost: "text-brand-dark hover:bg-gray-100 focus:ring-gray-200"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

// --- Sections ---

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md border-gray-100 shadow-sm py-2' : 'bg-transparent border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Heart className="h-6 w-6 text-brand-blue fill-brand-blue" />
            <span className="font-serif font-bold text-xl text-brand-dark tracking-tight">
              Bênçãos Familiares
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-gray-600 hover:text-brand-blue transition-colors font-medium text-sm tracking-wide">Como Funciona</a>
            <a href="#depoimentos" className="text-gray-600 hover:text-brand-blue transition-colors font-medium text-sm tracking-wide">Depoimentos</a>
            <Button href="#oferta" variant="primary" size="sm" className="rounded-full shadow-none hover:shadow-lg">
              Começar Agora
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#como-funciona" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-blue-50 rounded-lg">
              Como Funciona
            </a>
            <a href="#depoimentos" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-blue-50 rounded-lg">
              Depoimentos
            </a>
            <div className="pt-2 px-2">
              <Button href="#oferta" fullWidth onClick={() => setIsOpen(false)}>
                Começar Agora
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Section 1: Hero
const Hero = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-brand-blueLight/30 to-white relative overflow-hidden flex flex-col items-center">
      
      {/* Background Rings - Original Style */}
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-brand-blue/5 rounded-full pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-brand-blue/5 rounded-full pointer-events-none"></div>
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Text Section */}
        <div className="text-center max-w-5xl mx-auto mb-16 relative z-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-dark tracking-tight mb-8 leading-[1.1] drop-shadow-sm">
              Você sabia que 2 minutos por dia podem mudar o <br className="hidden lg:block"/>
              <span className="text-brand-blue relative inline-block">
                destino espiritual
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-gold opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span> do seu filho?
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
              Abençoe seus filhos todos os dias com o altar digital que cabe no seu bolso — e deixe uma herança que nem o mundo, nem o tempo podem roubar.
            </p>
          </FadeIn>
          
          <FadeIn delay={400} className="mt-12">
            <Button href="#oferta" variant="gold" size="lg" className="rounded-full shadow-2xl shadow-brand-gold/40 animate-pulse-slow px-12">
              Comece a Abençoar Hoje por R$ 37 <ArrowRight className="ml-2 w-5 h-5"/>
            </Button>
          </FadeIn>
        </div>

        {/* Visual Section with Floating Elements */}
        <div className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[600px] flex justify-center perspective">
           
           {/* Center Phone */}
           <FadeIn delay={600} className="relative z-20 transform translate-y-10 md:translate-y-0">
              <PhoneMockup />
           </FadeIn>

           {/* Floating Element 1: Audio Player */}
           <div className="hidden md:block absolute top-20 left-0 lg:left-10 z-30 animate-float" style={{ animationDelay: '0s' }}>
             <FadeIn delay={800}>
               <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-4 max-w-[260px] hover:scale-105 transition-transform">
                 <div className="w-12 h-12 rounded-full bg-brand-blueLight flex items-center justify-center text-brand-blue shadow-inner">
                   <Play size={20} fill="currentColor" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="h-6 w-full flex items-center gap-0.5">
                     {[...Array(12)].map((_, i) => (
                       <div key={i} className={`w-1 rounded-full bg-brand-blue ${i % 2 === 0 ? 'h-3' : 'h-6'}`} style={{ opacity: Math.random() * 0.5 + 0.5 }}></div>
                     ))}
                   </div>
                 </div>
               </div>
             </FadeIn>
           </div>
           
           {/* Floating Element 2: Security */}
           <div className="hidden md:block absolute top-32 right-0 lg:right-10 z-20 animate-float" style={{ animationDelay: '1.5s' }}>
             <FadeIn delay={1000}>
               <div className="bg-[#E8F5E9] p-5 rounded-2xl shadow-lg border border-green-100 max-w-[220px] hover:translate-y-[-5px] transition-transform">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock size={18} className="text-green-600" />
                    <span className="text-xs font-bold text-green-700 uppercase">Seguro</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 leading-tight">
                    Conteúdo <span className="bg-green-200/50 px-1 rounded font-bold text-green-800">100% bíblico</span>
                  </p>
               </div>
             </FadeIn>
           </div>

           {/* Floating Element 3: Stats */}
           <div className="hidden md:block absolute bottom-32 right-10 lg:right-24 z-30 animate-float" style={{ animationDelay: '3s' }}>
             <FadeIn delay={1100}>
               <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 min-w-[180px] text-center hover:scale-105 transition-transform">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 mb-2">
                     <Flame size={20} className="text-orange-500 fill-orange-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 font-serif">12 dias</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Sequência</p>
               </div>
             </FadeIn>
           </div>
           
           {/* Mobile Only: Simple Floating Label */}
           <div className="md:hidden absolute top-20 right-4 z-30 animate-bounce">
              <div className="bg-brand-gold text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Oferta Vitalícia
              </div>
           </div>

        </div>
      </div>
      
    </div>
  );
};

// Section 2: Pain Points (Dor Espelhada)
const PainPoints = () => {
  const pains = [
    {
      icon: <Clock className="w-8 h-8 text-brand-blue" />,
      title: "\"Nunca tenho tempo pra orar com meus filhos.\"",
      desc: "A rotina engole tudo. Quando você finalmente senta à noite, só sobra cansaço. A culpa aperta, mas você não sabe por onde começar."
    },
    {
      icon: <Users className="w-8 h-8 text-brand-blue" />,
      title: "\"Tenho medo de que meus filhos se afastem de Deus.\"",
      desc: "O mundo puxa eles pra todo lado. Redes sociais, amizades, influências que você não controla. E você se pergunta: \"Será que estou fazendo o suficiente?\""
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand-blue" />,
      title: "\"Não sei o que dizer... queria saber orar com propósito.\"",
      desc: "Você tem fé, mas se sente perdida. Quer liderar espiritualmente, mas não sabe as palavras certas."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 md:mb-24">
           {/* Left Column: Text & List */}
           <div className="order-1">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-2">
                  Se você já sentiu isso...
                </h2>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-400 mb-12">
                  você não está sozinha.
                </h2>
              </FadeIn>

              <div className="space-y-0">
                {pains.map((pain, index) => (
                  <FadeIn key={index} delay={index * 150}>
                    <div className={`flex gap-4 md:gap-6 py-6 md:py-8 ${index !== pains.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="w-16 h-16 rounded-full bg-brand-blueLight flex items-center justify-center flex-shrink-0">
                        {pain.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brand-dark mb-2 leading-tight">{pain.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {pain.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
           </div>

           {/* Right Column: Image */}
           <div className="order-2 h-full flex items-center">
              <FadeIn delay={300} className="w-full h-full">
                <div className="relative w-full aspect-square md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1616530664971-55c83bc5d58f?q=80&w=2070&auto=format&fit=crop" 
                    alt="Mãe olhando o celular com filho dormindo ao fundo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 mix-blend-multiply"></div>
                </div>
              </FadeIn>
           </div>
        </div>

        {/* Transition Text */}
        <FadeIn delay={400}>
          <div className="bg-brand-blueLight/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-brand-blue/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold"></div>
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-brand-dark leading-snug">
              E se você pudesse abençoar seus filhos todo dia — <span className="text-brand-blue font-bold">em 2 minutos</span>, com as palavras certas, sem precisar ser pastora?
            </h3>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

// Section 3: Solution
const Solution = () => {
  return (
    <section id="como-funciona" className="py-32 bg-brand-bgAlt overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Left: Content */}
          <div className="order-2 md:order-1">
            <FadeIn>
              <div className="inline-block bg-brand-blue/10 text-brand-blue font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest mb-4">
                O altar digital
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">
                Conheça o <br/>Bênçãos Familiares
              </h2>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                Bênçãos Familiares é o app que entrega uma bênção personalizada por dia — com o nome e idade do seu filho, base bíblica, reflexão e oração guiada.
              </p>
            </FadeIn>

            <div className="space-y-10">
              {[
                { step: "01", title: "Abre o app", desc: "(10 segundos)" },
                { step: "02", title: "Recebe a bênção do dia", desc: "Personalizada com o nome do seu filho" },
                { step: "03", title: "Declara a oração guiada", desc: "" }
              ].map((item, idx) => (
                <FadeIn key={idx} delay={idx * 150} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center text-brand-dark font-serif font-bold text-xl shadow-sm group-hover:border-brand-blue group-hover:text-brand-blue transition-colors duration-300">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-brand-dark">{item.title}</h3>
                    {item.desc && <p className="text-gray-600 text-sm mt-1">{item.desc}</p>}
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={500} className="mt-12">
              <div className="bg-brand-gold/10 border-l-4 border-brand-gold p-6 rounded-r-xl">
                <p className="text-xl text-brand-dark font-serif font-medium italic">
                  "Pronto. 2 minutos. E você acabou de plantar fé, paz e direção no coração dele."
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right: Visual */}
          <div className="order-1 md:order-2 flex justify-center relative">
             <div className="absolute inset-0 bg-brand-blue/5 rounded-full blur-[80px] transform scale-75"></div>
             <FadeIn delay={300} className="transform md:rotate-3 transition-transform hover:rotate-0 duration-700">
               <PhoneMockup className="shadow-2xl shadow-brand-blue/20" />
             </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

// Section 4: Benefits (Fixed Bento Grid - Light/White Theme)
const Benefits = () => {
  return (
    <section className="py-32 bg-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark text-center mb-20">
            O que você vai viver:
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Item Grande 1 - Paz ao deitar */}
          <FadeIn delay={100} className="h-full lg:col-span-2">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl h-full p-10 flex flex-col justify-between hover:border-brand-blue/20 hover:shadow-lg transition-all duration-300 group min-h-[300px]">
              <div className="w-12 h-12 rounded-full bg-brand-blueLight/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Moon className="w-6 h-6 text-brand-blue" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-brand-dark tracking-tight">Paz ao deitar</h3>
                <p className="text-gray-600 max-w-lg text-lg leading-relaxed">
                  Você vai dormir sabendo que cumpriu seu papel. Que plantou algo eterno. Que não deixou o dia passar em branco.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Item Pequeno 1 - Filhos firmes na fé */}
          <FadeIn delay={200} className="h-full">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl h-full p-8 flex flex-col justify-between hover:border-brand-blue/20 hover:shadow-lg transition-all duration-300 group min-h-[300px]">
              <div className="w-12 h-12 rounded-full bg-brand-blueLight/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-brand-blue" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-brand-dark tracking-tight">Filhos firmes na fé</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Eles vão crescer ouvindo bênçãos com o nome deles, formando uma identidade espiritual inabalável.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Item Pequeno 2 - Propósito claro */}
          <FadeIn delay={300} className="h-full">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl h-full p-8 flex flex-col justify-between hover:border-brand-blue/20 hover:shadow-lg transition-all duration-300 group min-h-[300px]">
              <div className="w-12 h-12 rounded-full bg-brand-blueLight/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-brand-blue" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-brand-dark tracking-tight">Propósito claro</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Temas específicos (proteção, sabedoria, saúde) com versículos e orações guiadas para você nunca hesitar.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Item Grande 2 - Vínculo eterno */}
          <FadeIn delay={400} className="h-full lg:col-span-2">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl h-full p-10 flex flex-col justify-between hover:border-brand-blue/20 hover:shadow-lg transition-all duration-300 group min-h-[300px]">
              <div className="w-12 h-12 rounded-full bg-brand-blueLight/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-brand-blue" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-brand-dark tracking-tight">Vínculo eterno</h3>
                <p className="text-gray-600 max-w-lg text-lg leading-relaxed">
                  Seus filhos vão lembrar para sempre: "Minha mãe sempre orava por mim. Todo dia." Não existe presente maior.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// Section 5: Social Proof
const SocialProof = () => {
  const testimonials = [
    { quote: "Meu filho de 7 anos me perguntou: 'Mãe, você vai me abençoar de novo hoje?' Eu chorei. Porque percebi que ele estava esperando aquilo.", author: "Carla M.", role: "Mãe de 2" },
    { quote: "O Bênçãos Familiares me deu as palavras que eu não tinha. Agora eu lidero. De verdade.", author: "Juliana S.", role: "Mãe solo" },
    { quote: "Minha filha de 14 anos me abraçou e disse: 'Não para, mãe.' Isso não tem preço.", author: "Renata P.", role: "Mãe" }
  ];

  return (
    <section id="depoimentos" className="py-32 bg-brand-bgAlt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-20">
            Mães que já estão vivendo essa transformação:
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
             <FadeIn key={i} delay={i * 200}>
               <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 h-full flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                 <div className="absolute top-6 right-8 text-6xl text-brand-blue/10 font-serif">"</div>
                 <div className="flex-1 mb-8 relative z-10">
                   <div className="flex gap-1 mb-6">
                     {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />)}
                   </div>
                   <p className="text-gray-700 italic leading-relaxed text-lg font-serif">"{t.quote}"</p>
                 </div>
                 <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                   <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-lg border border-white shadow-sm">
                     {t.author[0]}
                   </div>
                   <div>
                     <p className="font-bold text-brand-dark">{t.author}</p>
                     <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{t.role}</p>
                   </div>
                 </div>
               </div>
             </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 6: What You Get (New Section)
const WhatYouGet = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <FadeIn>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">
              Tudo que está incluído no seu <span className="text-brand-blue">acesso vitalício:</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Não é "só um app". É um sistema completo para você liderar espiritualmente sua família — com facilidade, propósito e constância.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-8">
          
          {/* Row 1: 365 Blessings & Personalization */}
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={100} className="h-full">
              <div className="bg-brand-blue/5 rounded-[2.5rem] p-8 md:p-12 border border-brand-blue/10 h-full flex flex-col justify-between hover:border-brand-blue/30 transition-colors group">
                <div className="mb-8">
                   <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white text-brand-blue shadow-sm mb-6">
                     <Calendar size={28} strokeWidth={2.5} />
                   </div>
                   <h3 className="text-3xl font-bold text-brand-dark mb-4">365 Bênçãos Únicas</h3>
                   <p className="text-gray-600 leading-relaxed text-lg">
                     Você nunca vai ficar sem conteúdo. Nunca vai repetir a mesma oração genérica. São 365 bênçãos exclusivas, cuidadosamente escritas para cobrir todos os dias do ano.
                   </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-blue/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Calendar size={100} />
                  </div>
                  <p className="text-brand-dark font-serif italic text-lg relative z-10">"Seu filho vai receber uma palavra nova todos os dias — e você nunca vai precisar pensar no que dizer."</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 h-full flex flex-col hover:border-gray-200 transition-colors">
                <div className="mb-6">
                   <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white text-brand-blue shadow-sm mb-6">
                     <Users size={28} strokeWidth={2.5} />
                   </div>
                   <h3 className="text-3xl font-bold text-brand-dark mb-4">Personalização Total</h3>
                   <p className="text-gray-600 leading-relaxed text-lg mb-8">
                     O nome do seu filho aparece na bênção. A linguagem se adapta à idade dele. Isso faz TODA a diferença no impacto emocional.
                   </p>
                </div>
                
                {/* Visual Mockup */}
                <div className="mt-auto bg-white rounded-3xl p-6 shadow-lg border border-gray-100 relative">
                   <div className="flex items-center gap-3 mb-4 border-b border-gray-50 pb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-blueLight flex items-center justify-center text-brand-blue font-bold">J</div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Para:</p>
                        <p className="font-bold text-brand-dark">João, 7 anos</p>
                      </div>
                   </div>
                   <p className="text-gray-600 italic text-sm">"Senhor, peço que a Tua mão esteja sobre o <span className="bg-brand-blue/10 text-brand-blue font-bold px-1 rounded">João</span> hoje..."</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Row 2: 7 Categories */}
          <FadeIn delay={300}>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-brand-bgAlt/50"></div>
              <div className="relative z-10 p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 text-center">
                  7 Categorias Espirituais Estratégicas
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {[
                    { icon: Shield, label: "Proteção", color: "text-blue-500", bg: "bg-blue-50" },
                    { icon: Brain, label: "Sabedoria", color: "text-purple-500", bg: "bg-purple-50" },
                    { icon: Activity, label: "Saúde", color: "text-red-500", bg: "bg-red-50" },
                    { icon: Users, label: "Relações", color: "text-orange-500", bg: "bg-orange-50" },
                    { icon: Map, label: "Propósito", color: "text-green-500", bg: "bg-green-50" },
                    { icon: TrendingUp, label: "Crescimento", color: "text-indigo-500", bg: "bg-indigo-50" },
                    { icon: Sun, label: "Paz", color: "text-brand-gold", bg: "bg-yellow-50" },
                  ].map((cat, i) => (
                    <div key={i} className="flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:translate-y-[-2px] transition-transform">
                      <div className={`w-12 h-12 rounded-full ${cat.bg} ${cat.color} flex items-center justify-center mb-3`}>
                        <cat.icon size={20} />
                      </div>
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{cat.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-500 mt-8 text-sm font-medium">
                  Você não está só "orando". Você está <span className="text-brand-dark font-bold">construindo um filho espiritualmente equilibrado</span>.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Row 3: Biblical Basis & System */}
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={400} className="h-full">
              <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-[80px] group-hover:bg-brand-blue/30 transition-colors"></div>
                
                <div className="relative z-10">
                   <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-brand-gold shadow-sm mb-6">
                     <BookOpen size={28} strokeWidth={2.5} />
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-6">Base Bíblica Sólida</h3>
                   
                   <div className="space-y-4">
                     <div className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                       <div>
                         <p className="font-bold text-white">Versículo Bíblico</p>
                         <p className="text-gray-400 text-sm">A fundação da oração, direto da Palavra.</p>
                       </div>
                     </div>
                     <div className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                       <div>
                         <p className="font-bold text-white">Reflexão Espiritual</p>
                         <p className="text-gray-400 text-sm">Significado explicado de forma simples.</p>
                       </div>
                     </div>
                     <div className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                       <div>
                         <p className="font-bold text-brand-gold">Oração Guiada</p>
                         <p className="text-gray-400 text-sm">Passo a passo do que declarar.</p>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={500} className="h-full">
              <div className="bg-gradient-to-br from-brand-gold/10 to-orange-50 rounded-[2.5rem] p-8 md:p-12 border border-brand-gold/20 h-full">
                 <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold text-white shadow-lg shadow-brand-gold/30 mb-6">
                   <Flame size={28} strokeWidth={2.5} fill="currentColor" />
                 </div>
                 <h3 className="text-3xl font-bold text-brand-dark mb-4">Sistema de Hábito</h3>
                 <p className="text-gray-600 mb-8">
                   Streak (sequência), histórico completo e conquistas para celebrar cada marco. Não é gamificação vazia. É um sistema que sustenta você.
                 </p>
                 
                 {/* Visual Streak */}
                 <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Sequência Atual</p>
                      <p className="text-2xl font-bold text-brand-dark">12 Dias 🔥</p>
                    </div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(d => (
                        <div key={d} className={`w-2 h-8 rounded-full ${d > 2 ? 'bg-brand-gold' : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                 </div>
              </div>
            </FadeIn>
          </div>

          {/* Row 4: Value Props Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Infinity, title: "Acesso Vitalício", desc: "Pague uma vez, use para sempre. Sem mensalidades." },
              { icon: RefreshCw, title: "Atualizações Grátis", desc: "Novas bênçãos e recursos sem custo adicional." }
            ].map((item, i) => (
              <FadeIn key={i} delay={600 + (i*100)}>
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 h-full hover:bg-white hover:shadow-lg transition-all duration-300">
                  <item.icon size={32} className="text-brand-blue mb-4" />
                  <h4 className="text-xl font-bold text-brand-dark mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// Section 7: Offer (Updated with List Inside)
const Offer = () => {
  return (
    <section id="oferta" className="py-32 bg-brand-bgAlt relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(74,144,226,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,144,226,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-8 leading-tight">
            Quanto custa deixar uma <span className="text-brand-blue">herança eterna</span> nos seus filhos?
          </h2>
          <div className="max-w-2xl mx-auto space-y-6 mb-16 text-lg text-gray-600">
             <p>Você acabou de ver tudo que terá de acesso dentro da plataforma.</p>
             <p>Quanto você imaginava que algo assim custaria?</p>
             <p className="text-xl font-medium text-gray-400 line-through decoration-red-400/50">R$ 97 por mês? R$ 297 no ano?</p>
             
             <div className="pt-2">
               <p className="text-2xl font-bold text-brand-dark">
                 O acesso vitalício ao Bênçãos Familiares custa apenas <span className="text-brand-blue bg-brand-blue/10 px-2 rounded">R$ 37</span>.
               </p>
               <p className="text-base mt-3 font-medium">Pagamento único. Sem mensalidade. Sem renovação. Sem surpresas.</p>
               <p className="font-bold text-brand-gold mt-6 text-xl font-serif italic">"Você paga uma vez. Abençoa seus filhos para sempre."</p>
             </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] max-w-lg mx-auto relative border-2 border-brand-blue/10 transform hover:scale-[1.01] transition-transform duration-500">
            
            <div className="text-center mb-8">
              <span className="bg-brand-blue/10 text-brand-blue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-6">
                Acesso Vitalício
              </span>
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-bold text-gray-400 self-start mt-2">R$</span>
                <span className="text-8xl font-bold text-brand-dark tracking-tighter">37</span>
              </div>
              <p className="text-gray-400 font-medium mt-2 uppercase tracking-wide text-sm">Pagamento Único</p>
            </div>

            {/* List restored inside Offer Card */}
            <div className="space-y-4 mb-10 text-left bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Tudo que está incluído:</p>
              {[
                "Bênçãos diárias personalizadas",
                "Base bíblica + reflexão + oração",
                "7 categorias (Proteção, Sabedoria...)",
                "Sistema de acompanhamento",
                "Acesso vitalício (sem mensalidades)"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Button fullWidth variant="gold" size="xl" className="rounded-2xl shadow-xl shadow-brand-gold/30 animate-pulse-slow mb-6 text-lg md:text-xl">
              SIM, EU QUERO ABENÇOAR MEUS FILHOS — R$ 37
            </Button>
            
            <p className="text-xs md:text-sm text-gray-500 font-medium text-center opacity-80">
              🔒 Pagamento 100% seguro | ⚡ Acesso imediato | 💳 Cartão ou PIX
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Section 8: Before and After
const BeforeAfter = () => {
  const beforeItems = [
    { title: "Correria sem direção", desc: "Dias passam voando sem momentos genuínos de conexão espiritual" },
    { title: "Culpa constante", desc: "Sentimento de não estar cumprindo seu papel como pai/mãe cristã" },
    { title: "Falta de rotina com Deus", desc: "Tentativas frustradas de criar hábitos espirituais duradouros" },
    { title: "Filhos distantes da oração", desc: "Dificuldade em envolver as crianças em momentos de fé" }
  ];

  const afterItems = [
    { title: "Direção clara com fé", desc: "Rotina estruturada que traz paz e propósito para cada dia" },
    { title: "Lar mais calmo", desc: "Ambiente conectado com Deus, cheio de amor e harmonia" },
    { title: "Pais discipulando filhos", desc: "Com amor, intencionalidade e métodos práticos que funcionam" },
    { title: "Leveza na espiritualidade", desc: "Fé cultivada com naturalidade, sem pressão ou peso" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-16">
            A transformação que você vai experimentar
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
          {/* Before */}
          <div className="bg-gray-50 p-8 md:p-12">
            <h3 className="text-xl font-bold text-gray-500 mb-8 flex items-center gap-2 uppercase tracking-widest">
              <XCircle className="w-6 h-6" /> Antes
            </h3>
            <div className="space-y-8">
              {beforeItems.map((item, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="flex gap-4">
                    <XCircle className="w-6 h-6 text-red-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-700">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="bg-brand-blueLight/20 p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full"></div>
            <h3 className="text-xl font-bold text-brand-blue mb-8 flex items-center gap-2 uppercase tracking-widest">
              <CheckCircle2 className="w-6 h-6" /> Depois
            </h3>
            <div className="space-y-8">
              {afterItems.map((item, i) => (
                <FadeIn key={i} delay={i * 100 + 400}>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-brand-dark">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <FadeIn delay={600} className="mt-12 text-center">
          <div className="inline-block bg-brand-gold/10 border-y border-brand-gold/30 py-4 px-8">
            <p className="text-lg text-brand-dark italic font-serif font-medium">
              "A mudança não acontece da noite para o dia, mas com pequenos gestos consistentes, sua família será transformada."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Section 9: FAQ
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "Funciona para filhos de qualquer idade?", a: "Sim! Desde bebês até adolescentes e jovens adultos." },
    // Removed Offline FAQ item
    { q: "As bênçãos se repetem?", a: "Não. Cada uma é única, e novas bênçãos são adicionadas constantemente." },
    { q: "É de qual denominação?", a: "Interdenominacional. Focamos na Palavra de Deus e em princípios universais do cristianismo." },
    { q: "Como eu começo?", a: "Clique no botão, finalize seu acesso e comece a abençoar em menos de 5 minutos." },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-12">
            Perguntas rápidas:
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FadeIn key={idx} delay={idx * 100}>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="font-bold text-brand-dark text-lg">{faq.q}</span>
                  {openIndex === idx ? <Minus className="text-brand-blue" /> : <Plus className="text-gray-400" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-5 pt-0 text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 10: Final CTA
const FinalCTA = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Dados das fotos com posições específicas para o layout "Bento" espalhado
  const photos = [
    {
      id: 1,
      order: 0,
      x: "-340px",
      y: "10px",
      zIndex: 50,
      direction: "left" as const,
      src: "https://images.pexels.com/photos/4262413/pexels-photo-4262413.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      order: 1,
      x: "-170px",
      y: "-20px",
      zIndex: 40,
      direction: "right" as const,
      src: "https://images.pexels.com/photos/4262424/pexels-photo-4262424.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      order: 2,
      x: "0px",
      y: "15px",
      zIndex: 30,
      direction: "left" as const,
      src: "https://images.pexels.com/photos/3905891/pexels-photo-3905891.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      order: 3,
      x: "170px",
      y: "-15px",
      zIndex: 20,
      direction: "right" as const,
      src: "https://images.pexels.com/photos/3905710/pexels-photo-3905710.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      order: 4,
      x: "340px",
      y: "30px",
      zIndex: 10,
      direction: "left" as const,
      src: "https://images.pexels.com/photos/4261066/pexels-photo-4261066.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div className="bg-white py-24 px-4 overflow-hidden flex flex-col items-center relative">
      {/* Background Decorativo Suave */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Header do Conteúdo */}
      <div className="max-w-4xl w-full text-center z-10 mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-brand-dark leading-tight mb-6"
        >
          Seus filhos precisam ouvir a voz de Deus... <br />
          <span className="text-brand-blue">Seja esse porta voz!</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium"
        >
          Você só precisa de 2 minutos por dia, para abençoar seu filho, com propósito, fé e direção.
        </motion.p>
      </div>

      {/* Galeria de Fotos Interativa */}
      <div className="relative w-full h-[450px] flex items-center justify-center mb-16">
        <div className="relative w-full max-w-7xl flex justify-center">
          <AnimatePresence>
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.8 }}
                animate={isLoaded ? { 
                  x: photo.x, 
                  y: photo.y, 
                  opacity: 1, 
                  scale: 1 
                } : {}}
                transition={{ 
                  type: "spring", 
                  stiffness: 50, 
                  damping: 15,
                  delay: photo.order * 0.1 
                }}
                className="absolute"
                style={{ zIndex: photo.zIndex }}
              >
                <Photo
                  src={photo.src}
                  alt="Momento Família"
                  direction={photo.direction}
                  width={220}
                  height={220}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA Final */}
      <div className="z-20 text-center w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-6"
        >
          <button className="w-full py-6 bg-brand-gold hover:bg-brand-goldHover text-white rounded-[2rem] text-lg md:text-2xl font-black shadow-[0_20px_40px_-10px_rgba(244,197,66,0.4)] transition-all transform hover:scale-[1.03] active:scale-95 uppercase tracking-tighter px-8">
            COMECE A ABENÇOAR SEU FILHO HOJE - R$ 37
          </button>
          
          <div className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> Pagamento Seguro</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-brand-gold" /> Acesso Imediato</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-gray-900 py-16 border-t border-gray-800 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
             <Heart className="h-6 w-6 text-brand-gold fill-brand-gold" />
          </div>
          <span className="font-serif font-bold text-2xl text-white tracking-tight">Bênçãos Familiares</span>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <a href="mailto:contato@bencaosfamiliares.com.br" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
            <Mail size={16} /> Suporte: contato@bencaosfamiliares.com.br
          </a>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
             <Lock size={16} /> Pagamento 100% seguro
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2025 Bênçãos Familiares</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark overflow-x-hidden selection:bg-brand-blue/20">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <PainPoints />
      <Solution />
      <Benefits />
      <SocialProof />
      <WhatYouGet />
      <Offer />
      <BeforeAfter />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

export default App;