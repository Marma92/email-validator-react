import React from "react";
import { render } from "react-dom";
import providers from './data/providers.json';

import EmailAutocomplete from "./components/EmailAutocomplete/EmailAutocomplete";

require("./styles.css");

function App() {
  return (
    <div>
      <h1>React Email Autocomplete</h1>
      <h2>Type your email address here:</h2>
      <EmailAutocomplete
        suggestions={providers}
      />
    </div>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<App />, container);
