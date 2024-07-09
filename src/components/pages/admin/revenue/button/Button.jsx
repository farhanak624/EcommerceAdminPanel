import { text } from "@sveltejs/kit";
import { Border } from "@syncfusion/ej2-react-maps";
import React from "react";

function Button({ img, name, cliked, bordercolur }) {
  return (
    <button
      className={`flex gap-1 items-center  ${
        bordercolur == name ? "border-b border-blue-400 text-blue-400" : ""
      }`}
      onClick={() => cliked(name)}
    >
      {img}
      {name}
    </button>
  );
}

export default Button;
