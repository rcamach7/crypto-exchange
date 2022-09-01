import { CircularProgress, Modal } from "@mui/material/";
import styled from "styled-components";

const BackDropContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const LoadingUx = () => {
  return (
    <Modal open={true}>
      <BackDropContainer>
        <CircularProgress sx={{ maxHeight: "100%", color: "white" }} />
      </BackDropContainer>
    </Modal>
  );
};
