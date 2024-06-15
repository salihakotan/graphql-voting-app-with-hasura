import { useMutation, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NEW_VOTE_MUTATION, QUESTION_DETAIL_SUBSCRIPTION } from "./queries";
import Loading from "../../components/Loading";

function QuestionDetail() {
  const { id } = useParams();

  const [selectedOptionId, setSelectedOptionId] = useState();

  const { loading, error, data } = useSubscription(
    QUESTION_DETAIL_SUBSCRIPTION,
    {
      variables: {
        id,
      },
    }
  );

  const [isVoted, setIsVoted] = useState(false)

  const [newVote, { loading: loadingVote, data: voteData }] =
    useMutation(NEW_VOTE_MUTATION, {
      onCompleted:()=> setIsVoted(true)
    });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const {
    questions_by_pk: { options, title },
  } = data;

  const totalVotes = options.reduce(
    (t, value) => t + value.votes_aggregate.aggregate.count,
    0
  );

  const handleClickVote = () => {
    newVote({
      variables: {
        input: {
          option_id: selectedOptionId,
        },
      },
    });
  };






  
  return (
    <>
      <div>Question Detail {id}</div>
      <h1>{title}?</h1> 
 
      <div>
        {options.map((option, i) => (
          <div key={i}>
            <label style={{ display: "block" }} htmlFor={i} key={i}>
              <input
                id={i}
                style={{ width: "50px" }}
                name="selected"
                type="radio"
                value={option.id}
                onChange={({ target }) => setSelectedOptionId(target.value)}
              />
              <span>{option.title}</span>
              <span style={{marginLeft:"10px"}}>({((option.votes_aggregate.aggregate.count * 100) / (totalVotes===0 ? 1 : totalVotes)).toFixed(2)}%)</span>
            </label>

            {isVoted && (
              <div>
              <progress
                value={option.votes_aggregate.aggregate.count}
                max={totalVotes}
              />
            </div>
            )}
          </div>
        ))}

        <br />
        <br />
       
       {
        !isVoted &&  <button disabled={loadingVote} onClick={handleClickVote}>
          Vote
        </button>
       }
      </div>
    </>
  );
}

export default QuestionDetail;
