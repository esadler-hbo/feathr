import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { toRelativeUrl } from '@okta/okta-auth-js';
import Header from "./components/header/header";
import SideMenu from "./components/sidemenu/siteMenu";
import Features from "./pages/feature/features";
import NewFeature from "./pages/feature/newFeature";
import FeatureDetails from "./pages/feature/featureDetails";
import DataSources from "./pages/dataSource/dataSources";
import Jobs from "./pages/jobs/jobs";
import Monitoring from "./pages/monitoring/monitoring";
import LineageGraph from "./pages/feature/lineageGraph";
import Management from "./pages/management/management";
import ResponseErrors from "./pages/responseErrors/responseErrors";
import RoleManagement from "./pages/management/roleManagement";
import { RequiredAuth } from "./components/okta/SecureRoute";
import Loading from './components/okta/Loading';

import { getMsalConfig, getOktaConfig } from "./utils/utils";

const queryClient = new QueryClient();

const authProvider =
    window.environment?.authProvider ?? process.env.REACT_APP_AUTH_PROVIDER;
const App = (() => {

  if (authProvider === "msal") {
    const msalClient = getMsalConfig();
    return () => {
      return (
          <MsalProvider instance={msalClient}>
            <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                  <Layout style={{minHeight: "100vh"}}>
                    <SideMenu/>
                    <Layout>
                      <Header/>
                      <Routes>
                        <Route path="/dataSources" element={<DataSources/>}/>
                        <Route path="/features" element={<Features/>}/>
                        <Route path="/new-feature" element={<NewFeature/>}/>
                        <Route
                            path="/projects/:project/features/:featureId"
                            element={<FeatureDetails/>}
                        />
                        <Route
                            path="/projects/:project/lineage"
                            element={<LineageGraph/>}
                        />
                        <Route path="/jobs" element={<Jobs/>}/>
                        <Route path="/monitoring" element={<Monitoring/>}/>
                        <Route path="/management" element={<Management/>}/>
                        <Route path="/role-management" element={<RoleManagement/>}/>
                        <Route
                            path="/responseErrors/:status/:detail"
                            element={<ResponseErrors/>}
                        />
                      </Routes>
                    </Layout>
                  </Layout>
                </BrowserRouter>
              </QueryClientProvider>
            </MsalAuthenticationTemplate>
          </MsalProvider>
      );
    };
  } else if (authProvider === "okta") {
    const oktaAuth = getOktaConfig();

    return () => {
      const navigate = useNavigate();

      const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {

        navigate(toRelativeUrl(originalUri || '/', window.location.origin));
      };

      return (
              <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
                <Layout style={{minHeight: "100vh"}}>
                  <SideMenu/>
                  <Layout>
                    <Header/>
                    <Routes>
                    <Route path='/' element={<RequiredAuth />}>
                      <Route path="dataSources" element={<DataSources/>}/>
                      <Route path="features" element={<Features/>}/>
                      <Route path="new-feature" element={<NewFeature/>}/>
                      <Route
                          path="projects/:project/features/:featureId"
                          element={<FeatureDetails/>}
                      />
                      <Route
                          path="projects/:project/lineage"
                          element={<LineageGraph/>}
                      />
                      <Route path="jobs" element={<Jobs/>}/>
                      <Route path="monitoring" element={<Monitoring/>}/>
                      <Route path="management" element={<Management/>}/>
                      <Route path="role-management" element={<RoleManagement/>}/>
                      <Route
                          path="responseErrors/:status/:detail"
                          element={<ResponseErrors/>}
                      />
                    </Route>
                    <Route path='login/callback' element={<LoginCallback loadingElement={<Loading />} />} />
                  </Routes>
                  </Layout>
                </Layout>
      </Security>
      );
    };
  } else {
    throw Error(`Authentication Provider has to be msal or okta. Found ${authProvider}`)
  };
})();


export default App;
