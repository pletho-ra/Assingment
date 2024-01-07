const https = require('https');

const inputData = {
    "expr": [
        '2 * 4 * 4',
        '5 / (7 - 5)',
        'sqrt(5^2 - 4^2)',
        'sqrt(-3^2 - 4^2)',
    ],
    "precision": 14
  };
  

function evaluateExpressions(data) {
    const { expr, precision } = data;
    const apiUrl = 'https://api.mathjs.org/v4/';
  
    const promises = expr.map((expression) => {
      const url = `${apiUrl}?expr=${encodeURIComponent(expression)}&precision=${precision}`;
      
      return new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            try {
              const result = JSON.parse(data).result;
              resolve(result);
            } catch (error) {
              console.error(`Error parsing response for expression "${expression}": ${error}`);
              console.log(`Raw response data for expression "${expression}":`, data);
              reject(`Error parsing response for expression "${expression}"`);
            }
          });
        }).on('error', (error) => {
          console.error(`Error evaluating expression "${expression}": ${error.message}`);
          reject(`Error evaluating expression "${expression}"`);
        });
      });
    });
  
    return Promise.all(promises);
  }
  
  // Usage
  evaluateExpressions(inputData)
    .then((results) => {
      console.log('Results:', results);
    })
    .catch((error) => {
      console.error('Error:', error);
    });