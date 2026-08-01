import { Switch, Route, Router } from "wouter";
import { MotionConfig } from "framer-motion";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Teams from "@/pages/Team";
import Work from "@/pages/Work";
import PrivacyToolkit from "@/pages/PrivacyToolkit";
import PrivacyRedirect from "@/pages/PrivacyRedirect";
import EELPPage from "@/pages/EELP";
import LivingTrustFramework from "@/pages/LivingTrustFramework";
import ManifestoPage from "@/pages/Manifesto";
import GetInvolved from "@/pages/GetInvolved";
import HomeClassic from "@/pages/HomeClassic";
import EventsClassic from "@/pages/EventsClassic";
import TeamClassic from "@/pages/TeamClassic";
import WorkClassic from "@/pages/WorkClassic";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import { usePageMeta } from "@/hooks/usePageMeta";

function PageMetaUpdater() {
  usePageMeta();
  return null;
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <PageMetaUpdater />
        <Switch>
        <Route path="/" component={Home} />
        <Route path="/events" component={Events} />
        <Route path="/about" component={About} />
        <Route path="/team" component={Teams} />
        <Route path="/work" component={Work} />
        <Route path="/privacy-toolkit" component={PrivacyToolkit} />
        <Route path="/privacy" component={PrivacyRedirect} />
        <Route path="/eelp" component={EELPPage} />
        <Route path="/living-trust-framework" component={LivingTrustFramework} />
        <Route path="/playa-ai-living-trust-framework" component={LivingTrustFramework} />
        <Route path="/manifesto" component={ManifestoPage} />
        <Route path="/get-involved" component={GetInvolved} />
        <Route path="/classic" component={HomeClassic} />
        <Route path="/classic/events" component={EventsClassic} />
        <Route path="/classic/team" component={TeamClassic} />
        <Route path="/classic/work" component={WorkClassic} />
        <Route component={NotFound} />
        </Switch>
      </Router>
    </MotionConfig>
  );
}

export default App;
