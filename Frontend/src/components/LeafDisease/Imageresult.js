import React from "react";
import Fade from "react-reveal/Fade";
import backendapi from "../backendapi";
import { Typography, LinearProgress, } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Spring } from "react-spring/renderprops";
import { Link } from 'react-router-dom';
import "./Imageresult.css"

class ImageResult extends React.Component {
  state = {
    file: null,
    fileObj: null,
    filename: null,
    fileURL: null,
    cat: null,
    blight_level: null,
    blast_level: null,
    brownspot_level: null,
    selected_model: null,
    modelError: false
  };
  componentWillMount() {
    const { file, filename, selected_model } = this.props.location.state;
    this.setState(() => ({ file, filename, selected_model }));
    backendapi
      .get("/getimg/" + filename)
      .then((res) => {
        this.setState({ fileURL: res.config.baseURL + res.config.url });
        console.log("imgPATH=" + res.config.url);
      })
      .catch((err) => console.log(err));

    if (window.localStorage.getItem("model_fname") != null)
      this.setState({
        selected_model: window.localStorage.getItem("model_fname"),
      });
  }
  componentDidMount() {
    if (this.state.selected_model) {
      backendapi
        .post("/testmodel/" + this.state.filename, {
          model: this.state.selected_model,
        })
        .then((res) => {
          this.setState({
            cat: res.data.category,
            blight_level: res.data.Percentage.bacterial_blight,
            blast_level: res.data.Percentage.leaf_blast,
            brownspot_level: res.data.Percentage.brownspot,
          });
        })
        .catch((err) => {
          console.log(err)
          this.setState({ modelError: true })
        });
    } else {
      backendapi
        .post("/testmodel/" + this.state.filename)
        .then((res) => {
          this.setState({
            cat: res.data.category,
            blight_level: res.data.Percentage.bacterial_blight,
            blast_level: res.data.Percentage.leaf_blast,
            brownspot_level: res.data.Percentage.brownspot,
          });
        })
        .catch((err) => {
          console.log(err)
          this.setState({ modelError: true })
        });
    }
  }
  checkLevel = (value) => {
    var level;
    if (value >= 75) level = "success";
    else if (value >= 50) level = "info";
    else if (value >= 15) level = "warning";
    else level = "danger";
    return level;
  };
  render() {
    const PredictData = () => {
      if (this.state.cat != null)
        return (
          <div>
            <Spring
              from={{
                brownspot_level: 0,
                blast_level: 0,
                blight_level: 0,
              }}
              to={{
                brownspot_level: this.state.brownspot_level,
                blast_level: this.state.blast_level,
                blight_level: this.state.blight_level,
              }}
              config={{ tension: 200, precision: 1 }}
            >
              {(props) => (
                <div>
                  <Fade cascade>
                    <Typography variant="h4">Predicted Disease: {this.state.cat}</Typography>
                  </Fade>
                </div>
              )}
            </Spring>
          </div>
        );
      if (this.state.cat === null && this.state.modelError === true)
        return (
          <div>
            <center>
              This is probably due to concurrent operation or Network error
            </center>
          </div>
        )
      else {
        return (
          <div>
            <center>
              Testing image
            </center>
          </div>
        );
      }
    };

    const RemedyView = () => {
      if (this.state.cat === "Brown Spot")
        return (
          <div className="treatment">
            <h3>Treatment for Brown Spot</h3>
            <p>
              Spray the following: <br />
              <ul>
                <li>Removal of Waste</li>
                <li>Fungicides and fertilizer</li>
                <li>Spacing and pruning</li>
              </ul>
            </p>
          </div>
        );
      if (this.state.cat === "Bacterial Blight")
        return (
          <div className="treatment">
            <h3>Treatment for Bacterial Leaf Blight</h3>
            <p>
              Biological Method
              <br />
              <ul>
                <li>
                  Spray fresh cowdung extract 20% twice (starting from initial
                  appearance of the disease and another at fortnightly interval){" "}
                </li>
                <li>
                  Neem oil 60 EC 3% (or) NSKE 5% is recommended for the control
                  of sheath rot, sheath blight, grain discolouration and
                  bacterial blight{" "}
                </li>
              </ul>
            </p>
          </div>
        );
      if (this.state.cat === "Leaf Blast")
        return (
          <div className="treatment">
            <h3>Treatment for Leaf Blast</h3>
            <ul>
              <li>Adjust planting time. Sow seeds early, when possible, after the onset of the rainy season.</li>
              <li>Split nitrogen fertilizer application in two or more treatments. Excessive use of fertilizer can increase blast intensit
              </li>
              <li>Flood the field as often as possible</li>
            </ul>
          </div>
        );
      if (this.state.cat === null && this.state.modelError === true)
        return (
          <div>
            <center>Please try again</center>
          </div>
        )
      else
        return (
          <div>
            <LinearProgress color="secondary" />
          </div>
        );
    };

    return (
      <div>
        <div className="Result">
          <h1 className="Result__heading">
            Result
          </h1>
          <img
            className="Upload_image"
            src={this.state.fileURL}
            alt={this.state.filename}
          />
          <br />
          <br />
          <PredictData />
          <hr />
          <RemedyView />
          <br />
          <Link to='/leafDisease' style={{textDecoration: "none"}}>
            <Button
              className="predict_btn"
              type="submit"
              style={{width: "250px"}}
            >
              Upload another image
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ImageResult;
