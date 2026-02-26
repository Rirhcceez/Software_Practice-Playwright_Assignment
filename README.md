# Software Practice - Playwright Assignment

This repository contains a suite of automated end-to-end (E2E) tests built using **Playwright** and **JavaScript**. The project is designed to demonstrate proficiency in modern web testing practices, focusing on robust script creation, utility integration, and cross-browser validation.


## 🚀 Features

* **Cross-Browser Testing:** Configured to run across Chromium, Firefox, and WebKit.
* **Utility-Driven Design:** Includes a dedicated `utils/` directory for reusable helper functions, ensuring clean and maintainable test code.
* **Advanced Selectors:** Utilizes Playwright's powerful locators to handle dynamic web elements.
* **Parallel Execution:** Optimized via `playwright.config.js` to run tests concurrently for faster feedback.
* **Detailed Reporting:** Integrated HTML and List reporters for clear execution insights.


## 🛠️ Tech Stack

* **Testing Framework:** [Playwright](https://playwright.dev/)
* **Language:** JavaScript (Node.js)
* **Environment:** Unix/Linux compatible


## 📂 Project Structure

``` text
├── tests/              # Test script files (.spec.js)
├── utils/              # Helper functions and shared utilities
├── playwright.config.js # Framework configuration and browser settings
├── package.json        # Dependencies and test scripts
└── .gitignore          # Files excluded from version control
```


## ⚙️ Installation & Setup

 1. **Clone the repository:**
    ``` Bash

    git clone [https://github.com/Rirhcceez/Software_Practice-Playwright_Assignment.git](https://github.com/Rirhcceez/Software_Practice-Playwright_Assignment.git)
    cd Software_Practice-Playwright_Assignment
    ```

 2. **Install dependencies:**
    ``` Bash
    npm install
    ```

 3. **Install Playwright Browsers:**
    ``` Bash
    npx playwright install
    ```


## 🧪 Running Tests

 - **Run all tests:**
    ``` Bash
    npx playwright test
    ```

 - **Run tests in headed mode (UI):**
    ``` Bash
    npx playwright test --headed
    ```

 - **Run a specific test file:**
    ```Bash
    npx playwright test tests/your-test-file.spec.js
    ```

 - **View test report:**
    ```Bash
    npx playwright show-report
    ```


## 📝 Configuration

The `playwright.config.js` file is configured to:

 - Capture screenshots and videos on test failure.

 - Manage browser-specific contexts (viewport, user agent).

 - Handle test timeouts and retries for stability.
