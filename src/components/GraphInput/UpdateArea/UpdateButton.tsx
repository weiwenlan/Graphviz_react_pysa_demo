import React from 'react';
import styled from 'styled-components';
import { getThemeProperties } from '../../../themes';
import {message} from 'antd';
import 'antd/dist/antd.css';


const path = ['graphInput', 'updateButton'];
const {
  backgroundColor,
  textColor,
  hoverColor,
  hoverTextColor,
} = getThemeProperties(path);

const Button = styled.button`
  :enabled {
    background-color: ${backgroundColor};
    color: ${textColor};

    :hover {
      background-color: ${hoverColor};
      color: ${hoverTextColor};
    }
  }

  :focus {
    outline: none;
  }
`;


const UpdateButton = ({
  active,
  update,
}: {
  active: boolean;
  update: () => void;
}) => (
  <Button onClick={update} disabled={active}>
    Update
    <br />
    <span style={{ fontSize: '10pt' }}>(Ctrl + Enter)</span>
  </Button>
);

export default UpdateButton;
