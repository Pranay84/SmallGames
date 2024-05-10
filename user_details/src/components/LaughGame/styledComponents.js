import styled from "styled-components";

export const MainLaughContainer = styled.div`
display: flex;
flex-direction: column;
padding: 20px;
padding-left: 40px;
padding-right: 0px;
width: 80%;
color: white;
background-color: #0e0c11;
`

export const LaughContainerTimerCon = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const Timer = styled.p`
display: flex;
align-self: center;
background-color: white;
color: #0e0c11;
padding: 10px;
font-size: 18px;
border: 0px;
border-radius: 22px;
margin-right: 25px;
`

export const MainHeadingContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 10px;
`

export const GameName = styled.h1`
font-family: Lucida Handwriting;
font-weight: 600;
font-style: italic;
`

export const Emoji = styled.h3`
font-family: emoji;
font-size: 28px;
`

export const RuleName = styled.span`
font-family: cursive;
font-size: 20px;
font-weight: 500;
text-decoration: underline;
`

export const Rule = styled.p`
font-family: cursive;
font-size: 16px;
font-weight: 500;
`