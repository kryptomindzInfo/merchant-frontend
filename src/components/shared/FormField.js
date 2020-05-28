import styled from 'styled-components';

const FormField = styled.div`
  display: block;
  position: relative;
  margin-right: ${(props) => (props.mR ? props.mR : '0')};
  margin-left: ${(props) => (props.mL ? props.mL : '0')};
  margin-bottom: ${(props) => (props.mB ? props.mB : '0')};
  > label {
    position: absolute;
    top: 11px;
    left: 13px;
    z-index: 0;
  }
  > label.focused {
    top: -7px;
    left: 15px;
    color: ${(props) => props.theme.primary};
    background: ${(props) => props.theme.background};
    display: block;
    font-size: 10px;
    padding: 0 5px;
    z-index: 2;
  }
`;

export default FormField;
