"use client";

import React, { useState, useEffect } from "react";
import { db } from "../../../lib/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

const CustomersPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [restaurantName, setRestaurantName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [googleReviewLink, setGoogleReviewLink] = useState("");
  const [isCustomReview, setIsCustomReview] = useState(false);
  const [customReview, setCustomReview] = useState("");
  const [generatedFeedback, setGeneratedFeedback] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const userId = queryParams.get("userId");

        if (!userId) {
          throw new Error("User ID not provided in the URL");
        }

        // Fetch questions from 'restaurants_packs'
        const docRefPacks = doc(db, "restaurants_packs", userId);
        const docSnapPacks = await getDoc(docRefPacks);

        if (docSnapPacks.exists()) {
          const data = docSnapPacks.data();
          const questionId = data.questions_pack || [];
          setLogoUrl(data.logoUrl || "/revue_logo.png");

          // Fetch details of each question from 'packs'
          const questionDocRef = doc(db, "packs", questionId);
          const questionDocSnap = await getDoc(questionDocRef);

          if (questionDocSnap.exists()) {
            const questionData = questionDocSnap.data();
            const allQuestions = questionData.questions || [];
            // Select 3 random questions
            const randomQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);
            setQuestions(randomQuestions);
          } else {
            console.error(`Question with ID ${questionId} not found in packs.`);
          }
        } else {
          console.error("No questions found for this user in restaurants_packs.");
        }

        // Fetch restaurant name and Google review link from 'restaurant_profiles'
        const docRefProfiles = doc(db, "restaurant_profiles", userId);
        const docSnapProfiles = await getDoc(docRefProfiles);

        if (docSnapProfiles.exists()) {
          const profileData = docSnapProfiles.data();
          setRestaurantName(profileData.name || "Your Restaurant");
          setGoogleReviewLink(profileData.googleReviews || "");
        } else {
          console.error("No profile found for this user in restaurant_profiles.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
  };

  const handleRating = (questionIndex, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [questionIndex]: rating,
    }));

    if (questionIndex === currentQuestionIndex && questionIndex < questions.length - 1) {
      setCurrentQuestionIndex(questionIndex + 1);
    }
  };

  const handleReset = () => {
    setRatings({});
    setCurrentQuestionIndex(0);
    setIsCustomReview(false);
    setCustomReview("");
  };

  const generateFeedback = async () => {
    try {
        // Prepare the prompt text
        const prompt = `
            You are a restaurant feedback generator. Your task is to create a first-person review based on the provided ratings, without explicitly mentioning numbers or stars. Instead, craft a smooth, natural, and engaging review that reflects the overall experience.

            Below are the aspects evaluated by the customer:
            ${questions.map((question, index) => {
                const rating = ratings[index] || 0;
                return `Aspect: "${question}" - Customer's impression: ${rating >= 4 ? "very positive" : rating === 3 ? "neutral" : "could be improved"}.`;
            }).join("\n")}

            Write a well-structured and natural review, maintaining a positive and constructive tone. Highlight strengths where applicable and provide subtle, polite suggestions for improvement when necessary. Ensure the review feels like a genuine customer experience, avoiding robotic or forced language.
        `;

        // Configure the request to the Gemini API
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDb22OMCKRmAe-98dziGzR4Jb6fAMsUaPw",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }],
                        },
                    ],
                }),
            }
        );

        if (response.ok) {
            const data = await response.json();

            // Extract the generated feedback from the response
            const generatedFeedback =
                data.candidates && data.candidates[0]?.content?.parts[0]?.text
                    ? data.candidates[0].content.parts[0].text
                    : "No feedback generated.";

            // Display the generated feedback
            setGeneratedFeedback(generatedFeedback.trim());
            setShowPopup(true);
            console.log(generatedFeedback.trim());
        } else {
            console.error("Error generating feedback:", response.statusText);
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
    }
  };

  const saveCopyReview = async () => {
    try {
      await navigator.clipboard.writeText(generatedFeedback);
      setShowPopup2(true)
    } catch (error) {
      console.error("Error calling Gemini API:", error);
    }
  };

  const renderStars = (questionIndex) => {
    const maxStars = 5;
    const rating = ratings[questionIndex] || 0;

    return (
      <div className="flex items-center space-x-2">
        {[...Array(maxStars)].map((_, index) => {
          const fullStarValue = (index + 1) * 2; // Full star value
          const halfStarValue = fullStarValue - 1; // Half star value
          const isFullStar = rating >= fullStarValue;
          const isHalfStar = rating === halfStarValue;

          return (
            <div key={index} className="relative flex items-center">
              {/* Half star */}
              <span
                onClick={() => handleRating(questionIndex, halfStarValue)}
                style={{
                  cursor: "pointer",
                  color: isHalfStar || isFullStar ? "#FFD700" : "#FFFFFF",
                  fontSize: "2rem",
                  width: "1rem",
                  overflow: "hidden",
                  display: "inline-block",
                }}
              >
                ★
              </span>
              {/* Full star */}
              <span
                onClick={() => handleRating(questionIndex, fullStarValue)}
                style={{
                  cursor: "pointer",
                  color: isFullStar ? "#FFD700" : "#FFFFFF",
                  fontSize: "2rem",
                  transform: "scaleX(-1)",
                  width: "1rem",
                  overflow: "hidden",
                  display: "inline-block",
                }}
              >
                ★
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#060911] relative">
      {/* Header */}
      <header className="w-full flex justify-between items-center text-white md:mt-4 md:max-w-[40%] md:p-0 p-4 mx-auto">
        <h1 className="text-lg font-bold">{restaurantName}</h1>
        <div className="flex justify-center p-4 items-center space-x-2 flex ">
          <img src={logoUrl} alt="Company Logo" className="h-12 w-auto" />
        </div>
      </header>

      {/* Intro Section */}
      {!isCustomReview && (
        <div className="w-full md:max-w-[40%] mx-auto px-4 md:px-0 text-left">
          <h2 className="text-[20px] text-white font-semibold">Generate Review</h2>
          <p className="text-[14px] text-white">
            Select stars for each question, we will automatically generate a review for you.
          </p>
        </div>
      )}

      {/* Content */}
      <div className="mt-8 w-full md:max-w-[40%] mx-auto px-4 md:px-0 space-y-6" style={{ paddingBottom: '15rem'}}>
        {!isCustomReview ? (
          questions.map((question, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg ${
                index <= currentQuestionIndex ? "bg-[#3571FF]" : "bg-gray-300"
              } text-white`}
              style={{
                opacity: index <= currentQuestionIndex ? 1 : 0.5,
                filter: index > currentQuestionIndex ? "blur(3px)" : "none",
              }}
            >
              <p className="text-lg mb-4">{question}</p>
              {renderStars(index)}
            </div>
          ))
        ) : (
          <textarea
            className="w-full p-4 rounded-lg text-black"
            placeholder="Write your review here..."
            value={customReview}
            onChange={(e) => setCustomReview(e.target.value)}
            rows={6}
          />
        )}

        <div
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full md:max-w-[40%] bg-[#3571FF] flex flex-col p-4 border-t-[12px] border-[#3571FF]"
          style={{ borderRadius: "12px 12px 0 0" }}
        >
          {Object.keys(ratings).length > 0 && !isCustomReview && (
            <button
              className="bg-white text-[#3571FF] text-[14px] py-2 px-4 rounded-[8px] font-semibold w-full mb-2"
              onClick={generateFeedback}
            >
              Generate
            </button>
          )}
          <div className="flex justify-around w-full">
            <button
              onClick={() => {
                if (googleReviewLink) {
                  window.open(googleReviewLink, "_blank");
                } else {
                  console.error("Google Review link not available.");
                }
              }}
              className="bg-white text-[#3571FF] text-[14px] py-2 px-4 rounded-[8px] font-semibold flex-1 mr-2"
            >
              Write Your Own Review
            </button>
            <button
              onClick={handleReset}
              className="bg-white text-[#3571FF] text-[14px] py-2 px-4 rounded-[8px] font-semibold flex-1 ml-2"
            >
              Reset
            </button>
          </div>
        </div>

      </div>

      {showPopup &&
      
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex md:justify-center md:items-center z-50">
          <div className="bg-white p-6 shadow-lg md:w-[40%] w-full h-full" style={{overflowY:"scroll", paddingBottom: "10rem"}}>
            <h2 className="text-xl text-[#030711] font-semibold text-left mb-2">Generated Review</h2>
            <p className="text-[14px] text-[#030711] font-regular text-left mb-8" style={{ lineHeight: '14px',}}>By saving the review, we will send it to the business. You can edit or cancel the review as well.</p>
            
            <div className="px-4 py-2 rounded-[30px] bg-[#3571FF]">
              <p className="text-left text-[60px] mb-0 text-white">"</p>
              <p className="text-center mb-4 text-white italic">{generatedFeedback}</p>
              <p className="text-right text-[60px] mb-0 text-white">"</p>
            </div>
            <div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full md:max-w-[40%] bg-[#3571FF] flex flex-col p-4 border-t-[12px] border-[#3571FF]"
              style={{ borderRadius: "12px 12px 0 0" }}
            >
                <button
                  className="bg-white text-[#3571FF] text-[14px] py-2 px-4 rounded-[8px] font-semibold w-full mb-2"
                  onClick={saveCopyReview}
                >
                  Save and copy review
                </button>
              <div className="flex justify-around w-full">
                <button
                  onClick={closePopup}
                  className="bg-white text-[#3571FF] text-[14px] py-2 px-4 rounded-[8px] font-semibold flex-1 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={closePopup}
                  className="bg-white text-[#3571FF] text-[14px] py-2 px-4 rounded-[8px] font-semibold flex-1 ml-2"
                >
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {showPopup2 && 
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-end z-50 h-full">
          <div className="bg-white rounded-t-[20px] shadow-lg md:w-[40%] w-full pt-6">
            <h2 className="text-xl text-[#030711] font-semibold text-left mb-2 px-6">Saved Review.</h2>
            <p className="text-[14px] text-[#030711] font-regular text-left mb-8 px-6" style={{ lineHeight: '14px' }}>
              The review is copied, now you can paste it on the following platforms:
            </p>

            <div className="w-full p-4" style={{ borderRadius: "12px 12px 0 0" }}>
              {googleReviewLink && 
                <button
                  className="bg-[#3571FF] text-[#fff] text-[14px] py-2 px-4 rounded-[8px] font-semibold w-full mb-2"
                  onClick={() => {
                    if (googleReviewLink) {
                      window.open(googleReviewLink, "_blank");
                    } else {
                      console.error("Google Review link not available.");
                    }
                  }}
                >
                  Google Review
                </button>
              }

              <div className="flex justify-around w-full">
                <button
                  onClick={closePopup2}
                  style={{ border: "1px solid #3571FF"}}
                  className="bg-white text-[#3571FF] text-[14px] py-2 px-4 rounded-[8px] font-semibold flex-1 mr-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      
    </div>
  );
};

export default CustomersPage;