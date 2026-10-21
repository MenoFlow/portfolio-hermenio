import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import SkillTooltip from "@/components/SkillTooltip";
import {
  Atom,
  Server,
  FileCode,
  Database,
  ArrowRight,
  Terminal,
  Briefcase,
  GraduationCap,
  Code,
  Braces,
  Box,
  Workflow,
  Cloud,
  Smartphone,
  Phone,
  Shield,
  Monitor,
  Search,
  Network,
  Cpu,
  Layers,
  Activity,
  Triangle,
  MousePointerClick,
} from "lucide-react";

interface Skill {
  name: string;
  icon: ReactNode;
  /** Niveau de 0 à 10 */
  level: number;
}

type Category = "GL" | "ASR";

const glSkills: Skill[] = [
  { name: "Java", icon: <FileCode className="w-5 h-5" />, level: 8 },
  { name: "Python", icon: <Terminal className="w-5 h-5 text-orange-500" />, level: 9 },
  { name: "React", icon: <Atom className="w-5 h-5 text-blue-200" />, level: 10 },
  { name: "Nest", icon: <Server className="w-5 h-5" />, level: 7 },
  { name: "Express", icon: <FileCode className="w-5 h-5 text-blue-500" />, level: 10 },
  { name: "Next", icon: <Triangle className="w-5 h-5" />, level: 7 },
  { name: "React Native", icon: <Smartphone className="w-5 h-5 text-indigo-500" />, level: 7 },
  { name: "Tailwind", icon: <Braces className="h-5 w-5 text-red-500" />, level: 9 },
  { name: "SQL", icon: <Database className="w-5 h-5" />, level: 10 },
  { name: "Docker", icon: <Box className="w-5 h-5 text-blue-400" />, level: 9 },
  { name: "Git", icon: <Workflow className="w-5 h-5 text-green-500" />, level: 10 },
  { name: "VPS", icon: <Cloud className="w-5 h-5 text-gray-500" />, level: 9 },
];

const asrSkills: Skill[] = [
  { name: "Linux", icon: <Cpu className="w-5 h-5 text-yellow-400" />, level: 9 },
  { name: "Windows Server", icon: <Monitor className="w-5 h-5 text-blue-400" />, level: 7 },
  { name: "VirtualBox", icon: <Layers className="w-5 h-5 text-blue-500" />, level: 8 },
  { name: "VMWare", icon: <Layers className="w-5 h-5 text-orange-500" />, level: 7 },
  { name: "PFsense", icon: <Shield className="w-5 h-5 text-orange-400" />, level: 7 },
  { name: "Wireshark", icon: <Search className="w-5 h-5 text-blue-300" />, level: 7 },
  { name: "GNS3", icon: <Network className="w-5 h-5 text-green-400" />, level: 6 },
  { name: "Mikrotik", icon: <Network className="w-5 h-5 text-red-500" />, level: 6 },
  { name: "Asterisk", icon: <Phone className="w-5 h-5 text-red-400" />, level: 7 },
  { name: "Snort", icon: <Activity className="w-5 h-5 text-green-500" />, level: 6 },
  { name: "Suricata", icon: <Activity className="w-5 h-5 text-blue-400" />, level: 8 },
  { name: "ELK", icon: <Search className="w-5 h-5 text-purple-400" />, level: 7 },
];

const TOOLTIP_ID = "skill-level-tooltip";

const About = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("GL");

  // Tooltip : un seul ouvert à la fois (skill sélectionné + élément d'ancrage)
  const [selected, setSelected] = useState<Skill | null>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const skills = activeCategory === "GL" ? glSkills : asrSkills;

  const closeTooltip = useCallback(() => {
    setSelected(null);
    setAnchor(null);
  }, []);

  const handleSkillClick = (skill: Skill, el: HTMLElement) => {
    // Re-clic sur le même skill = fermeture
    if (selected?.name === skill.name) {
      closeTooltip();
      return;
    }
    setSelected(skill);
    setAnchor(el);
  };

  // Changement de catégorie : on ferme le tooltip
  useEffect(() => {
    closeTooltip();
  }, [activeCategory, closeTooltip]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="bg-secondary fade-in-section py-20 overflow-x-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">{t("aboutMe")}</h2>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveCategory("ASR")}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 transform ${
                activeCategory === "ASR"
                  ? "bg-highlight text-primary shadow-glow scale-105"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <span className="hidden sm:inline">{t("systemsNetworkAdmin")}</span>
              <span className="sm:hidden">{t("systemsNetworkAdminShort")}</span>
            </button>
            <button
              onClick={() => setActiveCategory("GL")}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 transform ${
                activeCategory === "GL"
                  ? "bg-highlight text-primary shadow-glow scale-105"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <span className="hidden sm:inline">{t("softwareEngineering")}</span>
              <span className="sm:hidden">{t("softwareEngineeringShort")}</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            className="glass-card p-6 h-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Code className="text-highlight" />
              {t("skills")}
            </h3>

            {/* Indication d'interaction */}
            <p className="mt-1 mb-6 flex items-center gap-1.5 text-sm text-gray-400">
              <MousePointerClick className="w-4 h-4 shrink-0" aria-hidden="true" />
              {t("skillsHint")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className="contents"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {skills.map((skill) => {
                    const isSelected = selected?.name === skill.name;
                    return (
                      <motion.button
                        key={skill.name}
                        type="button"
                        onClick={(e) => handleSkillClick(skill, e.currentTarget)}
                        aria-expanded={isSelected}
                        aria-controls={isSelected ? TOOLTIP_ID : undefined}
                        className={`rounded-lg p-4 text-center transition-colors flex flex-col items-center gap-2 cursor-pointer
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-highlight
                          ${isSelected ? "bg-highlight/20 ring-1 ring-highlight/60" : "bg-primary/30 hover:bg-highlight/20"}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="text-highlight">{skill.icon}</div>
                        <div className="text-sm sm:text-base">{skill.name}</div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="text-highlight" />
                {t("experience")}
              </h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-300 mb-4 font-medium italic text-highlight/80">
                    {activeCategory === "GL" ? t("softwareEngineering") : t("systemsNetworkAdmin")}
                  </p>
                  <p className="text-gray-300">
                    {activeCategory === "GL" ? t("aboutMeDescriptionGL") : t("aboutMeDescriptionASR")}
                  </p>
                  <hr className="my-6 border-white/10" />
                  <p className="text-gray-300">{t("experienceDescription")}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="text-highlight" />
                {t("education")}
              </h3>
              <p className="text-gray-300 whitespace-pre-line">{t("educationDescription")}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tooltip modulaire : rendu dans un portail, donc jamais coupé par overflow-x-hidden */}
      <SkillTooltip
        id={TOOLTIP_ID}
        open={!!selected}
        anchor={anchor}
        onClose={closeTooltip}
        title={selected?.name ?? ""}
        level={selected?.level ?? 0}
        max={10}
        levelLabel={t("skillLevel")}
      />
    </section>
  );
};

export default About;
