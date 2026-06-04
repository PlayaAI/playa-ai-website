import { Switch, Route, Router } from "wouter";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Teams from "@/pages/Team";
import Work from "@/pages/Work";

function App() {
  return (
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/events" component={Events} />
        <Route path="/team" component={Teams} />
        <Route path="/work" component={Work} />
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
