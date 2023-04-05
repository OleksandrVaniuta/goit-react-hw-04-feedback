import React, { useReducer } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './Feedback/Feedback';
import Statistic from './Statistics/Statistics';
import Notification from './Notification/Notification';
import css from './App.module.css';

function reduce(mark, action) {
  switch (action.type) {
    case 'good':
      return { ...mark, good: mark.good + 1 };
    case 'neutral':
      return { ...mark, neutral: mark.neutral + 1 };
    case 'bad':
      return { ...mark, bad: mark.bad + 1 };
    default:
      throw new Error();
  }
}

export default function App() {
  const [mark, setMark] = useReducer(reduce, {
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => {
    return Object.values(mark).reduce((acc, option) => acc + option, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const positiveValue = Math.round((100 * mark.good) / countTotalFeedback());
    return countTotalFeedback() === 0 ? 0 : positiveValue;
  };

  const { good, neutral, bad } = mark;

  return (
    <div className={css.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(mark)}
          onLeaveFeedback={setMark}
        />
      </Section>
      <Section title="Statistic">
        {countTotalFeedback() ? (
          <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistic>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}
