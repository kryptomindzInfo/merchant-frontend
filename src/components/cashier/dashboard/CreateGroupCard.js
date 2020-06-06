import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Wrapper from '../../shared/Wrapper';
import CreateGroupPopup from './CreateGroupPopup';
import Col from '../../shared/Col';

const CreateGroupCard = (props) => {
  const [addGroupPopup, setAddGroupPopup] = React.useState(false);

  const handlePopupClick = () => {
    setAddGroupPopup(true);
  };

  const onPopupClose = () => {
    setAddGroupPopup(false);
  };

  return (
    <Col cW="100%">
      <Card marginBottom="54px" bigPadding smallValue>
        <Button width="100%" flex onClick={handlePopupClick}>
          <AddIcon className="material-icons" />
          <span>Create Group</span>
        </Button>
      </Card>
      {addGroupPopup ? (
        <CreateGroupPopup onClose={() => onPopupClose()} />
      ) : null}
    </Col>
  );
};

export default CreateGroupCard;
