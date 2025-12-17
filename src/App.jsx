import classNames from "classnames";
import "./App.css";

function FormInputGroup({
  id,
  label,
  value,
  onChange,
  error,
  symbol,
  symbolPosition = "left",
}) {
  const wrapperClass = classNames("form-group__control", {
    "form-group__control--error": error,
    "form-group__control--reverse": symbolPosition === "right",
  });

  const symbolClass = classNames("form-group__symbol", {
    "form-group__symbol--error": error,
  });

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-group__label">
        {label}
      </label>

      <div className={wrapperClass}>
        <span className={symbolClass}>{symbol}</span>
        <input
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          className="form-group__input"
        />
      </div>

      {error && <span className="form-group__error-msg">{error}</span>}
    </div>
  );
}

function RadioGroup({ label, selectedValue, onChange, error }) {
  const options = [
    { label: "Repayment", value: "repayment" },
    { label: "Interest Only", value: "interest-only" },
  ];

  return (
    <div className="radio-group">
      <span className="radio-group__label">{label}</span>

      <div className="radio-group__options">
        {options.map((option) => {
          const optionClass = classNames("radio-option", {
            "radio-option--selected": selectedValue === option.value,
          });

          return (
            <label key={option.value} className={optionClass}>
              <input
                type="radio"
                name="mortgagetype"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="radio-option__input"
              />
              <span className="radio-option__text">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error && <span className="radio-group__error-msg">{error}</span>}
    </div>
  );
}

function App() {
  return <div className="App"></div>;
}

export default App;
