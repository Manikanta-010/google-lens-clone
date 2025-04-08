import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #202124;
  min-height: 100vh;
  color: #fff;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const BackButton = styled.div`
  cursor: pointer;
  color: #8ab4f8;
  margin-right: 20px;
`;

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  color: #fff;
  margin: 0;
`;

const UploadedImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  margin: 20px 0;
`;

const Subtitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: #bdc1c6;
  margin-top: 20px;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 600px;
`;

const ResultImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const ImageResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image } = location.state || {};

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <ArrowBackIcon style={{ fontSize: 30 }} />
        </BackButton>
        <Title>Search Results</Title>
      </Header>
      {image ? (
        <UploadedImage src={image} alt="Uploaded" />
      ) : (
        <p style={{ color: '#ea4335' }}>No image provided.</p>
      )}
      <Subtitle>Related Images</Subtitle>
      <ResultsGrid>
        {Array.from({ length: 9 }).map((_, i) => (
          <ResultImage
            key={i}
            src={`https://picsum.photos/200/200?random=${i}`}
            alt="Related"
          />
        ))}
      </ResultsGrid>
    </Container>
  );
};

export default ImageResults;