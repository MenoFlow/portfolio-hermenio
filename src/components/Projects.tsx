import { Github, ExternalLink, Mountain } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { 
  Atom, 
  Server, 
  FileCode, 
  Database, 
  Layout, 
  ArrowRight, 
  Terminal,
  Settings,
  Shield,
  Network,
  Phone
} from "lucide-react";

const asrProjects = [
  {
    year: "2025",
    title: {
      fr: "Projet Infrastructure Réseau & Cybersécurité (VoIP + Architecture Défensive)",
      en: "Network Infrastructure & Cybersecurity Project (VoIP + Defensive Architecture)"
    },
    location: "ENI Fianarantsoa",
    description: {
      fr: "Mise en place de la gestion des crédits téléphoniques, supervision via application web et implémentation de solutions de détection et prévention d’intrusions.",
      en: "Implementation of telephone credit management, supervision via web application and implementation of intrusion detection and prevention solutions."
    },
    icon: <Phone className="w-6 h-6" />
  },
  {
    year: "2024",
    title: {
      fr: "Projets Administration Systèmes & Sécurité Réseau",
      en: "Systems Administration & Network Security Projects"
    },
    location: "ENI Fianarantsoa",
    description: {
      fr: "Conception d’une infrastructure réseau intégrant un portail captif avec gestion d’accès par vouchers, une administration centralisée des utilisateurs (Active Directory).",
      en: "Design of a network infrastructure integrating a captive portal with voucher access management, centralized user administration (Active Directory)."
    },
    icon: <Network className="w-6 h-6" />
  },
  {
    year: "2023",
    title: {
      fr: "Simulation d’attaque DDoS",
      en: "DDoS Attack Simulation"
    },
    location: "ENI Fianarantsoa",
    description: {
      fr: "Simulation d’attaque DDoS avec mise en place de mécanismes de détection.",
      en: "DDoS attack simulation with implementation of detection mechanisms."
    },
    icon: <Shield className="w-6 h-6" />
  }
];

const techIcons: {[key: string]: JSX.Element} = {
  "React": <Atom className="w-4 h-4" />,
  "Vue.js": <Atom className="w-4 h-4" />,
  "Node.js": <Server className="w-4 h-4" />,
  "Express": <Server className="w-4 h-4" />,
  "Nest": <Layout className="w-4 h-4" />,
  "Next.js": <ArrowRight className="w-4 h-4" />,
  "TS/JS": <FileCode className="w-4 h-4" />,
  "JavaScript": <FileCode className="w-4 h-4" />,
  "TypeScript": <FileCode className="w-4 h-4" />,
  "Python": <Terminal className="w-4 h-4" />,
  "Laravel": <Settings className="w-4 h-4" />,
  "PHP": <Settings className="w-4 h-4" />,
  "MongoDB": <Database className="w-4 h-4" />,
  "PostgreSQL": <Database className="w-4 h-4" />,
  "MySQL": <Database className="w-4 h-4" />,
  "pgSQL": <Database className="w-4 h-4" />,
  "Supabase": <Database className="w-4 h-4" />,
  "Firebase": <Database className="w-4 h-4" />,
  "Tailwind CSS": <FileCode className="w-4 h-4" />,
  "Bootstrap CSS": <FileCode className="w-4 h-4" />,
  "Socket.io": <Server className="w-4 h-4" />,
  "Markdown": <FileCode className="w-4 h-4" />,
  "Leaflet": <Mountain className="w-4 h-4" />,
};


const projects = [
  {
    title: "TrackFuel360",
    description: {
      fr: "Une application de suivi intelligent de carburant et de détection d'anomalies\nEmail : admin@example.com\nPassword : admins",
      en: "An intelligent fuel tracking and anomaly detection application\nEmail : admin@example.com\nPassword : admins"
    },
    tech: ["React", "PWA", "Tailwind CSS", "Node.js", "MySQL", "Leaflet"],
    github: "#",
    demo: "https://trackfuel360.com/",
    image: "/trackfuel.png",
  },
  {
    title: "VinExpert",
    description: {
      fr: "Une application web pour la gestion de la production et la vente de vin.\nEmail : admin@example.com\nPassword : admins",
      en: "A web application for wine production management and sales.\nEmail : admin@example.com\nPassword : admins"
    },
    tech: ["React", "Tailwind CSS", "Node.js", "MySQL"],
    github: "#",
    demo: "https://vinexpert-management.vercel.app/",
    image: "/vinexpert.png",
  },
  {
    title: "Cotizadmin",
    description: {
      fr: "Une application de gestion de cotisation d'une association de football.\nUsername : admin\nPassword : admin",
      en: "An application of cotisation management of a football association.\nUsername : admin\nPassword : admin"
    },
    tech: ["React", "Tailwind CSS", "Node.js"],
    github: "https://github.com/MenoFlow/cotizadmin",
    demo: "https://cotizadmin-v-2-0.vercel.app/",
    image: "/cotizcap3.png",
  },
  {
    title: "MenoStore",
    description: {
      fr: "Une application web permettant de parcourir et télécharger mes applications mobiles.",
      en: "A web application to browse and download my mobile apps."
    },
    tech: ["React", "Tailwind CSS"],
    github: "https://github.com/MenoFlow/appstoreweb",
    demo: "https://menostore.vercel.app/",
    image: "menostore.png",
  },
  {
    title: "Porfolio",
    description: {
      fr: "Site portfolio personnel.",
      en: "Personnal site for portfolio."
    },
    tech: ["React", "Tailwind CSS"],
    github: "#",
    demo: "#",
    image: "/portfocap1.png",
  },
  {
    title: "Symposium",
    description: {
      fr: "Site web du 1er Symposium de la Cybersécurité de Madagascar.",
      en: "Website of the 1st Madagascar Cybersecurity Symposium."
    },
    tech: ["React", "Tailwind CSS", "Supabase"],
    github: "#",
    demo: "https://symposium.cirt.gov.mg/",
    image: "/symposium.png",
  },
  {
    title: "Madavola",
    description: {
      fr: "Plateforme de traçabilité de l'or à Madagascar pour les orpailleurs et collecteurs.",
      en: "Gold traceability platform in Madagascar for artisanal miners and collector."
    },
    tech: ["React", "Tailwind CSS", "Express", "pgSQL"],
    github: "#",
    demo: "https://madavola.vercel.app/",
    image: "/madavola.png",
  },
];



