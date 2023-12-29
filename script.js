const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/search-images', async (req, res) => {
  const clientId = '7DyCLPHcCQufjUgyP5i1';
  const clientSecret = '4H9doQSi77';
  const apiUrl = 'https://openapi.naver.com/v1/search/image';
  const query = req.query.query;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        query,
        display: 10, // 한 페이지에 표시할 이미지 개수
      },
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });

    const imageData = response.data.items.map(item => ({
      title: item.title,
      link: item.link,
      thumbnail: item.thumbnail,
      size: {
        width: item.sizewidth,
        height: item.sizeheight,
      },
    }));

    res.json(imageData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

