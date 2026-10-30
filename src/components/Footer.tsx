
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/hermenio-andriantsoa-431793383/", label: "LinkedIn" },
    // { icon: Facebook, href: "https://web.facebook.com/menoh.pozy", label: "Facebook" },
    { icon: Github, href: "https://github.com/MenoFlow", label: "GitHub" },
  ];

  return (
    <footer className="bg-primary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-gray-400 hover:text-highlight transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
          <motion.p 
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {new Date().getFullYear()} {t("allRightsReserved")}
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
