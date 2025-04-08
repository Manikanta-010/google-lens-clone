import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MicIcon from '@mui/icons-material/Mic';
import CameraIcon from '@mui/icons-material/CameraAlt';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsIcon from '@mui/icons-material/Settings';

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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const GoogleLogo = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  color: #fff;
  margin: 0;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #303134;
  border-radius: 24px;
  padding: 10px 15px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
`;

const SearchIconWrapper = styled.span`
  margin-right: 10px;
  color: #8ab4f8;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  color: #fff;
  outline: none;
  &::placeholder {
    color: #bdc1c6;
  }
`;

const Icon = styled.span`
  margin-left: 10px;
  cursor: pointer;
  color: #8ab4f8;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
`;

const IconButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #bdc1c6;
  font-size: 12px;
`;

const IconCircle = styled.div`
  background-color: #303134;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const FeedContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const FeedCard = styled.div`
  background-color: #303134;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const FeedImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 10px;
`;

const FeedText = styled.div`
  color: #bdc1c6;
  font-size: 14px;
`;

const VoicePrompt = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const VoiceText = styled.h2`
  color: #fff;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 20px;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  animation: pulse 1s infinite alternate;
  @keyframes pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.5);
    }
  }
`;

const SearchResults = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

const ResultItem = styled.div`
  background-color: #303134;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  color: #bdc1c6;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #303134;
  color: #fff;
  padding: 20px;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #bdc1c6;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const SidebarIcon = styled.span`
  margin-right: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  z-index: 999;
`;

const Homepage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim()) {
      const mockResults = [
        `Result 1 for "${searchText}"`,
        `Result 2 for "${searchText}"`,
        `Result 3 for "${searchText}"`,
      ];
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMicClick = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchText(transcript);
        setIsListening(false);
        setSearchResults([
          `Voice Result 1 for "${transcript}"`,
          `Voice Result 2 for "${transcript}"`,
          `Voice Result 3 for "${transcript}"`,
        ]);
      };
      recognition.onerror = () => {
        setIsListening(false);
        alert('Speech recognition failed. Please try again.');
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  const handleCameraClick = () => {
    navigate('/image-search');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      {isListening && (
        <VoicePrompt>
          <VoiceText>Speak now</VoiceText>
          <DotsContainer>
            <Dot color="#4285f4" />
            <Dot color="#ea4335" />
            <Dot color="#fbbc05" />
            <Dot color="#34a853" />
          </DotsContainer>
        </VoicePrompt>
      )}

      <Overlay $isOpen={isSidebarOpen} onClick={toggleSidebar} />
      <Sidebar $isOpen={isSidebarOpen}>
        <SidebarItem>
          <SidebarIcon>👤</SidebarIcon>
          Manage your Google Account
        </SidebarItem>
        <SidebarItem>
          <SidebarIcon>🕶️</SidebarIcon>
          Turn on Incognito
        </SidebarItem>
        <SidebarItem>
          <SidebarIcon>🕒</SidebarIcon>
          Search history
        </SidebarItem>
        <SidebarItem>
          <SidebarIcon>🔒</SidebarIcon>
          SafeSearch
        </SidebarItem>
        <SidebarItem>
          <SidebarIcon>⚙️</SidebarIcon>
          Settings
        </SidebarItem>
      </Sidebar>

      <Header>
        <AccountCircleIcon
          style={{ color: '#8ab4f8', fontSize: 30, cursor: 'pointer' }}
          onClick={toggleSidebar}
        />
        <GoogleLogo>Google</GoogleLogo>
        <div style={{ width: 30 }} />
      </Header>

      <SearchBarContainer>
        <SearchIconWrapper>
          <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
        </SearchIconWrapper>
        <Input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Icon onClick={handleMicClick}>
          <MicIcon />
        </Icon>
        <Icon onClick={handleCameraClick}>
          <CameraIcon />
        </Icon>
      </SearchBarContainer>

      {searchResults.length > 0 ? (
        <SearchResults>
          {searchResults.map((result, index) => (
            <ResultItem key={index}>{result}</ResultItem>
          ))}
        </SearchResults>
      ) : (
        <>
          <IconsContainer>
            <IconButton>
              <IconCircle>
                <CloudIcon style={{ color: '#8ab4f8' }} />
              </IconCircle>
              Weather
            </IconButton>
            <IconButton>
              <IconCircle>
                <AirIcon style={{ color: '#8ab4f8' }} />
              </IconCircle>
              Air quality
            </IconButton>
            <IconButton>
              <IconCircle>
                <MusicNoteIcon style={{ color: '#8ab4f8' }} />
              </IconCircle>
              Music
            </IconButton>
            <IconButton>
              <IconCircle>
                <SettingsIcon style={{ color: '#8ab4f8' }} />
              </IconCircle>
              Settings
            </IconButton>
          </IconsContainer>

          <FeedContainer>
            {[
              {
                title: "This superstar was Ratan Tata’s closest friend, shared same room, went for picnics...",
                image: "https://picsum.photos/80/80?random=1",
              },
              {
                title: "Top 10 tips for better productivity in 2025",
                image: "https://picsum.photos/80/80?random=2",
              },
              {
                title: "New tech trends to watch out for this year",
                image: "https://picsum.photos/80/80?random=3",
              },
            ].map((item, index) => (
              <FeedCard key={index}>
                <FeedImage src={item.image} alt="Feed" />
                <FeedText>{item.title}</FeedText>
              </FeedCard>
            ))}
          </FeedContainer>
        </>
      )}
    </Container>
  );
};

export default Homepage;