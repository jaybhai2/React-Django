
import DashBoard from './pages/Dashboard/DashBoard';


function App() {



  return (
    <div className="container">
    <div className="row">
        <h1>App</h1>
      </div>

  

    <div className="row">
        { <DashBoard /> }
      </div>
    </div>
  );
}

export default App;
