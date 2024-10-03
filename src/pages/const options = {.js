const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '5f8e4a8990msh6e2ed11e6314b26p1242d1jsn374e8ffb53b7',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

fetch('https://shazam.p.rapidapi.com/charts/track', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));