import React from "react";
import Main from './components/Main'
import Quiz from "./components/Quiz";

function App() {
  const [page1, setPage1] = React.useState(true)

  function pageHandle(){
    setPage1(false)
  }

  
  return (
    <div className="App">
    {page1 && <Main pageHandle={pageHandle} />}
    {!page1 && <Quiz />}
    </div>
  );
}

export default App;
