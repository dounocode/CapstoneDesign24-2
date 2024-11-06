from flask import Flask, request, render_template, redirect, url_for
import whisper
from googletrans import Translator
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Whisper 모델 로드
model = whisper.load_model("base")

# Google Translate 설정
translator = Translator()

# 업로드 폴더가 없으면 생성
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# 메인 페이지: 파일 업로드 폼
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # 파일이 업로드되지 않은 경우
        if 'file' not in request.files:
            return "No file part", 400
        
        file = request.files['file']
        
        # 파일이 선택되지 않은 경우
        if file.filename == '':
            return "No selected file", 400
        
        if file:
            # 파일을 저장
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)
            
            # Whisper로 파일 변환 및 한국어 번역
            english_text, korean_text = transcribe_and_translate(file_path)
            
            # 변환 결과를 보여주기 위해 결과 페이지로 리다이렉트
            return render_template('result.html', english_text=english_text, korean_text=korean_text)
    
    return render_template('index.html')

# Whisper를 이용한 오디오 파일 변환 및 번역 함수
def transcribe_and_translate(file_path):
    try:
        # Whisper로 파일 변환
        result = model.transcribe(file_path)
        english_text = result['text']
        
        # Google Translate로 영어 텍스트를 한국어로 번역
        translated = translator.translate(english_text, src='en', dest='ko')
        korean_text = translated.text

        return english_text, korean_text
    except Exception as e:
        print(f"Error during transcription or translation: {e}")
        return "Error during transcription", "Error during translation"

# 서버 실행
if __name__ == '__main__':
    app.run(debug=True)

