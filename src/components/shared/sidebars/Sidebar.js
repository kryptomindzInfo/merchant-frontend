import styled from 'styled-components';

const Sidebar = styled.div`
  min-width: 260px;
  margin-right: ${(props) => (props.marginRight ? '33px' : '0')};
`;
