import React, { Fragment, useEffect, useState } from "react";

function CatFacts() {
  const [fact, setFact] = useState("Loading ...");

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((result) => {
        setFact(result.fact);
      });
  }, []);

  return (
    <Fragment>
      <h1>Cat facts</h1>
      <strong>{fact}</strong>
    </Fragment>
  );
}

export default CatFacts;
