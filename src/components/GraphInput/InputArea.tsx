import React from 'react';
import styled from 'styled-components';
import { getThemeProperties } from '../../themes';

const path = ['graphInput', 'inputArea'];
const { backgroundColor, textColor } = getThemeProperties(path);

const TextArea = styled.textarea`
  background-color: ${backgroundColor};
  color: ${textColor};
  resize: none;
  :focus {
    outline: none;
  }
`;

const Error = styled.div`
  background-color: ${backgroundColor};
  color: red;
`;

const Info = styled.div`
  background-color: ${backgroundColor};
  color: Green;
`;


const InputArea = ({
  dot,
  error = '',
  info = '',
  onChange,
  submit,
}: {
  dot: string;
  error?: string;
  info?: string;
  onChange: (dot: string) => void;
  submit: () => void;
}) => (
  <>
    <TextArea
      rows={2}
      value={dot}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.ctrlKey && event.keyCode === 13) {
          submit();
        }
      }}
    />
    {error.trim().length !== 0 ? <Error>{error}</Error> : null}
    {info.trim().length !== 0 ? <Info>{info}</Info> : null}

  </>
);

export default InputArea;
