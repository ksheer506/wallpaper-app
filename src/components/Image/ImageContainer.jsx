import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import unliked from "../../img/icons8-love-48.png";
import liked from "../../img/icons8-love-48-fill.png";
import ImageSkel from "./ImageSkel";
import useModal from "../Modal/useModal";
import ImageModal from "./ImageModal";

const Container = styled.article`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 5px;
  justify-content: center;
  padding: 5px;
  background-color: #fcfcfc;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #dfdfdf;

  ${(props) =>
    (props.width || props.height) &&
    css`
      width: ${props.width};
      height: ${props.height};
    `}

  & > img {
    width: 90%;
    height: 90%;
    align-self: center;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    padding-left: 5px;
    padding-right: 5px;

    & > .photographer {
      display: flex;
      align-items: center;
      font-style: italic;
      font-size: 0.8rem;
    }

    & > .like {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
`;

export default function Image({
  id,
  width,
  height,
  photographer,
  photographer_url,
  src,
  alt,
}) {
  const [like, setLike] = useState(false);
  const [img, setImg] = useState(null);
  const openModal = useModal("60%", "65%");

  useEffect(() => {
    if (!src) return;

    (async () => {
      const req = await fetch(src.portrait);
      const imageBlob = await req.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);

      setImg(imageObjectURL);
    })();
  }, []);

  const modal = { id, img, photographer, photographer_url, alt };

  return (
    <Container width={width} height={height}>
      {!img ? (
        <ImageSkel />
      ) : (
        <>
          <img
            src={img}
            alt={alt}
            width="95%"
            height="90%"
            onClick={() => openModal(<ImageModal {...modal} />)}
          />
          <div>
            <span className="photographer">{photographer}</span>
            <img
              className="like"
              src={like ? liked : unliked}
              onClick={() => setLike(!like)}
            />
          </div>
        </>
      )}
    </Container>
  );
}
