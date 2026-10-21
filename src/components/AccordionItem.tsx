import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface AccordionItemProps {
  /** Titre toujours visible : c'est lui qui donne envie de déplier. */
  title: ReactNode;
  /** Contenu masqué tant que l'item est replié. */
  children: ReactNode;
  /** Alignement du titre / chevron (utile pour les cartes alignées à droite). */
  align?: "left" | "right";
  /** Ouvert au premier rendu (défaut : false). */
  defaultOpen?: boolean;
  /** Niveau de titre sémantique (défaut : h4). */
  as?: "h3" | "h4" | "h5";
  className?: string;
}

const AccordionItem = ({
  title,
  children,
  align = "left",
  defaultOpen = false,
  as: Heading = "h4",
  className = "",
}: AccordionItemProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const buttonId = `${uid}-trigger`;
  const panelId = `${uid}-panel`;

  return (
    <div className={className}>
      <Heading className="font-semibold text-lg text-white">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={`group flex w-full items-center gap-3 rounded-md py-1 cursor-pointer
            focus:outline-none focus-visible:ring-2 focus-visible:ring-highlight
            ${align === "right" ? "flex-row-reverse text-right" : "text-left"}`}
        >
          <span className="flex-1 transition-colors group-hover:text-highlight">
            {title}
          </span>
          <span
            aria-hidden="true"
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors
              ${open
                ? "border-highlight bg-highlight/20 text-highlight"
                : "border-white/15 text-gray-400 group-hover:border-highlight/60 group-hover:text-highlight"}`}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>
      </Heading>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
