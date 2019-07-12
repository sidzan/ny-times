import * as React from "react";
import {classes, stylesheet} from "typestyle";
import {Color} from "../constants/Color";

const classNames = stylesheet(
  {
    active: {
      fontSize: "16px"
    },
    button: {
      outline: "none",
      padding: "10px 25px"

    },
    disabled: {
      backgroundColor: Color.GREY,
      border: "none",
      color: Color.WHITE,
      cursor: "not-allowed"
    },
    link: {
      backgroundColor: "transparent",
      border: 0,
      color: Color.WHITE,
      cursor: "pointer",
      fontSize: "13px",
      padding: 5
    },
    primary: {
      backgroundColor: Color.PRIMARY,
      border: `1px solid ${Color.PRIMARY}`,
      color: Color.WHITE,
      cursor: "pointer"
    },
    secondary: {
      backgroundColor: Color.WHITE,
      border: `1px solid ${Color.GREY}`,
      color: Color.GREY,
      cursor: "pointer"
    }
  });

export type TButtonType = "primary" | "secondary" | "link";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  type?: TButtonType;
}

export class Button extends React.Component<IProps> {
  public static defaultProps: Partial<IProps> = {
    type: "primary"
  };

  public render(): JSX.Element {
    const {children, className, disabled, type, ...rest} = this.props;
    return (
      <button
        className={classes(classNames.button, disabled ? classNames.disabled : classNames[type], className)}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
