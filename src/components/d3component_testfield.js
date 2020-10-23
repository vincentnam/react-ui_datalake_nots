import React, {useEffect, useRef, useState} from 'react';
import * as d3 from "d3";
import * as axios from "axios";




import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'




export default function D3Test(props){

    const d3Container = useRef(null);

    // const [books, setBooks] = useState(initialBooks)
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'http://141.115.103.34:5000/upload_file' , headers: {"Access-Control-Allow-Origin": "*"}} }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
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






    return                       <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="*"
    />
}

