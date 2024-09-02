import React, { useState, useEffect } from "react";
import {
  FluentProvider,
  webLightTheme,
  Button,
  Input,
} from "@fluentui/react-components";
import { Text } from "@fluentui/react";
import { Configuration, OpenAIApi } from "openai";
import OPENAI_API_KEY from "../../config/openaiKey";
import MarkdownCard from "./MarkdownCard";
import { CosmosClient } from "@azure/cosmos"; // Import CosmosClient
import config from "../../config/cosmosconfig"; // Import CosmosDB configuration

interface Frame1Props {
  switchToFrame2: () => void;
}

const Frame1: React.FC<Frame1Props> = ({ switchToFrame2 }) => {
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
            content: `Gib eine kurze Zusammenfassung zu dem Mieter auf Deutsch und bewerte den Mieter auf einer Skala von 1 bis 10, wobei 10 der wünschenswerteste Mieter ist. Gib die Beschreibung in strukturierter Form an: ${emailContent}`,
          },
        ],
        max_tokens: 300,
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

  const determineLocation = async (emailContent: string) => {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Du bist ein hilfreicher Assistent, der den Ort aus E-Mail-Inhalten extrahiert.",
          },
          {
            role: "user",
            content: `Bestimme den Ort aus dem folgenden E-Mail-Inhalt und gib als output nur die adresse wieder, falls nicht gefunden "nicht gefunden": ${emailContent}`,
          },
        ],
        max_tokens: 50,
      });

      if (response.data.choices && response.data.choices[0].message) {
        const determinedLocation = response.data.choices[0].message.content.trim();
        setLocation(determinedLocation);
        await saveLocationToCosmosDB(determinedLocation); // Save location to CosmosDB
        return determinedLocation;
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error determining location:", error);
      return "Error determining location.";
    }
  };

  // Function to save location to CosmosDB
  const saveLocationToCosmosDB = async (location: string) => {
    if (!location || location === "nicht gefunden") return;
  
    try {
      const itemId = Office.context.mailbox.item.itemId; // Get the email ID
  
      // Send a POST request to your server
      const response = await fetch('http://localhost:5000/save-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, emailId: itemId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save location to CosmosDB');
      }
  
      const data = await response.json();
      console.log('Location saved successfully:', data);
    } catch (error) {
      console.error('Error saving location to server:', error);
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
            determineLocation(result.value).then((location) => {
              setLocation(location);
            });
          } else {
            console.error("Error fetching email content:", result.error);
          }
        });
      }
    };

    fetchEmailContent();

    const itemChangedHandler = () => {
      fetchEmailContent();
    };

    Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, itemChangedHandler);

    return () => {
      Office.context.mailbox.removeHandlerAsync(Office.EventType.ItemChanged, itemChangedHandler);
    };
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
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

        <MarkdownCard markdown={`Zu der folgenden Immobilie\n\n**Ort:** ${location}\n\nwurden **${requests}** Anfragen gefunden.`} />

        <MarkdownCard markdown={customerProfile} />

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
