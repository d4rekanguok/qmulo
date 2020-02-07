import { styled } from 'linaria/react'

export const Box = styled.div`
  display: inline-block;
  background-color: red;
  color: white;
  padding: 0.25em 0.5em;
  border-radius: ${({ br }) => br ? br : '4px'};
`