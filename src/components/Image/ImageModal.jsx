import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SERVER } from "../../index.js";

import Comments from "../Comments/Comments.jsx";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding-top: 10px;
  height: 100%;
  gap: 10px;
`;

const Img = styled.img`
  object-fit: contain;
  object-position: left top;
  max-width: 60%;
`;

const Link = styled.a`
  display: inline-block;
  text-decoration: none;
  color: black;
  font-style: italic;
  margin: 5px;

  &::after {
    content: "";
    color: #4f87ff;
    width: 60px;
  }

  &:hover::after {
    content: " #";
  }
`;

const ImageModal = ({ id, img, photographer, photographer_url, alt }) => {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    try {
      (async () => {
        const res = await fetch(`${SERVER}/pictures/${id}`, {
          method: "GET",
          signal: controller.signal,
        });
        const data = await res.json();

        if (res.ok) {
          setComment(data.comments);
        } else {
          throw new Error("Fetch Failed");
        }
      })();
    } catch (e) {
      if (controller.signal.aborted) {
        console.log("Fetch Cancelled by Client");
      } else {
        console.log(e);
      }
    }

    return () => {
      console.log("Modal 언마운트");
      controller.abort();
    };
  }, []);

  console.log("Modal 렌더링");

  return (
    <Container>
      <h2>
        <Link href={photographer_url}>{photographer}</Link>
      </h2>
      <Img src={img} alt={alt} width="auto" height="85%" />
      <Comments id={id} comment={comment} setComment={setComment} />
    </Container>
  );
};

export default ImageModal;
