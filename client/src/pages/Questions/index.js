import { useSubscription } from "@apollo/client";
import React from "react";
import { QUESTIONS_SUBSCRIPTION } from "./queries";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

function Questions() {
  const { loading, error, data } = useSubscription(QUESTIONS_SUBSCRIPTION);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <>
      <h1>Questions</h1>
      {data.questions.map((question) => {
       return <div key={question.id}>
            <Link to={`question/${question.id}`}>{question.title}</Link>
       </div>;
      })}
    </>
  );
}

export default Questions;
