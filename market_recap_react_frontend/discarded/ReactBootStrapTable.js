import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export default function ReactBootStrapTable(props){
  const data = props.data

  let columns = [];
  try{
  columns = Object.keys(data[0]).map( 
    (elem) => { return {dataField: elem, text: elem,  sort: true, footer:elem}} 
    );
  }
  catch(err){
  console.log("extract column key failed at columns = Object.keys(data[0]).");
  return (<div>
    ...
        </div>)
  }

  const { SearchBar, ClearSearchButton  } = Search;
  
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing { from } to { to } of { size } Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '100', value: 100
    }, {
      text: '500', value: 500
    }, {
      text: 'All', value: data.length
    }] // A numeric array is also available. the purpose of above example is custom the text
  };


  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`row ${rowIndex} clicked`)
    }
  };

  return (
  <ToolkitProvider
  keyField='id' 
  data={ data } 
  columns={ columns } 
  search
  bootstrap4={false} 
  >
  {
    props => (
      <div>
        {console.log(props.baseProps)}
        <SearchBar { ...props.searchProps } />
        <ClearSearchButton { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }  pagination={ paginationFactory(options) }
            striped
            hover
            condensed 
            noDataIndication="Table is Empty"
            rowEvents={ rowEvents }
            height='120' scrollTop={ 'Bottom' }
     
        />
      </div>
    )
  }
</ToolkitProvider>
)


}