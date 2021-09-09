import React from "react";

import { shortenUrl, BASE_URL } from "./utils/api";
import { toastMessage, TYPE_SUCCESS, TYPE_ERROR } from "./Toast";

import "./App.css";

function App() {
  const [url, setUrl] = React.useState("");
  const [customSlug, setCustomSlug] = React.useState("");
  const [shortenedLink, setShortenedLink] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleReset = () => {
    setUrl("");
    setCustomSlug("");
  };

  const handleError = (error) => {
    let message = "";
    if (error.response) {
      message = error.response.data.message;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    toastMessage(message.length ? message : "Something went wrong", TYPE_ERROR);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortenedLink("")
    try {
      const formData = {
        url,
        slug: customSlug,
      };

      setIsLoading(true);
      const submitResponse = await shortenUrl(formData);
      if (submitResponse.status === 200) {
        const { insert_urls_one } = submitResponse.data;
        setShortenedLink(`${BASE_URL}/${insert_urls_one.slug}`);
        toastMessage("Your link is ready", TYPE_SUCCESS);
      }
      handleReset();
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setIsLoading(false);
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
      <div className="card min-h-0">
        {shortenedLink.length ? (
          <React.Fragment>
            <h2>Here you go 🎊</h2>
            <p>
              <a href={shortenedLink} target="_blank">
                {shortenedLink}
              </a>
            </p>
          </React.Fragment>
        ) : null}
        {isLoading && <div class="loader-dots">Loading</div>}
      </div>
    </div>
  );
}

export default App;
