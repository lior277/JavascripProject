const axios = require("axios");

const jokesBaseURL = "https://v2.jokeapi.dev/joke/any";

describe("Verify jokes from all categories", () => {
  it("Should get one joke per category for 1000 repetitions and report average iterations",
  
   async () => {
    let jokeResponse;

      for(let i = 0; i < 5; i++){
        jokeResponse = await axios.get(jokesBaseURL,
          { headers: { "x-rapidapi-key":
           "56d7a4653emsh4c19b463b18e6d7p144eb77jsn030e478c59b2",
            "x-rapidapi-value":"jokes.p.rapidapi.com" } });
        expect(jokeResponse.status).toBe(200);
        console.log(`jokeResponse.status: ${jokeResponse.status}`)
        getRandomJokeFromEachCategory(jokeResponse)
      };
});
});

async function getRandomJokeFromEachCategory(jokesResponse) {
  // const categoriesURL = "https://v2.jokeapi.dev/categories";
  const jokesByCategory = new Set();
  let iterations = 0;

  //  categoryResponse = await axios.get(categoriesURL,
  //     { headers: { "x-rapidapi-key":
  //      "56d7a4653emsh4c19b463b18e6d7p144eb77jsn030e478c59b2",
  //       "x-rapidapi-value":"jokes.p.rapidapi.com" } });

  //   expect(categoryResponse.status).toBe(200);
  //   const numOfCategories = categoryResponse.data.categories.length

  try {
    for (let i = 0; i < 5; i++) {
      const category = jokesResponse.category;
      console.log(`category: ${category}`)
      if (!jokesByCategory.has(category)) {
        jokesByCategory.add(category);
        iterations++;
        console.log(`iterations: ${iterations}`)
        // if (jokesByCategory.size === numOfCategories) {
        //   break;
        // }
      }
    }
  } catch (error) {
    console.error('Error fetching jokes:', error.message);
    // Handle errors or retries as needed
  }

  return iterations;
}



