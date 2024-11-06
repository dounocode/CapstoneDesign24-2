from flask import Flask, render_template

app = Flask(__name__)

# 메인 페이지
@app.route('/')
def home():
    return render_template('index.html')

# 강의실 페이지
@app.route('/lecture')
def lecture():
    return render_template('lecture.html')

# 챗봇 페이지
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html') 

if __name__ == '__main__':
    app.run(debug=True)
