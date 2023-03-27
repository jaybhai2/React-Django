import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import { handleReplaceSubmit, handleUpperCaseClick } from './buttonHandler/buttonHandler';

function App() {

  return (
    <div>
      <div>
        <h1>Text Editor Example</h1>
        <TextBox />
      </div>
    </div>
  );
}

function TextBox(props) {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [highlightTerm, setHighlightTerm] = useState('');
  const textAreaRef = useRef(null);
  const [previousValue, setPreviousValue] = useState('');


  useEffect(() => {
    const textArea = textAreaRef.current;
    textArea.cols = textArea.scrollWidth / 10; // set cols to 1/10th of the scrollWidth
  }, [inputValue]);


  const handleTextAreaChange = (event) => {
    const inputValue = event.target.value;
    console.log(inputValue)
    let highlightedValue = inputValue;

    if (highlightTerm !== '') {
      highlightedValue = inputValue.replace(
        new RegExp(highlightTerm, 'gi'),
        '<mark>$&</mark>'
      );
    }

    setInputValue(highlightedValue);
  };

  const handleClearClick = () => {
    return ''
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    const data = { text: inputValue };

    fetch('http://0.0.0.0:5000/echo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      console.log(data)
      // Add new key/value pair to response data
      const updatedData = data.text;
      // Update state with updated response data
      setApiResponse(updatedData);
      
      setInputValue(updatedData);

      setIsLoading(false);
    })
    .catch(error => {
      setIsLoading(false);
      // Handle network error
      console.error('There was a problem with the network request:', error);
    });

    //props.onButtonClick(inputValue);
  };

  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: '20px', // add left margin to container
    },
    textBox: {
      width: '300px',
      height: '100px',
      marginLeft: '20px', // add left margin to text box
    },
    textArea: {
      type:"text",
      height: '600px', 
      overflow: 'auto',
      width: '300px',
      whiteSpace: 'nowrap',
     
      marginLeft: '20px', // add left margin to text area,
      marginTop: '20px', // add margin-top for spacing
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      minHeight: '100px',
      lineHeight: '1.5',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      background:'#f8f9fa'
    },
    button: {
      marginTop: '10px',
      width: '60px',
      height: '40px',
      marginLeft: '10px', // add left margin to buttons
    },


    buttonContainer: {
      display: "inline-flex",
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: '10px',
      backgroundColor: 'lightblue',
      padding: '10px',
      borderRadius: '5px',
    },
    buttonContainerTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: '10px',
    },
  };
  

  const handleReplaceClick = () => {
    setShowReplace(!showReplace);
  };


  function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setInputValue(reader.result);
    };

    reader.readAsText(file);
  }


 
  function handleConversionClickAdapter(conversionFunction, prop=null) {

    if (inputValue !== previousValue) {
      setPreviousValue(inputValue);
    }
    if (prop) {
      setInputValue(conversionFunction(inputValue, prop));
    } else {
      setInputValue(conversionFunction(inputValue));
    }
  }


  function undoConversion() {
    setInputValue(previousValue);
    setPreviousValue('');
  }

  return (
    <div className="text-box">
      <div style={style.buttonContainer}>
      <h2 style={style.buttonContainerTitle}>Actions:</h2>
      <div style={style.buttonGroup}>
        <button style={style.button} onClick={() => {handleConversionClickAdapter( handleClearClick)}}>
          Clear
        </button>
        <button style={style.button} onClick={undoConversion} disabled={!previousValue}>Undo</button>
        <button 
          style={style.button}
          onClick={handleButtonClick} 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>

        <button style={style.button} onClick={() => { handleConversionClickAdapter(handleUpperCaseClick); }}>
          Upper Case
        </button>
        
        <button style={style.button} >
          Lower Case
        </button>
        
        <button style={style.button} onClick={handleReplaceClick} >
          Replace
        </button>
        {showReplace && (
          <div>
          <div style={style.inputBox}>
            <label>replace: </label>
            <input id="replace_find" type="text" />
            <label>with: </label>
            <input id="replace_with" type="text" />
          </div>
          <div style={style.inputBox}>
            <button style={style.button} onClick={() => { handleConversionClickAdapter(handleReplaceSubmit); }} >
            submit
            </button>
          </div>
          </div>
        )}
      
        <button style={style.button} >
          Split to Lines
        </button>




        </div>
      </div>
      {/* <label>Highlight Term:</label>
        <input
          type="text"
          value={highlightTerm}
          onChange={handleInputBoxChange}
        />
      <div>
      </div> */}

      <div className="input-container">
      <textarea 
      ref={textAreaRef}
        value={inputValue}
        onChange={handleTextAreaChange}
        placeholder='Copy or load your data here.'
        style={style.textArea}
        >
      </textarea>
      </div>

     
      
      <p>{apiResponse}</p>



      <input
        type='file'
        id='fileInput'
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      <button onClick={() => document.getElementById('fileInput').click()}>
        Load Data from File
      </button>


{/* 
      <div className="input-container">
      <input 
        type="text" 
        value={highlightTerm} 
        onChange={(event) => handleHighlightTermChange(event)} 
        placeholder="Enter a term to highlight"
        
        />

      <div
        style={style.textArea}
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: highlightedValue }}
      />
    </div> */}

    </div>
  );
}


export default App;