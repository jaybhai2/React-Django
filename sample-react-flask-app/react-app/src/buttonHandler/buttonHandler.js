





export const handleReplaceSubmit = (inputValue) => {
    const findValue = document.getElementById("replace_find").value;
    const replaceValue = document.getElementById("replace_with").value;
    return inputValue.replaceAll(findValue, replaceValue);
    
  };


export function handleUpperCaseClick(inputValue) {
    return inputValue.toUpperCase();
  }

