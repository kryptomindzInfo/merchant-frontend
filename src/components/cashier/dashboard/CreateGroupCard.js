import React from 'react';
import { Send } from '@material-ui/icons';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Wrapper from '../../shared/Wrapper';
import CreateGroupPopup from './CreateGroupPopup';

const CreateGroupCard = (props) => {
  const [addGroupPopup, setAddGroupPopup] = React.useState(false);

  const handlePopupClick = () => {
    setAddGroupPopup(true);
  };

  const onPopupClose = () => {
    setAddGroupPopup(false);
  };

  return (
    <Wrapper>
      <Card
        textAlign="center"
        marginBottom="54px"
        buttonMarginTop="32px"
        bigPadding
      >
        <Button
          width="100%"
          flex
          style={{ padding: '10px' }}
          onClick={handlePopupClick}
        >
          Create Gorup
        </Button>
      </Card>
      {addGroupPopup ? (
        <CreateGroupPopup onClose={() => onPopupClose()} />
      ) : null}
    </Wrapper>
  );
};

export default CreateGroupCard;
