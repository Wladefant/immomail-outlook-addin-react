import * as React from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import Frame1 from "./components/Frame1";
import Frame2 from "./components/Frame2";
import Frame3 from "./components/Frame3";

/* global document, Office, module, require, HTMLElement */

const title = "Contoso Task Pane Add-in";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = React.useState("Frame1");

  const navigateToFrame = (frame: string) => {
    setCurrentFrame(frame);
  };

  return (
    <FluentProvider theme={webLightTheme}>
      {currentFrame === "Frame1" && <Frame1 navigateToFrame={navigateToFrame} />}
      {currentFrame === "Frame2" && <Frame2 navigateToFrame={navigateToFrame} />}
      {currentFrame === "Frame3" && <Frame3 navigateToFrame={navigateToFrame} />}
    </FluentProvider>
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(<App />);
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root?.render(NextApp);
  });
}
