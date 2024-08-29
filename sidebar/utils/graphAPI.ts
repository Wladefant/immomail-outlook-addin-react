import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import * as Sentry from "@sentry/browser";
import { setPlatformSetting, getPlatformSetting } from "./officeMisc";

// Configuration for Azure MSAL
export const msalConfig = {
  auth: {
    clientId: process.env.MS_GRAPH_CLIENT_ID,
    authority: "https://login.microsoftonline.com/common",
    redirectUri: process.env.MS_GRAPH_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

// @ts-ignore
export const msalInstance = new PublicClientApplication(msalConfig);

/*
 * Sign in with Microsoft Graph API.
 */
export const signIn = async () => {
  try {
    const loginResponse = await msalInstance.loginPopup({
      scopes: ["User.Read", "Mail.ReadWrite"],
    });
    return loginResponse.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["User.Read", "Mail.ReadWrite"],
      });
      return loginResponse.accessToken;
    } else {
      Sentry.captureException(error);
      throw error;
    }
  }
};

/*
 * Get Graph API token silently.
 */
export const getGrahpAPITokenSilently = async () => {
  try {
    const account = msalInstance.getAllAccounts()[0];
    const tokenResponse = await msalInstance.acquireTokenSilent({
      scopes: ["User.Read", "Mail.ReadWrite"],
      account: account,
    });
    return tokenResponse.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      return await signIn();
    } else {
      Sentry.captureException(error);
      throw error;
    }
  }
};

/*
 * Create a new mail folder using the Graph API.
 */
export const createMailFolder = async (folderName: string) => {
  const graphAPIToken = await getGrahpAPITokenSilently();
  if (graphAPIToken) {
    const response = await fetch("https://graph.microsoft.com/v1.0/me/mailFolders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${graphAPIToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: folderName,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create mail folder");
    }

    const folder = await response.json();
    return folder;
  } else {
    throw new Error("Failed to acquire Graph API token");
  }
};

/*
 * Fetch the newest message from a conversation.
 */
export const fetchNewestMessage = async (token: string, conversationId: string) => {
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/me/messages?$filter=conversationId eq '${conversationId}'&$orderby=receivedDateTime desc&$top=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch newest message");
  }

  const data = await response.json();
  return data.value[0];
};

/*
 * Fetch a message by its ID.
 */
export const fetchMessageById = async (token: string, itemId: string) => {
  const response = await fetch(`https://graph.microsoft.com/v1.0/me/messages/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch message by ID");
  }

  const message = await response.json();
  return message;
};

/*
 * Get the newest message from the Graph API by conversation ID.
 */
export const getNewestMessageFromGraphAPI = async (conversationId: string): Promise<string | null> => {
  const graphAPIToken = await getGrahpAPITokenSilently();
  if (graphAPIToken) {
    const latestMessage = await fetchNewestMessage(graphAPIToken, conversationId);
    return latestMessage?.body?.content ?? "";
  } else {
    return null;
  }
};

/*
 * Get the message from the Graph API by item ID.
 */
export const getMessageFromGraphAPIByItemId = async (itemId: string): Promise<string | null> => {
  const graphAPIToken = await getGrahpAPITokenSilently();
  if (graphAPIToken) {
    const message = await fetchMessageById(graphAPIToken, itemId);
    return message?.body?.content ?? "";
  } else {
    return null;
  }
};
