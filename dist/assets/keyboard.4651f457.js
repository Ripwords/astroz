/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const f="ionKeyboardDidShow",p="ionKeyboardDidHide",b=150;let r={},t={},s=!1;const K=()=>{r={},t={},s=!1},O=e=>{g(e),!!e.visualViewport&&(t=i(e.visualViewport),e.visualViewport.onresize=()=>{E(e),y()||l(e)?n(e):d(e)&&a(e)})},g=e=>{e.addEventListener("keyboardDidShow",o=>n(e,o)),e.addEventListener("keyboardDidHide",()=>a(e))},n=(e,o)=>{D(e,o),s=!0},a=e=>{u(e),s=!1},y=()=>{const e=(r.height-t.height)*t.scale;return!s&&r.width===t.width&&e>b},l=e=>s&&!d(e),d=e=>s&&t.height===e.innerHeight,D=(e,o)=>{const c=o?o.keyboardHeight:e.innerHeight-t.height,h=new CustomEvent(f,{detail:{keyboardHeight:c}});e.dispatchEvent(h)},u=e=>{const o=new CustomEvent(p);e.dispatchEvent(o)},E=e=>{r=Object.assign({},t),t=i(e.visualViewport)},i=e=>({width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale});export{p as KEYBOARD_DID_CLOSE,f as KEYBOARD_DID_OPEN,i as copyVisualViewport,d as keyboardDidClose,y as keyboardDidOpen,l as keyboardDidResize,K as resetKeyboardAssist,a as setKeyboardClose,n as setKeyboardOpen,O as startKeyboardAssist,E as trackViewportChanges};
