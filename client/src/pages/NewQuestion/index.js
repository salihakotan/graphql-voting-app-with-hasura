import React, { useState } from "react";

import styles from "./styles.module.css";
import { useMutation } from "@apollo/client";
import { NEW_QUESTION_MUTATION } from "./queries";
import Loading from "../../components/Loading";

const initialOptions = [
  {
    title: "",
  },
  {
    title: "",
  },
  {
    title: "",
  },
];

function NewQuestion() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(initialOptions);

  const [addQuestion, {loading,error,data}] = useMutation(NEW_QUESTION_MUTATION)
  

  const handleChangeOption = ({target}) => {
        const newArray = options
        newArray[target.id].title = target.value
        setOptions([...newArray])
  }


  const handleSave = () => {


    const filledOptions = options.filter((option)=> option.title !== "")

    if(question === "" || filledOptions.length < 2) return false

    addQuestion({
        variables: {
            input:{
                title:question,
                options: {
                    data:filledOptions
                }
            }
        }
    })


    setQuestion("")
    setOptions(initialOptions)

  }

  return (
    <>
      <h1>New Question</h1>
      <br />

      <div className={styles.questionsGrid}>
        <label>
          <b>Question:</b>{" "}
        </label>
        <input disabled={loading}
          value={question}
          onChange={({ target }) => setQuestion(target.value)}
          placeholder="Type your question..."
        />
      </div>

      <br />
      <br />

      {options.map((option, index) => (
        <div className={styles.questionsGrid} key={index}>
          <label>
            <b>Option:</b>{" "}
          </label>
          <input disabled={loading} onChange={handleChangeOption} id={index} value={option.title} placeholder="Type an option" />
        </div>
      ))}

      <br />
      <div className={styles.questionsGrid}>
        <div>{/* empty div for grid */}</div>
        <div style={{ display: "flex", width: "250px" }}>
          <button disabled={loading} onClick={() => setOptions([...options, { title: "" }])}>
            New Option
          </button>
          <button disabled={loading} onClick={handleSave}>Save</button>
        </div>
      </div>
    </>
  );
}

export default NewQuestion;
