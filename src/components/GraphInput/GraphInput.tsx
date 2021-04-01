import { read } from 'graphlib-dot';
import React, { useState } from 'react';
import styled from 'styled-components';
import examples from '../../examples';
import InputArea from './InputArea';
import ExampleSelector from './ExampleSelector';
import UpdateArea from './UpdateArea';
import HttpUtil from '../HttpUtil';
import { message } from 'antd';
import debounce from "lodash/debounce";
import 'antd/dist/antd.css';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 100%;
    padding: 2px;
  }
`;

const success = () => {
  message
    .loading('Action in progress..', 2.5)
    .then(() => message.success('Loading finished', 2.5))
    .then(() => message.info('Loading finished is finished', 2.5));
};

export interface GraphInputProps {
  initialDot?: string;
  onUpdate: (dot: string) => void;
}

export const GraphInput = ({ initialDot = '', onUpdate }: GraphInputProps) => {
  const [link, setLink] = useState('');
  const [dot, setDot] = useState(initialDot);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [error, setError] = useState('');

  const updateDot = (newDot: string, updateGraph: boolean = true) => {
   
    setDot(newDot);
    message.info('Loading..., and it will disappear in 5 seconds', 5);

    HttpUtil.post("http://10.110.165.184:5001/api/codeGraph", newDot)
            .then(
                re=>{
                  console.log("返回结果222：",re);
                  console.log('re: ', re.data);
                  setLink(re.data);
                  console.log('setlinks: ', link);
                });
 
    if (updateGraph) {
      try {
        read(link);
        onUpdate(link);
        setError(``);
      } catch (err) {
        setError(`Parse Error: ${err.message}`);
      }
    }
  };

  const handleSumit = debounce( e => {
    updateDot(e)
    }, 5000);

  return (
    <Container>
      <InputArea
        dot={dot}
        error={error}
        onChange={(newDot) => updateDot(newDot, autoUpdate)}
        submit={() => updateDot(dot, true)}
      />
      <ExampleSelector
        examples={examples}
        onChange={(example) => updateDot(example)}
      />
      <UpdateArea
        update={() => handleSumit(dot)}
        setAutoUpdate={(shouldAutoUpdate) => setAutoUpdate(shouldAutoUpdate)}
      />
    </Container>
  );
};
