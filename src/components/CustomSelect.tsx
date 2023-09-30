import { FieldProps } from "formik";
import Select from "react-select";
import { OptionsType, ValueType } from "react-select/lib/types";
import { Tag } from "../Types";

interface CustomSelectProps extends FieldProps {
  options: OptionsType<Tag>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
}: CustomSelectProps) => {
  const onChange = (option: ValueType<Tag | Tag[]>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Tag[]).map((item: Tag) => item.value)
        : (option as Tag).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default CustomSelect;
