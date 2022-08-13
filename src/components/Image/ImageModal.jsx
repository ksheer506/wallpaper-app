import styled from "styled-components";

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

const ImageModal = ({ img, photographer, photographer_url, alt }) => {
  return (
    <Container>
      <h2>
        <Link href={photographer_url}>{photographer}</Link>
      </h2>
      <Img src={img} alt={alt} width="auto" height="90%" />
    </Container>
  );
};

export default ImageModal;
