import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
import CustomCarousel from './components/CustomCarousel';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("https://rena-fullstack.onrender.com/");
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false)
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);
  return (
    <>
    {loading? (<Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>): (<main className="page_container">
  {error? (<>
  <h1>Something went wrong</h1>
  <h3>{error}</h3></>): (
    <>
      <h1 className='avenir'>Products List</h1>
      <CustomCarousel items={products} />
    </>
  )}
</main>)}

    </>
  )
}

export default App
