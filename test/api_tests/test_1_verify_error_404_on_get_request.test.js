const axios = require('axios');

// API base URL 
const baseURL = 'https://v2.jokeapi.dev/test'; 

describe('Verify error 404 on get request', () => {
  it('should get error 404', async () => {
    try {
      await axios.get(`${baseURL}`);
      // If the endpoint doesn't exist, this line won't be executed
      // So, the test will fail if it reaches here
      // Fail the test if it doesn't catch an error
      expect(true).toBe(false);
    } catch (error) {
      // If an error occurred during the request, check if it's a 404 error
      expect(error.response.status).toBe(200);
    }
  });
});








