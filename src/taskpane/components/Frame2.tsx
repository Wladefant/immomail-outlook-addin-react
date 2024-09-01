import React, { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  Button,
  Input,
  Text,
} from "@fluentui/react-components";
import MarkdownCard from "./MarkdownCard";

interface Frame2Props {
  switchToFrame3: () => void;
}

const Frame2: React.FC<Frame2Props> = ({ switchToFrame3 }) => {
  // State for the dynamic values
  const [propertyName, setPropertyName] = useState("Immobilie XXX");
  const [requestsInfo, setRequestsInfo] = useState("XXX der XXX Anfragen treffen auf die Profilbeschreibung zu");
  const [confirmationTemplate, setConfirmationTemplate] = useState("");
  const [rejectionTemplate, setRejectionTemplate] = useState("");

  // Dummy data for the top results
  const topResults = [
    { name: "Name", platform: "Plattform", description: "Kurze Beschreibung" },
    { name: "Name", platform: "Plattform", description: "Kurze Beschreibung" },
    { name: "Name", platform: "Plattform", description: "Kurze Beschreibung" },
  ];

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
        {/* Logo and Title */}
        <Text style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
          ImmoMail
        </Text>

        {/* Property Information */}
        <MarkdownCard markdown={`**${propertyName}**`} />

        <MarkdownCard markdown={requestsInfo} />

        {/* Top Results */}
        <Text style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
          Top XXX Treffer:
        </Text>
        <div style={{ marginBottom: "20px" }}>
          {topResults.map((result, index) => (
            <MarkdownCard key={index} markdown={`**${result.name}**\n\n${result.platform}\n\n${result.description}`} />
          ))}
        </div>

        {/* Templates */}
        <Input
          placeholder="Template für Bestätigungsemail"
          value={confirmationTemplate}
          onChange={(e) => setConfirmationTemplate(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Template für Absageemails"
          value={rejectionTemplate}
          onChange={(e) => setRejectionTemplate(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        {/* Drafts Button */}
        <Button
          appearance="primary"
          style={{ width: "100%" }}
          onClick={switchToFrame3}
        >
          Drafts erstellen
        </Button>
      </div>
    </FluentProvider>
  );
};

export default Frame2;
