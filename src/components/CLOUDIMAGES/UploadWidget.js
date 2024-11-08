import { useEffect, useRef } from "react";

let cloudinary;

const UploadWidget = ({ children, onUpload, uploadmultiple }) => {
  const widget = useRef();
  useEffect(() => {
    // Store the Cloudinary window instance to a ref when the page renders

    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }

    // To help improve load time of the widget on first instance, use requestIdleCallback
    // to trigger widget creation. If requestIdleCallback isn't supported, fall back to
    // setTimeout: https://caniuse.com/requestidlecallback

    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget();
      }
    }

    "requestIdleCallback" in window
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1);

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    };
    // eslint-disable-next-line
  }, []);

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {
    // Providing only a Cloud Name along with an Upload Preset allows you to use the
    // widget without requiring an API Key or Secret. This however allows for
    // "unsigned" uploads which may allow for more usage than intended. Read more
    // about unsigned uploads at: https://cloudinary.com/documentation/upload_images#unsigned_upload

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.warn(`Kindly ensure you have the cloudName and UploadPreset 
      setup in your .env file at the root of your project.`);
    }
    const options = {
      cloudName, // Ex: mycloudname
      uploadPreset, // Ex: myuploadpreset
      // croppingAspectRatio: 1,
      // cropping: true,
      // maxFileSize: 4 * 1024 * 1024,
      // maxFileSize: 150 * 1024, // 150KB size limit
      folder: "felitechnologyimages",
      multiple: uploadmultiple,
      maxFiles: uploadmultiple ? 6 : 1,
      cropping: true,
      croppingCoordinatesMode: "custom",
      // background_removal:'cloudinary_ai',

      styles: {
        palette: {
          window: "#FFF",
          windowBorder: " #1D6F2B",
          tabIcon: "#f4a535",
          menuIcons: "#5A616A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#1D6F2B",
          action: "#1D6F2B",
          inactiveTabIcon: "#1D6F2B",
          error: "#d13931",
          inProgress: "#20B832",
          complete: "#20B832",
          sourceBg: "#E4EBF1",
        },
        frame: {
          background: "rgba(255, 255, 255, 0.5)",
        },
        // fonts: {
        //   "'Cute Font', cursive":
        //     "https://fonts.googleapis.com/css?family=Cute+Font",
        // },
      },
    };

    return cloudinary?.createUploadWidget(options, function (error, result) {
      // The callback is a bit more chatty than failed or success so
      // only trigger when one of those are the case. You can additionally
      // create a separate handler such as onEvent and trigger it on
      // ever occurrence

      if (
        (error || result.event === "success") &&
        typeof onUpload === "function"
      ) {
        onUpload(error, result, widget);
      }
    });
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    // console.log("widget", widget);

    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return <>{children({ cloudinary, widget, open })}</>;
};

export default UploadWidget;
