import React, {createRef, useCallback, useState} from "react";

import {Button, Card, Grid} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import {ListGroup} from "react-bootstrap";
import Dropzone, {useDropzone} from "react-dropzone";
import {View} from "react-native-web";
import axios, { post } from 'axios';


const api_rest = "http://127.0.0.1:5000"
const upload_file_url="/upload_file"

export default function DropZoneCard (props){
    function upload_file(file){
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(api_rest + upload_file_url, formData, config)

    }
    function send_click(e){


        files.forEach(file => console.log(file))
        files.forEach(file => upload_file(file).then(response => console.log(response)))
    }
    const [files, setFiles] = useState([]);
    const dropzoneRef = createRef();
    const openDialog = () => {
        // Note that the ref is set async,
        // so it might be null at some point
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            files.push(file)
            setFiles(files)
        })

    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return <Card>
        {/*<DropzoneComponent ref="dropzone" config={props.config}*/}
        {/*                   eventHandlers={props.eventHandlers}*/}
        {/*                   djsConfig={props.djsConfig}*/}
        {/*                   onChange={setdropFiles}*/}
        {/*/>*/}


        {/*<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>*/}
        {/*    {({getRootProps, getInputProps}) => (*/}
        {/*        <section>*/}
        {/*            <div {...getRootProps()}>*/}
        {/*                <input {...getInputProps()} />*/}
        {/*                <p>Drag 'n' drop some files here, or click to select files</p>*/}
        {/*            </div>*/}
        {/*        </section>*/}
        {/*    )}*/}
        {/*</Dropzone>*/}
        <Dropzone  ref={dropzoneRef} onDrop={onDrop} noClick noKeyboard addRemoveLink={true} on>
            {({getRootProps, getInputProps, acceptedFiles}) => {
                return (
                    <div className="container">
                        <View style={{ textAlign:'center'}}>
                            <div  {...getRootProps({className: 'dropzone'})} >
                                <input {...getInputProps()} />
                                <p >Glisser-déposer un fichier dans cette zone</p>
                                <button
                                    type="button"
                                    onClick={openDialog}
                                >
                                    Choisir un fichier
                                </button>
                            </div>
                        </View>
                        <View style={{ textAlign:'center'}}>
                            <aside>
                                <h4>Files</h4>
                                <ul>
                                    {files.map(file => (
                                        <li key={file.path}>
                                            {file.path} - {file.size} bytes
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        </View>
                    </div>
                );
            }}
        </Dropzone>
        <View >
            <Button onClick={send_click} variant="contained" color="primary" style={{backgroundColor:"#F16E10"}}>
                Téleverser - Upload
            </Button>
        </View>
    </Card>
}
//
// export class DropZoneCard extends React.Component {
//
//
//     getDropZoneHandler(event){
//
//     }
//     constructor (props) {
//         super(props)
//
//         this.state = { files: [] }
//     }
//     render() {
//
//
//
//     }
//
// }

// export default DropZoneCard