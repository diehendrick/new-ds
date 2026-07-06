import React, { useId, useRef, useState } from "react";
import {
  MdAdd,
  MdCheck,
  MdCheckCircle,
  MdDelete,
  MdError,
  MdErrorOutline,
  MdFavorite,
  MdHome,
  MdInfo,
  MdMail,
  MdPerson,
  MdSearch,
  MdSettings,
  MdStar,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

type TextFieldSize = "Small" | "Medium" | "Large";
type TextFieldInteraction = "Default" | "Hover" | "Disabled";
type TextFieldValidation = "None" | "Error" | "Success";

export type IconName =
  | "none"
  | "Add"
  | "Check"
  | "CheckCircle"
  | "Delete"
  | "Error"
  | "ErrorOutline"
  | "Favorite"
  | "Home"
  | "Info"
  | "Mail"
  | "Person"
  | "Search"
  | "Settings"
  | "Star"
  | "Visibility"
  | "VisibilityOff";

const ICON_MAP: Record<IconName, React.ComponentType<{ className?: string }> | null> = {
  none: null,
  Add: MdAdd,
  Check: MdCheck,
  CheckCircle: MdCheckCircle,
  Delete: MdDelete,
  Error: MdError,
  ErrorOutline: MdErrorOutline,
  Favorite: MdFavorite,
  Home: MdHome,
  Info: MdInfo,
  Mail: MdMail,
  Person: MdPerson,
  Search: MdSearch,
  Settings: MdSettings,
  Star: MdStar,
  Visibility: MdVisibility,
  VisibilityOff: MdVisibilityOff,
};

export interface TextFieldProps {
  size?: TextFieldSize;
  interaction?: TextFieldInteraction;
  validation?: TextFieldValidation;
  label?: string;
  showLabel?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  supportingText?: string;
  showSupportingText?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  leadingIconName?: IconName;
  trailingIconName?: IconName;
  showLeading?: boolean;
  showTrailing?: boolean;
  onTrailingClick?: () => void;
  type?: "text" | "password" | "email" | "number" | "search";
  className?: string;
  defaultValue?: string;
}

// ============================================================================
// Design Token Mappings
// ============================================================================

const containerStyles: Record<TextFieldSize, string> = {
  Small: "h-[32px] px-[8px] gap-[6px]",
  Medium: "h-[40px] px-[12px] gap-[8px]",
  Large: "h-[48px] px-[16px] gap-[8px]",
};

const iconSizeStyles: Record<TextFieldSize, string> = {
  Small: "w-[16px] h-[16px]",
  Medium: "w-[20px] h-[20px]",
  Large: "w-[20px] h-[20px]",
};

const inputTextStyles: Record<TextFieldSize, string> = {
  Small: "text-[14px] leading-[20px]",
  Medium: "text-[14px] leading-[20px]",
  Large: "text-[16px] leading-[24px]",
};

const labelTextStyles: Record<TextFieldSize, string> = {
  Small: "text-[12px] leading-[16px]",
  Medium: "text-[14px] leading-[20px]",
  Large: "text-[14px] leading-[20px]",
};

const helperTextStyles: Record<TextFieldSize, string> = {
  Small: "text-[11px] leading-[16px]",
  Medium: "text-[12px] leading-[16px]",
  Large: "text-[12px] leading-[16px]",
};

function getBorderClasses(
  interaction: TextFieldInteraction,
  validation: TextFieldValidation,
  isFocused: boolean,
): string {
  if (interaction === "Disabled") {
    return "border-semantic-border-disabled bg-semantic-bg-disabled";
  }
  if (validation === "Error") {
    return "border-semantic-border-danger bg-semantic-bg-surface";
  }
  if (validation === "Success") {
    return "border-semantic-border-success bg-semantic-bg-surface";
  }
  if (interaction === "Hover" || isFocused) {
    return "border-semantic-border-hover bg-semantic-bg-surface";
  }
  return "border-semantic-border-default bg-semantic-bg-surface";
}

function getReadOnlyBg(interaction: TextFieldInteraction): string {
  return interaction === "Disabled"
    ? "bg-semantic-bg-disabled"
    : "bg-semantic-bg-subtle";
}

function getFocusRingColor(validation: TextFieldValidation): string {
  return validation === "Error"
    ? "ring-red-600"
    : "ring-semantic-border-focus";
}

export function TextField({
  size = "Medium",
  interaction = "Default",
  validation = "None",
  label = "Label",
  showLabel = true,
  required = false,
  placeholder = "Placeholder",
  value,
  onChange,
  supportingText = "Supporting information",
  showSupportingText = false,
  readOnly = false,
  disabled = false,
  leadingIconName = "none",
  trailingIconName = "none",
  showLeading = false,
  showTrailing = false,
  onTrailingClick,
  type = "text",
  className = "",
  defaultValue,
}: TextFieldProps) {
  const generatedId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = disabled || interaction === "Disabled";
  const hasLeadingIcon = showLeading && leadingIconName !== "none";
  const hasTrailingIcon = showTrailing && trailingIconName !== "none";
  const showStatusRow =
    (validation === "Error" || validation === "Success") && !isDisabled;
  const showHelperRow =
    showSupportingText && validation === "None";

  const renderIcon = (iconName: IconName, cls: string): React.ReactNode => {
    const IconComponent = ICON_MAP[iconName];
    if (!IconComponent) return null;
    return <IconComponent className={cls} />;
  };

  const borderClasses = getBorderClasses(
    isDisabled ? "Disabled" : interaction === "Hover" || isFocused ? "Hover" : "Default",
    validation,
    isFocused,
  );

  return (
    <div
      className={`flex flex-col gap-[4px] w-full ${className}`}
      data-size={size}
      data-interaction={interaction}
      data-validation={validation}
    >
      {showLabel && (
        <label
          htmlFor={generatedId}
          className={[
            "font-sans font-semibold whitespace-nowrap truncate",
            labelTextStyles[size],
            isDisabled
              ? "text-semantic-text-disabled"
              : "text-semantic-text-default",
          ].join(" ")}
        >
          {label}
          {required && (
            <span className="text-semantic-text-danger ml-[4px]">*</span>
          )}
        </label>
      )}

      <div
        className={`relative`}
        onFocus={() => {
          if (!isDisabled && !readOnly) setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      >
        {isFocused && !isDisabled && !readOnly && (
          <div
            className={[
              "absolute border-2 border-solid inset-[-2px] rounded-[10px] pointer-events-none",
              getFocusRingColor(validation),
            ].join(" ")}
          />
        )}

        <div
          className={[
            "flex items-center rounded-[8px] border w-full",
            containerStyles[size],
            readOnly ? getReadOnlyBg(isDisabled ? "Disabled" : "Default") : borderClasses,
          ].join(" ")}
        >
          {hasLeadingIcon && (
            <span
              className={`shrink-0 ${iconSizeStyles[size]} ${
                isDisabled
                  ? "text-semantic-text-disabled"
                  : "text-semantic-text-placeholder"
              }`}
            >
              {renderIcon(leadingIconName, "w-full h-full")}
            </span>
          )}

          <input
            ref={inputRef}
            id={generatedId}
            type={type}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={readOnly}
            className={[
              "flex-1 min-w-0 bg-transparent border-none outline-none font-sans font-normal",
              inputTextStyles[size],
              isDisabled
                ? "text-semantic-text-disabled placeholder:text-semantic-text-disabled"
                : "text-semantic-text-default placeholder:text-semantic-text-placeholder",
            ].join(" ")}
          />

          {hasTrailingIcon && (
            <button
              type="button"
              disabled={isDisabled || !onTrailingClick}
              onClick={(e) => {
                e.stopPropagation();
                onTrailingClick?.();
              }}
              className={`shrink-0 ${iconSizeStyles[size]} ${
                onTrailingClick && !isDisabled
                  ? "cursor-pointer text-semantic-text-secondary hover:text-semantic-text-default"
                  : isDisabled
                    ? "text-semantic-text-disabled"
                    : "text-semantic-text-placeholder"
              }`}
              tabIndex={onTrailingClick ? 0 : -1}
            >
              {renderIcon(trailingIconName, "w-full h-full")}
            </button>
          )}
        </div>
      </div>

      {showStatusRow && (
        <div className="flex items-center gap-[4px] h-[16px]">
          {validation === "Error" && (
            <span className="shrink-0 w-[16px] h-[16px] text-semantic-text-danger">
              {renderIcon("Error", "w-full h-full")}
            </span>
          )}
          {validation === "Success" && (
            <span className="shrink-0 w-[16px] h-[16px] text-semantic-text-success">
              {renderIcon("CheckCircle", "w-full h-full")}
            </span>
          )}
          <span
            className={[
              "font-sans font-normal truncate",
              helperTextStyles[size],
              validation === "Error"
                ? "text-semantic-text-danger"
                : "text-semantic-text-success",
            ].join(" ")}
          >
            {supportingText}
          </span>
        </div>
      )}

      {showHelperRow && !showStatusRow && (
        <div className="flex items-center h-[16px]">
          <span
            className={[
              "font-sans font-normal truncate",
              helperTextStyles[size],
              isDisabled
                ? "text-semantic-text-disabled"
                : "text-semantic-text-secondary",
            ].join(" ")}
          >
            {supportingText}
          </span>
        </div>
      )}
    </div>
  );
}

export default TextField;
