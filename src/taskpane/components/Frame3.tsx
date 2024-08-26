import * as React from "react";
import { FluentProvider, webLightTheme, Card, Text } from "@fluentui/react-components";

const Frame3: React.FC = () => {
  const propertyName = "XXX (Immobilienname)"; // Replace with dynamic value
  const numberOfEmails = "XXX"; // Replace with dynamic value
  const savedTime = "XXX"; // Replace with dynamic value

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
        {/* Logo and Title */}
        <Text style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
          ImmoMail
        </Text>

        {/* Congratulations Message */}
        <Text style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
          Glückwunsch!
        </Text>

        <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
          ImmoMail hat dir die {numberOfEmails} Emails für die {numberOfEmails} besten Bewerber in deinen Drafts unter {propertyName} abgelegt.
        </Text>

        <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
          Für alle abgelehnten Bewerber haben wir dir die Drafts in {propertyName} abgelegt.
        </Text>

        <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
          Überprüfe sie und schicke sie dann ab!
        </Text>

        <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
          Du hast dir ca. {savedTime} Minuten Arbeitszeit gespart!
        </Text>
      </div>
    </FluentProvider>
  );
};

export default Frame3;
