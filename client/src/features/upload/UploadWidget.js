import { useEffect } from 'react';

let cloudinary;
let widget;

/**
 * This component is a wrapper for the Cloudinary widget. It uses a ref to store the
 * widget instance so that it can be reused on subsequent renders. This is to help
 * improve load time of the widget on first instance.
 * @param {*} children 
 * @param {*} onUpload 
 * @returns 
 */
const UploadWidget = ({ children, onUpload }) => {

  useEffect(() => {
    // Store the Cloudinary window instance to a ref when the page renders
    if ( !cloudinary ) {
      cloudinary = window.cloudinary;
    }

    // To help improve load time of the widget on first instance, use requestIdleCallback
    // to trigger widget creation.
    function onIdle() {
      if ( !widget ) {
        widget = createWidget();
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);

    // eslint-disable-next-line
  }, []);

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */
  function createWidget() {

    // The options object is used to configure the widget. You can find more information
    // about the options here: https://cloudinary.com/documentation/upload_widget_reference
    const options = {
              cloudName: process.env.REACT_APP_CLOUD_NAME,
              uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
              resourceType: "image",
              clientAllowedFormats: ["png", "jpg", "jpeg", "gif", "svg"],
              singleUploadAutoClose: true,
              maxFiles: 1,
              sources: [
                "local",
                "url",
                "camera",
                "image_search",
                "google_drive",
                "dropbox",
              ],
              googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
              searchByRights: true,
              multiple: false,
              MaxImageFileSize: 10000000,
            }

    return cloudinary?.createUploadWidget(options,
      /**
       * This callback function returns either the result of the upload or an error.
       * @param {*} error error by cloudinary
       * @param {*} result result containing url of uploaded image
       */
      function (error, result) {
        if ( error || result.event === 'success' ) {
          onUpload(error, result, widget);
        }
      }
    );
  }

  /**
   * When the user clicks the button to open the widget, we check to see if the widget
   * has already been created. If it has, we open it. If not, we create it and then open it.
   */
  function open() {
    if ( !widget ) {
      widget = createWidget();
    }
    widget && widget.open();
  }

  // Render the children of this component and pass the open function as a prop
  return (
    <>
      {children({ cloudinary, widget, open })}
    </>
  )
}

export default UploadWidget;