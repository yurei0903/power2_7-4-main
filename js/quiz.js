var hantei=true;
var lock=true;
var nitaku="０";
var sentaku="０";
const a=["0","1","2","3","4"]
function nitakuFunction(event) {
    const sentakukaitou=document.getElementById('sentakukaitou');
    // クリックされたボタンのデータ属性からidを取得
    
    const buttonId = event.target.getAttribute('data-id');
    
    nitaku=buttonId;
    sentakukaitou.innerText="現在の解答は"+nitaku+"です";
}
function sentakuFunction(event) {
    // クリックされたボタンのデータ属性からidを取得
    const buttonId = event.target.getAttribute('data-id');
    sentaku=buttonId;
    sentakukaitou.innerText="現在の解答は"+sentaku+"です";
}
async function quizdasu(pos) {
    try {
        if(lock){
        const response = await fetch('JSON/questions.json');
        const questionData = await response.json();
        // loadQuestionがPromiseを返すようにします
        return await loadQuestion(questionData,pos);
        }
    } catch (error) {
        console.error('Error loading the question data:', error);
        return false;
    }
}

// 問題をロードする関数
function loadQuestion(questionData,pos) {
    
    var basho=[0,0];
    var Index="0";
    console.log(pos)
    return new Promise((resolve) => {
        switch(pos.x){
        case 0:
        case 5:basho[0]=0;break;
        case 1:
        case 4:basho[0]=1;break;
        case 2:
        case 3:basho[0]=2;break;
        }
        switch(pos.y){
            case 0:
            case 5:basho[1]=0;break;
            case 1:
            case 4:basho[1]=1;break;
            case 2:
            case 3:basho[1]=2;break;
            default:basho[1]=2
            }
    
    switch(basho[1]+basho[0]){//場所で難易度を調整してる
        case 0: Index="2";break;
        case 1: 
        case 2: Index="1";break;
        case 3:
        case 4: Index="0";break;
        default:Index="0";break;
        }
        const selectionData=questionData.filter(item=> item.level == Index);
        console.log(selectionData);
        const randamIndex = Math.floor(Math.random() * selectionData.length);
        const selectedQuestion = selectionData[randamIndex];
        
        console.log(selectedQuestion.答え)
        const questionArea = document.getElementById('question-area');
        const answerArea = document.getElementById('answer-area');
        questionArea.innerHTML = '<h3 class="Q_name">問題形式:' + selectedQuestion.問題形式 + '</h3>' +
                                '<p class="Q_main">' + selectedQuestion.問題文 + '</p>';
        const quizElement = document.getElementById('quiz');
        quizElement.style.display = 'block'; // 要素を表示

        if (selectedQuestion.問題形式 === "一問一答") {
            answerArea.innerHTML +='<div id="answer" class="button"><a href="#">回答</a></div>'
            answerArea.innerHTML +='<input type="text" id="kaitou" placeholder="ここに文字を入力" />'
        }
        else if(selectedQuestion.問題形式 === "二択"){
            let nitakuadata=selectedQuestion.選択肢.split(" ");
            answerArea.innerHTML += '<button class="nitaku" data-id="１">'+nitakuadata[0]+'</button>';
            answerArea.innerHTML += '<button class="nitaku" data-id="２">'+nitakuadata[1]+'</button>';
            answerArea.innerHTML +='<div id="answer" class="button"><a href="#">回答</a></div>'
            const nitaku = document.querySelectorAll(".nitaku");
            nitaku.forEach(button => {
                button.addEventListener('click', nitakuFunction);
            });
        }
        else if(selectedQuestion.問題形式 === "択一(文章)"){
            let sentakuadata=selectedQuestion.選択肢.split(" ");
            answerArea.innerHTML += '<button class="sentaku" data-id="１">'+sentakuadata[0]+'</button>';
            answerArea.innerHTML += '<button class="sentaku" data-id="２">'+sentakuadata[1]+'</button>';
            answerArea.innerHTML += '<button class="sentaku" data-id="３">'+sentakuadata[2]+'</button>';
            answerArea.innerHTML +='<div id="answer" class="button"><a href="#">回答</a></div>'
            const sentaku = document.querySelectorAll(".sentaku");
            sentaku.forEach(button => {
                button.addEventListener('click', sentakuFunction);
            });
        }

        setTimeout(() => {
            const answerButton = document.getElementById('answer');
            if (answerButton) {
                lock=false;
                answerButton.addEventListener('click', function () {
                    const result = checkAnswer(selectedQuestion["答え"], selectedQuestion.問題形式);
                    resolve(result);  // 結果をPromiseとして返す
                });
            } else {
                console.error('Button with id="answer" not found.');
                resolve(false);  // エラーの場合は何らかのデフォルト値を返す
            }
        }, 0);
    });
}


// 答えを確認する関数
function checkAnswer(correctAnswer, format) {
    const  seikai= document.getElementById('seikai');
    const  matigai= document.getElementById('matigai');
    if (format === "一問一答") {
        // 一問一答では文字の最初部分を確認
        let userAnswer = document.getElementById('kaitou').value;
        userAnswer = userAnswer.trim();
        if (userAnswer && userAnswer === correctAnswer) {
            seikai.currentTime = 0; // 音声の再生位置をリセット
            seikai.play(); // 音を再生
            alert("正解です！");
            hantei=true;

        } else {
            matigai.currentTime = 0; // 音声の再生位置をリセット
            matigai.play(); // 音を再生
            alert("残念、不正解です。正解は..."+correctAnswer);
            hantei=false;
        }

        document.getElementById('kaitou').value = '';
    } else if (format === "択一(文章)" ) {
        userAnswer = sentaku;
        // 択一の確認
        if (userAnswer=== correctAnswer.charAt(0)) {
            seikai.currentTime = 0; // 音声の再生位置をリセット
            seikai.play(); // 音を再生
            alert("正解です！")
            hantei=true;
            
        } else {
            matigai.currentTime = 0; // 音声の再生位置をリセット
            matigai.play(); // 音を再生
            hantei=false;
            alert("残念、不正解です。正解は..."+correctAnswer);
            
        }
        
    }
    else if (format === "二択" ) {
        userAnswer = nitaku;
        // 択一の確認
        if (userAnswer=== correctAnswer.charAt(0)) {
            seikai.currentTime = 0; // 音声の再生位置をリセット
            seikai.play(); // 音を再生
            alert("正解です！")
            hantei=true;
            
        } else {
            matigai.currentTime = 0; // 音声の再生位置をリセット
            matigai.play(); // 音を再生
            hantei=false;
            alert("残念、不正解です。正解は..."+correctAnswer);
            
        }
    }
    
    const parent = document.getElementById('answer-area');
    while(parent.firstChild){
    parent.removeChild(parent.firstChild);
    }
    sentakukaitou=document.getElementById('sentakukaitou');
    sentakukaitou.innerHTML="";
    nitaku="０";
    sentaku="０";
    lock=true;
    return(hantei)
}