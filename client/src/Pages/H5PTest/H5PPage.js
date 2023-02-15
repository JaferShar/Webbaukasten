import React from "react";
import H5P from './assets/h5p/js/'

export default function H5PPage() {
    const el = document.getElementById('h5p-container');
    const options = {
        h5pJsonPath: '/h5p-folder',
        frameJs: '/assets/frame.bundle.js',
        frameCss: '/assets/styles/h5p.css',
    }
    new H5PStandalone.H5P(el, options);

    return (
        <div id='h5p-container'>
            <script type="text/javascript" src="assets/main.bundle.js"></script>
        </div>
        
    )
}