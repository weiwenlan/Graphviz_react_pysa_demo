import React from 'react';
import styled from 'styled-components';
import { getThemeProperties } from '../themes';

const { backgroundColor } = getThemeProperties();

const Container = styled.div`
  background-color: ${backgroundColor};
  display: grid;
  grid-template-columns: 6fr 2fr;
`;

//  justify-content: center;

const Item = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 10px;
`;

interface GridProps {
  columns?: number;
}

const Grid = ({
  children,
  columns = React.Children.count(children),
}: GridProps & { children: React.ReactNode }) => (
  <Container>
    {React.Children.map(children, (child) => (
      <Item>{child}</Item>
    ))}
  </Container>
);

export default Grid;
