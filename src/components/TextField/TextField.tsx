import React, { useId, useRef, useState } from "react";
import clsx from "clsx";
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
import styles from "./TextField.module.css";

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

const sizeInputClasses = {
  Small: styles.inputSmall,
  Medium: styles.inputMedium,
  Large: styles.inputLarge,
} as const;

const iconSizeClasses = {
  Small: styles.iconSmall,
  Medium: styles.iconMedium,
  Large: styles.iconMedium,
} as const;

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
  className,
  defaultValue,
}: TextFieldProps) {
  const generatedId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = disabled || interaction === "Disabled";
  const isSmall = size === "Small";
  const isLarge = size === "Large";
  const hasLeadingIcon = showLeading && leadingIconName !== "none";
  const hasTrailingIcon = showTrailing && trailingIconName !== "none";
  const showFocusRing = isFocused && !isDisabled && !readOnly;
  const showStatusRow = (validation === "Error" || validation === "Success") && !isDisabled;
  const showHelperRow = showSupportingText && validation === "None";
  const isTrailingButton = hasTrailingIcon && !!onTrailingClick;

  const renderIcon = (iconName: IconName, cls?: string): React.ReactNode => {
    const IconComponent = ICON_MAP[iconName];
    if (!IconComponent) return null;
    return <IconComponent className={cls} />;
  };

  return (
    <div className={clsx(styles.root, className)}>
      {showLabel && (
        <label
          htmlFor={generatedId}
          className={clsx(
            styles.label,
            isSmall && styles.labelSmall,
            isDisabled && styles.labelDisabled,
          )}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        className={styles.field}
        onFocus={() => {
          if (!isDisabled && !readOnly) setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      >
        {showFocusRing && (
          <div
            className={clsx(
              styles.focusRing,
              validation === "Error" && styles.focusRingError,
            )}
          />
        )}

        <div
          className={clsx(
            styles.inputContainer,
            sizeInputClasses[size],
            validation === "Error" && styles.inputError,
            validation === "Success" && styles.inputSuccess,
            isDisabled && styles.inputDisabled,
            readOnly && styles.inputReadOnly,
          )}
        >
          {hasLeadingIcon && (
            <span
              className={clsx(
                styles.leadingIcon,
                iconSizeClasses[size],
                isDisabled && styles.leadingIconDisabled,
              )}
            >
              {renderIcon(leadingIconName)}
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
            className={clsx(
              styles.input,
              isLarge && styles.inputLargeFont,
              isDisabled && styles.inputDisabled,
            )}
          />

          {hasTrailingIcon && isTrailingButton ? (
            <button
              type="button"
              disabled={isDisabled}
              onClick={(e) => {
                e.stopPropagation();
                onTrailingClick?.();
              }}
              className={clsx(styles.trailingButton, iconSizeClasses[size])}
              tabIndex={0}
            >
              {renderIcon(trailingIconName)}
            </button>
          ) : hasTrailingIcon ? (
            <span
              className={clsx(
                styles.trailingIcon,
                styles.trailingIconStatic,
                iconSizeClasses[size],
              )}
            >
              {renderIcon(trailingIconName)}
            </span>
          ) : null}
        </div>
      </div>

      {showStatusRow && (
        <div className={styles.statusRow}>
          {validation === "Error" && (
            <span className={clsx(styles.statusIcon, styles.statusIconError)}>
              {renderIcon("Error")}
            </span>
          )}
          {validation === "Success" && (
            <span className={clsx(styles.statusIcon, styles.statusIconSuccess)}>
              {renderIcon("CheckCircle")}
            </span>
          )}
          <span
            className={clsx(
              styles.supportingText,
              isSmall && styles.supportingTextSmall,
              validation === "Error" && styles.supportingTextError,
              validation === "Success" && styles.supportingTextSuccess,
            )}
          >
            {supportingText}
          </span>
        </div>
      )}

      {showHelperRow && (
        <div className={styles.helperRow}>
          <span
            className={clsx(
              styles.helperText,
              isSmall && styles.helperTextSmall,
              isDisabled && styles.helperTextDisabled,
            )}
          >
            {supportingText}
          </span>
        </div>
      )}
    </div>
  );
}

export default TextField;
