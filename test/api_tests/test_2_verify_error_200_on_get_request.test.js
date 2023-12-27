const axios = require('axios');
const fs = require('fs');

// API base URL 
const categoriesURL = 'https://v2.jokeapi.dev/categories'; 
 

describe('Verify success on get request', () => {
  it('Should pull the 3rd category', async () => {
    try {
      const response = await axios.get(`${categoriesURL}`);
      
      // Assert that the response status is 200
      expect(response.status).toBe(200);
      
      // Assert that the response data is an array
      expect(Array.isArray(response.data.categories)).toBe(true);

      // Sort the array from the API response
      const sortedArray = response.data.categories.sort((a, b) => a - b);
      const arrayWithoutDarkCategory = response.data.categories
      .filter(category => category !== "Dark");
      const thirdCategory = response.data.categories[2];
      const baseURL = 'https://v2.jokeapi.dev/joke';  
      const jokeUrl = `${baseURL}/${thirdCategory}`  
      const jokeResponse = await axios.get(`${jokeUrl}`); 
      const categoryValue = jokeResponse.data.category;
      const typeValue = jokeResponse.data.type;
      const deliveryValue = jokeResponse.data.type;
      const setupValue = jokeResponse.data.type;
      const responseIdValue = jokeResponse.data.id;
      const flagsValue = JSON.stringify(jokeResponse.data.flags, null, 2);

      // Content to be appended to the file
      const contentToAppend = `\nDeliveryValue: ${deliveryValue}
      \nSetupValue: ${setupValue}\nCategory: ${categoryValue}
      \nType: ${typeValue}\nFlags:\n${flagsValue}\n`;  

      fs.writeFileSync(`${responseIdValue}`, contentToAppend, { flag: 'a+' }); 
      console.log('Data has been written to the file');
      

    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  });
});












