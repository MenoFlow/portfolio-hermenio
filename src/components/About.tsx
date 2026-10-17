
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Atom,
  Server,
  FileCode,
  Database,
  Layout,
  ArrowRight,
  Terminal,
  Settings,
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
  HardDrive,
  Activity,
  Zap,
  Triangle 
} from "lucide-react";

const About = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'GL' | 'ASR'>('GL');

  const glSkills = [
    { name: "React", icon: <Atom className="w-5 h-5 text-blue-200" /> },
    { name: "Nest", icon: <Server className="w-5 h-5" /> },
    { name: "Express", icon: <FileCode className="w-5 h-5 text-blue-500" /> },
    { name: "Tailwind", icon: <Braces className="h-5 w-5 text-red-500" /> },
    { name: "TS/JS", icon: <FileCode className="w-5 h-5" /> },
    { name: "Python", icon: <Terminal className="w-5 h-5 text-orange-500" /> },
    { name: "Next", icon: <Triangle className="w-5 h-5" /> },
    { name: "MySQL", icon: <Database className="w-5 h-5" /> },
    { name: "Docker", icon: <Box className="w-5 h-5 text-blue-400" /> },
    { name: "Git", icon: <Workflow className="w-5 h-5 text-green-500" /> },
    { name: "VPS", icon: <Cloud className="w-5 h-5 text-gray-500" /> },
    { name: "React Native", icon: <Smartphone className="w-5 h-5 text-indigo-500" /> },
  ];

  const asrSkills = [
    { name: "Asterisk", icon: <Phone className="w-5 h-5 text-red-400" /> },
    { name: "PFsense", icon: <Shield className="w-5 h-5 text-orange-400" /> },
    { name: "Windows Server", icon: <Monitor className="w-5 h-5 text-blue-400" /> },
    { name: "Wireshark", icon: <Search className="w-5 h-5 text-blue-300" /> },
    { name: "GNS3", icon: <Network className="w-5 h-5 text-green-400" /> },
    { name: "Linux", icon: <Cpu className="w-5 h-5 text-yellow-400" /> },
    { name: "VirtualBox", icon: <Layers className="w-5 h-5 text-blue-500" /> },
    { name: "VMWare", icon: <Layers className="w-5 h-5 text-orange-500" /> },
    { name: "Mikrotik", icon: <Network className="w-5 h-5 text-red-500" /> },
    { name: "Snort", icon: <Activity className="w-5 h-5 text-green-500" /> },
    { name: "Suricata", icon: <Activity className="w-5 h-5 text-blue-400" /> },
    { name: "ELK", icon: <Search className="w-5 h-5 text-purple-400" /> },
  ];

  const skills = activeCategory === 'GL' ? glSkills : asrSkills;

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            {t("aboutMe")}
          </h2>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveCategory('ASR')}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 transform ${
                activeCategory === 'ASR'
                  ? "bg-highlight text-primary shadow-glow scale-105"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <span className="hidden sm:inline">{t("systemsNetworkAdmin")}</span>
              <span className="sm:hidden">{t("systemsNetworkAdminShort")}</span>
            </button>
            <button
              onClick={() => setActiveCategory('GL')}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 transform ${
                activeCategory === 'GL'
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
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Code className="text-highlight" />
              {t("skills")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className="contents"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="bg-primary/30 rounded-lg p-4 text-center hover:bg-highlight/20 transition-colors flex flex-col items-center gap-2"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="text-highlight">{skill.icon}</div>
                      <div className="text-sm sm:text-base">{skill.name}</div>
                    </motion.div>
                  ))}
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
                    {activeCategory === 'GL' ? t("softwareEngineering") : t("systemsNetworkAdmin")}
                  </p>
                  <p className="text-gray-300">
                    {activeCategory === 'GL' ? t("aboutMeDescriptionGL") : t("aboutMeDescriptionASR")}
                  </p>
                  <hr className="my-6 border-white/10" />
                  <p className="text-gray-300">
                    {t("experienceDescription")}
                  </p>
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
              <p className="text-gray-300 whitespace-pre-line">
                {t("educationDescription")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
