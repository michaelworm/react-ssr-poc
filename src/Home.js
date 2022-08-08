import React, { Fragment, useEffect, useRef } from "react";

function Home(props) {
  useEffect(() => {
    const paymentWidgetScript = document.createElement("script");
    paymentWidgetScript.setAttribute(
      "src",
      "https://pay.porsche-preview.com/widget/v3/widget-3.0.js"
    );

    document.body.appendChild(paymentWidgetScript);
  }, []);

  const paymentWidgetRef = useRef();

  useEffect(() => {
    const { current } = paymentWidgetRef;

    current.addEventListener("paymentMethodSelectedHandler", (event) => {
      console.log("Payment Method was selected!");
      // Payment Method id
      console.log(event.detail);
    });
  }, [paymentWidgetRef]);

  return (
    <Fragment>
      <h1>Welcome home {props.name}!</h1>

      <payment-widget
        environment="test"
        locale="de-DE"
        countrycode="de"
        apikey="AxPnGVZisyGmQrmPgMV2Ccl6oruBz0SB"
        oauthtoken="0002q0MXVPMVmytxBOVJuRyLzDVb"
        redirecturl="https://preview-connect-store.porsche.com/de/de/checkout?vin=BP0ZZZY1ZJSA32542"
        ref={paymentWidgetRef}
      />
    </Fragment>
  );
}

export default Home;
