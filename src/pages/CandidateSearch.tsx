import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import CandidateCard from "../components/CandidateCard";
import type Candidate from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const currentCandidate = candidates[currentIndex];

  // fetching candidate data from the API once the page loads
  useEffect(() => {
    const fetchCandidates = async () => {
      const fetchedCandidates = await searchGithub(); // fetching the initial basic data from the searchGithub
      console.log(fetchedCandidates);

      const enrichedCandidates = await Promise.all(
        fetchedCandidates.map(async (candidate: Candidate) => {
          
          try {
            //if all is good and the user is found then give me the detailed data
            const detailedCandidate = await searchGithubUser(candidate.login); // fetching the detailed data by the login (username) from the seatchGithubUser
            console.log(`detailedCandidate:`, detailedCandidate);
            return { ...candidate, ...detailedCandidate }; // give me the data combined between both APIs
            
          } catch (error) {
            //gracefully taking care of the users that are not found
            if (error instanceof Error && error.message.includes("404")) {
              console.log(
                `user ${candidate.login} not found. Skipping to the next`
              );
              return null;
            }
            throw error; //if not 404 then show me the error
          }
        })
      );
      const validCandidates = enrichedCandidates.filter(candidate => candidate !== null);
      setCandidates(validCandidates);
    };

    // call the fetchCandidates function on page load to fetch the APIs
    fetchCandidates();
  }, []);

  // function to save a candidate
  const handleSave = () => {
    const currentCandidate = candidates[currentIndex];
    setSavedCandidates([...savedCandidates, currentCandidate]);
    addToSaved(currentCandidate);
    // once moved to the saved, let's get the next candidate
    handleNext();
  };

  // function to get the next candidate
  const handleNext = () => {
    if (currentIndex + 1 < candidates.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("no more candidates, reload the page"); 
    }
  };

  // function to add the current candidate to the savedCandidates list
  const addToSaved = (currentCandidate: Candidate) => {
    let parsedSavedCandidates: Candidate[] = [];
    const storedSavedCandidates = localStorage.getItem("savedCandidates");
    if (storedSavedCandidates) {
      parsedSavedCandidates = JSON.parse(storedSavedCandidates);
    }
    parsedSavedCandidates.push(currentCandidate);
    localStorage.setItem(
      "savedCandidates",
      JSON.stringify(parsedSavedCandidates)
    );
  };

  console.log(`currentCandidate:`, currentCandidate);
  

  // rendering the searched candidates one by one, if there are none anymore show the message
  return currentIndex + 1 < candidates.length ? (
    <div>
      <h1>Candidate Search</h1>
      <CandidateCard
        currentCandidate={currentCandidate}
        onSave={handleSave}
        onSkip={handleNext}
      />
    </div>
  ) : (
    <div>
    <h1>Candidate Search</h1>
    <p style={{textAlign:"center"}}>No more candidates to review. Refresh the page.</p>
    </div>
  );
};

export default CandidateSearch;
