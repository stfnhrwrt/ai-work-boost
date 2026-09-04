import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the scroll position to the top on every route change.
 * Hash links (e.g. /copilot-microsoft-365/word#workflow-id) are left alone
 * so the target section can be scrolled into view by the page itself.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};
