import React from "react";
import { MdAdd, MdCheck, MdDelete, MdFavorite, MdHome, MdInfo, MdSearch, MdSettings, MdStar } from "react-icons/md";

/**
 * Button Component
 *
 * Design tokens used from Figma Variables:
 * - Colors: bgColor/*, textColor/*, strokeColor/*, brand/*, red/*, neutral/*
 * - Spacing: space/* (6, 8, 12, 16, 20)
 * - Sizes: size/* (16, 20, 24, 32, 40, 48)
 * - Radius: radius/* (6, 8)
 * - Typography: fontFamily/sans, fontStyle/semibold, fontSize/*, lineHeight/*
 * - Border: borderWidth/* (1)
 * - Icons: Material Design Icons from react-icons/md
 */

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

/** Map of icon names to Material Design icon components */
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
  /** Visual variant: Primary, Secondary, Tertiary, or Danger */
  variant?: ButtonVariant;
  /** Size: Small (32px), Medium (40px), Large (48px) */
  size?: ButtonSize;
  /** Interactive state */
  state?: ButtonState;
  /** Button label text */
  label?: string;
  /** Show leading icon slot (requires leadingIconName or leadingIcon) */
  leading?: boolean;
  /** Material Design icon name for leading slot */
  leadingIconName?: IconName;
  /** Custom leading icon component (overrides leadingIconName) */
  leadingIcon?: React.ReactNode;
  /** Show trailing icon slot (requires trailingIconName or trailingIcon) */
  trailing?: boolean;
  /** Material Design icon name for trailing slot */
  trailingIconName?: IconName;
  /** Custom trailing icon component (overrides trailingIconName) */
  trailingIcon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Design Token Mappings (Figma Variables -> Tailwind Classes)
// ============================================================================

/**
 * Button height and horizontal padding
 * Maps to: size/* for height, space/* for padding
 */
const sizeStyles: Record<ButtonSize, string> = {
  Small: "h-[32px] px-[12px]",    // size/32, space/12
  Medium: "h-[40px] px-[16px]",   // size/40, space/16
  Large: "h-[48px] px-[20px]",    // size/48, space/20
};

/**
 * Content gap between icon and label
 * Maps to: space/*
 */
const contentGapStyles: Record<ButtonSize, string> = {
  Small: "gap-[6px]",   // space/6
  Medium: "gap-[8px]",  // space/8
  Large: "gap-[8px]",   // space/8
};

/**
 * Icon dimensions
 * Maps to: size/*
 */
const iconSizeStyles: Record<ButtonSize, string> = {
  Small: "w-[16px] h-[16px]",   // size/16
  Medium: "w-[20px] h-[20px]",  // size/20
  Large: "w-[24px] h-[24px]",   // size/24
};

/**
 * Text font size
 * Maps to: fontSize/*
 */
const textSizeStyles: Record<ButtonSize, string> = {
  Small: "text-[12px]",  // fontSize/12
  Medium: "text-[14px]", // fontSize/14
  Large: "text-[14px]",  // fontSize/14
};

/**
 * Text line height
 * Maps to: lineHeight/*
 */
const lineHeightStyles: Record<ButtonSize, string> = {
  Small: "leading-[16px]",  // lineHeight/16
  Medium: "leading-[20px]", // lineHeight/20
  Large: "leading-[20px]",  // lineHeight/20
};

/**
 * Border radius
 * Maps to: radius/*
 */
const radiusStyles: Record<ButtonSize, string> = {
  Small: "rounded-[6px]",  // radius/6
  Medium: "rounded-[8px]", // radius/8
  Large: "rounded-[8px]",  // radius/8
};

/**
 * Variant-specific styles using semantic color tokens
 * These resolve at runtime via CSS custom properties (light/dark mode)
 */
function getVariantClasses(variant: ButtonVariant, state: ButtonState): string {
  if (state === "Disabled") {
    return [
      "bg-semantic-bg-disabled",
      "text-semantic-text-disabled",
      "border-semantic-border-disabled",
    ].join(" ");
  }

  switch (variant) {
    case "Primary":
      return [
        "bg-semantic-bg-brand",
        "text-semantic-text-onBrand",
        "hover:bg-semantic-bg-brand-hover",
        "active:bg-semantic-bg-brand-pressed",
      ].join(" ");

    case "Secondary":
      return [
        "bg-semantic-bg-surface",
        "border border-semantic-border-default",
        "text-semantic-text-default",
        "hover:bg-semantic-bg-hover",
        "active:bg-semantic-bg-pressed",
      ].join(" ");

    case "Tertiary":
      return [
        "bg-transparent",
        "text-semantic-text-brand",
        "hover:bg-semantic-bg-hover",
        "active:bg-semantic-bg-pressed",
      ].join(" ");

    case "Danger":
      return [
        "bg-semantic-bg-danger",
        "text-semantic-text-onStatus",
        "hover:bg-red-800",
        "active:bg-red-900",
      ].join(" ");

    default:
      return "";
  }
}

function renderIcon(
  customIcon: React.ReactNode | undefined,
  iconName: IconName | undefined,
  className: string,
): React.ReactNode {
  // Custom icon (ReactNode) takes precedence
  if (customIcon) {
    return <span className={className}>{customIcon}</span>;
  }
  // Material Design icon by name
  if (iconName && iconName !== "none") {
    const IconComponent = ICON_MAP[iconName];
    if (IconComponent) {
      return (
        <span className={className}>
          <IconComponent className="w-full h-full" />
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
  className = "",
}: ButtonProps) {
  const isDisabled = disabled || state === "Disabled";
  const currentState: ButtonState = isDisabled ? "Disabled" : state;

  const leadingElement = renderIcon(leadingIcon, leadingIconName, iconSizeStyles[size]);
  const trailingElement = renderIcon(trailingIcon, trailingIconName, iconSizeStyles[size]);

  const hasContent = leading || trailing;
  // Only render icon slots if the show flag is true AND there's content
  const showLeading = leading && leadingElement != null;
  const showTrailing = trailing && trailingElement != null;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center",
        "font-sans font-semibold",
        "whitespace-nowrap",
        sizeStyles[size],
        radiusStyles[size],
        getVariantClasses(variant, currentState),
        className,
      ].join(" ")}
      data-variant={variant}
      data-size={size}
      data-state={currentState}
    >
      {hasContent ? (
        <div className={`flex items-center justify-center ${contentGapStyles[size]}`}>
          {showLeading && leadingElement}
          <span className={`${textSizeStyles[size]} ${lineHeightStyles[size]}`}>
            {label}
          </span>
          {showTrailing && trailingElement}
        </div>
      ) : (
        <span className={`${textSizeStyles[size]} ${lineHeightStyles[size]}`}>
          {label}
        </span>
      )}
    </button>
  );
}

export default Button;
