import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

export default function Testimonial() {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const apiKey = 'AIzaSyAeIX5Rxevekknjhm5QwHIdvcgGElQkWqg'; // Replace with your Google Translate API key
  const ttsApiKey = 'AIzaSyDAyQWN3ZQte4SDQZXWD8loCg1T3nLLxCk'; // Replace with your Google Text-to-Speech API key

  const translateText = async () => {
    if (!text || !targetLanguage) {
      setTranslatedText('Please enter text and select a target language.');
      return;
    }

    const url = "https://texttospeech.googleapis.com/v1/text:synthesize?key=${ttsApiKey}";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
        }),
      });
      const data = await response.json();

      if (data.data && data.data.translations && data.data.translations.length > 0) {
        setTranslatedText(data.data.translations[0].translatedText);
      } else {
        setTranslatedText('Error in translation.');
      }
    } catch (error) {
      console.error('Error during translation:', error);
      setTranslatedText('Error during translation.');
    }
  };

  const playTranslatedText = async () => {
    if (!translatedText) {
      alert('No translated text available. Please translate some text first.');
      return;
    }

    const url = "https://texttospeech.googleapis.com/v1/text:synthesize?key=${ttsApiKey}";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text: translatedText },
          voice: { languageCode: targetLanguage },
          audioConfig: { audioEncoding: 'MP3' }
        }),
      });
      const data = await response.json();

      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        setIsPlaying(true);

        audio.play();
        audio.onended = () => {
          setIsPlaying(false);
        };
      } else {
        alert('Error in text-to-speech.');
      }
    } catch (error) {
      console.error('Error during text-to-speech:', error);
      alert('Error in text-to-speech.');
    }
  };

  return (
    <Section id="blog">
      <div className="title">
        <h1>Do you want to understand a random native?</h1>
      </div>
      <div className="testimonials">
        <div className="testimonial">
          <div className="title">
            <h3>Text to Text Translation:</h3>
          </div>
          <textarea
            id="text"
            rows="6"
            cols="50"
            placeholder="Enter text here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <div className="container">
            <label htmlFor="language">Target Language:</label>
            <select
              id="language"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ms">Bahasa Malaysia</option>
              <option value="zh">Mandarin</option>
              <option value="ta">Tamil</option>
            </select>
            <button onClick={translateText}>Translate</button>
            <button
              id="playButton"
              onClick={playTranslatedText}
              className={isPlaying ? 'blink' : ''}
            >
              <FontAwesomeIcon icon={faVolumeUp} />
            </button>
          </div>

          <div id="translatedResult">
            {translatedText}
          </div>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  .title {
    display: flex;
    justify-content: center;
    h1 {
      text-align: center;
      font-size: 2rem;
      width: 70%;
    }
  }
  .testimonials {
    display: flex;
    gap: 2rem;
    .testimonial {
      flex: 1;
      margin-top: 4rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding: 2rem;
      height: max-content;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      border-top: 0.5rem solid var(--primary);
      border-radius: 0.5rem;
      .title {
        text-align: center;
      }
      textarea {
        border-radius: 0.5rem;
        padding: 0.5rem;
        border: 1px solid gray;
      }
      .container {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        select {
          border-radius: 0.7rem;
          padding: 0.7rem;
          border: 1px solid gray;
        }
        button {
          border-radius: 0.5rem;
          padding: 0.5rem 0.5rem;
          border: 2px solid gray;
          background-color: var(--primary);
          color: white;
        }
      }
      #playButton {
        background-color: grey;
        border: none;
        cursor: pointer;
        font-size: 2rem; /* Adjust the size of the icon */
      }
      #playButton.blink {
        animation: blink 1s step-start infinite;
      }
      @keyframes blink {
        50% {
          opacity: 0;
        }
      }
    }
  }
`;