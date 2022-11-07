import styled from "styled-components"

export const CardContainer = styled.div`
  padding: 0.1rem 0.75rem 0.1rem 0.75rem;
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
    background-color: #27272c
  }
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const CentralizedFlexContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
`