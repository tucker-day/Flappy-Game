(()=>{"use strict";var e,t={494:(e,t,i)=>{var s=i(260),n=i.n(s);class r extends n().Scene{constructor(e,t){super(e),this.config=t,this.fontSize="32px",this.lineStep=42,this.fontOptions={fontSize:this.fontSize,fill:"#000"},this.screenCenter=[t.width/2,t.height/2]}create(){if(this.add.image(0,0,"sky-bg").setOrigin(0),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setOrigin(1).setScale(2).setInteractive().on("pointerup",(()=>{this.scene.start("Menu")}))}}createMenu(e,t){let i=0;e.forEach((e=>{const s=[this.screenCenter[0],this.screenCenter[1]+i];e.textObj=this.add.text(...s,e.text,this.fontOptions).setOrigin(.5,1),i+=this.lineStep,t(e)}))}createBack}const a=r;const c=class extends a{constructor(e){super("Play",e),this.bird=null,this.pipes=null,this.isPaused=!1,this.score=0,this.scoreText="",this.currentDifficulty="Easy",this.difficulties={Easy:{initPipeSpeed:-250,pipeGapRange:[225,275],pipeDistance:[325,375]},Medium:{initPipeSpeed:-275,pipeGapRange:[200,250],pipeDistance:[300,350]},Hard:{initPipeSpeed:-300,pipeGapRange:[175,225],pipeDistance:[275,325]},Pain:{initPipeSpeed:-325,pipeGapRange:[150,200],pipeDistance:[250,300]}}}create(){super.create(),this.createBird(),this.createAnims(),this.createPipes(),this.createInputHandler(),this.createScore(),this.createColliders(),this.createPause(),this.listenEvents()}createAnims(){this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:1,end:9}),frameRate:8,repeat:-1}),this.bird.play("fly")}listenEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Fly in "+this.initialTime,this.fontOptions).setOrigin(.5,.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime--,this.countDownText.setText("Fly in "+this.initialTime),this.initialTime<=0&&(this.isPaused=!1,this.countDownText.setText(""),this.physics.resume(),this.timedEvent.remove())}createBird(){this.bird=this.physics.add.sprite(this.config.initBirdPosition.x,this.config.initBirdPosition.y,"bird").setOrigin(0,0).setScale(.25),this.bird.setBodySize(this.bird.width-80,this.bird.height-120),this.bird.refreshBody(),this.bird.body.gravity.y=1500,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<2;e++){const e=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(this.difficulties[this.currentDifficulty].initPipeSpeed)}createInputHandler(){this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown_SPACE",this.flap,this)}createScore(){this.score=0,this.scoreText=this.add.text(16,16,`Score: ${this.score}`,{fontSize:"32px",fill:"#000"});const e=localStorage.getItem("bestScore");this.add.text(16,48,`High Score: ${e||0}`,{fontSize:"16px",fill:"#000"})}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createPause(){this.isPaused=!1;this.add.image(this.config.width-10,this.config.height-10,"pause").setOrigin(1).setScale(2).setInteractive().on("pointerdown",(()=>{this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("Pause")}))}update(){this.checkBirdOOB(),this.recyclePipe()}checkBirdOOB(){(this.bird.y>=this.config.height-60||this.bird.y<=0)&&this.gameOver()}flap(){!1===this.isPaused&&(this.bird.body.velocity.y=-500)}increaseScore(){this.score++,this.scoreText.setText(`Score: ${this.score}`)}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score)}gameOver(){this.physics.pause(),this.bird.setTint(14483460),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.currentDifficulty="Easy",this.scene.restart()},loop:!1})}placePipe(e,t){let i=this.getRightMostPipe();0===i&&(i=200);const s=Phaser.Math.Between(...this.difficulties[this.currentDifficulty].pipeGapRange),n=Phaser.Math.Between(50,this.config.height-50-s),r=Phaser.Math.Between(...this.difficulties[this.currentDifficulty].pipeDistance);e.x=i+r,e.y=n,t.x=e.x,t.y=n+s,this.pipes.setVelocityX(this.difficulties[this.currentDifficulty].initPipeSpeed)}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((function(t){e=Math.max(t.x,e)})),e}recyclePipe(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<=0&&(e.push(t),2===e.length&&(this.placePipe(...e),this.increaseScore(),this.saveBestScore(),this.increaseDifficulty()))}))}increaseDifficulty(){10===this.score?this.currentDifficulty="Medium":20===this.score?this.currentDifficulty="Hard":30===this.score&&(this.currentDifficulty="Pain")}};const h=class extends a{constructor(e){super("Menu",e),this.menu=[{scene:"Play",text:"Play"},{scene:"Score",text:"High Scores"},{scene:null,text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this)),this.add.text(this.config.width/2,this.config.height-5,"Programmed by Tucker Day",{fontSize:"16px",fill:"#fff"}).setOrigin(.5,1)}setupMenuEvents(e){const t=e.textObj;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#000"})})),t.on("pointerup",(()=>{e.scene&&this.scene.start(e.scene),"Exit"===e.text&&this.game.destroy(!0)}))}};class o extends n().Scene{constructor(){super("Preload")}preload(){this.load.image("sky-bg","assets/sky2.jpg"),this.load.image("pipe","assets/pipe(kinda).jpg"),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png"),this.load.spritesheet("bird","assets/bird2.png",{frameWidth:286,frameHeight:264})}create(){this.scene.start("Menu")}}const p=o;const l=class extends a{constructor(e){super("Score",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore");this.add.text(...this.screenCenter,`High Score: ${e||0}`,this.fontOptions).setOrigin(.5,.5)}};const d=class extends a{constructor(e){super("Pause",e),this.menu=[{scene:"Play",text:"Continue"},{scene:"Menu",text:"Exit"}]}create(){this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textObj;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#000"})})),t.on("pointerup",(()=>{e.scene&&"Continue"===e.text?(this.scene.stop(),this.scene.resume(e.scene)):(this.scene.stop("Play"),this.scene.start("Menu"))}))}},u={width:400,height:600,initBirdPosition:{x:40,y:300}},f=[p,h,c,l,d],g=e=>new e(u),y={type:n().AUTO,width:u.width,pixelArt:!0,height:u.height,physics:{default:"arcade",arcade:{debug:!0}},scene:f.map(g)};new(n().Game)(y)}},i={};function s(e){var n=i[e];if(void 0!==n)return n.exports;var r=i[e]={exports:{}};return t[e](r,r.exports,s),r.exports}s.m=t,e=[],s.O=(t,i,n,r)=>{if(!i){var a=1/0;for(p=0;p<e.length;p++){for(var[i,n,r]=e[p],c=!0,h=0;h<i.length;h++)(!1&r||a>=r)&&Object.keys(s.O).every((e=>s.O[e](i[h])))?i.splice(h--,1):(c=!1,r<a&&(a=r));if(c){e.splice(p--,1);var o=n();void 0!==o&&(t=o)}}return t}r=r||0;for(var p=e.length;p>0&&e[p-1][2]>r;p--)e[p]=e[p-1];e[p]=[i,n,r]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var n,r,[a,c,h]=i,o=0;if(a.some((t=>0!==e[t]))){for(n in c)s.o(c,n)&&(s.m[n]=c[n]);if(h)var p=h(s)}for(t&&t(i);o<a.length;o++)r=a[o],s.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return s.O(p)},i=self.webpackChunkaltudemypackage=self.webpackChunkaltudemypackage||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var n=s.O(void 0,[736],(()=>s(494)));n=s.O(n)})();