import * as React from "react";
import { createRoot } from "react-dom/client";
import Frame1 from "./components/Frame1";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

/* global document, Office, module, require, HTMLElement */

const title = "Contoso Task Pane Add-in";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <FluentProvider theme={webLightTheme}>
      <Frame1 />
    </FluentProvider>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/Frame1", () => {
    const NextFrame1 = require("./components/Frame1").default;
    root?.render(NextFrame1);
  });
}
