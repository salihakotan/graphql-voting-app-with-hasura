import { Link, Route, Routes} from "react-router-dom";
import Questions from "./pages/Questions";
import NewQuestion from "./pages/NewQuestion";
import QuestionDetail from "./pages/QuestionDetail";


function App() {
  return (
    <div className="App">
      
    <h3>voting app</h3>

    <nav>
      <Link to="/">Questions</Link>
      <Link to="/newQuestion">New Question</Link>

    </nav>
    <hr/>

    <Routes>
      <Route path="/" element={<Questions/>}/>
      <Route path="/newQuestion" element={<NewQuestion/>}/>
      <Route path="/question/:id" element={<QuestionDetail/>}/>


    </Routes>

    </div>
  );
}

export default App;
