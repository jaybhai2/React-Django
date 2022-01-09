import React from "react";


export default function BasicTable(props) {
  // Use the useTable Hook to send the columns and data to build the table
  
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
    const data = props.data;
    let columns = [];
    try{
      columns = Object.keys(data[0])
    }
    catch(err){
      console.log("extract column key failed at columns = Object.keys(data[0]).");
      return (<div>
        loading...
      </div>)
      }

    function renderDataRow(dataRow, idx){
        // Prepare the row for display
        return (
            // Apply the row props
            <tr key={idx}>
            {// Loop over the rows cells
            Object.entries(dataRow).map( ([k, v], idx) => {
                // Apply the cell props
                if(idx===0){
                    // make first element bolded with th tag
                    return (    
                    <th key={ idx } colname={ k } >{ v }</th>
                    )
                }
                return (    
                    <td key={ idx } colname={ k } >{ v }</td>
                    )
                
            })}
            </tr>
        )
        }

    

    return (
<div>
        <table id='stockOverViewTable' className="table table-striped table-bordered table-hover table-sm">
          <thead>
              <tr>
                {// Loop over the headers in each row
                columns.map((column, idx) => (

                  // Apply the header cell props
                  <th key={ idx } scope="col"> { column } </th>)

                  )
                  }
              </tr>
          </thead>
          {/* Apply the table body props */}
          <tbody>
            {// Loop over the table rows
            data.map((dataRow, idx) => renderDataRow(dataRow, idx))
            }
          </tbody>
        </table>
        
  
        </div>
      );
}