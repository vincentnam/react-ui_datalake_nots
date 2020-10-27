import React, {useEffect, useRef, useState} from 'react';
import * as d3 from "d3";
import * as axios from "axios";




import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'




export default function D3Test(props){

    const d3Container = useRef(null);
    const Preview = ({ meta }) => {
        const { name, percent, status } = meta
        return (
            <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
      {name}, {Math.round(percent)}%, {status}
    </span>
        )
    }
    // const [books, setBooks] = useState(initialBooks)
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'http://141.115.103.34:5000/upload_file' ,
        headers:
            {
                "Content-Type":"multipart/form-data",
                "Access-Control-Allow-Origin": "*"
                }} }

    // called every time a file's `status` changes



    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    // receives array of files that are done uploading when submit button is clicked

    useEffect(
        () => {
            // return (
            //
            // )
        },

        /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
        [props.data, d3Container.current])






    return                               <Dropzone
        getUploadParams={getUploadParams}
        onSubmit={handleSubmit}
        PreviewComponent={Preview}
        inputContent="Drop Files (Custom Preview)"
        disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
    />
}


