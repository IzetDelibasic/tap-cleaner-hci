// -React-
import React from "react";
// -Props-
import PropTypes from "prop-types";

const FormRow = React.forwardRef(
  ({ type, name, labelText, defaultValue, onChange, placeholder }, ref) => {
    let pattern = "";

    if (type === "phone") {
      pattern = "[0-9]{3}-[0-9]{3}-[0-9]{3,4}";
    } else if (type === "password") {
      pattern = ".{8,}";
    }

    return (
      <div className="mb-4 w-[90%] lg:w-[85%]">
        <label
          htmlFor={name}
          className="font-normal uppercase font-montserrat text-[14px]"
        >
          {labelText || name}
        </label>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue || ""}
          ref={ref}
          className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3"
          onChange={onChange}
          pattern={pattern || undefined}
          placeholder={placeholder || ""}
          required
        />
      </div>
    );
  }
);

FormRow.displayName = "FormRow";

FormRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default FormRow;
