import React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Frame1 from "./components/Frame1";
import Frame2 from "./components/Frame2";
import Frame3 from "./components/Frame3";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

/* global document, Office, module, require, HTMLElement */

const title = "Contoso Task Pane Add-in";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState<"Frame1" | "Frame2" | "Frame3">("Frame1");

  const renderFrame = () => {
    switch (currentFrame) {
      case "Frame1":
        return <Frame1 switchToFrame2={() => setCurrentFrame("Frame2")} />;
      case "Frame2":
        return <Frame2 switchToFrame3={() => setCurrentFrame("Frame3")} />;
      case "Frame3":
        return <Frame3 />;
      default:
        return null;
    }
  };

  return (
    <FluentProvider theme={webLightTheme}>
      {renderFrame()}
    </FluentProvider>
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(<App />);
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/Frame1", () => {
    const NextFrame1 = require("./components/Frame1").default;
    root?.render(<App />);
  });
}
