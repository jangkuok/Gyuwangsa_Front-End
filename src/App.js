import  {RouterProvider} from "react-router-dom";
import root from "./router/root";

import './style.css';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

function App() {
  return (
        <RouterProvider router = {root}/>
  )
}

export default App;
