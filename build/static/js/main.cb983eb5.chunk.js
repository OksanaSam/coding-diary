(this["webpackJsonpcoding-diary"]=this["webpackJsonpcoding-diary"]||[]).push([[0],{169:function(e,t,a){e.exports=a(414)},174:function(e,t,a){},176:function(e,t,a){},414:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(34),c=a.n(o),r=(a(174),a(38)),i=a.n(r),u=a(64),s=a(6),d=(a(176),a(76)),m=a(8),h=a.n(m),p=a(48),b=a.n(p),f=a(156),g=a.n(f),E=a(432),v=[{name:"Select\u2026",value:""},{name:"JavaScript",value:"JavaScript"},{name:"React",value:"React"},{name:"Vanilla",value:"Vanilla"},{name:"Other",value:"Other"}],O=function(e){var t=Object(n.useState)(!1),a=Object(s.a)(t,2),o=a[0],c=a[1],r=Object(n.useState)(""),i=Object(s.a)(r,2),u=(i[0],i[1],Object(n.useState)(v[0].value)),m=Object(s.a)(u,2),h=m[0],p=m[1],f=Object(n.useState)(""),O=Object(s.a)(f,2),k=O[0],S=O[1],j=Object(n.useState)([]),w=Object(s.a)(j,2),y=w[0],C=w[1];Object(n.useEffect)((function(){c(e.isGlobalChecked)}),[e.isGlobalChecked]);var x=function(e){var t=Object(d.a)(y);t.splice(e,1),C(t)};return l.a.createElement(l.a.Fragment,null,l.a.createElement("select",{name:"tool",id:"tool",value:h,onChange:function(e){return p(e.target.value)}},v.map((function(e){return l.a.createElement("option",{key:e.value,selected:null===e.value?"selected":null,value:e.value,disabled:null===e.value||null},e.name)}))),l.a.createElement("p",{className:"selectedTool"},h),l.a.createElement("p",null,e.item),l.a.createElement("p",null,e.currentDate?Object(E.a)(e.currentDate,"do MMMM yyyy"):null),l.a.createElement("input",{type:"checkbox",onChange:function(){return e.item,void c(!o)},checked:o}),l.a.createElement("button",{onClick:function(){return x(e.item)}},"delete"),l.a.createElement(g.a,{styles:{backgroundColor:"blue"},selected:e.currentDate,onChange:e.handleDateChange,onSelect:e.handleDateSelect}),l.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),k){var t=Object(d.a)(y);t.push({text:k,done:!1}),C(t),S("")}else b.a.fire({title:"Hm...",text:"Please enter your text",confirmButtonText:"Ok"})}},l.a.createElement("label",null,l.a.createElement("input",{type:"text",value:k,onChange:function(e){return S(e.target.value)}})),l.a.createElement("button",null,"Add")),l.a.createElement("ul",null,y.map((function(e,t){return l.a.createElement("li",{key:t},l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",checked:e.done,onClick:function(){return function(e){var t=Object(d.a)(y);t[e].done=!t[e].done,C(t)}(t)}}),l.a.createElement("span",{className:e.done?"done":null},e.text),l.a.createElement("button",{onClick:function(){return x(t)}},"X")))}))))},k=(a(235),{apiKey:"AIzaSyAUgQEbOBcqZdf_L0Sgm9DQyINiHuEqIVE",authDomain:"coding-diary-d8ded.firebaseapp.com",databaseURL:"https://coding-diary-d8ded.firebaseio.com",projectId:"coding-diary-d8ded",storageBucket:"coding-diary-d8ded.appspot.com",messagingSenderId:"309101571735",appId:"1:309101571735:web:1d74e9b8c9dd4e4e4f43d2"});!function(){if(!h.a.apps.length)h.a.initializeApp(k)}();a(238),a(239);var S=a(159),j=a(160),w=a.n(j),y=function(e){return l.a.createElement("button",e,"submit")},C=function(e){var t=e.onSubmit,a=Object(n.useState)(""),o=Object(s.a)(a,2),c=o[0],r=o[1],i=Object(n.useState)(""),u=Object(s.a)(i,2),d=u[0],m=u[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"email",value:c,required:!0,onChange:function(e){return r(e.target.value)}}),l.a.createElement("input",{type:"password",value:d,required:!0,placeholder:"enter password",onChange:function(e){return m(e.target.value)}}),l.a.createElement(y,{onClick:function(){return t(c,d)}}))},x=a(50),I=function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement(w.a,{isOpen:e.modalIsOpen,ariaHideApp:!1,onAfterOpen:function(){},onRequestClose:e.closeModal,contentLabel:"Example Modal"},l.a.createElement("button",{onClick:e.closeModal},"close"),l.a.createElement("button",{onClick:e.googleSignin},l.a.createElement(x.c,null)),l.a.createElement("button",{onClick:function(){return console.log("facebook")}},l.a.createElement(x.a,null)),l.a.createElement("button",{onClick:e.handleGitHubLogin},l.a.createElement(x.b,null)),l.a.createElement("button",{onClick:e.handleTwitterLogin},l.a.createElement(x.d,null)),l.a.createElement("div",null,l.a.createElement("p",null,"OR")),l.a.createElement("div",null,l.a.createElement("h1",null,"sign in with email"),l.a.createElement(C,{onSubmit:e.signInWithEmailAndPassword})),l.a.createElement("div",null,l.a.createElement("h1",null,"Don't have an account? Sign up"),l.a.createElement(C,{onSubmit:e.createUserWithEmailAndPassword}))))};h.a.auth(),new h.a.auth.GoogleAuthProvider;h.a.auth().onAuthStateChanged((function(e){e&&console.log("user is signed in")}));var A=function(e){var t=Object(n.useState)(e.user),a=Object(s.a)(t,2),o=a[0],c=a[1],r=Object(n.useState)(null),d=Object(s.a)(r,2),m=d[0],p=d[1],b=Object(n.useState)(!1),f=Object(s.a)(b,2),g=f[0],E=f[1],v=Object(n.useState)("hello@hh"),O=Object(s.a)(v,2),k=O[0];O[1];if(h.a.auth().sendSignInLinkToEmail(k,{url:"https://localhost:3000/",handleCodeInApp:!0,dynamicLinkDomain:"https://localhost:3000/"}).then((function(){window.localStorage.setItem("emailForSignIn",k)})).catch((function(e){})),h.a.auth().isSignInWithEmailLink(window.location.href)){var S=window.localStorage.getItem("emailForSignIn");S||(S=window.prompt("Please provide your email for confirmation")),h.a.auth().signInWithEmailLink(S,window.location.href).then((function(e){window.localStorage.removeItem("emailForSignIn")})).catch((function(e){}))}var j=function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.addScope("public_repo"),t.addScope("read:org"),t.addScope("read:user"),h.a.auth().signInWithPopup(t).then((function(e){var t=e.additionalUserInfo.username,a=e.user.u.uid;console.log(t,e.user.uid),c(a),p(t),E(!1)})).catch((function(e){e.code,e.message,e.email,e.credential}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return l.a.createElement(l.a.Fragment,null,l.a.createElement("p",null,"Authentication"),o?l.a.createElement("div",null,l.a.createElement("p",null,"Hello, ",m),l.a.createElement("button",{onClick:function(){h.a.auth().signOut().then((function(){console.log("Signout Succesfull"),c(null)}),(function(e){console.log("Signout Failed")}))}},"Sign out")):l.a.createElement("button",{onClick:function(){E(!0)}},"Please sign in"),l.a.createElement(I,{modalIsOpen:g,closeModal:function(){E(!1)},googleSignin:function(){var e=new h.a.auth.GoogleAuthProvider;h.a.auth().signInWithPopup(e).then((function(e){e.credential.accessToken;console.log(e.user.email);var t=e.user;console.log("signed in"),E(!1),p(e.user.displayName),c(t)})).catch((function(e){e.code,e.message;console.log(e.code),console.log(e.message)}))},handleGitHubLogin:function(){return j(new h.a.auth.GithubAuthProvider)},handleTwitterLogin:function(){var e=new h.a.auth.TwitterAuthProvider;h.a.auth().signInWithPopup(e).then((function(e){e.credential.accessToken,e.credential.secret;var t=e.user;console.log("Twitter",e),c(t),E(!1)})).catch((function(e){console.log("error",e);e.code,e.message,e.email,e.credential}))},signInWithEmailAndPassword:e.signInWithEmailAndPassword,createUserWithEmailAndPassword:e.createUserWithEmailAndPassword}))};var P=a(433),W=a(431),D=function(e){return l.a.createElement(P.b,{injectFirst:!0},l.a.createElement(W.a,null,l.a.createElement("p",null,e.log)))},F=function(e){return l.a.createElement(l.a.Fragment,null,e.items.length?l.a.createElement("ul",{className:"here"},e.items.map((function(e){return l.a.createElement("li",{className:"listResult",key:e.uniqueId},l.a.createElement(D,{log:e.log}))}))):l.a.createElement("p",null,"Loading..."))},L=a(162),T=a(163),N=a(166),G=a(165),M=a(5),q=a.n(M),R=a(164),U=function(e){Object(N.a)(a,e);var t=Object(G.a)(a);function a(){var e;Object(L.a)(this,a);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={displayColorPicker:!1,color:{r:"241",g:"112",b:"19",a:"1"}},e.handleClick=function(){e.setState({displayColorPicker:!e.state.displayColorPicker})},e.handleClose=function(){e.setState({displayColorPicker:!1})},e.handleChange=function(t){e.setState({color:t.rgb})},e}return Object(T.a)(a,[{key:"render",value:function(){var e=q()({default:{color:{width:"36px",height:"14px",borderRadius:"2px",background:"rgba(".concat(this.state.color.r,", ").concat(this.state.color.g,", ").concat(this.state.color.b,", ").concat(this.state.color.a,")")},swatch:{padding:"5px",background:"#fff",borderRadius:"1px",boxShadow:"0 0 0 1px rgba(0,0,0,.1)",display:"inline-block",cursor:"pointer"},popover:{position:"absolute",zIndex:"2"},cover:{position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}}});return l.a.createElement("div",null,l.a.createElement("div",{style:e.swatch,onClick:this.handleClick},l.a.createElement("div",{style:e.color})),this.state.displayColorPicker?l.a.createElement("div",{style:e.popover},l.a.createElement("div",{style:e.cover,onClick:this.handleClose}),l.a.createElement(R.SketchPicker,{color:this.state.color,onChange:this.handleChange})):null)}}]),a}(n.Component),H=m.auth();var B=Object(S.a)({firebaseAppAuth:H})((function(e){var t=e.createUserWithEmailAndPassword,a=e.signInWithEmailAndPassword,o=Object(n.useState)([]),c=Object(s.a)(o,2),r=c[0],d=c[1],h=Object(n.useState)(new Date),p=Object(s.a)(h,2),f=p[0],g=p[1],E=Object(n.useState)(),v=Object(s.a)(E,2),k=(v[0],v[1],Object(n.useState)(!1)),S=Object(s.a)(k,2),j=S[0],w=S[1],y=Object(n.useState)(),C=Object(s.a)(y,2),x=C[0],I=(C[1],Object(n.useState)()),P=Object(s.a)(I,2),W=(P[0],P[1],Object(n.useState)(!1)),D=Object(s.a)(W,2),L=(D[0],D[1],function(e,t){var a=Object(n.useState)(e),l=Object(s.a)(a,2),o=l[0],c=l[1];Object(n.useEffect)((function(){var a=setTimeout((function(){c(e)}),t);return function(){clearTimeout(a)}}),[e])}(r,500),Object(n.useState)(0)),T=Object(s.a)(L,2),N=(T[0],T[1],l.a.createContext(!0));Object(n.useContext)(N),Object(n.useEffect)((function(){(x?m.database().ref("users/".concat(x.displayName)):m.database().ref("users/Oksana Posobchuk")).on("value",(function(e){var t=e.val();console.log("response from database",t);var a=[];for(var n in t)a.push({log:t[n],uniqueId:n});d(a)}))}),[x]);var G=function(){var e=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x){e.next=4;break}b.a.fire({title:"Oops...",text:"Please sign in",confirmButtonText:"Ok"}),e.next=9;break;case 4:return e.next=6,m.database().ref("users/".concat(x.displayName));case 6:(a=e.sent).push(t),a.on("value",(function(e){var t=e.val();console.log("response from database",t);var a=[];for(var n in t)a.push({log:t[n],uniqueId:n});d(a)}));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return l.a.createElement("div",{className:"App"},l.a.createElement(l.a.Fragment,null,l.a.createElement("header",null,l.a.createElement(A,{user:x,signInWithEmailAndPassword:a,createUserWithEmailAndPassword:t})),l.a.createElement("div",{className:"inputSearch"},l.a.createElement("h2",null,"Another coding day!"),l.a.createElement("label",{className:"visuallyHidden"},"Add another story to your coding journey")),l.a.createElement("label",{htmlFor:"globalCheckbox"},"Global Checkbox"),l.a.createElement("input",{name:"globalCheckbox",type:"checkbox",onChange:function(){w(!j)},defaultChecked:j}),l.a.createElement(O,{currentDate:f,handleDateChange:function(e){g(e)},handleDateSelect:function(e){g(e)},item:"new entry",isGlobalChecked:j,addEntry:G}),l.a.createElement(F,{items:r}),l.a.createElement(U,null)))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[169,1,2]]]);
//# sourceMappingURL=main.cb983eb5.chunk.js.map