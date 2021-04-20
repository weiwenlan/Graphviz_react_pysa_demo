// eslint-disable-next-line import/no-extraneous-dependencies
import type { GraphvizOptions } from 'd3-graphviz';
import React, { useState } from 'react';
import {
  GraphInput,
  Graphviz,
  Grid,
  OptionsSelector,
  Options,
  TabbedContainer,
  ThemePicker,
  Title,
} from './components';
import { themes } from './themes';
import logo from './img/example_2.png';


const defaults: Options<GraphvizOptions> = {
  fileNum: 20,
  engine: 'dot',
  func: 'multi',
  folderCalls: false,
  noEdges: false,
  cluster: false,
  community: false,
};

const allowedValues = {
  engine: ['dot', 'twopie'],
  func: ['allFile', 'module', 'multi', 'files'],
};

const App = () => {
  const [dot, setDot] = useState('https://github.com/bufordtaylor/python-texttable');
  const [graphOptions, setGraphOptions] = useState(defaults);

  const onUpdate = (newDot:string) => {
    console.log('1111111')
    setDot(newDot)

  }

  return (
    <>
    <ThemePicker themes={Object.keys(themes)}>
      <Title>Code Flow</Title>
      <Grid>
        <iframe title='test_frame' src="http://10.110.165.184:8080/back-end/demo.html" width='100%' height='100%'></iframe>

        <div>
        <img src={logo} alt="logo" style={{marginLeft: '10px', height:'700px', width: '460px', padding: '5px'}}></img>
        <TabbedContainer labels={['Input', 'Settings']}>

          <GraphInput initialDot={dot} options={graphOptions} onUpdate={onUpdate}/>
          <OptionsSelector
            options={graphOptions}
            onChange={(name, value) =>
              setGraphOptions({ ...graphOptions, [name]: value })
            }
            allowedValues={allowedValues}
          />
        </TabbedContainer>
        </div>
       
        {/* <Graphviz dot={dot} options={graphOptions} /> */}
        {/* <iframe id="testIframe" title="testIframe" src="/hello.html" height="100%" width="100%"></iframe> */}

      </Grid>
      
    </ThemePicker>
    </>
  );
};

export default App;
