import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Input as ChakraInput, InputGroup } from "@chakra-ui/react";

type InputProps = {
  value: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  name: string;
  leftAddon?: ReactNode;
  leftElement?: ReactNode;
  onChange: (value: string, name: string) => void;
};

export const Input = ({
  value,
  type,
  onChange,
  placeholder,
  name,
  leftAddon,
  leftElement,
}: InputProps) => {
  return (
    <>
      <InputGroup>
        {leftAddon}
        {leftElement}
        <ChakraInput
          px={2}
          placeholder={placeholder}
          aria-label={placeholder}
          value={value}
          type={type ?? "text"}
          onChange={(e) => {
            e.preventDefault();
            onChange(e.target.value, name);
          }}
        />
      </InputGroup>
    </>
  );
};
