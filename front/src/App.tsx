import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTES } from "./constants";

import { AppContext } from "./context/AppContext";
//Website pages
import { CustomPage } from "./components/CustomPage/CustomPage";
import { Home } from "./pages/Home/Home";
import { Kids } from "./pages/activities/Kids/Kids";
import { Choirs } from "./pages/activities/Choirs/Choirs";

import { News } from "./pages/News/News";
import { Contacts } from "./pages/Contacts/Contacts";

// CMS pages
import { Login } from "./cms/pages/Login/Login";
import { Register } from "./cms/pages/Register/Register";
import { MainPanel } from "./cms/pages/MainPanel/MainPanel";
import { ACustomPage } from "./cms/pages/ACustomPage/ACustomPage";

//components
import { AHeader } from "./cms/components/AHeader/AHeader";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { MobileNav } from "./components/MobileNav/MobileNav";

import "./App.scss";

function App() {
  const { adsArr, articlesArr, location } = useContext(AppContext);
  const arr = [...adsArr, ...articlesArr];

  return (
    <div className="App">
      <Router>
        <Switch>
          <>
            {location !== "admin" && (
              <>
                <Header />
                <MobileNav />
                <Footer />
              </>
            )}
            {location === "admin" && <AHeader />}

            <Route exact path={ROUTES.home} component={Home} />
            <Route exact path={ROUTES.activitiesKids} component={Kids} />
            <Route exact path={ROUTES.activitiesChoirs} component={Choirs} />
            <Route exact path={ROUTES.news} component={News} />
            <Route exact path={ROUTES.singlepage} component={CustomPage} />
            <Route exact path={ROUTES.contacts} component={Contacts} />
            <Route exact path={ROUTES.login} component={Login} />
            <Route exact path={ROUTES.register} component={Register} />
            <Route exact path={ROUTES.aMainPanel} component={MainPanel} />
            <Route exact path={ROUTES.aCustomPage} component={ACustomPage} />
          </>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
