import { DatePicker, Form, Input, Select } from "antd";
import PhoneInput from "antd-phone-input";

export const RetailerFormInput = ({ fields, form }) => {
  return fields.map((field) => (
    <Form.Item
      key={field.label}
      label={field.label}
      className={field.className}
      rules={field.rules}
    >
      {field.type === "text" && <Input placeholder={field.placeholder} />}
      {field.type === "phone" && <PhoneInput enableSearch />}
      {field.type === "date" && (
        <DatePicker className={field.datePickerClass} />
      )}
      {field.type === "select" && (
        <Select placeholder={field.placeholder}>
          {field.options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  ));
};
