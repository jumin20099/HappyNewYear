document.addEventListener('DOMContentLoaded', () => {
  // 초기화면에서는 기본 검색어로 설정

  searchImages('불꽃놀이');
});

function moveImageContainerRandomly() {
  const imageContainer = document.getElementById('imageContainer');

  if (imageContainer) {
    // 이미지 컨테이너의 크기를 가져옴
    containerWidth = imageContainer.offsetWidth;
    containerHeight = imageContainer.offsetHeight;

    // 이미지 컨테이너 내에서 랜덤으로 위치 설정
    const top = Math.floor(Math.random() * 0); // 0에서 400 사이의 값
    const left = Math.floor(Math.random() * -150) + 0; // 300에서 1500 사이의 값

    // imageContainer의 위치를 변경
    imageContainer.style.position = 'absolute';
    imageContainer.style.top = `${top}px`;
    imageContainer.style.left = `${left}px`;
  }
}

async function searchImages() {
  moveImageContainerRandomly();
  
  const userSearchQuery = '불꽃놀이';
  const encodedSearchQuery = encodeURIComponent(userSearchQuery);
  
  try {
    // 이미지 검색 API에 요청을 보냄
    const response = await fetch(`http://localhost:3000/search-images?query=${encodedSearchQuery}`);
    const data = await response.json();
    
    // 이미지 배열을 무작위로 섞음
    const shuffledImages = shuffleArray(data.items);
    
    // 특정 개수(예: 10개)의 무작위 이미지를 선택
    const newImages = shuffledImages.slice(0, 10);
    
    // API 응답을 이용하여 원하는 작업을 수행
    displayImages(newImages);
  } catch (error) {
    // 오류 처리
    console.error(error);
  }
}

document.getElementById('fireWorksBtn').addEventListener('click', () => {
  const audio3 = document.getElementById('realFireWorksSound');
  const audio2 = document.getElementById('mainFireWorks');
  audio3.volume = 1;
  audio3.currentTime = 0;
  audio3.play();
  audio2.volume = 1;
  audio2.autoplay = true;
  audio2.loop = true;
  audio2.play();
})

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
    images.forEach((image, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.link;
      imgElement.alt = image.title;

      // 이미지 로드 실패 시 메시지 설정
      imgElement.onerror = function () {
        imgElement.src = '대체 이미지.png';
        imgElement.alt = '이미지 로드 실패 ㅅㄱ';
      };

      // 이미지마다 랜덤한 위치 설정
      const top = Math.floor(Math.random() * 500);
      const left = Math.floor(Math.random() * 1450) + 250;
      imgElement.style.position = 'absolute';
      imgElement.style.top = `${top}px`;
      imgElement.style.left = `${left}px`;

      imageContainer.appendChild(imgElement);
    });
  } else {
    console.error('Images data is not an array:', images);
  }
}

function 환호하는소리재생(){
  const audio1 = document.getElementById('hwanho');
  audio1.volume = 1;
  audio1.currentTime = 0;
  audio1.play();
}

function 반짝반짝(){
  const body = document.body;
  const currentColor = getComputedStyle(body).backgroundColor;
  body.style.backgroundColor = currentColor === 'rgb(255, 255, 255)' ? 'black' : 'white';
}


// document.addEventListener('DOMContedtLoaded', () => {
//   const audio2 = document.getElementById('mainFireWorks')
//   audio2.volume = 1;
//   audio2.autoplay = true;
//   audio2.loop = true;
//   audio2.play();
// });