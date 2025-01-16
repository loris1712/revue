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
            setQuestions(questionData.questions || []);
          } else {
            console.error(`Question with ID ${questionId} not found in packs.`);
          }
        } else {
          console.error("No questions found for this user in restaurants_packs.");
        }

        // Fetch restaurant name from 'restaurant_profiles'
        const docRefProfiles = doc(db, "restaurant_profiles", userId);
        const docSnapProfiles = await getDoc(docRefProfiles);

        if (docSnapProfiles.exists()) {
          const profileData = docSnapProfiles.data();
          setRestaurantName(profileData.name || "Your Restaurant");
        } else {
          console.error("No profile found for this user in restaurant_profiles.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleRating = (questionIndex, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [questionIndex]: rating,
    }));

    if (questionIndex === currentQuestionIndex && questionIndex < questions.length - 1) {
      setCurrentQuestionIndex(questionIndex + 1);
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
    <div className="min-h-screen flex flex-col items-center bg-[#060911]">
      {/* Header */}
      <header className="w-full flex justify-between items-center text-white md:mt-4 md:max-w-[40%] md:p-0 p-4 mx-auto">
        <h1 className="text-lg font-bold">{restaurantName}</h1>
        <div className="flex justify-center p-4 items-center space-x-2 flex ">
          <img src={logoUrl} alt="Company Logo" className="h-12 w-auto" />
        </div>
      </header>

      {/* Intro Section */}
      <div className="w-full md:max-w-[40%] mx-auto px-4 md:px-0 text-left">
        <h2 className="text-[20px] text-white font-semibold">Generate Review</h2>
        <p className="text-[14px] text-white">
          Select stars for each question, we will automatically generate a review for you.
        </p>
      </div>

      {/* Content */}
      <div className="mt-8 w-full md:max-w-[40%] mx-auto px-4 md:px-0 space-y-6">
        {questions.map((question, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
