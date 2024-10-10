import type React from "react";
import { useEffect, useState } from "react";
import type Candidate from "../interfaces/Candidate.interface";
import SavedCandidatesList from "../components/SavedCandidatesList";



const SavedCandidates = () => {
// define the candidatesSaved state variable
const [candidatesSaved, setCandidatesSaved] = useState<Candidate[]>([]);

//define the function to remove a candidate from the saved list
const removeFromStorage = (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  const index = e.currentTarget.value;
  const newCandidates = [...candidatesSaved];
  newCandidates.splice(Number(index), 1);
  setCandidatesSaved(newCandidates);
  localStorage.setItem('savedCandidates', JSON.stringify(newCandidates));
}

useEffect(() => {
  const parsedSavedCandidates: Candidate[] = JSON.parse(localStorage.getItem('savedCandidates') as string) ;
  setCandidatesSaved(parsedSavedCandidates);
}, []);

  return (candidatesSaved.length > 0) ? (
    <>
      <h1>Potential Candidates</h1>
      <SavedCandidatesList
        candidatesSaved={candidatesSaved}
        removeFromStorage={removeFromStorage}
      />
      </>  ) : (
        <p>No candidates have been accepted</p>
      )
};

export default SavedCandidates;
