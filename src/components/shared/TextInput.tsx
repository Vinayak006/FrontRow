import type { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface TextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
}

const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  leftIcon,
  rightElement,
}: TextInputProps<T>) => {
  const inputId = String(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

          <InputGroup>
            <InputGroupInput
              {...field}
              id={inputId}
              type={type}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              onChange={(event) => {
                if (type === "number") {
                  const value = event.currentTarget.valueAsNumber;
                  field.onChange(Number.isNaN(value) ? undefined : value);
                } else {
                  field.onChange(event.currentTarget.value);
                }
              }}
            />

            {leftIcon && <InputGroupAddon>{leftIcon}</InputGroupAddon>}

            {rightElement && (
              <InputGroupAddon align="inline-end">
                {rightElement}
              </InputGroupAddon>
            )}
          </InputGroup>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default TextInput;
