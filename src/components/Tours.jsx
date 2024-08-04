import React, { useState } from "react";
import styled from "styled-components";
import { BsFillStarFill } from "react-icons/bs";
import tour1 from "../assets/tour1.png";
import tour2 from "../assets/tour2.png";
import tour3 from "../assets/tour3.png";
import vector1 from "../assets/vector1.png";
import vector2 from "../assets/vector2.png";
import ellipse from "../assets/ellipse.png";

export default function Tours() {
  const [selectedTour, setSelectedTour] = useState(null);
  
  const data = [
    {
      image: tour1,
      title: "Santorini, Oia Greece",
      price: 2000,
      reviews: "5k Reviews",
    },
    {
      image: tour2,
      title: "Lighthouse, Bellwood",
      price: 4000,
      reviews: "5k Reviews",
    },
    {
      image: tour3,
      title: "Riverfront, Japan",
      price: 3000,
      reviews: "5k Reviews",
    },
  ];

  const handlePopupOpen = (tour) => {
    setSelectedTour(tour);
  };

  const handlePopupClose = () => {
    setSelectedTour(null);
  };

  return (
    <Section id="tour">
      <h2>Here's Your Destination</h2>
      <img src={ellipse} alt="ellipse" className="ellipse" />
      <div className="tours">
        {data.map((tour, index) => {
          return (
            <div className="tour" key={tour.title} onClick={() => handlePopupOpen(tour)}>
              <div className="image">
                <img src={tour.image} alt="tour" />
                {index === 1 && (
                  <div className="vectors">
                    <img src={vector1} alt="vector" className="vector1" />
                    <img src={vector2} alt="vector" className="vector2" />
                  </div>
                )}
              </div>
              <div className="info">
                <div className="details">
                  <h4>{tour.title}</h4>
                  <div className="price-details">
                    <span className="price">${tour.price}</span>
                    <div className="reviews">
                      <div className="stars">
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                      </div>
                      <span className="review">{tour.reviews}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedTour && (
        <PopupOverlay onClick={handlePopupClose}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <img src={selectedTour.image} alt="tour" className="popup-image" />
            <h4>{selectedTour.title}</h4>
            <p className="price">${selectedTour.price}</p>
            <p className="reviews">{selectedTour.reviews}</p>
            <button onClick={handlePopupClose}>Close</button>
          </PopupContent>
        </PopupOverlay>
      )}
    </Section>
  );
}

const Section = styled.section`
  margin-top: 15rem;
  margin-bottom: 5rem;
  position: relative;
  .ellipse {
    position: absolute;
    right: -5rem;
    top: -20rem;
    height: 30rem;
  }
  h2 {
    text-align: center;
    transform: translateY(-150px);
    font-size: 3rem;
    margin-bottom: 3rem;
  }
  .tours {
    display: flex;
    gap: 1rem;
    justify-content: center;
    .tour {
      position: relative;
      cursor: pointer;
      &:nth-of-type(2) {
        transform: translateY(-150px);
      }
      .image {
        img {
          height: 25rem;
        }
        .vectors {
          .vector1 {
            position: absolute;
            height: 8rem;
            top: 0rem;
            left: -9rem;
          }
          .vector2 {
            position: absolute;
            height: 8rem;
            top: 0rem;
            right: -8rem;
          }
        }
      }
      .info {
        position: absolute;
        bottom: -30px;
        right: 0;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        .details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          .price-details {
            display: flex;
            gap: 1rem;
            .price {
              color: var(--primary-color);
              font-weight: bolder;
            }
            .reviews {
              display: flex;
              gap: 0.5rem;
              .stars {
                svg {
                  color: #ffc01e;
                }
              }
              .review {
                color: var(--secondary-text);
              }
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 0 2rem;
    .ellipse {
      display: none;
    }
    h2 {
      transform: translateY(0px);
      font-size: 2rem;
    }
    .tours {
      flex-direction: column;
      gap: 5rem;
      .tour {
        &:nth-of-type(2) {
          transform: translateY(0);
        }
        button {
          display: none !important;
        }
        .image {
          img {
            max-inline-size: 100%;
            block-size: auto;
          }
          .vectors {
            display: none;
          }
        }
      }
    }
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;

  .popup-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
`;
