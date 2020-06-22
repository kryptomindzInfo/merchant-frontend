import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { fetchGroups } from '../api/CashierAPI';
import Loader from '../../shared/Loader';

const SelectInput = styled.select`
  width: 100%;
  z-index: 1;
  height: auto;
  background: transparent;
  box-sizing: border-box;
  padding: 10px;
  padding-right: 0;
  border: solid 1px rgba(0, 0, 0, 0.32);

  border-radius: 4px;
  display: block;
  margin-bottom: 5px;
  outline: 0;
  font-size: 14px;
  line-height: 19px;
  &:focus {
    border: solid 1px ${(props) => props.theme.primary};
  }
`;

const GroupSelectBox = (props) => {
  const [groupList, setGroupList] = useState(props.groups);
  const [isLoading, setLoading] = useState(false);

  const sendCloseSignal = (event) => {
    if (!document.getElementById('GroupSelectBoxBody').contains(event.target)) {
      props.close();
    }
  };

  const getGroups = () => {
    if (isLoading) {
      return;
    }
    return groupList.map((group) => {
      return (
        <option key={group._id} value={group._id}>
          {group.name}
        </option>
      );
    });
  };

  return (
    <SelectInput {...props}>
      {isLoading ? (
        <CircularProgress size={30} thickness={5} color="primary" />
      ) : null}
      {groupList && groupList.length > 0 ? getGroups() : null}
    </SelectInput>
  );
};

export default GroupSelectBox;
