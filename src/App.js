import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react";
import Home from "./Home";
import CatFacts from "./CatFacts";

function App() {
  useEffect(() => {
    const navigationWidgetScript = document.createElement("script");
    navigationWidgetScript.setAttribute(
      "src",
      "//nav.porsche.com/00BC524/porsche-navigation.js"
    );

    document.body.appendChild(navigationWidgetScript);
  }, []);

  return (
    <PorscheDesignSystemProvider>
      <phn-header locale="de-DE" env="preview" page-name="home" />

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cat-facts">CatFacts</Link>
        </li>
      </ul>

      <hr />

      <Routes>
        <Route exact path="/" element={<Home name="Porsche" />} />
        <Route path="/cat-facts" element={<CatFacts />} />
      </Routes>
    </PorscheDesignSystemProvider>
  );
}

export default App;
