import { Switch, Route, Router } from "wouter";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Teams from "@/pages/Teams";

function App() {
  return (
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/events" component={Events} />
        <Route path="/teams" component={Teams} />
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
