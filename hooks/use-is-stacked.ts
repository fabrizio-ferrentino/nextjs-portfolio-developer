import { useEffect, useState } from "react";

export function useIsStacked() {
  const [isStacked, setIsStacked] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleChange = () => setIsStacked(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isStacked;
}
