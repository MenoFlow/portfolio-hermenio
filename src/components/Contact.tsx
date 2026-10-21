
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();
  
  useScrollAnimation(); // Pour animer les sections au scroll

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de l'envoi du formulaire
    console.log("Form submitted:", formData);
    
    // Afficher le toast de confirmation
    toast({
      title: t("messageSent"),
      description: new Date().toLocaleTimeString(),
    });
    
    // Réinitialiser le formulaire et fermer le dialogue
    setFormData({ name: "", email: "", message: "" });
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Animations pour les éléments
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="bg-secondary fade-in-section">
      <div className="section-container">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            {t("haveProject")}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t("getInTouch")}
          </motion.p>
          
          <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger asChild>
              <motion.button
                className="px-6 py-3 text-lg font-medium rounded-full bg-highlight text-primary hover:bg-highlight/90 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={true}
              >
                {t("contactMe")}
              </motion.button>
            </DialogTrigger> */}
            
            <AnimatePresence>
              {open && (
                <DialogContent className="bg-secondary border-accent sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-highlight text-2xl">{t("contactMe")}</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      {t("getInTouch")}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t("name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-primary/30 border border-white/10 focus:border-highlight focus:ring-1 focus:ring-highlight outline-none transition-colors"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-primary/30 border border-white/10 focus:border-highlight focus:ring-1 focus:ring-highlight outline-none transition-colors"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {t("message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg bg-primary/30 border border-white/10 focus:border-highlight focus:ring-1 focus:ring-highlight outline-none transition-colors"
                      />
                    </motion.div>
                    
                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-highlight text-primary hover:bg-highlight/90 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-4 h-4" />
                      {t("send")}
                    </motion.button>
                  </form>
                </DialogContent>
              )}
            </AnimatePresence>
          </Dialog>
        </motion.div>
        
        <motion.div 
          className="glass-card p-8 rounded-2xl fade-in-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-6 text-center"
            variants={itemVariants}
          >
            {t("stayConnected")}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="flex flex-col items-center text-center p-4"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="p-4 rounded-full bg-accent mb-4">
                <Mail className="text-highlight h-6 w-6" />
              </div>
              <a
                href="mailto:andriantsoahermenio@gmail.com?subject=Prise%20de%20contact"
                className="transition-colors hover:text-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
              >
                andriantsoahermenio@gmail.com
              </a>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-4"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="p-4 rounded-full bg-accent mb-4">
                <Phone className="text-highlight h-6 w-6" />
              </div>
              <span>+261 34 21 799 97</span>
              {/* <span>+261 32 40 799 03</span>
              <span>(Whatsapp)</span> */}
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-4"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="p-4 rounded-full bg-accent mb-4">
                <MapPin className="text-highlight h-6 w-6" />
              </div>
              <span>Madagascar</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
