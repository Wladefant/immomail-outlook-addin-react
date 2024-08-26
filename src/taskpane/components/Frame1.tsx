import React, { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  Button,
  Input,
  Card,
} from "@fluentui/react-components";
import { Text } from "@fluentui/react";

const Frame1: React.FC = () => {
  // State to hold dynamic values
  const [location, setLocation] = useState("xxx");
  const [requests, setRequests] = useState("XXX");
  const [customerProfile, setCustomerProfile] = useState("Beschreibung vom Kundenprofil");
  const [requestInput, setRequestInput] = useState("");

  return (  
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
        {/* Logo and Title */}
        <Text style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
          ImmoMail
        </Text>

        {/* Property Information */}
        <Card style={{ marginBottom: "20px", padding: "20px" }}>
          <Text style={{ fontSize: "16px" }}>
            Zu der folgenden Immobilie
          </Text>
          <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
            Ort: {location}
          </Text>
          <Text style={{ fontSize: "16px", marginTop: "10px" }}>
            wurden {requests} Anfragen gefunden.
          </Text>
        </Card>

        {/* Customer Profile Description */}
        <Card style={{ marginBottom: "20px", padding: "20px" }}>
          <Text style={{ fontSize: "16px" }}>{customerProfile}</Text>
        </Card>

        {/* Input for the number of requests to analyze */}
        <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
          Suche die besten
        </Text>
        <Input
          placeholder="XXX"
          value={requestInput}
          onChange={(e) => setRequestInput(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
          Anfragen raus
        </Text>

        {/* Analyze Button */}
        <Button
          appearance="primary"
          style={{ width: "100%" }}
          onClick={() => console.log("Analyse durchführen clicked")}
        >
          Analyse durchführen
        </Button>
      </div>
    </FluentProvider>
  );
};

export default Frame1;
