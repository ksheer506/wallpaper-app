import './App.css';
import Skeleton from './stories/Skeleton';
import ImgContainer from './stories/ImageContainer';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const req = await fetch(`https://api.pexels.com/v1/curated/?page=${currentPage}`, {
        method: "GET",
        headers: {
          authorization: "563492ad6f91700001000001ea3a86ac3adb417dbe8fdfc16dfdbdc3"
        }
      })

      if (req.ok) {
        const res = await req.json();

        setImages(res.photos);
        setIsLoading(false);
      }
    })();

  }, [])

  return (
    <>
      <Header />
      <main>
        {isLoading ? null :
          images.map((pic) => <ImgContainer {...pic} width={200} height={200} key={pic.id} />)
        }
      </main>


    </>
  );
}

export default App;