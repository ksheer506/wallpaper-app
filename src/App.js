import './App.css';
import Image from './components/Image/ImageContainer';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';

const N = 14;

function App() {
  const [images, setImages] = useState(new Array(N).fill(0).map((_, i) => i));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const id = useRef(0);
  const bottom = useRef();

  useEffect(() => {
    const options = {
      rootMargin: "500px"
    }
    const io = new IntersectionObserver(([e]) => {
      id.current += N;
      if (e.isIntersecting) {
        const dumArr = new Array(N).fill(0).map((_, i) => id.current + i);

        setCurrentPage(prev => prev + 1);
        setImages((prev) => [...prev, ...dumArr]);
      }
    }, options);

    io.observe(bottom.current);

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      )

      try {
        // 
        // "http://localhost:3001/blogs"
        const req = await fetch(`https://api.pexels.com/v1/curated/?page=${currentPage}`, {
          method: "GET",
          headers: {
            authorization: "563492ad6f91700001000001ea3a86ac3adb417dbe8fdfc16dfdbdc3"
          },
          signal: controller.signal
        })
        const res = await req.json();

        setImages(prev => {
          const sliced = prev.filter((e) => typeof e !== "number");

          return [...sliced, ...res.photos]
        });
        // setIsLoading(false);
      }
      catch (err) {
        if (controller.signal.aborted) {
          console.log("요청 취소됨");
        } else {
          console.log("요청 실패");
        }
      }
    })();

    return () => controller.abort();
  }, [currentPage])

  return (
    <>
      <Header />
      <main>
        {images.map((pic) => <Image {...pic} width="auto" height="auto" key={pic.id || pic} />)}
      </main>
      <div ref={bottom}></div>
      {/* <Modal width="600px" height="400px" /> */}
    </>
  );
}

export default App;


/* 
{isLoading ? images.map((_, i) => <ImageSkel key={i} />) :
          images.map((pic) => <Image {...pic} width={"auto"} height={"auto"} setOpenModal={setOpenModal} key={pic.id} />)
        }
         */