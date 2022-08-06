import styled from "styled-components"
import { Rectangle, Skeleton } from "../Skeleton/Skeleton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  justify-content: center;
  align-items: center;

  height: 90%;
  width: 100%;
`

const ImageSkel = ({ width = 300, height = 300 }) => {
  return (
    <Skeleton width="100%" height="320px">
      <Container>
        <Rectangle width="95%" height="95%" />
        <Rectangle width="95%" height="10%" />
      </Container>
    </Skeleton>
  );
};

export default ImageSkel;
