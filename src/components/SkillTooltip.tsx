import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface SkillTooltipProps {
  /** Élément DOM sur lequel le tooltip est ancré (le bouton du skill). */
  anchor: HTMLElement | null;
  /** Visibilité du tooltip. */
  open: boolean;
  /** Appelé sur Échap, clic extérieur ou scroll lointain. */
  onClose: () => void;
  /** Titre affiché (ex: "React"). */
  title: string;
  /** Niveau de 0 à `max`. */
  level: number;
  /** Valeur maximale de l'échelle (défaut : 10). */
  max?: number;
  /** Libellé accessible/visible devant le score (ex: "Niveau"). */
  levelLabel?: string;
  /** Id pour aria-controls / aria-describedby. */
  id: string;
  /** Contenu additionnel optionnel sous la barre (description, etc.). */
  children?: ReactNode;
}

type Placement = "top" | "bottom";

interface Position {
  top: number;
  left: number;
  placement: Placement;
  arrowLeft: number;
}

/* -------------------------------------------------------------------------- */
/*  Hook de positionnement (réutilisable pour d'autres popovers)              */
/* -------------------------------------------------------------------------- */

const VIEWPORT_MARGIN = 8;
const GAP = 10;
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(v, max));

export function useAnchoredPosition(
  anchor: HTMLElement | null,
  open: boolean,
  panelRef: RefObject<HTMLElement>
) {
  const [position, setPosition] = useState<Position | null>(null);

  useLayoutEffect(() => {
    if (!open || !anchor) {
      setPosition(null);
      return;
    }

    const update = () => {
      const a = anchor.getBoundingClientRect();
      const p = panelRef.current?.getBoundingClientRect();
      const width = p?.width ?? 224;
      const height = p?.height ?? 80;

      // Centré sur l'ancre, mais jamais hors de l'écran.
      const left = clamp(
        a.left + a.width / 2 - width / 2,
        VIEWPORT_MARGIN,
        window.innerWidth - width - VIEWPORT_MARGIN
      );

      // Au-dessus par défaut ; en dessous s'il n'y a pas la place.
      const fitsAbove = a.top >= height + GAP + VIEWPORT_MARGIN;
      const placement: Placement = fitsAbove ? "top" : "bottom";
      const top = fitsAbove ? a.top - height - GAP : a.bottom + GAP;

      // La flèche reste alignée sur l'ancre même si le panneau est décalé.
      const arrowLeft = clamp(a.left + a.width / 2 - left, 14, width - 14);

      setPosition({ top, left, placement, arrowLeft });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, anchor, panelRef]);

  return position;
}

/* -------------------------------------------------------------------------- */
/*  Barre de niveau                                                           */
/* -------------------------------------------------------------------------- */

const LevelBar = ({
  level,
  max,
  label,
  animate,
}: {
  level: number;
  max: number;
  label: string;
  animate: boolean;
}) => (
  <div
    role="meter"
    aria-label={label}
    aria-valuemin={0}
    aria-valuemax={max}
    aria-valuenow={level}
    className="flex gap-1"
  >
    {Array.from({ length: max }, (_, i) => (
      <motion.span
        key={i}
        className={`h-2 flex-1 rounded-full origin-left ${
          i < level ? "bg-highlight" : "bg-white/10"
        }`}
        initial={animate ? { scaleX: 0 } : false}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.25, delay: animate ? i * 0.04 : 0 }}
      />
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Panneau                                                                   */
/* -------------------------------------------------------------------------- */

const Panel = ({
  anchor,
  onClose,
  title,
  level,
  max = 10,
  levelLabel = "Level",
  id,
  children,
}: Omit<SkillTooltipProps, "open">) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const position = useAnchoredPosition(anchor, true, panelRef);
  const safeLevel = clamp(Math.round(level), 0, max);

  // Fermeture : Échap + clic/tap extérieur.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        anchor?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      // Le clic sur l'ancre est géré par le bouton (toggle).
      if (panelRef.current?.contains(target) || anchor?.contains(target)) return;
      onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [anchor, onClose]);

  const isTop = position?.placement !== "bottom";

  return (
    <motion.div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-label={`${title} – ${levelLabel} ${safeLevel}/${max}`}
      style={{
        position: "fixed",
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        // Premier rendu invisible : on mesure avant d'afficher (pas de saut).
        visibility: position ? "visible" : "hidden",
      }}
      initial={reduceMotion ? false : { opacity: 0, y: isTop ? 6 : -6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="z-50 w-56 max-w-[calc(100vw-16px)] rounded-xl border border-white/10 bg-primary p-4 shadow-xl"
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span className="font-semibold text-white">{title}</span>
        <span className="text-sm tabular-nums text-highlight">
          {safeLevel}
          <span className="text-gray-400">/{max}</span>
        </span>
      </div>

      <LevelBar
        level={safeLevel}
        max={max}
        label={`${levelLabel} ${title}`}
        animate={!reduceMotion}
      />

      {children && <div className="mt-3 text-sm text-gray-300">{children}</div>}

      {/* Flèche */}
      <span
        aria-hidden="true"
        style={{ left: (position?.arrowLeft ?? 0) - 6 }}
        className={`absolute h-3 w-3 rotate-45 bg-primary ${
          isTop
            ? "-bottom-1.5 border-b border-r border-white/10"
            : "-top-1.5 border-l border-t border-white/10"
        }`}
      />
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Export                                                                    */
/* -------------------------------------------------------------------------- */

export const SkillTooltip = (props: SkillTooltipProps) => {
  if (typeof document === "undefined") return null; // SSR safe (Next.js)

  const { open, ...rest } = props;
  return createPortal(
    <AnimatePresence>{open && <Panel key={props.id} {...rest} />}</AnimatePresence>,
    document.body
  );
};

export default SkillTooltip;
