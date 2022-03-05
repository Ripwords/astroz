import{ac as w,ad as v}from"./vendor.42234d49.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const D=(o,l,u,m,h)=>{const a=o.ownerDocument.defaultView;return w({el:o,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:t=>t.startX<=50&&l(),onStart:u,onMove:t=>{const e=t.deltaX/a.innerWidth;m(e)},onEnd:t=>{const c=t.deltaX,e=a.innerWidth,n=c/e,s=t.velocityX,p=e/2,r=s>=0&&(s>.2||t.deltaX>p),i=(r?1-n:n)*e;let d=0;if(i>5){const g=i/Math.abs(s);d=Math.min(g,540)}h(r,n<=0?.01:v(0,n,.9999),d)}})};export{D as createSwipeBackGesture};
