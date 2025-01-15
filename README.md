
# ChatGPT Status Checker

This simple web app allows users to check if **ChatGPT** is up and running or experiencing downtime. It uses OpenAI's API to fetch the status of ChatGPT and displays a user-friendly interface with animations to represent the current status.

## Features
- **Real-time status check**: Displays whether ChatGPT is up or down by querying the OpenAI API.
- **Animations**: Visual feedback using **Lottie animations**:
  - A **rocket animation** when ChatGPT is up.
  - A **sad face animation** when ChatGPT is down.
- **Logo display**: The **ChatGPT logo** is displayed next to the rocket animation.
- **Refresh button**: Allows users to manually refresh the page to check the latest status.
- **Responsive design**: The app is responsive and works well on both desktop and mobile screens.

## Technologies Used
- **React.js**: JavaScript library for building user interfaces.
- **Lottie**: A library for rendering animations in React.
- **OpenAI API**: Used to check the status of ChatGPT by making requests to OpenAI's endpoint.
- **CSS Flexbox**: For layout and aligning elements like the logo and rocket.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/chatgpt-status.git
    cd chatgpt-status
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up your **OpenAI API key** in the `.env` file. Create a `.env` file in the root of the project and add the following line:
    ```bash
    REACT_APP_OPENAI_API_KEY=your-api-key-here
    ```

4. Run the development server:
    ```bash
    npm start
    ```

   Your app should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

- **Status Display**: Upon loading, the app will check the status of ChatGPT. If it is up, a rocket animation will appear, and if it's down, a sad face animation will appear.
- **Refresh Button**: You can click the "Refresh" button to check the status again.

## Contributing

Feel free to fork the repository and submit pull requests. Please make sure your code follows the standard coding style and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- **Lottie**: For providing easy-to-use animations.
- **OpenAI**: For making ChatGPT available through their API.
