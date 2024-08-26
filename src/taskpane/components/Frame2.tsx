import React, { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  Button,
  Input,
  Card,
  Text,
} from "@fluentui/react-components";

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
        <Card style={{ marginBottom: "10px", padding: "10px" }}>
          <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
            {propertyName}
          </Text>
        </Card>

        <Card style={{ marginBottom: "20px", padding: "10px" }}>
          <Text style={{ fontSize: "16px" }}>
            {requestsInfo}
          </Text>
        </Card>

        {/* Top Results */}
        <Text style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
          Top XXX Treffer:
        </Text>
        <div style={{ marginBottom: "20px" }}>
          {topResults.map((result, index) => (
            <Card key={index} style={{ marginBottom: "10px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Text style={{ fontSize: "16px", fontWeight: "bold" }}>{result.name}</Text>
                <Text style={{ fontSize: "14px" }}>{result.platform}</Text>
                <Text style={{ fontSize: "12px" }}>{result.description}</Text>
              </div>
              <Button appearance="primary" onClick={() => console.log("Details clicked for", result.name)}>
                Details
              </Button>
            </Card>
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
