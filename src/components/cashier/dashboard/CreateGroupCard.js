import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
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
        style={{ backgroundColor: '#0000', boxShadow: 'none' }}
        textAlign="center"
        marginBottom="85px"
        bigPadding
      >
        <Button
          width="100%"
          flex
          className="addBankButton"
          style={{ padding: '10px' }}
          onClick={handlePopupClick}
        >
          <AddIcon className="material-icons" />
          <span>Create Group</span>
        </Button>
      </Card>
      {addGroupPopup ? (
        <CreateGroupPopup onClose={() => onPopupClose()} />
      ) : null}
    </Wrapper>
  );
};

export default CreateGroupCard;
