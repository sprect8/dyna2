(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1697:function(n,e,t){"use strict";var a=t(122),i=t.n(a);e.a=i.a},1713:function(n,e,t){n.exports=t.p+"static/media/signup.1b64e34c.svg"},1714:function(n,e,t){"use strict";var a=t(3);Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.styles=void 0;var i=a(t(9)),r=a(t(15)),o=a(t(23)),l=a(t(0)),d=(a(t(1)),a(t(14))),p=a(t(22)),s=a(t(123)),c=a(t(179)),m=t(218),g=function(n){var e,t="light"===n.palette.type?.8:.98,a=(0,m.emphasize)(n.palette.background.default,t);return{root:(e={color:n.palette.getContrastText(a),backgroundColor:a,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 24px"},(0,o.default)(e,n.breakpoints.up("md"),{minWidth:288,maxWidth:568,borderRadius:n.shape.borderRadius}),(0,o.default)(e,n.breakpoints.down("sm"),{flexGrow:1}),e),message:{padding:"8px 0"},action:{display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:24,marginRight:-8}}};e.styles=g;var x=(0,p.default)(g,{name:"MuiSnackbarContent"})(function(n){var e=n.action,t=n.classes,a=n.className,o=n.message,p=(0,r.default)(n,["action","classes","className","message"]);return l.default.createElement(s.default,(0,i.default)({component:c.default,headlineMapping:{body1:"div",body2:"div"},role:"alertdialog",square:!0,elevation:6,className:(0,d.default)(t.root,a)},p),l.default.createElement("div",{className:t.message},o),e?l.default.createElement("div",{className:t.action},e):null)});e.default=x},2220:function(n,e,t){"use strict";t.r(e);var a=t(7),i=t(8),r=t(11),o=t(10),l=t(12),d=t(0),p=t.n(d),s=t(1684),c=t(1683),m=t(43),g=t(1713),x=t.n(g),h=t(79),u=t(30),b=t(1697),f=t(107),w=t(17),v=t(16),y=t(13),k=t(78);function I(){var n=Object(w.a)(["\n  display: flex;\n  flex-direction: row;\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n  width: 100%;\n  height: 100vh;\n  * {\n    box-sizing: border-box;\n  }\n  input {\n    box-sizing: content-box !important;\n  }\n  input:-webkit-autofill {\n    -webkit-box-shadow: 0 0 0px 1000px #f3fbff inset;\n  }\n\n  .mateSignInPageImgPart {\n    width: 50%;\n    height: 100%;\n    overflow: hidden;\n    @media screen and (max-width: 1200px) and (min-width: 1101px) {\n      width: 45%;\n    }\n    @media (max-width: 1100px) {\n      width: 40%;\n    }\n    @media (max-width: 768px) {\n      width: 100%;\n      margin: 30px 0;\n      display: none;\n    }\n    @media (max-width: 950px) {\n      display: none;\n      width: 100%;\n    }\n    @media (max-width: 480px) {\n      width: 100%;\n      margin: 15px 0;\n    }\n    .mateSignInPageImg {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      width: 100%;\n      height: 100%;\n\n      img {\n        width: 100%;\n      }\n    }\n  }\n  .mateSignInPageContent {\n    width: 50%;\n    overflow-y: scroll;\n    height: 100%;\n    @media screen and (max-width: 1200px) and (min-width: 1101px) {\n      width: 55%;\n    }\n    @media (max-width: 1100px) {\n      width: 60%;\n    }\n    @media (max-width: 950px) {\n      width: 100%;\n    }\n    @media (max-width: 768px) {\n      width: 100%;\n    }\n    display: flex;\n    flex-direction: column;\n    padding: 70px 60px;\n    @media (min-width: 1400px) {\n      padding: 85px;\n    }\n    @media (max-width: 1050px) {\n      padding: 40px;\n    }\n    @media (max-width: 480px) {\n      padding: 20px;\n    }\n    background: #f3fbff;\n    border-left: 1px solid #d9ddf6;\n    .scrollbar-track {\n      &.scrollbar-track-y,\n      &.scrollbar-track-x {\n        display: none !important;\n      }\n    }\n    .mateSignInPageLink {\n      display: flex;\n      flex-direction: row;\n      justify-content: center;\n      padding-bottom: 15px;\n      overflow: hidden;\n      .mateSignInPageLinkBtn {\n        border: 0;\n        background: transparent;\n        padding: 16px 42px;\n        border-bottom: 2px solid #bec4c7;\n        font-size: 16px;\n        transition: all 0.3s ease;\n        outline: 0;\n        &:hover {\n          border-bottom: 2px solid ",";\n          color: ",";\n          cursor: pointer;\n        }\n        &.active {\n          border-bottom: 2px solid ",";\n          color: ",";\n          padding: 16px 32px;\n        }\n      }\n    }\n    .mateSignInPageGreet {\n      padding: 30px 0;\n      padding-top: 15px;\n\n      h1 {\n        font-size: 60px;\n        font-weight: 300;\n        margin-bottom: 18px;\n        text-transform: capitalize;\n      }\n      p {\n        font-size: 16px;\n        line-height: 25px;\n        font-weight: 400;\n        letter-spacing: 0.1px;\n      }\n    }\n    .mateSignInPageForm {\n      width: 100%;\n      display: flex;\n      flex-shrink: 0;\n      flex-direction: row;\n      @media (max-width: 480px) {\n        flex-direction: column;\n        justify-content: flex-start;\n        margin-top: -25px;\n      }\n      .mateInputWrapper {\n        margin-right: 10px;\n        width: calc(40% - 10px);\n        @media (max-width: 480px) {\n          margin-right: 0px;\n          width: 100%;\n          margin-top: 15px;\n        }\n        > div {\n          width: 100%;\n          > div {\n            input {\n              &::-webkit-input-placeholder {\n                color: ",";\n              }\n\n              &:-moz-placeholder {\n                color: ",";\n              }\n\n              &::-moz-placeholder {\n                color: ",";\n              }\n              &:-ms-input-placeholder {\n                color: ",";\n              }\n            }\n          }\n        }\n      }\n      .mateLoginSubmit {\n        width: auto;\n        margin-left: auto;\n        display: inline-flex;\n        align-items: flex-end;\n        margin-bottom: 7px;\n        @media (max-width: 480px) {\n          margin-left: 0;\n        }\n\n        button {\n          min-height: 0;\n          background: ",";\n          color: #fff;\n          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n            0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n            0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n          border-radius: 3px;\n        }\n      }\n    }\n    .mateLoginSubmitText {\n      display: flex;\n      justify-content: flex-start;\n      padding: 50px 0 60px;\n      @media (max-width: 480px) {\n        padding-top: 30px;\n        padding-bottom: 25px;\n      }\n      span {\n        text-transform: lowercase;\n        font-size: 14px;\n        font-weight: 500;\n        letter-spacing: 0.1px;\n        color: #a1a6a8;\n      }\n    }\n    .mateLoginOtherBtn {\n      display: flex;\n      flex-flow: row wrap;\n      width: 100%;\n\n      .mateLoginOtherBtnWrap {\n        width: calc(50% - 15px);\n        @media (max-width: 530px) {\n          margin-right: 0px;\n          width: 100%;\n          margin-top: 15px;\n        }\n        position: relative;\n        margin-right: 15px;\n        &:nth-child(even) {\n          margin-right: 0;\n          width: calc(50% - 0px);\n          @media (max-width: 530px) {\n            width: 100%;\n          }\n        }\n        .mateLoginOtherIcon {\n          height: 48px;\n          border-radius: 3px;\n          width: 60px;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n\n          img {\n            width: 25px;\n            height: auto;\n          }\n        }\n        button {\n          width: 100%;\n          border: 0;\n          font-weight: 500;\n          color: #fff;\n          padding: 0;\n          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n            0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n            0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n          border-radius: 3px;\n          min-height: 48px;\n          > span {\n            justify-content: flex-start;\n            display: flex;\n            width: 100%;\n            > span {\n              display: flex;\n              align-items: center;\n              justify-content: center;\n              width: 100%;\n            }\n          }\n\n          &.btnFacebook {\n            background-color: #4267b2;\n            .mateLoginOtherIcon {\n              background: #3b5a99;\n            }\n\n            &:hover {\n              background-color: ",";\n            }\n          }\n\n          &.btnGooglePlus {\n            background-color: ",";\n            .mateLoginOtherIcon {\n              background: #c9481f;\n            }\n\n            &:hover {\n              background-color: ",";\n            }\n          }\n\n          &.btnAuthZero {\n            background-color: #eb5424;\n            margin-top: 20px;\n            @media (max-width: 530px) {\n              margin-top: 0px;\n            }\n            .mateLoginOtherIcon {\n              background-color: #ca3f12;\n            }\n\n            &:hover {\n              background-color: ",";\n            }\n          }\n\n          &.btnFirebase {\n            background-color: ",";\n            margin-top: 20px;\n            @media (max-width: 530px) {\n              margin-top: 0px;\n            }\n            .mateLoginOtherIcon {\n              background: #e89d1e;\n            }\n\n            &:hover {\n              background-color: ",";\n            }\n          }\n        }\n      }\n    }\n  }\n"]);return I=function(){return n},n}var j=v.b.div(I(),Object(y.palette)("indigo",6),Object(y.palette)("indigo",6),Object(y.palette)("indigo",6),Object(y.palette)("indigo",6),Object(y.palette)("grayscale",0),Object(y.palette)("grayscale",0),Object(y.palette)("grayscale",0),Object(y.palette)("grayscale",0),Object(y.palette)("indigo",6),Object(y.palette)("pages",11),Object(y.palette)("pages",8),Object(y.palette)("pages",12),Object(y.palette)("pages",13),Object(y.palette)("pages",10),Object(y.palette)("pages",14)),L=Object(k.a)(j),O=t(787),P=t.n(O),E=u.a.login,S=function(n){function e(){var n,t;Object(a.a)(this,e);for(var i=arguments.length,l=new Array(i),d=0;d<i;d++)l[d]=arguments[d];return(t=Object(r.a)(this,(n=Object(o.a)(e)).call.apply(n,[this].concat(l)))).state={redirectToReferrer:!1,username:"",password:""},t.handleLogin=function(){var n=t.props.login,e=t.state;n({username:e.username,password:e.password})},t.onChangeUsername=function(n){return t.setState({username:n.target.value})},t.onChangePassword=function(n){return t.setState({password:n.target.value})},t}return Object(l.a)(e,n),Object(i.a)(e,[{key:"componentWillReceiveProps",value:function(n){console.log("Next Props",n),this.props.isLoggedIn!==n.isLoggedIn&&!0===n.isLoggedIn&&this.setState({redirectToReferrer:!0}),n.error&&this.setState({error:n.error})}},{key:"render",value:function(){var n=this,e=this.state,t=e.redirectToReferrer,a=e.username,i=e.password;return t||this.props.isLoggedIn?p.a.createElement(s.a,{to:{pathname:"/dashboard"}}):p.a.createElement(L,{className:"mateSignInPage"},p.a.createElement("div",{className:"mateSignInPageImgPart"},p.a.createElement("div",{className:"mateSignInPageImg"},p.a.createElement("img",{src:x.a,alt:"Kiwi standing on oval"}))),p.a.createElement("div",{className:"mateSignInPageContent"},p.a.createElement("div",{className:"mateSignInPageLink"},p.a.createElement(c.a,{to:"#"},p.a.createElement("button",{className:"mateSignInPageLinkBtn active",type:"button"},"Login"),p.a.createElement("button",{className:"mateSignInPageLinkBtn",type:"button",onClick:function(){n.props.history.push("/signup")}},"Sign Up"),p.a.createElement("button",{className:"mateSignInPageLinkBtn",type:"button",onClick:function(){n.props.history.push("/resetpass")}},"Reset Password"))),p.a.createElement(f.a,{style:{height:"100%"}},p.a.createElement("div",{className:"mateSignInPageGreet"},p.a.createElement("p",{style:{textAlign:"center"}},p.a.createElement("img",{src:"/dyna-logo.png",alt:"Logo"})),p.a.createElement("p",null,"Welcome to DataLytics Platform, Please Login with your personal account information."),this.state.error?p.a.createElement(P.a,{message:"Login Failed, please check username / password and try again"}):""),p.a.createElement("div",{className:"mateSignInPageForm"},p.a.createElement("div",{className:"mateInputWrapper"},p.a.createElement(b.a,{label:"Username",placeholder:"Username",margin:"normal",value:a,onChange:this.onChangeUsername})),p.a.createElement("div",{className:"mateInputWrapper"},p.a.createElement(b.a,{label:"Password",placeholder:"Password",margin:"normal",type:"Password",value:i,onChange:this.onChangePassword})),p.a.createElement("div",{className:"mateLoginSubmit"},p.a.createElement(h.a,{type:"primary",onClick:this.handleLogin},"Login"))),p.a.createElement("div",{className:"mateLoginSubmitText"},p.a.createElement("span",null,"Datalytics users can request a trial account from the relevant RZLytics representatives")))))}}]),e}(d.Component);e.default=Object(m.b)(function(n){return{isLoggedIn:null!==n.Auth.idToken,error:n.Auth.loginError}},{login:E})(S)},787:function(n,e,t){"use strict";var a=t(3);Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return i.default}});var i=a(t(1714))}}]);
//# sourceMappingURL=2.f3a1dd26.chunk.js.map