import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
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

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
`;

const ImageContainer = styled.div`
  margin: 20px 0;
  max-width: 100%;
`;

const ImageSearch = () => {
  const [image, setImage] = useState('');
  const [crop, setCrop] = useState({ aspect: 1, unit: '%', width: 50, height: 50 });
  const [croppedImage, setCroppedImage] = useState({});
  const [imageRef, setImageRef] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
      setImage(photo.webPath);
      setError('');
    } catch (err) {
      setError('Failed to access camera. Please try again.');
    }
  };

  const uploadFromGallery = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });
      setImage(photo.webPath);
      setError('');
    } catch (err) {
      setError('Failed to access gallery. Please try again.');
    }
  };

  const onImageLoad = (img) => {
    setImageRef(img);
  };

  const makeCrop = () => {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        imageRef,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const croppedImg = canvas.toDataURL('image/jpeg');
      setCroppedImage({ dataUrl: croppedImg });
    } else {
      setError('Unable to crop the image. Please try again.');
    }
  };

  const search = () => {
    if (croppedImage.dataUrl) {
      navigate('/image-results', { state: { image: croppedImage.dataUrl } });
    } else {
      setError('Please crop the image before searching.');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <ArrowBackIcon style={{ fontSize: 30 }} />
        </BackButton>
        <Title>Google Lens</Title>
      </Header>
      {error && <p style={{ color: '#ea4335' }}>{error}</p>}
      <Button onClick={takePhoto}>Take Photo</Button>
      <Button onClick={uploadFromGallery}>Upload from Gallery</Button>
      {image && (
        <ImageContainer>
          <ReactCrop
            src={image}
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onImageLoaded={onImageLoad}
            style={{ maxWidth: '100%' }}
          />
          <Button onClick={makeCrop}>Crop</Button>
        </ImageContainer>
      )}
      {croppedImage.dataUrl && (
        <ImageContainer>
          <img src={croppedImage.dataUrl} alt="Cropped" style={{ maxWidth: '100%' }} />
          <Button onClick={search}>Search</Button>
        </ImageContainer>
      )}
    </Container>
  );
};

export default ImageSearch;