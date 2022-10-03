import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { OktaAuth } from '@okta/okta-auth-js';

export const getMsalConfig = () => {
  // Use runtime environment variables if found in env-config.js, otherwise fallback to
  // env settings defined in build time.
  // Note: env-config.js is generated on the flying during contain app starts.
  const clientId =
    window.environment?.azureClientId ?? process.env.REACT_APP_AZURE_CLIENT_ID;
  const tenantId =
    window.environment?.azureTenantId ?? process.env.REACT_APP_AZURE_TENANT_ID;
  const authority = `https://login.microsoftonline.com/${tenantId}`;
  const msalConfig: Configuration = {
    auth: {
      clientId: clientId,
      authority: authority,
      redirectUri: window.location.origin,
    },
  };
  console.log("clientId = ", clientId);
  console.log("authority = ", authority);

  return new PublicClientApplication(msalConfig);
};


export const getOktaConfig = () => {
  const oktaIssuer = window.environment?.oktaIssuer ?? process.env.REACT_APP_OKTA_ISSUER;
  const clientId = window.environment?.oktaClientId ?? process.env.REACT_APP_OKTA_CLIENT_ID;

  console.log("clientId = ", clientId);
  console.log("oktaIssuer = ", oktaIssuer);

  const oktaConfig = new OktaAuth({
    issuer: oktaIssuer,
    clientId: clientId,
    redirectUri: window.location.origin + '/login/callback'
  });

  return oktaConfig
}

export const enum FeatureType {
  AllNodes = "all_nodes",
  Source = "feathr_source_v1",
  Anchor = "feathr_anchor_v1",
  AnchorFeature = "feathr_anchor_feature_v1",
  DerivedFeature = "feathr_derived_feature_v1",
}

export const isFeature = (featureType: string) => {
  return (
    featureType === FeatureType.AnchorFeature ||
    featureType === FeatureType.DerivedFeature
  );
};
