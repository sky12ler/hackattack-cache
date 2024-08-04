import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaStar, FaRegStar } from 'react-icons/fa';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const iconUrl = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";

const questions = [
    {
        question: "1. When you’re hungry, what’s your ideal place to eat?",
        options: [
            { answer: "A bustling shopping mall food court", category: "Shopping Malls" },
            { answer: "A local diner or restaurant with a varied menu", category: "Restaurants" },
            { answer: "A trendy café with light meals and coffee", category: "Cafes" },
            { answer: "A lively bar with small bites and drinks", category: "Bars" }
        ]
    },
    // Add more questions here
    {
        question: "2. Where would you most like to relax during the day?",
        options: [
            { answer: "At a bar with a lively atmosphere", category: "Bars" },
            { answer: "In a cozy café with a good book", category: "Cafes" },
            { answer: "At a scenic park or garden", category: "Parks/Outdoor Areas" },
            { answer: "At a large shopping mall", category: "Shopping Malls" }
        ]
    },
    {
        question: "3. How do you like to start your day?",
        options: [
            { answer: "With a hearty breakfast at a restaurant", category: "Restaurants" },
            { answer: "With a coffee and pastry", category: "Cafes" },
            { answer: "Taking a walk in a park", category: "Parks/Outdoor Areas" },
            { answer: "Exploring shops at a mall", category: "Shopping Malls" }
        ]
    },
    {
        question: "4. What’s your favorite way to spend an evening out?",
        options: [
            { answer: "Dining at a restaurant", category: "Restaurants" },
            { answer: "Enjoying drinks at a bar", category: "Bars" },
            { answer: "Relaxing at a café", category: "Cafes" },
            { answer: "Visiting a tourist attraction or event", category: "Tourist Attractions" }
        ]
    },
    {
        question: "5. What kind of environment do you prefer for socializing?",
        options: [
            { answer: "A bustling restaurant with good food", category: "Restaurants" },
            { answer: "A lively bar with music and entertainment", category: "Bars" },
            { answer: "A relaxed café with comfortable seating", category: "Cafes" },
            { answer: "A shopping mall with various activities", category: "Shopping Malls" }
        ]
    },
    {
        question: "6. Where do you like to spend a day out for fun and entertainment?",
        options: [
            { answer: "At a large shopping mall with various activities and stores", category: "Shopping Malls" },
            { answer: "Visiting a historical landmark or famous tourist spot", category: "Tourist Attractions" },
            { answer: "Exploring a beautiful park or nature reserve", category: "Parks/Outdoor Areas" },
            { answer: "Enjoying a vibrant nightlife scene at a bar", category: "Bars" }
        ]
    },
    {
        question: "7. Where do you like to go for leisure and recreation?",
        options: [
            { answer: "A large shopping mall for various activities", category: "Shopping Malls" },
            { answer: "An interesting tourist attraction or museum", category: "Tourist Attractions" },
            { answer: "A serene park for a leisurely stroll", category: "Parks/Outdoor Areas" },
            { answer: "A café with a pleasant atmosphere", category: "Cafes" }
        ]
    },
    {
        question: "8. What’s your preferred way to unwind after a busy day?",
        options: [
            { answer: "Having drinks at a bar", category: "Bars" },
            { answer: "Enjoying coffee or dessert at a café", category: "Cafes" },
            { answer: "Dining out at a restaurant", category: "Restaurants" },
            { answer: "Relaxing in a park or garden", category: "Parks/Outdoor Areas" }
        ]
    },
    {
        question: "9. What type of place do you seek for leisure and fun?",
        options: [
            { answer: "A large shopping mall for various activities", category: "Shopping Malls" },
            { answer: "An interesting tourist attraction or event", category: "Tourist Attractions" },
            { answer: "A peaceful park or outdoor space", category: "Parks/Outdoor Areas" },
            { answer: "A trendy café for relaxation", category: "Cafes" }
        ]
    },
    {
        question: "10. How would you like to explore a new city?",
        options: [
            { answer: "By visiting popular tourist attractions", category: "Tourist Attractions" },
            { answer: "By shopping at local malls and stores", category: "Shopping Malls" },
            { answer: "By dining at recommended restaurants", category: "Restaurants" },
            { answer: "By relaxing in parks and outdoor areas", category: "Parks/Outdoor Areas" }
        ]
    }
];

