import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from "./pages/home";
import { CreateRecipe } from './pages/create-recipe';
import { SavedRecipes } from './pages/save-recipes';
import { Auth } from './pages/auth';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/create-recipe" element={<CreateRecipe/>} />
          <Route path="/saved-recipes" element={<SavedRecipes/>} />
        </Routes>
      </Router>
      <div className='footer fixed-bottom'>
        <span className='bg-dark rounded-top rounded-start-0 border border-bottom-0 border-start-0 text-light p-1' style={{ fontSize: "12px" }}>@renzycode</span>
      </div>
    </div>
  );
}
export default App;
