import styled from 'styled-components';

const ActionBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 5px 5px 25px 0 rgba(179, 179, 179, 0.25);
  background-color: #ffffff;
  text-align: ${(props) => (props.textRight ? 'right' : 'left')};
  padding: 15px 20px;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0')};
  input.small {
    width: 75% !important;
  }
  .notification {
    font-size: 20px;
    strong {
      color: ${(props) => props.theme.primary};
    }
    strong.red {
      color: ${(props) => props.theme.danger};
    }
  }
  .dateinput {
    border: 1px solid #e0e7ee;
    background: #fff;
    width: 150px;
    margin-left: 15px;
    padding: 5px 10px;

    margin-bottom: 0;
  }
  > .iconedInput {
    position: relative;
    width: ${(props) => (props.inputWidth ? props.inputWidth : '100%')};
  }
  > .iconedInput > i {
    position: absolute;
    z-index: 1;
    left: 9px;
    top: 4px;
    font-size: 20px;
    color: #4a4a4a;
    opacity: 0.4;
  }
  > .iconedInput > input {
    border-radius: 4px;
    background-color: #efeef8;
    padding: 8px;
    font-size: 12px;
    border: 0;
    z-index: 0;
    padding-left: 35px;
    width: 100%;
  }
`;

export default ActionBar;
