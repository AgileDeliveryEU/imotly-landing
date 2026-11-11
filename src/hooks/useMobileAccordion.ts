import { useEffect, useState } from "react";

export function useMobileAccordion() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => { setIsMobile(media.matches); setExpandedIndex(null); };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const toggle = (index: number) => setExpandedIndex(current => current === index ? null : index);
  return { isMobile, expandedIndex, toggle };
}
