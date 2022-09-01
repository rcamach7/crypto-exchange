import styled from "styled-components";

export const LoginWrapper = styled.div<{ backgroundColor: string }>`
  min-height: calc(100vh - 60px);

  background-color: ${(props) => props.backgroundColor};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    margin: 0 0 20px 0;

    width: 200px;
    height: 200px;
  }

  // Nested Component
  .SignInForm {
    width: 320px;
    padding-top: 10px;

    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    .btn {
      width: 80%;
      margin-bottom: 2.5px;
    }
  }

  // Nested Component
  .CreateAccountForm {
    width: 320px;
    padding-top: 10px;
    margin-bottom: 25px;

    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    .btn {
      width: 80%;
      margin-bottom: 2.5px;
    }
  }
`;
