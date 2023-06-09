# openai-ds-predictor - OpenAI API

This app recommends the best or most suitable data structure applicable for any given situation in the field of computer science. It uses the [OpenAI API](https://platform.openai.com). It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/).

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

5. Create a new environment variables file

   On Linux systems: 
   ```bash
   $ nano .env
   ```
   
6. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)!

<hr>

### Feature - Implement in your language of choice

Besides predicting the most suitable data structure(s), we now have the function to generate implementation of suggested data structures in your desired language on a click!

<img width="340" alt="Screenshot 2023-04-06 at 1 42 41 AM" src="https://user-images.githubusercontent.com/17910338/230199200-e84d0982-8029-4c99-a166-0c940eec12da.png">
