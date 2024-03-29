import * as React from "react";
import {cssRaw} from "typestyle";

cssRaw(`
.loading-indicator {
  margin: 2em auto;
  position: relative;
  width: 64px;
  height: 64px;
}
.loading-indicator div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}
.loading-indicator div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: grey;
  margin: -3px 0 0 -3px;
}
.loading-indicator div:nth-child(1) {
  animation-delay: -0.036s;
}
.loading-indicator div:nth-child(1):after {
  top: 50px;
  left: 50px;
}
.loading-indicator div:nth-child(2) {
  animation-delay: -0.072s;
}
.loading-indicator div:nth-child(2):after {
  top: 54px;
  left: 45px;
}
.loading-indicator div:nth-child(3) {
  animation-delay: -0.108s;
}
.loading-indicator div:nth-child(3):after {
  top: 57px;
  left: 39px;
}
.loading-indicator div:nth-child(4) {
  animation-delay: -0.144s;
}
.loading-indicator div:nth-child(4):after {
  top: 58px;
  left: 32px;
}
.loading-indicator div:nth-child(5) {
  animation-delay: -0.18s;
}
.loading-indicator div:nth-child(5):after {
  top: 57px;
  left: 25px;
}
.loading-indicator div:nth-child(6) {
  animation-delay: -0.216s;
}
.loading-indicator div:nth-child(6):after {
  top: 54px;
  left: 19px;
}
.loading-indicator div:nth-child(7) {
  animation-delay: -0.252s;
}
.loading-indicator div:nth-child(7):after {
  top: 50px;
  left: 14px;
}
.loading-indicator div:nth-child(8) {
  animation-delay: -0.288s;
}
.loading-indicator div:nth-child(8):after {
  top: 45px;
  left: 10px;
}


@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}`);

export const Loading: React.FC = () => (
    <div className="loading-indicator">
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
    </div>
);
