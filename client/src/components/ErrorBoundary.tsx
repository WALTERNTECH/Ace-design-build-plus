import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Without a boundary, any error thrown during render or inside an effect makes
 * React 18 unmount the entire root — the visitor gets a blank white page and no
 * way out. A marketing site should degrade to something with a route home, not
 * to nothing.
 */
interface Props {
  children: ReactNode;
}
interface State {
  failed: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ace] render error:", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="wrap" style={{ paddingBlock: "88px", maxWidth: 640 }}>
        <span className="eyebrow">Something went wrong</span>
        <h1 className="t-h2" style={{ margin: "18px 0 14px" }}>
          This page failed to load.
        </h1>
        <p className="body" style={{ marginBottom: 26 }}>
          Sorry — that is our fault, not yours. Reload the page, or head back to
          the homepage. If it keeps happening, call us on +254 726 314 608 and we
          will pick it up directly.
        </p>
        <div className="actions">
          {/* Plain anchors: they work even when the router is the thing that broke. */}
          <a href="/" className="btn">
            Back to Homepage
          </a>
          <a href="/contact" className="btn btn-line">
            Contact Us
          </a>
        </div>
      </div>
    );
  }
}
