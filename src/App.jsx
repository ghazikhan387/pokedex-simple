import './App.css'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {

  return (
   <div className="flex flex-col items-center">
    <Link to="/"><h1 className="text-2xl font-bold mt-4 mb-4">Pokedex</h1></Link>
    <CustomRoutes />
   </div>
  )
}

export default App;
