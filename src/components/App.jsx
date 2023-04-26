import { useState } from "react";
import {Section, Statistics, FeedbackOptions, Notification} from "components";

export const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackOptions = {good, neutral, bad};

  const handleUpdateState = (type) => {
    switch (type) {
      case 'good':
        setGood((prevState) => (prevState + 1));
        break;
      case 'neutral':
        setNeutral((prevState) => (prevState + 1));
        break;
      case 'bad':
        setBad((prevState) => (prevState + 1));
        break;
      default:
        console.log(`Error: "${type}" feedback option doesn't exist.`);
        return
    }
  }

  const countTotalFeedback = () => {
    return Object.values(feedbackOptions).reduce((total, number) => (total + number), 0)
  }

  const countPositiveFeedbackPercentage = () => {
    return (good === 0) ? 0 : Math.round((good / countTotalFeedback() * 100))
  }

  return (
    <>
      <Section title={'Please leave feedback'}>
      <FeedbackOptions
        options={Object.keys(feedbackOptions)} 
        onLeaveFeedback={handleUpdateState}
        />
      </Section>
      
      <Section title={'Statistics'}>
        {countTotalFeedback() === 0
        ? <Notification
            message={'There is no feedback'}  
          />
        : <Statistics
            good={good} 
            neutral={neutral} 
            bad={bad} 
            total={countTotalFeedback()} 
            positivePercentage={`${countPositiveFeedbackPercentage()}%`}
          />
        }
      </Section>
    </>
  ); 
}
