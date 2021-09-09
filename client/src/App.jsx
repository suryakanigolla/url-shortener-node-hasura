import React from "react";

import { getUrl, shortenUrl, BASE_URL } from "./utils/api";

import "./App.css";

function App() {
  const [url, setUrl] = React.useState("");
  const [customSlug, setCustomSlug] = React.useState("");
  const [shortenedLink, setShortenedLink] = React.useState("");

  const handleReset = () => {
    setUrl("");
    setCustomSlug("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        url,
        slug: customSlug,
      };

      const submitResponse = await shortenUrl(formData);
      if (submitResponse.status === 200) {
        const { insert_urls_one } = submitResponse.data;
        setShortenedLink(
          `${BASE_URL}/${insert_urls_one.slug}`
        );
      }
      handleReset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Simple Url Shortener</h1>
      <div className="card">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="card__group">
            <h2>Enter your url to shorten</h2>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
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
            <button className="button button_primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {shortenedLink.length ? (
        <div className="card">
          <h2>Here you go 🎊</h2>
          <p>
            <a href={shortenedLink} target="_blank">
              {shortenedLink}
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
