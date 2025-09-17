"use client";

import "react-phone-number-input/style.css";
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
import {E164Number} from "libphonenumber-js/core";

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
  renderSkeleton?: boolean;
};

export enum FormFieldType {
  INPUT,
  TEXTAREA,
  PHONE,
  CHECKBOX,
  DATE,
  SELECT,
  SKELETON,
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldUI
      control={props.control}
      name={props.name}
      render={({field}) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && props.label && (
            <FormLabel>{props.label}</FormLabel>
          )}
          {(() => {
            switch (props.fieldType) {
              case FormFieldType.PHONE:
                return (
                  <FormControl>
                    <PhoneInput
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