const Projects = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'GL' | 'ASR'>('GL');
  useScrollAnimation(); // For scroll animations

const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
const [activeIndex, setActiveIndex] = useState(1);

// Synchroniser l'index actif avec Embla
useEffect(() => {
  if (!carouselApi) return;

  const updateActiveIndex = () => {
    setActiveIndex(carouselApi.selectedScrollSnap());
  };

  // Sélectionner le deuxième élément au démarrage
  carouselApi.scrollTo(1);
  updateActiveIndex();

  carouselApi.on("select", updateActiveIndex);
  carouselApi.on("reInit", updateActiveIndex);

  return () => {
    carouselApi.off("select", updateActiveIndex);
    carouselApi.off("reInit", updateActiveIndex);
  };
}, [carouselApi]);
  
  // Auto-scroll carousel
useEffect(() => {
  if (!carouselApi || activeCategory !== "GL") return;

  const interval = setInterval(() => {
    carouselApi.scrollNext();
  }, 5000);

  return () => clearInterval(interval);
}, [carouselApi, activeCategory]);
  
  // Animation variants for projects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <section id="projects" className="bg-primary fade-in-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("myProjects")}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            {t("projectsDescription")}
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveCategory('ASR')}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === 'ASR'
                  ? "bg-highlight text-primary shadow-glow"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <span className="hidden sm:inline">{t("systemsNetworkAdmin")}</span>
              <span className="sm:hidden">{t("systemsNetworkAdminShort")}</span>
            </button>
            <button
              onClick={() => setActiveCategory('GL')}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === 'GL'
                  ? "bg-highlight text-primary shadow-glow"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <span className="hidden sm:inline">{t("softwareEngineering")}</span>
              <span className="sm:hidden">{t("softwareEngineeringShort")}</span>
            </button>

          </div>
        </motion.div>
        

        {activeCategory === 'GL' ? (
        
        <motion.div 
          className="relative px-4 sm:px-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
        <Carousel
          opts={{
            align: "center",
            loop: true,
            startIndex: 1,
          }}
          className="w-full"
          setApi={setCarouselApi}
        >
            <CarouselContent>
              {projects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <CarouselItem
                    key={project.title}
                    className="md:basis-1/2 lg:basis-1/3"
                    style={{
                      opacity: isActive ? 1 : 0.4,
                    }}
                  >
                    <motion.div
                      variants={itemVariants}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-card overflow-hidden group h-full"
                      animate={{
                        scale: isActive ? 1.0 : 0.75,
                      }}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          {/* <motion.a
                            href={project.github}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Github className="w-6 h-6" />
                          </motion.a> */}
                          <motion.a
                            href={project.demo}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <ExternalLink className="w-6 h-6" />
                          </motion.a>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <motion.h3 
                          className="text-xl font-bold mb-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-300 mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            {project.description.fr.split('\n').map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                        </motion.p>
                        <motion.div 
                          className="flex flex-wrap gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          {project.tech.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              className="px-3 py-1 text-sm rounded-full bg-highlight/10 text-highlight flex items-center gap-1"
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--highlight), 0.2)" }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * techIndex }}
                            >
                              {techIcons[tech] && (
                                <span className="inline-flex">{techIcons[tech]}</span>
                              )}
                              <span>{tech}</span>
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                )
})}
            </CarouselContent>
              <CarouselPrevious className="left-1 sm:left-4 md:-left-2 bg-accent/20 text-white hover:bg-accent/40" />
              <CarouselNext className="right-1 sm:right-4 md:-right-2 bg-accent/20 text-white hover:bg-accent/40" />
          </Carousel>
        </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto px-4">
            {/* Desktop Timeline (ASR) */}
            <div className="relative hidden sm:block">
              <div className="absolute left-[50%] transform -translate-x-1/2 h-full w-0.5 bg-highlight/20" />
              <div className="space-y-12">
                {asrProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center justify-between w-full ${
                      index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className="w-[45%]" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-2 border-highlight flex items-center justify-center z-10 shadow-glow">
                      <div className="text-highlight">
                        {project.icon}
                      </div>
                    </div>
                    <div className={`w-[45%] glass-card p-6 ${
                      index % 2 === 0 ? "text-left" : "text-right"
                    }`}>
                      <span className="text-highlight font-bold text-lg mb-1 block">{project.year}</span>
                      <h3 className="text-xl font-bold mb-2 text-white">{project.title[language]}</h3>
                      <p className="text-highlight/80 text-sm mb-3">{project.location}</p>
                      <p className="text-gray-300 leading-relaxed">{project.description[language]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline (ASR) */}
            <div className="sm:hidden space-y-8 relative">
              <div className="absolute left-2 top-0 h-full w-0.5 bg-highlight/20" />
              {asrProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-highlight shadow-glow mt-1" />
                  <div className="glass-card p-6">
                    <span className="text-highlight font-bold text-lg mb-1 block">{project.year}</span>
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title[language]}</h3>
                    <p className="text-highlight/80 text-sm mb-3">{project.location}</p>
                    <p className="text-gray-300 leading-relaxed">{project.description[language]}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default Projects;
