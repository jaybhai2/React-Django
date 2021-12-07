import React, { Component, useEffect, useMemo } from "react";
import axios from "axios"
import BasicTable from "./BasicTable";

export default class StockProfile extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      data: 'zzzzz',
    };
    this.baseURL = "/api/stock";
   
    this.columns = useMemo(
      () => [
        
            {
              Header: "ID",
              accessor: "id"
            },
            {
              Header: "Ticker",
              accessor: "ticker"
            }
        ],
        []);

    this.data = useMemo(
      () => [
            {
              "id": "ID",
              ticker: "id"
            }
        ],
        []);    

  }
  
  componentDidMount() {
    axios.get(this.baseURL).then(
      (response) => {
        console.log(response.data)
        //this.setState({data: useMemo(response.data)});
      }
    )
  }

  render() {
    return (
    <div>
      <p>xxxxxxxxxxxxxx</p>
      
    </div>
    );
  }
}