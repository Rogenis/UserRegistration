import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 745px;
  padding-right: 3rem;
  padding-left: 3rem;
  margin-right: auto;
  margin-left: auto;
  flex-direction: row;
  display: flex;
  gap: 4rem;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  margin-bottom: 460px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
`;

export const CardHeader = styled.div`
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  background-color: rgba(0,0,0,.03);
  border-bottom: 1px solid rgba(0,0,0,.125);
`;

export const CardBody = styled.div`
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  background-color: rgba(0,0,0,.03);
  border-bottom: 1px solid rgba(0,0,0,.125);
`;
