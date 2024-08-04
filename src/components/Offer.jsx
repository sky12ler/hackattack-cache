import React from "react";
import styled from "styled-components";


export default function Offer() {
  return (
    <Section id="offer">
      <div className="map">
        {/* Placeholder for Google Maps integration */}
        <p>Google Map will be integrated here.</p>
        {/* Example iframe for a placeholder map */
        <iframe
        src="https://www.google.com/maps/embed?pb=..."
        allowFullScreen
        loading="lazy"
        title="Google Map"
      ></iframe>}
        
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 8rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .map {
    width: 500%;
    height: 1000px;
    00px; /* Default height for desktop */
    position: relative;
    background-color: #f5f5f5; /* Optional: Light gray background */
    border-radius: 8px; /* Optional: Rounded corners */

    p {
      text-align: center;
      font-size: 1.2rem;
      color: #333;
      margin-top: 1rem;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  @media screen and (max-width: 768px) {
    margin: 5rem 1rem;

    .map {
      height: 300px; /* Adjust height for smaller screens */
      p {
        font-size: 1rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .map {
      height: 250px; /* Further adjust height for very small screens */
      p {
        font-size: 0.9rem;
      }
    }
  }
`;
