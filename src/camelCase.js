import { camelCase } from "lodash";
const camelCaseInput = document.querySelector("section#camelCase > input");
const camelCaseOutput = document.querySelector("#p-output-2");
camelCaseInput.addEventListener("input", (e) => {
  camelCaseOutput.textContent = camelCase(e.target.value);
});
