import PropTypes from 'prop-types';
import css from './Feedback.module.css';

function FeedbackOptions({ options, onLeaveFeedback }) {
  return options.map(option => {
    return (
      <button
        type="button"
        className={css.button}
        key={option}
        onClick={() => onLeaveFeedback({ type: option })}
      >
        {option}
      </button>
    );
  });
}

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  onLeaveFeedback: PropTypes.func.isRequired,
};

export default FeedbackOptions;
