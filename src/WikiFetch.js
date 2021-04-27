import React, { Component } from "react";
import './WikiFetch.css';

class WikiFetch extends Component {

  state = { text : " --- "};

  handleChange = (event) => {
     //alert(event.target.value);
     this.fetchData();
  }   

  fetchData() {
    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    let input = event.target.value; // Fuer Query

    // 2. Configure: <Method> , <URL>
    xhr.open('GET', 'https://de.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles='+input);

    // 3. Send the request to the destination
    xhr.send();

    // 4. Callback after the response is received
    xhr.onload = () => {
      if (xhr.status !== 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        //alert("Received: " + xhr.responseText);
      }

      xhr.onprogress = function (event) {
        if (event.lengthComputable) {
          alert(`Received ${event.loaded} of ${event.total} bytes`);
        } else {
          alert(`Received ${event.loaded} bytes`); // no Content-Length
        }
      };

      xhr.onerror = function () {
        alert("Request failed");
      };

      //const str = JSON.parse(xhr.responseText);
      //this.setState({ text: str.ip });

      this.setState({text: this.getTextFromQuery(xhr.responseText)})
    };
  }

  getTextFromQuery(xhrResponseText) {
    let str = "";
    const myObj = JSON.parse(xhrResponseText);
    if (myObj.query === undefined) {
      str = "---"
    } else {
      const keyVal = Object.keys(myObj.query.pages);
      str = myObj.query.pages[keyVal].extract;
    }
    return str;
  }

  render() {
    return (
      <div>
        <input className="NiceInput" type="text" onChange={this.handleChange} />
        <div className="NiceOutput" dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
      </div>

    );
  }
}

export default WikiFetch;