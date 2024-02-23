import { useState } from "react";

import UploadWidget from "./UploadWidget";

import "./App.css";

function App() {
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  /**
   * handleOnUpload
   */

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }

  return (
    <main className="main">
      <div className="container ">
        <h2>Unsigned with Upload Preset</h2>
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button
                className="bg-primary text-white  "
                onClick={handleOnClick}
              >
                Upload an Image
              </button>
            );
          }}
        </UploadWidget>

        {error && <p>{error}</p>}

        {url && (
          <>
            <p>
              <img src={url} alt="Uploaded resource" />
            </p>
            <p>{url}</p>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
