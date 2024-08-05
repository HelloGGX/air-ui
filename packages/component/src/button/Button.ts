import type { ExtractPropTypes } from "vue";
import { buildProps } from "element-plus/es/utils/vue";
import { useSizeProp } from "element-plus/es/hooks/use-size";

export const buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  "text",
  "",
] as const;

export const buttonProps = buildProps({
  size: useSizeProp,
  type: {
    type: String,
    values: buttonTypes,
    default: "",
  },
} as const);

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;

export type ButtonType = ButtonProps["type"];

export interface ButtonConfigContext {
  autoInsertSpace?: boolean;
}
