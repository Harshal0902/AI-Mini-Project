import React from "react";
import { Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import backendapi from "../backendapi";
import { Redirect } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import "./LeafDisease.css"

class LeafDisease extends React.Component {
    state = {
        file: null,
        fileObj: null,
        filename: null,
        formSuccess: false,
        deleteSuccess: false
    };

    onFileUpload(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            fileObj: event.target.files[0]
        });
    }

    uploadFile(event) {
        event.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.fileObj);
        backendapi({
            method: "post",
            url: "/upload",
            data: formData,
            headers: {
                "Content-type": "multipart/form-data"
            }
        })
            .then(res => {
                this.setState({
                    filename: res.data.filename,
                    formSuccess: true
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        if (this.state.formSuccess === true) {
            return (
                <Redirect
                    to={{
                        pathname: "/result",
                        state: {
                            file: this.state.file,
                            fileObj: this.state.fileObj,
                            filename: this.state.filename,
                        }
                    }}
                />
            );
        }
        return (
            <div>
                <Fade cascade>
                    <div className="center">
                        <h1 className="Upload__Heading">Upload an image for leaf disease prediction</h1>
                        <img
                            className="Img__upload"
                            src={this.state.file}
                        />
                    </div>

                    <Form onSubmit={event => this.uploadFile(event)} id="fileupload">
                        <input
                            className="file-upload btn"
                            id="file"
                            type="file"
                            accept="image/*;capture=camera"
                            name="file"
                            required="required"
                            onChange={event => this.onFileUpload(event)}
                        />

                        <br />
                        <br />
                        <Zoom>
                            <Button
                            className="predict_btn"
                                type="submit"
                            >
                                Upload & Test
                            </Button>
                        </Zoom>
                    </Form>
                </Fade>

            </div>
        );
    }
}

export default LeafDisease;
