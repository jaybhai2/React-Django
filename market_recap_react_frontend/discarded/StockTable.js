import React, {useEffect, useState } from "react";
import axios from "axios"
import BasicTable from "./BasicTable";



export default function StockTable() {
    

    const [data, setData] = useState([]);
    
    const [columns, setColumns] = useState([]);
    const baseURL = '/api/stock/'
    const getData = async () => {
      try {
      const resp = await axios.get(baseURL)
          console.log('refreshing data...')
          setData(resp.data)

          if(columns.length === 0)
          {
            getColumns(resp.data);}
          } 
          catch (err) 
          {
          console.error(err.message);
          }
    };

    function getColumns(data) {
        const keys = Object.keys(data[0])
        const columns = keys.map( elem => { return {Header: elem, accessor: elem}} );
        /* 
        [{
            Header: "Name",
            accessor: "name"
        }] 
        */
        setColumns(columns);
    }

  useEffect(
      () => 
    {
        getData(); // run initial getData
        const interval=setInterval(()=>{
            getData()
           },3600000)
        return()=>clearInterval(interval)
    },

    [] //empty dependency array to ensure useEffect run only once, otherwise it will run at each stats change - infinite.
  );

  
return (
  
    <div>
      <p>xxxxxxxxxxxxxx</p>
      <BasicTable columns={columns} data={data}/>
    </div>

    );
  
}