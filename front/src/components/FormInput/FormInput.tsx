import React, { useState, useEffect } from "react";
import { Input, Form } from "antd";

import s from "./FormInput.module.scss";

interface IFormInput {
  title: string;
  textarea?: boolean;
  required?: boolean;
  customClass?: string;
  maxLength?: number;
  initialValue?: string;
}

export const FormInput: React.FC<IFormInput> = ({
  title,
  textarea,
  required,
  customClass,
  maxLength,
  initialValue,
}) => {
  const [currentValue, setCurrentValue] = useState<string>("");

  return textarea ? (
    <div className={`${s.customTextarea} ${customClass ? customClass : ""}`}>
      <Form.Item name={title} rules={[{ required: required }]}>
        <Input.TextArea
          name={title}
          placeholder="   "
          onChange={(e) => setCurrentValue(e.target.value)}
          maxLength={maxLength ? maxLength : -1}
        />
      </Form.Item>
      <label
        className={`${s.labelInside} ${
          currentValue || initialValue ? s.valueAppears : ""
        }`}
      >
        {title}
      </label>
    </div>
  ) : (
    <div className={`${s.customInput} ${customClass ? customClass : ""}`}>
      <Form.Item name={title} rules={[{ required: required }]}>
        <Input
          name={title}
          onChange={(e) => setCurrentValue(e.target.value)}
          maxLength={maxLength ? maxLength : -1}
        />
      </Form.Item>
      <label
        className={`${s.labelInside} ${
          currentValue || initialValue ? s.valueAppears : ""
        }`}
      >
        {title}
      </label>
    </div>
  );
};
