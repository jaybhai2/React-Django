import axios from "axios"
import ReactTable from './reactTablev2'
import { useState, useEffect, useMemo } from "react";
import makeData from './makeData'


function RenderStockTable() {

  const baseURL = "/api/overview";
  const [stockData, setStockData] = useState([]);

  async function makeGetRequest() {
        let res = await axios.get(baseURL);
        let data = res.data.slice(0,100);
        setStockData(data)
  };

  useEffect(() =>  { 
    console.log('useEffect executing');
    makeGetRequest() ;
  }, []);


  // const data = useMemo(
  //   () => stockData,
  //   [stockData] );

  const data = useMemo(
    () => makeData(100),
    [] );


  
  const columns = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: 'Ticker',
        accessor: 'ticker',
      },
      {
        Header: 'Company',
        accessor: 'company',
      },
      {
        Header: 'Sector',
        accessor: 'sector',
      },
      {
        Header: 'Market Cap',
        accessor: 'market_cap',
      },
      {
        Header: 'P/E',
        accessor: 'pe',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Change',
        accessor: 'change',
      },
      {
        Header: 'Volume',
        accessor: 'volume',
      }
    ],
    []
  );

  return (
    <div>
        { <ReactTable data={data} columns={columns} /> }
      </div>
    
  );
  }

export default RenderStockTable;
