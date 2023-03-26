# openai-ds-predictor - OpenAI API

This app recommends or the best or suitable data structure applicable for any given situation in the field of computer science. It uses the [OpenAI API](https://platform.openai.com). It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/).

<img width="433" alt="Screenshot 2023-03-26 at 11 26 52 PM" src="https://user-images.githubusercontent.com/17910338/227794992-c19cb93d-d33b-44c8-a049-5fedfa56a979.png">

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd openai-quickstart-node
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
6. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)!
