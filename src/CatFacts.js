import React, { Fragment } from "react";
import { useStore } from "react-redux";

function CatFacts() {
  const store = useStore();

  return (
    <Fragment>
      <h1>Cat facts</h1>
      <strong>{store.getState().catFacts.fact}</strong>
    </Fragment>
  );
}

export default CatFacts;
