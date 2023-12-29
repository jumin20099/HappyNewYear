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
      params: { query, display: 10 }, // n개의 이미지를 받아옴
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    }); //배열에 display 값 만큼의 이미지를 저장하고 피셔 예이츠 셔플 알고리즘으로 10개씩 꺼내오기

    const images = response.data.items;

    // 이미지 중에서 무작위로 10개 선택
    const randomImages = getRandomItems(images, 10);

    res.json({ items: randomImages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 배열에서 무작위 항목 여러 개 선택하는 함수
function getRandomItems(array, count) {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
