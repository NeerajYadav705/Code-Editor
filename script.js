function run() {
    let htmlCode = document.getElementById("html-code");
    let cssCode = document.getElementById("css-code");
    let jsCode = document.getElementById("js-code");

    let output = document.getElementById("output");

    output.contentDocument.body.innerHTML =
        htmlCode.value + "<style>" + cssCode.value + "</style>";

    output.contentWindow.eval(jsCode.value);
}

function updateLineNumbers(type) {
    const textarea = document.getElementById(`${type}-code`);
    const lineNumbers = document.getElementById(`${type}-line-numbers`);

    const lines = textarea.value.split('\n').length;
    let lineNumberText = '';

    for (let i = 1; i <= lines; i++) {
        lineNumberText += i + '<br>';
    }

    lineNumbers.innerHTML = lineNumberText;
    highlightCurrentLine(textarea, lineNumbers);
}

function highlightCurrentLine(textarea, lineNumbers) {
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
    const scrollTop = textarea.scrollTop;
    const currentLine = Math.floor(scrollTop / lineHeight);

    const lineNumberDivs = lineNumbers.querySelectorAll('span');
    lineNumberDivs.forEach((div, index) => {
        if (index === currentLine) {
            div.classList.add('highlighted');
        } else {
            div.classList.remove('highlighted');
        }
    });
}

window.onload = function() {
    updateLineNumbers('html');
    updateLineNumbers('css');
    updateLineNumbers('js');
};
