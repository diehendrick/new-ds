import React from "react";
import clsx from "clsx";
import { MdAdd, MdCheck, MdDelete, MdFavorite, MdHome, MdInfo, MdSearch, MdSettings, MdStar } from "react-icons/md";
import styles from "./Button.module.css";

type ButtonVariant = "Primary" | "Secondary" | "Tertiary" | "Danger";
type ButtonSize = "Small" | "Medium" | "Large";
type ButtonState = "Default" | "Hover" | "Pressed" | "Disabled";

/** Available Material Design icon names */
export type IconName =
  | "none"
  | "Add"
  | "Check"
  | "Delete"
  | "Favorite"
  | "Home"
  | "Info"
  | "Search"
  | "Settings"
  | "Star";

const ICON_MAP: Record<IconName, React.ComponentType<{ className?: string }> | null> = {
  none: null,
  Add: MdAdd,
  Check: MdCheck,
  Delete: MdDelete,
  Favorite: MdFavorite,
  Home: MdHome,
  Info: MdInfo,
  Search: MdSearch,
  Settings: MdSettings,
  Star: MdStar,
};

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  label?: string;
  leading?: boolean;
  leadingIconName?: IconName;
  leadingIcon?: React.ReactNode;
  trailing?: boolean;
  trailingIconName?: IconName;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantClasses = {
  Primary: styles.buttonPrimary,
  Secondary: styles.buttonSecondary,
  Tertiary: styles.buttonTertiary,
  Danger: styles.buttonDanger,
} as const;

const sizeClasses = {
  Small: styles.buttonSmall,
  Medium: styles.buttonMedium,
  Large: styles.buttonLarge,
} as const;

const iconSizeClasses = {
  Small: styles.iconSmall,
  Medium: styles.iconMedium,
  Large: styles.iconLarge,
} as const;

const contentGapClasses = {
  Small: styles.contentSmall,
  Medium: undefined,
  Large: styles.contentLarge,
} as const;

function renderIcon(
  customIcon: React.ReactNode | undefined,
  iconName: IconName | undefined,
  iconClass: string,
): React.ReactNode {
  if (customIcon) {
    return <span className={iconClass}>{customIcon}</span>;
  }
  if (iconName && iconName !== "none") {
    const IconComponent = ICON_MAP[iconName];
    if (IconComponent) {
      return (
        <span className={iconClass}>
          <IconComponent className={iconClass} />
        </span>
      );
    }
  }
  return null;
}

export function Button({
  variant = "Primary",
  size = "Medium",
  state = "Default",
  label = "Button",
  leading = false,
  leadingIconName = "none",
  leadingIcon,
  trailing = false,
  trailingIconName = "none",
  trailingIcon,
  disabled,
  onClick,
  className,
}: ButtonProps) {
  const isDisabled = disabled || state === "Disabled";

  const iconClass = iconSizeClasses[size];
  const leadingElement = renderIcon(leadingIcon, leadingIconName, iconClass);
  const trailingElement = renderIcon(trailingIcon, trailingIconName, iconClass);

  const hasContent = leading || trailing;
  const showLeading = leading && leadingElement != null;
  const showTrailing = trailing && trailingElement != null;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        styles.root,
        sizeClasses[size],
        variantClasses[variant],
        isDisabled && styles.buttonDisabled,
        className,
      )}
      data-variant={variant}
      data-size={size}
      data-state={isDisabled ? "Disabled" : state}
    >
      {hasContent ? (
        <div className={clsx(styles.content, contentGapClasses[size])}>
          {showLeading && leadingElement}
          <span>{label}</span>
          {showTrailing && trailingElement}
        </div>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}

export default Button;
