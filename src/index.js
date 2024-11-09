import "./style.scss";

const textArea = document.querySelector("textarea");
const output = document.querySelector("#p-output");
const copyBtn = document.querySelector("#copy-btn");

const formatText = function (inputValue) {
  if (typeof inputValue === "string" && inputValue !== "") {
    const outputArray = new Array();
    inputValue
      .trim()
      .split("\n")
      .forEach((v, i) => {
        if (v !== "\n") {
          outputArray[i + 1] = `${i + 1}. ${v}；\n`;
        }
      });
    let outputText = outputArray.join("");
    return outputText;
  } else {
    return "";
  }
};

async function handleCopy() {
  await navigator.clipboard.writeText(output.innerText);
  const copyInfo = document.getElementById("copy-info");
  copyInfo.textContent = "Copied to clipboard!";
  setTimeout(() => {
    copyInfo.style.animation = "fade-out 0.1s forwards";
  }, 1000);
}

copyBtn.addEventListener("click", handleCopy);

// @return {function} a function that will run `cb` with given `...args` arguments after `delay` ms
function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  // let waitingArgs = null;

  return (...args) => {
    if (shouldWait) {
      return;
    }

    // 执行回调
    cb(...args);

    // 上锁
    shouldWait = true;

    // 一秒后解锁
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

const updateText = (text) => {
  output.innerText = formatText(text);
};

const debounceUpdate = debounce(updateText);
const throttleUpdate = throttle(updateText);

textArea.addEventListener("input", (e) => {
  textArea.style.height = `100px`;
  textArea.style.height = `${textArea.scrollHeight}px`;
  debounceUpdate(e.target.value);
  // throttleUpdate(e.target.value);
  // debounceUpdate(textArea.textContent);
});
