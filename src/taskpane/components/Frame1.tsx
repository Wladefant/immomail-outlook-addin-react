import React, { useState, useEffect } from "react";
import {
  FluentProvider,
  webLightTheme,
  Button,
  Input,
  Card,
} from "@fluentui/react-components";
import { Text } from "@fluentui/react";
import { Configuration, OpenAIApi } from "openai";
import OPENAI_API_KEY from "../../config/openaiKey";

interface Frame1Props {
  switchToFrame2: () => void;
}

const Frame1: React.FC<Frame1Props> = ({ switchToFrame2 }) => {
  // State to hold dynamic values
  const [location, setLocation] = useState("xxx");
  const [requests, setRequests] = useState("XXX");
  const [customerProfile, setCustomerProfile] = useState("");
  const [requestInput, setRequestInput] = useState("");

  const generateSummary = async (emailContent: string) => {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4o", // or 'gpt-4' if you have access
        messages: [
          {
            role: "system",
            content: "Du bist ein hilfreicher Assistent, der E-Mails zusammenfasst und Mieter anhand ihres Profils bewertet.",
          },
          {
            role: "user",
            content: `Gib eine kurze Zusammenfassung zu dem Mieter auf Deutsch  und bewerte den Mieter auf einer Skala von 1 bis 10, wobei 10 der wünschenswerteste Mieter ist. Gib die Beschreibung in strukturierter Form an: ${emailContent}`,
          },
        ],
        max_tokens: 150,
      });

      if (response.data.choices && response.data.choices[0].message) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      return "Error generating summary.";
    }
  };

  useEffect(() => {
    const fetchEmailContent = async () => {
      if (Office.context.mailbox.item) {
        Office.context.mailbox.item.body.getAsync("text", (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            generateSummary(result.value).then((summary) => {
              setCustomerProfile(summary);
            });
          } else {
            console.error("Error fetching email content:", result.error);
          }
        });
      }
    };

    fetchEmailContent();
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
        {/* Logo and Title */}
        <Text
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          ImmoMail
        </Text>

        {/* Property Information */}
        <Card style={{ marginBottom: "20px", padding: "20px" }}>
          <Text style={{ fontSize: "16px" }}>Zu der folgenden Immobilie</Text>
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
          onClick={switchToFrame2}
        >
          Analyse durchführen
        </Button>
      </div>
    </FluentProvider>
  );
};

export default Frame1;
