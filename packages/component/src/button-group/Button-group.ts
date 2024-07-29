export type ButtonProps = {
  /**
   * 按钮的名称
   */
  label: string;
  primary?: boolean;
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
};

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};