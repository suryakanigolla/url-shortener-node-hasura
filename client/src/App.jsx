import React from "react";
import "./App.css";

function App() {
  const [url, setUrl] = React.useState("");
  const [customSlug, setCustomSlug] = React.useState("");
  const [shortenedLink, setShortenedLink] = React.useState("");

  const handleReset = () => {
    setUrl("");
    setCustomSlug("");
  };

  return (
    <div className="App">
      <h1>Simple Url Shortener</h1>
      <div className="card">
        <div className="card__group">
          <h2>Enter your url to shorten</h2>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="card__group">
          <h2>Enter a custom slug (or leave empty to generate one)</h2>
          <input
            type="text"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
          />
        </div>
        <div>
          <button
            className="button button_secondary mr-2"
            onClick={() => handleReset()}
          >
            Reset
          </button>
          <button className="button button_primary">Submit</button>
        </div>
      </div>
      {shortenedLink.length && (
        <div className="card">
          <h2>Here you go 🎊</h2>
          <p></p>
        </div>
      )}
    </div>
  );
}

export default App;
