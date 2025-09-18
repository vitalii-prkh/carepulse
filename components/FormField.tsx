"use client";

import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import Image from "next/image";
import {Control, FieldValues, type FieldPath} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import {
  FormControl,
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {E164Number} from "libphonenumber-js/core";
import DatePicker from "react-datepicker";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Dropzone} from "@/components/ui/dropzone";
import {Checkbox} from "@/components/ui/checkbox";

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  fieldType: FormFieldType;
  name: TName;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  options?: Array<{
    value: string;
    label: string;
    image?: string;
  }>;
};

export enum FormFieldType {
  INPUT,
  TEXTAREA,
  PHONE,
  CHECKBOX,
  RADIO,
  DATE,
  SELECT,
  FILE,
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>) {
  const id = React.useId();

  return (
    <FormFieldUI
      control={props.control}
      name={props.name}
      render={({field}) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && props.label && (
            <FormLabel htmlFor={id}>{props.label}</FormLabel>
          )}
          {(() => {
            switch (props.fieldType) {
              case FormFieldType.PHONE:
                return (
                  <FormControl>
                    <PhoneInput
                      id={id}
                      defaultCountry="US"
                      placeholder={props.placeholder}
                      international
                      withCountryCallingCode
                      value={field.value as E164Number}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className="input-phone"
                    />
                  </FormControl>
                );
              case FormFieldType.DATE:
                return (
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                      src="/assets/icons/calendar.svg"
                      height={24}
                      width={24}
                      alt="calendar"
                      className="ml-2"
                    />
                    <FormControl>
                      <DatePicker
                        id={id}
                        selected={
                          field.value && new Date(field.value) instanceof Date
                            ? new Date(field.value)
                            : null
                        }
                        onChange={(date) => field.onChange(date?.toISOString())}
                        dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                        showTimeSelect={props.showTimeSelect}
                        timeInputLabel="Time:"
                        wrapperClassName="date-picker"
                      />
                    </FormControl>
                  </div>
                );
              case FormFieldType.RADIO:
                return (
                  <FormControl>
                    <RadioGroup
                      className="flex h-11 gap-6 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {props.options?.map((option) => (
                        <div
                          key={option.value}
                          className="radio-group"
                        >
                          <RadioGroupItem
                            id={option.value}
                            value={option.value}
                          />
                          <Label
                            htmlFor={option.value}
                            className="cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                );
              case FormFieldType.CHECKBOX:
                return (
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Checkbox
                        {...field}
                        id={id}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor={id}
                        className="checkbox-label"
                      >
                        {props.label}
                      </label>
                    </div>
                  </FormControl>
                );
              case FormFieldType.SELECT:
                return (
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger
                          id={id}
                          className="shad-select-trigger"
                        >
                          <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="shad-select-content">
                        {props.options?.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              {option.image && (
                                <Image
                                  src={option.image}
                                  width={32}
                                  height={32}
                                  alt={option.label}
                                  className="rounded-full border border-dark-500"
                                />
                              )}
                              <p>{option.label}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                );
              case FormFieldType.TEXTAREA:
                return (
                  <FormControl>
                    <Textarea
                      {...field}
                      id={id}
                      placeholder={props.placeholder}
                      disabled={props.disabled}
                      className="shad-textArea"
                    />
                  </FormControl>
                );
              case FormFieldType.FILE:
                return (
                  <FormControl>
                    <Dropzone
                      id={id}
                      files={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                );
              case FormFieldType.INPUT:
              default:
                return (
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                      <Image
                        src={props.iconSrc}
                        height={24}
                        width={24}
                        alt={props.iconAlt || "icon"}
                        className="ml-2"
                      />
                    )}
                    <FormControl>
                      <Input
                        {...field}
                        id={id}
                        placeholder={props.placeholder}
                        className="shad-input border-0"
                      />
                    </FormControl>
                  </div>
                );
            }
          })()}
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}
