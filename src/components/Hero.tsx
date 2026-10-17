
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles, Download } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";


const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScrollAnimation();
  const [showGreeting, setShowGreeting] = useState(true);
  const [typedText, setTypedText] = useState("");
  const greetingText = "It's Hermenio";

  const heroOpacity = Math.max(1 - scrollY / 700, 0);

  // Typewriter + timing plus doux
  useEffect(() => {
    if (!showGreeting) return;

    let currentIndex = 0;
    const typeSpeed = 80;   // un peu plus lent → plus premium
    const pauseAfterTyping = 2800; // plus long avant disparition

    const typeInterval = setInterval(() => {
      if (currentIndex < greetingText.length) {
        setTypedText((prev) => greetingText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);

        setTimeout(() => {
          setShowGreeting(false);
        }, pauseAfterTyping);
      }
    }, typeSpeed);

    return () => clearInterval(typeInterval);
  }, [showGreeting]);

  // Reset plus espacé (optionnel : tu peux même le passer à 7–10s)
  useEffect(() => {
    if (!showGreeting) {
      const timeout = setTimeout(() => {
        setTypedText("");
        setShowGreeting(true);
      }, 8000); // ← augmenté

      return () => clearTimeout(timeout);
    }
  }, [showGreeting]);

  return (
    <section
      id="home"
      className={`
    flex min-h-[100dvh] items-center justify-center relative
    pt-safe  // ou pt-[env(safe-area-inset-top)] si tu préfères l'écrire toi-même
  `}
      style={{ opacity: heroOpacity }}
    >
      <div className="section-container">
        <motion.div
          className="text-center space-y-6 sm:space-y-8"
          layout               // ← très utile ici
          transition={{
            layout: { duration: 0.7, ease: "easeOut" }
          }}
        >
          <AnimatePresence mode="popLayout">
            {showGreeting && (
              <motion.div
                key="greeting"
                initial={{ opacity: 0, y: -40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -70,                // un peu plus de mouvement vers le haut
                  scale: 0.85,           // léger rétrécissement
                  transition: {
                    duration: 0.85,      // ← rallongé pour plus de douceur
                    ease: [0.4, 0, 0.2, 1]   // easeOutQuart – très naturel pour une sortie
                  }
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1] // ressort très doux
                }}
                className="mb-6 sm:mb-6"
              >
                <motion.div
                  className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-light tracking-wide text-highlight/90"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Sparkles className="w-6 h-6" />
                  <span className="font-mono">{typedText}</span>
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Le reste du contenu bénéficie maintenant du layout */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: showGreeting ? 1.2 : 0.5,
              duration: 0.9
            }}
            className="mb-8 sm:mb-10 flex justify-center"
            whileHover={{ scale: 1.06, rotate: 4 }}
          >
            <Avatar className="h-40 w-40 sm:h-48 sm:w-48 border-4 border-highlight/80 shadow-2xl shadow-highlight/20">
              <AvatarImage src="/Menoh.webp" alt="Portrait" />
              <AvatarFallback className="text-5xl font-bold bg-accent text-white">
                MENOH
              </AvatarFallback>
              
            </Avatar>
          </motion.div>

<motion.h1
  className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight"
  initial={{ opacity: 0, y: 35 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: showGreeting ? 1.5 : 0.7,
    duration: 1.1,
    ease: "easeOut"
  }}
>
  <motion.span
    className="text-highlight block sm:inline"
    whileHover={{ scale: 1.04 }}
  >
    {t("itStudent")}
  </motion.span>{" "}
  {/* <motion.span
    className="text-highlight block sm:text-5xl"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: showGreeting ? 1.8 : 0.8, duration: 0.8 }}
  >
    ({t("asrAndGl")})
  </motion.span>{" "} */}

  {/* Ligne horizontale visible uniquement en mobile */}
{/* <motion.hr
  className="sm:hidden border-t-2 border-gray-600 my-2 w-[50%] mx-auto"
  initial={{ width: 0 }}
  animate={{ width: "50%" }}
  transition={{ duration: 0.8, ease: "easeOut" }}
/> */}

  {/* Animation du texte qui descend */}
  <motion.span
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: showGreeting ? 2 : 1,
      duration: 1,
      ease: "easeOut"
    }}
  >
    {t("asrAndGl")}
  </motion.span>
</motion.h1>


          {/* <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: showGreeting ? 1.7 : 0.9,
              duration: 0.9
            }}
          >
            {t("heroDescription")}
          </motion.p> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: showGreeting ? 1.9 : 1.1,
              duration: 0.9
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#about"
              className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-full bg-highlight text-primary hover:bg-highlight/90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("learnMore")}
            </motion.a>

            <motion.a
              href="/CV_Hermenio.pdf"
              download="CV_Hermenio.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-full bg-transparent border-2 border-highlight text-highlight hover:bg-highlight/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              {t("downloadCV")}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Flèche qui descend */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: [0, 14, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 1.2 },
          y: { duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8 text-highlight/80" />
      </motion.div>
    </section>
  );
};

export default Hero;
