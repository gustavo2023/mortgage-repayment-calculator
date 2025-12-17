import { useState } from "react";
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

function MortgageForm({ calculateMortgage }) {
  const [formData, setFormData] = useState({
    amount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  function handleClear() {
    setFormData({
      amount: "",
      mortgageTerm: "",
      interestRate: "",
      mortgageType: "",
    });
    setErrors({});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.amount) newErrors.amount = "This field is required";
    if (!formData.mortgageTerm)
      newErrors.mortgageTerm = "This field is required";
    if (!formData.interestRate)
      newErrors.interestRate = "This field is required";
    if (!formData.mortgageType)
      newErrors.mortgageType = "This field is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      calculateMortgage(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mortgage-form">
      <div className="mortgage-form__header">
        <h1>Mortgage Calculator</h1>
        <button
          type="button"
          onClick={handleClear}
          className="mortgage-form__clear-btn"
        >
          Clear All
        </button>
      </div>

      <FormInputGroup
        id="mortgageAmount"
        label="Mortgage Amount"
        value={formData.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        error={errors.amount}
        symbol="£"
      />

      <FormInputGroup
        id="mortgageTerm"
        label="Mortgage Term"
        value={formData.mortgageTerm}
        onChange={(e) => handleChange("mortgageTerm", e.target.value)}
        error={errors.mortgageTerm}
        symbol="years"
        symbolPosition="right"
      />

      <FormInputGroup
        id="interestRate"
        label="Interest Rate"
        value={formData.interestRate}
        onChange={(e) => handleChange("interestRate", e.target.value)}
        error={errors.interestRate}
        symbol="%"
        symbolPosition="right"
      />

      <RadioGroup
        label="Mortgage Type"
        selectedValue={formData.mortgageType}
        onChange={(value) => handleChange("mortgageType", value)}
        error={errors.mortgageType}
      />

      <button type="submit" className="calculate-btn">
        <span>
          <img src="/images/icon-calculator.svg" alt="Calculator icon" />
        </span>
        <span>Calculate Repayments</span>
      </button>
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <MortgageForm calculateMortgage={() => {}} />
    </div>
  );
}

export default App;
