import React from "react";

import s from "./CustomInput.module.scss";

interface ICustomInput {
  value: string;
  setValue: Function;
  title: string;
  textarea?: boolean;
  required?: boolean;
  customClass?: string;
  maxLength?: number;
}

export const CustomInput: React.FC<ICustomInput> = ({
  value,
  setValue,
  title,
  textarea,
  required,
  customClass,
  maxLength,
}) => {
  return textarea ? (
    <div className={`${s.customTextarea} ${customClass ? customClass : ""}`}>
      <textarea
        name={title}
        placeholder="   "
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength ? maxLength : -1}
      />
      <label className={s.labelInside}>{title}</label>
    </div>
  ) : (
    <div className={`${s.customInput} ${customClass ? customClass : ""}`}>
      <input
        name={title}
        placeholder="   "
        value={value}
        required={required}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength ? maxLength : -1}
      />
      <label className={s.labelInside}>{title}</label>
    </div>
  );
};
