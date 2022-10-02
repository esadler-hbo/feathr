/// <reference types="react-scripts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      REACT_APP_AUTH_PROVIDER: "msal" | "okta";
      REACT_APP_AZURE_CLIENT_ID: string;
      REACT_APP_AZURE_TENANT_ID: string;
      REACT_APP_API_ENDPOINT: string;
      REACT_APP_ENABLE_RBAC: boolean;
      REACT_APP_OKTA_ISSUER: string
      REACT_APP_OKTA_CLIENT_ID: string
    }
  }

  interface Window {
    environment: EnvironmentConfig;
  }

  interface EnvironmentConfig {
    authProvider: string;
    azureClientId: string;
    azureTenantId: string;
    enableRBAC: boolean;
    oktaIssuer: string;
    oktaClientId: string;
  }
}

export {};