function Quiz({ onComplete }) {
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    const handleAnswerChange = (questionIndex, category) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = category;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const categoryCounts = answers.reduce((acc, category) => {
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        const maxCount = Math.max(...Object.values(categoryCounts));
        const topCategories = Object.keys(categoryCounts).filter(category => categoryCounts[category] === maxCount);

        onComplete(topCategories);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Answer the following Quiz to get Personalize Destination</h2>
            {questions.map((q, qi) => (
                <div key={qi} style={{ 
                    marginBottom: '30px', 
                    padding: '10px', 
                    border: '3.5px solid #ff715b', 
                    borderRadius: '10px',
                    backgroundColor: '#f9f9f9',
                    width: '90%', // Adjust width as needed
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}>
                    <p style={{ fontWeight: 'bold' }}>{q.question}</p> {/* Style the question in bold */}
                    {q.options.map((o, oi) => (
                        <label key={oi} style={{ display: 'block', margin: '5px 0' }}>
                            <input
                                type="radio"
                                name={`question-${qi}`}
                                value={o.category}
                                checked={answers[qi] === o.category}
                                onChange={() => handleAnswerChange(qi, o.category)}
                            />
                            {o.answer}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit} style={{ 
                padding: '10px 20px', 
                backgroundColor: '#ff715b', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' ,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            }}>Submit</button>
        </div>
    );
}

function Location() {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setLocation(currentLocation);
                },
                (err) => {
                    setError(err.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (isLoaded && location.lat && location.lng) {
            fetchNearbyPlaces(location);
        }
    }, [isLoaded, location, categories]);

    const fetchNearbyPlaces = (location) => {
        if (!window.google) {
            console.error('Google API is not loaded yet.');
            return;
        }
        
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            location: location,
            radius: '1000', // 1km radius
            type: categories.map(cat => cat.toLowerCase().replace(/ /g, '_')) // Adjust types based on categories
        };
    
        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const placesWithDetails = results.map(place => {
                    const types = place.types
                        .filter(type => type !== 'point_of_interest' && type !== 'establishment')
                        .map(type => type.replace(/_/g, ' ')) // Convert types to readable format
                        .join(', ') || 'N/A';
    
                    return {
                        name: place.name,
                        address: place.vicinity,
                        rating: place.rating || 0,
                        types: types,
                        detailedCategory: types, // Add detailed category information
                        photo: place.photos && place.photos.length > 0 ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 }) : null,
                        position: place.geometry.location
                    };
                });
                setPlaces(placesWithDetails);
            } else {
                console.error('Failed to fetch places:', status);
            }
        });
    };

    return (
        <div>
            {!quizCompleted && <Quiz onComplete={(categories) => { setCategories(categories); setQuizCompleted(true); }} />}
            
            {quizCompleted && (
                <>
                    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '3.5px solid #ff715b', alignItems: 'center'}}>
                        <h2>Quiz Results</h2>
                        <p>Based on your quiz answers, you might enjoy the following types of places:</p>
                        <ul>
                            {categories.map((category, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>
                                    <strong>{category}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <LoadScript
                        googleMapsApiKey="AIzaSyAJOUC_D-gDwpOI5RmOvMjqEbcvey4wGfc"
                        libraries={['places']}
                        onLoad={() => setIsLoaded(true)}
                    >
                        {location.lat && location.lng && (
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={location}
                                zoom={15}
                            >
                                <Marker position={location} title="Your location" />
                                {places.map((place, index) => (
                                    <Marker key={index} position={place.position} title={place.name} icon={iconUrl} />
                                ))}
                            </GoogleMap>
                        )}
                    </LoadScript>
                    <h2>Nearby Places:</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', maxWidth: '1200px' }}>
                    {places.map((place, index) => (
                        <div key={index} style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            width: '300px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
                        }}>
                            {place.photo && (
                                <img
                                    src={place.photo}
                                    alt={place.name}
                                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                                />
                            )}
                            <h3>{place.name}</h3>
                            <p>{place.address}</p>
                            <p>Types: {place.detailedCategory}</p> {/* Display detailed category */}
                            <p>
                                Rating: {Array.from({ length: 5 }, (_, i) => i < place.rating ? <FaStar key={i} style={{ color: 'yellow' }}/> : <FaRegStar key={i} style={{ color: 'yellow' }}/>)}
                            </p>
                        </div>
                    ))}
                    </div>
                </div>
                </>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default Location;