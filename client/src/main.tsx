import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

/**
 * Take scroll restoration away from the browser.
 *
 * Going home is a full page load (the home links are native anchors, so they
 * cannot depend on the router). On a full load the browser restores the scroll
 * offset from the page you came from — and it does that *after* React has
 * mounted and scrolled to the top, so it wins the race. Arriving at the
 * homepage 4,000px down puts you on a footer identical to the one you just
 * left, which reads as "the link reloaded but went nowhere". In-app browsers
 * such as the WhatsApp and Instagram webviews are the most aggressive about it.
 *
 * With restoration set to manual, every navigation starts where it should.
 */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
