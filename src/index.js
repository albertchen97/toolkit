import "./style.scss";

const textArea = document.querySelector("textarea");
const output = document.querySelector("#p-output");
const copyBtn = document.querySelector("#copy-btn");

function formatText(inputValue) {
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
}

const copyInfo = document.getElementById("copy-info");
const animationDuration = 1000;
async function handleCopy() {
  if (output.textContent !== "") {
    await navigator.clipboard.writeText(output.innerText);
    copyInfo.style.animation = `fade-in-out ${animationDuration}ms`;
    setTimeout(() => {
      copyInfo.style.animation = "";
    }, animationDuration);
  }
}

copyBtn.addEventListener("click", handleCopy);

function debounce(cb, delay = 500) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

// TODO: Finish throttle
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

textArea.addEventListener("input", (e) => {
  textArea.style.height = `100px`;
  textArea.style.height = `${textArea.scrollHeight}px`;
  debounceUpdate(e.target.value);
});
