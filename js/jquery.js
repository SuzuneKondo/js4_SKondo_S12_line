//繋がったかくにん
// alert(1111);

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

////////////////////////////////
//--ここにAPIキーを挿入する(●´ー｀●)

///////////////////////////////

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app); // RealtimeDatabase使うよ
const dbRef = ref(db, 'dev245'); // RealtimeDatabase”dev245“を使うよ refは参照する

//-----------------------------------------
//-------------送信処理を記述----------------
//-----------------------------------------

$('#send').on('click', function(){

    //---------自分側の送信準備---------
    //id uname の場所を取得
    const uname = $('#uname').val();
    // console.log(uname,'unameの中身の確認');

    //id text の場所を取得
    const text = $('#text').val();
    // console.log(text,'textの中身の確認');

    //取得できているかかくにんこれ必須！
    // alert(uname + text);

    
    // --------（Bobの挙動）--------
    //乱数---r 相手の応答（ランダム）
    const r=Math.ceil(Math.random()*10);
    
    //if分岐処理--相手の応答が何になるか
    let view="";
    if(r===1){
        // console.log("こんにちわ");
        view='Bello!';
    }else if(r===2){
        // console.log("バナナ");
        view='Banana~!';
    }else if(r===3){
        // console.log("ヤッホー");
        view='Hi!';
    }else if(r===4){
        view='タンキュー!（ありがとう）';
    }else if(r===5){
        view='マトカー…ミーワントゥバナナ（お腹すいた!）';
    }else if(r===6){
        view='タリルーティ・アモ（愛してるよー）';
    }else if(r===7){
        view='バナノニナ、プェデナ？（ひどい、はじめるか？）';
    }else if(r===8){
        view='トゥブレバ〜 ラパタケアロ〜（？）';
    }else if(r===9){
        view='バーナーナーアーアーポーテートーナーアーアー';
    }else if(r===10){
        view='ムゥスタシェラピカ～(YMCA〜)';
    }
    
    
    // ---------Bob送信準備----------
    //id bob の場所を取得
    const bob = view;
    // console.log(bob,'bobの中身の確認');
    
    //取得できているかかくにん これ必須！
    // alert(bob);
    
    
    //データの塊作り msgという名前
    //uname text が鍵の名前
    //作成したデータの塊をfirebaseに送信をします⇨つまりこれが保存になります🤗
    const msg={
        uname: uname,
        text: text,
        bobText: bob,
    }

    // ---------一括で送信処理----------
    // firebaseに送る準備をしていることになります🤗
    //※１回のクリックをトリガーにする場合、送信処理は１回、箱constも１個しか送れないので両者分まとめるしかない
    const newPostRef = push(dbRef) //データを送信できる準備
    set(newPostRef, msg); // firebaseの登録できる場所に保存するイメージです🤗

    //送信後に入力欄をからにする//valに””をつけるとからにしてくれる
    $("#uname").val("");
    $("#text").val("");

    // カーソルを持っていく
    $("#uname").focus();

// send送信イベント この下消さない
});


//-----------------------------------------
//-------------受信処理を記述----------------
//-----------------------------------------
//functionの後（）に名前入れると、その場所にデータ入る

onChildAdded(dbRef, function(data){
    
    //ここから受信処理開始

    //登録されたデータを取得//firebaseのデータ名（塊）を持ってくる
    const msg=data.val();
    console.log(msg, '取得したデータの塊')
    
    //登録されたデータを取得2//keyのデータ塊を持ってくる
    const key = data.key;
    console.log(key, 'データの塊にアクセス')

    //es6のテンプレートリテラル※テンプレートリテラル使わないと怒られるレベルの
    let h =`
    <div class="msg">
        <p class="msg-text">${msg.uname}</p>
        <p class="msg-text">${msg.text}</p>
        <button id="delete" data-kg=${key}>けす</button>
    </div>
    `

    //htmlを埋め込み
    //append();というおまじない
    $("#output").append(h);

    // onChildAdded イベント この下消さない
});

// ------Bob受信処理------
//functionの後（）に名前入れると、その場所にデータ入る

onChildAdded(dbRef, function(bobData){
    
    //ここから受信処理開始
    //登録されたデータを取得//firebaseのデータ名（塊）を持ってくる
    const yellow=bobData.val();
    console.log(yellow, '取得したデータの塊')
    
    //登録されたデータを取得2//keyのデータ塊を持ってくる
    const key = bobData.key;
    console.log(key, 'データの塊にアクセス')

    //es6のテンプレートリテラル※テンプレートリテラル使わないと怒られるレベルの
    let hh =`
    <div class="bob">
        <p class="bob-text">ボブ</p>
        <p class="bob-text">${yellow.bobText}</p>
    </div>
    `

    //htmlを埋め込み
    //append();というおまじない
    // $("#output").append(hh);
    setTimeout(function(){$("#output").append(hh)},800);

    // onChildAdded イベント この下消さない
});


//--------------------
//-----削除ボタンの挙動-----
//--------------------
$(document).on("click","#delete",function(){
    let v = $(this).data("kg");
    console.log(v, "カギ");
    remove(ref(db, "dev245/" + v));
    // onChildRemoved(ref(db, "dev245/" + v), function(ddd){
    //     console.log(ddd.key);
    //     console.log(ddd.val());
    //     //ここで削除する？（HTML
    // });
    location.reload(); // jsのおまじない、強制リロード＝画面上消える・・本来はfirebase側に onChildRemoved
});


//-----------------------------------------
// ----スタンプの挙動-----
//-----------------------------------------

//Timスタンプ
$('.stampt-img').on('click', function() {
//     // console.log('実行！');
//     const img = 's_tim'
//     // console.log(img,'イメージ名');
//     const stampImg = {
//         img: img,
//     }

//     const newPostRef = push(dbRef) //データを送信できる準備
//     set(newPostRef, stampImg);

// });

// onChildAdded(dbRef, function(stampData){

//     //ここから受信処理開始

//     //登録されたデータを取得//firebaseのデータ名（塊）を持ってくる
//     const stampImg=stampData.val();
//     console.log(stampImg, '取得したデータの塊')
    
//     //登録されたデータを取得2//keyのデータ塊を持ってくる
//     const key = stampData.key;
//     console.log(key, 'データの塊にアクセス')

// let hhh=`
// <div class="msg-tim">
// <img src="img/${img}.png" alt="Timスタンプ" class="msg-tims">
// </div>
// `

let hhh=`
<div class="msg-tim">
<img src="img/s_tim.png" alt="Timスタンプ" class="msg-tims">
</div>
`
$("#output").append(hhh);
});

//バナナスタンプ
$('.stampb-img').on('click', function() {
    // console.log('実行！');

    let hh=`
    <div class="msg-ban">
    <img src="img/s_banana.png" alt="バナナスタンプ" class="msg-bans">
    </div>
    `
    $("#output").append(hh);
    // });
});


//スクロールの挙動
let target = document.getElementById('output');
target.scrollIntoView(false);