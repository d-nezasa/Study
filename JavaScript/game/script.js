var game = null;
var gameTimer = null;
var itemTimer = null;
var board_w = 800;
var board_h = 400;
var time_dx = 5000;
var lost_max = 10;
// このページの初期化処理
function initial() {
    game = new Game();
}
// ゲームの開始
function start() {
    if (game.flg == false) {
        game.initial();
        time_dx = 5000;
        gameTimer = setInterval(run, 25);
        itemTimer = setTimeout(makeItem, time_dx);
    }
}
// ゲームの基本処理の呼び出し
function run() {
    game.run();
}
// アイテム作成処理
function makeItem() {
    game.makeItem();
    time_dx -= 100;
    if (time_dx < 1000) { time_dx = 1000; }
    itemTimer = setTimeout(makeItem, time_dx);
}
// ゲーム終了の処理
function gameOver() {
    clearInterval(gameTimer);
    clearTimeout(itemTimer);
    game.flg = false;
    game.draw();
}
// オブジェクト関係

function Character() {
    this.w = 200;
    this.h = 200;
    this.x = 0;
    this.y = board_h - this.h;
    this.dx = 5;
    this.direct = 'right';
    this.last_direct = 'right';
    this.imageR = new Image();
    this.imageR.src = 'github_octocat.1.png';
    this.imageL = new Image();
    this.imageL.src = 'github_octocat.png';
    // キャラクターの描画
    this.draw = function(context) {
        if (this.direct == 'stop') {
            if (this.last_direct == 'right') {
                context.drawImage(this.imageR, this.x, this.y, 200, 200);
            } else {
                context.drawImage(this.imageL, this.x, this.y, 200, 200);
            }
        }
        if (this.direct == 'right') {
            context.drawImage(this.imageR, this.x, this.y, 200, 200);
        }
        if (this.direct == 'left') {
            context.drawImage(this.imageL, this.x, this.y, 200, 200);
        }
    }
    // キャラクターを動かす
    this.move = function() {
        if (this.direct == 'right') {
            this.last_direct = 'right';
            this.x += this.dx;
        }
        if (this.direct == 'left') {
            this.last_direct = 'left';
            this.x -= this.dx;
        }
    }
}

function Item() {
    this.w = 60;
    this.h = 60;
    this.x = Math.floor(Math.random() * (board_w - this.w));
    this.y = this.h * -1;
    this.dy = Math.floor(Math.random() * 5) + 1;
    this.image = new Image();
    this.image.src = 'item' + Math.floor(Math.random() * 3) + '.png';
    this.sound = document.querySelector('#item_get');
    // アイテム描画
    this.draw = function(context) {
        context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    // アイテムを動かす
    this.move = function() {
        this.y += this.dy;
    }
    // 取得時の処理
    this.get = function() {
        this.sound.play();
    }
}

function Star() {
    this.w = 50;
    this.h = 50;
    this.x = Math.floor(
        Math.random() * (board_w - this.w));
    this.y = this.h * -1;
    this.dy = Math.floor(
        Math.random() * 5) + 1;
    this.image = new Image();
    this.image.src = 'star.png';
    this.sound = document
        .querySelector('#star_get');
    this.timer = null;
    this.draw = function(context) {
        context.drawImage(this.image,
            this.x, this.y, this.w, this.h);
    }
    this.move = function() {
        this.y += this.dy;
    }
    this.get = function() {
        this.sound.play();
        game.chara.dx *= 2;
        this.timer = setTimeout(function() {
            game.chara.dx /=2;
        }, 10000);
    }
}

function Game() {
    this.flg = false;
    this.canvas = document.querySelector('#canvas');
    this.context = canvas.getContext('2d');
    this.chara = new Character();
    this.bkImage = new Image();
    this.bkImage.src = 'backgrounds.png';
    // ゲームオブジェクトの初期化
    this.initial = function() {
        this.flg = true;
        this.score = 0;
        this.missed = 0;
        this.chara.x = (board_w - this.chara.w) / 2;
        this.items = new Array();
    }
    // マウスを動かした時のイベント処理
    this.canvas.onmousemove = function(e) {
        this.mouseX = e.clientX - this.offsetLeft;
        this.mouseY = e.clientY - this.offsetTop;
    }
    // ゲーム画面の描画処理
    this.draw = function() {
        this.context.drawImage(this.bkImage, 0, 0);
        this.chara.draw(this.context);
        for (var n in this.items) {
            var item = this.items[n];
            item.draw(this.context);
        }
        this.context.font = "24pt 'Monaca'";
        this.context.fillStyle = 'white';
        this.context.textAlign = 'start';
        this.context.fillText(this.score, 10, 30);
        if (this.flg == false) {
            this.context.font = "72pt 'san serif'";
            this.context.textAlign = 'center';
            this.context.fillText('GAMEOVER', board_w / 2, 200);
        }
    }
    // アイテムの作成
    this.makeItem = function() {
        if (Math.floor(Math.random() * 20) == 0) {
            game.items.push(new Star());
        }else{
            this.items.push(new Item());
        }

    }
    // アイテム取得の処理
    this.isCatched = function() {
        for (var n in this.items) {
            var item = this.items[n];
            if (item.y > this.chara.y + 50 &&
                item.y < this.chara.y + 150) {
                    if (item.x > this.chara.x &&
                        item.x + item.w < this.chara.x + this.chara.h) {
                            item.get();
                            this.items.splice(n,1);
                            this.score += 100 + (item.dy -1) * 50;
                        }
                }
                if (item.y > this.canvas.height) {
                    this.items.splice(n,1);
                    this.score -= 10 + item.dy * 10;
                    if (this.score < 0){ this.score = 0; }
                    this.missed++;
                    if (this.missed > lost_max) { gameOver(); }
                }
        }
    }
    // ゲームのメイン処理
    this.run = function() {
        this.chara.direct = 'stop';
        if (this.chara.x > this.canvas.mouseX) {
            this.chara.direct = 'left';
        }
        if (this.chara.x + this.chara.w < this.canvas.mouseX) {
            this.chara.direct = 'right';
        }
        this.chara.move();
        for (var n in this.items) {
            var item = this.items[n];
            item.move();
        }
        this.isCatched();
        this.draw();
    }
}
