// Define code challenges
const challenges = [
    {
        id: 1,
        title: "Simple Addition",
        description: "Write a function that returns the sum of two numbers.",
        codeTemplate: "function add(a, b) {\n    // Your code here\n}",
        testCases: [
            { args: [1, 2], expected: 3 },
            { args: [5, 7], expected: 12 }
        ]
    },
    {
        id: 2,
        title: "Array Sum",
        description: "Write a function that returns the sum of all numbers in an array.",
        codeTemplate: "function sumArray(arr) {\n    // Your code here\n}",
        testCases: [
            { args: [[1, 2, 3]], expected: 6 },
            { args: [[5, 5, 5]], expected: 15 }
        ]
    }
];

// Create editors and challenges
const challengeContainer = document.getElementById('challenge-container');

challenges.forEach(challenge => {
    const challengeDiv = document.createElement('div');
    challengeDiv.classList.add('challenge');
    
    const title = document.createElement('h3');
    title.textContent = challenge.title;
    challengeDiv.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = challenge.description;
    challengeDiv.appendChild(description);
    
    const editorDiv = document.createElement('textarea');
    editorDiv.classList.add('editor');
    challengeDiv.appendChild(editorDiv);
    
    // Initialize CodeMirror editor
    const editor = CodeMirror.fromTextArea(editorDiv, {
        mode: 'javascript',
        lineNumbers: true,
        value: challenge.codeTemplate
    });

    // Store the editor in the challenge object
    challenge.editor = editor;

    challengeContainer.appendChild(challengeDiv);
});

document.getElementById('run-code').addEventListener('click', () => {
    challenges.forEach(challenge => {
        const code = challenge.editor.getValue();
        const results = runTests(code, challenge.testCases);
        const feedback = document.getElementById('feedback');
        feedback.innerHTML += `<h4>${challenge.title}</h4>`;
        if (results.every(result => result.passed)) {
            feedback.innerHTML += `<p style="color: green;">All tests passed!</p>`;
        } else {
            feedback.innerHTML += `<p style="color: red;">Some tests failed:</p>`;
            results.forEach((result, index) => {
                if (!result.passed) {
                    feedback.innerHTML += `<p>Test ${index + 1} failed: Expected ${result.expected}, but got ${result.actual}</p>`;
                }
            });
        }
    });
});

function runTests(code, testCases) {
    const results = [];
    testCases.forEach(testCase => {
        try {
            // Create a new function from the code and run it with test cases
            const func = new Function('return ' + code)();
            const actual = func(...testCase.args);
            results.push({
                passed: actual === testCase.expected,
                expected: testCase.expected,
                actual: actual
            });
        } catch (error) {
            results.push({
                passed: false,
                expected: testCase.expected,
                actual: `Error: ${error.message}`
            });
        }
    });
    return results;
}
