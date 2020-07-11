import React from 'react';
import Popup from './Popup';
import Button from './Button';
import FormGroup from './FormGroup';
import Row from './Row';

function DeletePopup(props) {
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1>Delete {props.header}</h1>
      <div
        style={{
          padding: '5px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 2,
          display: 'flexrow',
          justifyContent: 'center',
        }}
      >
        <div>
          <h3
            style={{
              textAlign: 'center',
            }}
          >
            Are you sure you want to delete this {props.header.toLowerCase()}.
          </h3>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <Button
            accentedBtn
            width="50px"
            marginRight="10px"
            onClick={() => props.onClose()}
          >
            <span>Cancel</span>
          </Button>
          <Button
            width="50px"
            accentedBtn
            onClick={() => props.delete(props.element)}
          >
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </Popup>
  );
}

export default DeletePopup;
