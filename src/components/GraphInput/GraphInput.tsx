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


export interface GraphInputProps {
  initialDot: string;
  options: { [key: string]: string | number | boolean };
  onUpdate: (dot: string) => void;
}

export const GraphInput = ({ initialDot, options, onUpdate}: GraphInputProps) => {

  const [link, setLink] = useState('');
  // const [dot, setDot] = useState(initialDot);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [error, setError] = useState('');

  console.log('test11111: ', options)

  const updateDot = (newDot: string, updateGraph: boolean = true) => {

    // setDot(newDot);
    onUpdate(newDot)
    console.log('dot1234: ', newDot)

    const data = {newDot,options}
    console.log('test22222: ', data)

    message.info('Action in progress...', 5);

    HttpUtil.post("http://10.110.165.184:5001/api/codeGraph", data)
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
        // setError(`Parse Error: ${err.message}`);
      }
    }
  };

  const handleSumit = debounce( e => {
    updateDot(e)
    }, 3000);

  return (
    <Container>
      <InputArea
        dot={initialDot}
        error={error}
        onMyChange={(newDot) => updateDot(newDot, autoUpdate)}
        submit={() => updateDot(initialDot, true)}
      />
      <ExampleSelector
        examples={examples}
        onChange={(example) => updateDot(example)}
      />
      <UpdateArea
        update={() => handleSumit(initialDot)}
        setAutoUpdate={(shouldAutoUpdate) => setAutoUpdate(shouldAutoUpdate)}
      />
    </Container>
  );
};
