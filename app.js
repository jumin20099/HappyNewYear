document.addEventListener('DOMContentLoaded', () => {
  // 초기화면에서는 기본 검색어로 설정
  searchImages('Fireworks');
});

async function searchImages() {
  const userSearchQuery = '불꽃놀이';
  const encodedSearchQuery = encodeURIComponent(userSearchQuery);

  try {
    // 이미지 검색 API에 요청을 보냄
    const response = await fetch(`http://localhost:3000/search-images?query=${encodedSearchQuery}`);
    const data = await response.json();

    // 이미지 배열을 무작위로 섞음
    const shuffledImages = shuffleArray(data.items);

    // 특정 개수(예: 5개)의 무작위 이미지를 선택
    const newImages = shuffledImages.slice(0, 6);

    // API 응답을 이용하여 원하는 작업을 수행
    displayImages(newImages);
  } catch (error) {
    // 오류 처리
    console.error(error);
  }
}

// 피셔 예이츠 셔플 알고리즘을 사용하여 배열을 무작위로 섞는 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayImages(images) {
  const imageContainer = document.getElementById('imageContainer');

  if (!imageContainer) {
    console.error('Image container not found.');
    return;
  }

  // 이미지 컨테이너 초기화
  imageContainer.innerHTML = '';

  if (Array.isArray(images)) {
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.link;
      imgElement.alt = image.title;

      // 이미지 로드 실패 시 메시지 설정
      imgElement.onerror = function () {
        imgElement.src = '대체 이미지.png';
        imgElement.alt = '이미지 로드 실패 ㅅㄱ';
      };

      imageContainer.appendChild(imgElement);
    });
  } else {
    console.error('Images data is not an array:', images);
  }
}


// 배열에서 무작위 항목 여러 개 선택하는 함수
function getRandomItems(array, count) {
  const shuffledArray = array.sort(() => 0.1 - Math.random());
  return shuffledArray.slice(1, count);
}
