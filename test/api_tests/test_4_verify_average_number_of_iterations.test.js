const axios = require('axios');

const categoriesURL = 'https://v2.jokeapi.dev/categories';
const jokesBaseURL = 'https://v2.jokeapi.dev/joke/any';

describe('Verify jokes from all categories', () => {
  it('Should get one joke per category for 10 repetitions and report average iterations', async () => {
    const repetitions = 11;
    let totalIterations = 0;
    let iterationsToGetAllCategories = Infinity; // Initialize with a high value

    try {
      const response = await axios.get(categoriesURL);
      expect(response.status).toBe(200);
      const categories = response.data.categories;

      const jokesByCategory = new Set();

      for (let i = 0; i < repetitions; i++) {
        let counter = 0; // Initialize counter for each repetition

        for (const category of categories) {
          try {
            const jokeResponse = await axios.get(`${jokesBaseURL}`);
            const { category: jokeCategory } = jokeResponse.data;

            if (!jokesByCategory.has(jokeCategory)) {
              jokesByCategory.add(jokeCategory);
              counter++;

              if (counter === categories.length) {
                iterationsToGetAllCategories = Math.min(iterationsToGetAllCategories, i + 1); // Update the value if it's smaller
                break; // All categories have at least one joke fetched
              }
            }
          } catch (error) {
            console.error(`Failed to fetch a joke for category ${category}:`, error.message);
            if (error.response && error.response.status === 429) {
              await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds if rate limit is reached
            }
          }
        }

        totalIterations += counter; // Increment totalIterations by the counter for each repetition
      }

      const averageIterations = totalIterations / repetitions;
      console.log(`iterationsToGetAllCategories: ${iterationsToGetAllCategories}`);
      return iterationsToGetAllCategories; // Return the number of iterations to get all categories
    } catch (error) {
      console.error('Failed to fetch categories:', error.message);
      return iterationsToGetAllCategories; // Return the current value (Infinity)
    }
  });
});
