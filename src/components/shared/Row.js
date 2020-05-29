import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  box-sizing: border-box;
  margin-right: ${(props) => (props.mR ? props.mR : '0')};
  margin-left: ${(props) => (props.mL ? props.mL : '0')};
  margin-top: ${(props) => (props.marginTop ? '24px' : '0')};
  flex-direction: row;
  align-items: ${(props) => (props.vAlign ? props.vAlign : 'center')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'center')};
  justify-content: ${(props) => (props.justify ? props.justify : 'center')};
`;
export default Row;
