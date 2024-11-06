function showTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
    }
    
    function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('collapsed'); // 사이드바 접기
    }
    
    // 챗봇 모달 열기 함수
    function openChatbotModal() {
    document.getElementById("chatbot-modal").style.display = "flex";
    }
    
    // 챗봇 모달 닫기 함수
    function closeChatbotModal() {
    document.getElementById("chatbot-modal").style.display = "none";
    }
    
    function showTab(tabId) {
    // 모든 탭 콘텐츠 숨기기
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    // 선택한 탭만 표시
    document.getElementById(tabId).style.display = 'block';
    }    
    function openPostForm() {
    document.getElementById('community-posts').style.display = 'none';
    document.getElementById('post-form').style.display = 'flex';
    }
    
    function closePostForm() {
    document.getElementById('post-form').style.display = 'none';
    document.getElementById('community-posts').style.display = 'block';
    }
    
    function loadOlderPosts() {
    alert('Loading older posts...');
    }
    
    // 바텀 바의 화살표 아이콘으로 강의 이동
    
    // 모든 강의의 URL을 HTML에서 가져와 배열로 저장
    const lectures = Array.from(document.querySelectorAll('.lecture-list li')).map(item => item.getAttribute('data-url'));
    
    let currentLectureIndex = 0; // 현재 강의 인덱스 초기화
    
    // 강의 변경 함수
    function changeVideo(element) {
    const url = element.getAttribute('data-url'); // 클릭된 요소의 data-url 속성 값 가져오기
    const videoFrame = document.getElementById('video-frame');
    videoFrame.src = url; // iframe의 src 속성을 변경하여 비디오를 바꿉니다.
    
    // 인덱스 업데이트: 화살표 버튼과 연동
    currentLectureIndex = lectures.indexOf(url);
    }
    
    // 이전 강의로 이동
    function goToPreviousLecture() {
    if (currentLectureIndex > 0) {
        currentLectureIndex--;
        changeVideoFromIndex(currentLectureIndex);
        }
    }
    
    // 다음 강의로 이동
    function goToNextLecture() {
    if (currentLectureIndex < lectures.length - 1) {
        currentLectureIndex++;
        changeVideoFromIndex(currentLectureIndex);
        }
    }
    
    // 인덱스를 사용하여 강의를 변경하는 함수
    function changeVideoFromIndex(index) {
    const videoFrame = document.getElementById('video-frame');
    videoFrame.src = lectures[index];
    }
    
    // 바텀바 화살표에 이벤트 리스너 추가
    document.querySelector('.bottom-bar .bar-icon[alt="왼쪽 화살표"]').addEventListener('click', goToPreviousLecture);
    document.querySelector('.bottom-bar .bar-icon[alt="오른쪽 화살표"]').addEventListener('click', goToNextLecture);
    
    // 초기 강의 설정
    changeVideoFromIndex(currentLectureIndex);