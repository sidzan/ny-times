import {cssRaw} from "typestyle";
import {Color} from "../constants/Color";
import {FontSize} from "../constants/FontSize";

export function setupCss(language: string = "en"): void {
  const fontFamily = language === "th" ? "Questrial" : "Prompt";
  cssRaw(`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: ${fontFamily};
    font-size: ${FontSize.MEDIUM};
    height: auto;
    margin: 0;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  img {
    image-rendering: -webkit-optimize-contrast;
  }

  a {
    color: ${Color.BLACK};
  }

  a:active, a:visited {
    color: ${Color.BLUE};
  }

  :focus {
    outline-color: ${Color.BLUE};
  }

  input, textarea, select, button {
    font-family: Roboto;
    font-size: ${FontSize.MEDIUM};
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
`);
}
