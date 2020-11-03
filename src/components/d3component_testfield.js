import React, {useEffect, useRef, useState} from 'react';
import * as d3 from "d3";
import * as axios from "axios";




import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import {Form} from "react-bootstrap";




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
    const getUploadParams = ({ file, meta }) => {

        return { url: 'http://127.0.0.1:5000/upload_file' ,
        headers:
            {
                "Content-Type":"multipart/form-data",


                },
        }

    }
    let  [,setState]=useState();
    // called every time a file's `status` changes

    async function send_data(fileWithMeta){
        // const response = await fetch("http://127.0.0.1:5000/upload_file",{
        //     method:"POST",
        //     mode:"no-cors",
        //     headers:{
        //         "Content-Type":"multipart/form-data"
        //     },
        //     body: fileWithMeta.file
        // }).then(response => {
        //     console.log(response.json())})
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const formData = new FormData();
            formData.append("file", fileWithMeta.file, fileWithMeta.meta.name);

            req.open("POST", "http://127.0.0.1:5000/upload_file", true);
            req.send(formData);
        });
    }

    const handleSubmit = async (files, allFiles) => {
        console.log(files.map(f => f.meta))
        files.forEach(fileWithMeta => {
                send_data(fileWithMeta).then(response => {
                    console.log(response)})


                // console.log("")
                // const url = "127.0.0.1:5000"
                // const method = 'POST'
                // // const body = fileWithMeta
                // const fields = {}
                // const headers = {"Content-Type":"multipart/form-data"}
                // const extraMeta = fileWithMeta.meta
                //
                // delete extraMeta.status
                //
                //
                // const xhr = new XMLHttpRequest()
                // const formData = new FormData()
                // xhr.open(method, 'http://127.0.0.1:5000/upload_file', true)
                //
                // for (const field of Object.keys(fields)) formData.append(field, fields[field])
                // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
                // for (const header of Object.keys(headers)) xhr.setRequestHeader(header, headers[header])
                // fileWithMeta.meta = { ...fileWithMeta.meta, ...extraMeta }
                //
                // // update progress (can be used to show progress indicator)
                // xhr.upload.addEventListener('progress', e => {
                //     fileWithMeta.meta.percent = (e.loaded * 100.0) / e.total || 100
                //     setState({})
                // })
                //
                // xhr.addEventListener('readystatechange', () => {
                //     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
                //     if (xhr.readyState !== 2 && xhr.readyState !== 4) return
                //
                //     if (xhr.status === 0 && fileWithMeta.meta.status !== 'aborted') {
                //         fileWithMeta.meta.status = 'exception_upload'
                //         // d3Container.current.handleChangeStatus(fileWithMeta)
                //         setState({})
                //     }
                //
                //     if (xhr.status > 0 && xhr.status < 400) {
                //         fileWithMeta.meta.percent = 100
                //         if (xhr.readyState === 2) fileWithMeta.meta.status = 'headers_received'
                //         if (xhr.readyState === 4) fileWithMeta.meta.status = 'done'
                //         // d3Container.current.handleChangeStatus(fileWithMeta)
                //         setState({})
                //     }
                //
                //     if (xhr.status >= 400 && fileWithMeta.meta.status !== 'error_upload') {
                //         fileWithMeta.meta.status = 'error_upload'
                //         // d3Container.current.handleChangeStatus(fileWithMeta)
                //         setState({})
                //     }
                // })
                //
                // formData.append('file', fileWithMeta.file)
                // if (props.timeout) xhr.timeout = props.timeout
                // xhr.send( formData)
                // fileWithMeta.xhr = xhr
                // fileWithMeta.meta.status = 'uploading'
                //
                // // d3Container.current.handleChangeStatus(fileWithMeta)
                // setState({})
                // // const body = new FormData()
                // // body.append("file",file)
                // // const config = {
                // //     onUploadProgress: function(progressEvent) {
                // //         var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                // //         file.meta.percent = percentCompleted
                // //         console.log(percentCompleted)
                // //     }
                // // }
                // // let data = new FormData()
                // // axios.defaults.headers.post['Content-Type'] ="multipart/form-data";
                // // data.append('file', file.file)
                // // // let send = async send_data => {}
                // // axios.post("http://127.0.0.1:5000/upload_file",data, config )
                // //
                // //

            }
            )
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
        // getUploadParams={getUploadParams}
        // onChangeStatus={}
        onSubmit={handleSubmit}
        autoUpload={false}
        PreviewComponent={Preview}
        inputContent="Drop Files (Custom Preview)"
        // disabled={true}//{files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
        // submitButtonDisabled={files => files.length < 1}

    />
}


