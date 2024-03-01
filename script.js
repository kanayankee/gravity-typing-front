//get
//https://script.google.com/macros/s/AKfycbzE1WDkqkA8-tkc82QTbwcBKshm-SZPSwRE12ZZcA3bAIQwC0vDf1WbCJ8kY12sF2P9Yg/exec?set_id=

//post
//https://script.google.com/macros/s/AKfycbzE1WDkqkA8-tkc82QTbwcBKshm-SZPSwRE12ZZcA3bAIQwC0vDf1WbCJ8kY12sF2P9Yg/exec?set_id= &name &point=
var dataArray
var rankArray
var data_get = false
var current_question
var current_answer
var current_question_num = 0
var total_question_num = 0
var water1 = document.getElementById('water1');
var water1_position_x = 0;
var water1_position_y = 0;
var speed = 1;
var water_text1 = document.getElementById('water_text1');
var stop = false;
var out_window = document.getElementById('out');
var out_question = document.getElementById('out_question');
var out_answer = document.getElementById('out_answer')
var out_collect_answer = document.getElementById('out_collect_answer');
var kusa_image = document.getElementById('kusa');
var current_kusa = 0;
var answer = document.getElementById('answer');

function data_get1() {
    var id = new URLSearchParams(window.location.search).get('id');
    var url = 'https://script.google.com/macros/s/AKfycbzE1WDkqkA8-tkc82QTbwcBKshm-SZPSwRE12ZZcA3bAIQwC0vDf1WbCJ8kY12sF2P9Yg/exec?set_id=' + id;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            dataArray = data.data;
            rankArray = data.rank;
            data_get = true;
            //dataArrayをランダムに並び替え
            dataArray.sort(function () {
                return Math.random() - Math.random();
            });
            console.log(dataArray);
            console.log("学習セットの取得に成功しました")
            start()
            setInterval(gravity, 10);
        })
        .catch(error => {
            alert('学習セットの取得に失敗しました:' + error)
        });
}

function start() {
    water1_position_y = 0;
    current_question_num++;
    current_question = dataArray[current_question_num]["question"];
    current_answer = dataArray[current_question_num]["answer"];
    water_text1.innerHTML = current_question;
    out_question.innerHTML = current_question;
    out_collect_answer.innerHTML = current_answer;
    answer.focus();
    gravity()
}

function change(event) {
    var input = event.target.value;
    if (input == current_answer) {
        stop = false;
        restart()
    }
}

function pushKey(event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed');
        var input = event.target.value;
        if (input == current_answer) {
            event.target.value = '';
            current_kusa = current_kusa + ((window.innerHeight - water1_position_y) * 0.05);
            kusa_image.style.height = current_kusa + 'px';
            start()
        } else {
            event.target.value = '';
        }
    }
}

async function restart() {
    out_window.style.display = 'none';
    out_answer.value = '';
    start()
}

function next() {

}

function out() {
    stop = true;
    out_question.innerHTML = current_question;
    out_collect_answer.innerHTML = current_answer;
    out_window.style.display = 'block';
    out_answer.focus();
}

function gravity() {
    // while (stop == false) {
    if (stop == false) {
        if (water1_position_y > window.innerHeight) {
            out();
        } else {
            water1_position_y = water1_position_y + speed;
            water1.style.top = water1_position_y + 'px';
        }
    }
    // }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        out();
    }
});

function out() {
    stop = true;
    out_question.innerHTML = current_question;
    out_collect_answer.innerHTML = current_answer;
    out_window.style.display = 'block';
    out_answer.focus();
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        out();
    }
});
