import{r as m,a3 as c,d as G,o as n,b as t,w as e,Y as J,f as l,u,a4 as i,g as d,a as C,R as K,T as M,V as Q,a5 as W,a6 as X,C as Z,D as $,E as ee}from"./vendor.42234d49.js";import{_ as le}from"./Header.425ab0e7.js";import{m as ue,p as ne}from"./index.70541fd8.js";const te=ue(),p=te.decimal,b=m(""),F=m(""),g=m(""),v=m(""),f=m(""),y=m(""),V=m(""),A=c(()=>F.value!=""&&g.value!=""?(Number(g.value)/Number(F.value)).toFixed(p):""),T=c(()=>b.value!=""&&g.value!=""?(Number(g.value)/Number(b.value)).toFixed(p):""),j=c(()=>b.value!=""&&F.value!=""?(Number(b.value)/Number(F.value)).toFixed(p):""),w=c(()=>y.value!=""&&v.value!=""&&V.value!=""?(Number(V.value)*Number(v.value)/Number(y.value)).toFixed(p):""),H=c(()=>{if(f.value!=""&&v.value!=""&&V.value!="")return(Number(V.value)*Number(v.value)/Number(f.value)).toFixed(p)}),S=c(()=>f.value!=""&&y.value!=""&&V.value!=""?(Number(y.value)*Number(f.value)/Number(V.value)).toFixed(p):""),D=c(()=>f.value!=""&&y.value!=""&&v.value!=""?(Number(f.value)/Number(v.value)/Number(y.value)).toFixed(p):""),ae={aperture:b,fRatio:F,focalLength_1:g,focalLength_2:v,eyeFOV:f,eyepieceFocalLength:y,actualFOV:V},oe=d("Focal Length"),re=d("Aperture : "),de=d("F/ : "),se=d("Focal Length : "),_e=C("br",null,null,-1),me=d("True Field of View"),ce=d("Eyepiece FOV : "),ie=d("Eyepiece Focal Length : "),pe=d("Focal Length : "),ve=d("Actual FOV : "),fe=C("br",null,null,-1),ye=C("br",null,null,-1),Ne=G({setup(Ve){const P=ne().optics,{actualFOV:h,aperture:N,focalLength_1:k,focalLength_2:L,eyeFOV:x,fRatio:I,eyepieceFocalLength:O}=ae;return(be,a)=>{const Y=le,R=K,U=M,B=Q,s=W,o=X,_=Z,E=$,q=ee,z=J;return n(),t(z,null,{default:e(()=>[l(q,null,{default:e(()=>[l(Y,{title:u(P).title},null,8,["title"]),l(B,null,{default:e(()=>[l(U,null,{default:e(()=>[l(R,null,{default:e(()=>[oe]),_:1})]),_:1})]),_:1}),l(E,null,{default:e(()=>[l(_,null,{default:e(()=>[l(s,null,{default:e(()=>[re]),_:1}),u(A)?(n(),t(o,{key:1,value:u(A),readonly:""},null,8,["value"])):(n(),t(o,{key:0,modelValue:u(N),"onUpdate:modelValue":a[0]||(a[0]=r=>i(N)?N.value=r:null),type:"number",placeholder:"mm"},null,8,["modelValue"]))]),_:1}),l(_,null,{default:e(()=>[l(s,null,{default:e(()=>[de]),_:1}),u(T)?(n(),t(o,{key:1,value:u(T),readonly:""},null,8,["value"])):(n(),t(o,{key:0,modelValue:u(I),"onUpdate:modelValue":a[1]||(a[1]=r=>i(I)?I.value=r:null),type:"number",placeholder:"Focal Ratio"},null,8,["modelValue"]))]),_:1}),l(_,null,{default:e(()=>[l(s,null,{default:e(()=>[se]),_:1}),u(j)?(n(),t(o,{key:1,value:u(j),readonly:""},null,8,["value"])):(n(),t(o,{key:0,modelValue:u(k),"onUpdate:modelValue":a[2]||(a[2]=r=>i(k)?k.value=r:null),type:"number",placeholder:"mm"},null,8,["modelValue"]))]),_:1})]),_:1}),_e,l(B,null,{default:e(()=>[l(U,null,{default:e(()=>[l(R,null,{default:e(()=>[me]),_:1})]),_:1})]),_:1}),l(E,null,{default:e(()=>[l(_,null,{default:e(()=>[l(s,null,{default:e(()=>[ce]),_:1}),u(w)?(n(),t(o,{key:1,value:u(w),readonly:""},null,8,["value"])):(n(),t(o,{key:0,modelValue:u(x),"onUpdate:modelValue":a[3]||(a[3]=r=>i(x)?x.value=r:null),type:"number",placeholder:"\xB0"},null,8,["modelValue"]))]),_:1}),l(_,null,{default:e(()=>[l(s,null,{default:e(()=>[ie]),_:1}),u(H)?(n(),t(o,{key:1,value:u(H),readonly:""},null,8,["value"])):(n(),t(o,{key:0,modelValue:u(O),"onUpdate:modelValue":a[4]||(a[4]=r=>i(O)?O.value=r:null),type:"number",placeholder:"mm"},null,8,["modelValue"]))]),_:1}),l(_,null,{default:e(()=>[l(s,null,{default:e(()=>[pe]),_:1}),u(S)?(n(),t(o,{key:1,value:u(S),readonly:""},null,8,["value"])):(n(),t(o,{key:0,modelValue:u(L),"onUpdate:modelValue":a[5]||(a[5]=r=>i(L)?L.value=r:null),type:"number",placeholder:"mm"},null,8,["modelValue"]))]),_:1}),l(_,null,{default:e(()=>[l(s,null,{default:e(()=>[ve]),_:1}),u(D)?(n(),t(o,{key:1,value:u(D),readonly:""},null,8,["value"])):(n(),t(o,{key:0,modelValue:u(h),"onUpdate:modelValue":a[6]||(a[6]=r=>i(h)?h.value=r:null),type:"number",placeholder:"\xB0"},null,8,["modelValue"]))]),_:1})]),_:1}),fe,ye]),_:1})]),_:1})}}});export{Ne as default};