(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1392:function(e,t,n){"use strict";var a=n(3);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.default}});var r=a(n(1762))},1753:function(e,t,n){"use strict";var a=n(122),r=n.n(a);t.a=r.a},1761:function(e,t,n){e.exports=n.p+"static/media/signup.1b64e34c.svg"},1762:function(e,t,n){"use strict";var a=n(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var r=a(n(12)),i=a(n(15)),s=a(n(25)),o=a(n(0)),l=(a(n(1)),a(n(13))),d=a(n(22)),c=a(n(123)),p=a(n(173)),m=n(208),g=function(e){var t,n="light"===e.palette.type?.8:.98,a=(0,m.emphasize)(e.palette.background.default,n);return{root:(t={color:e.palette.getContrastText(a),backgroundColor:a,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 24px"},(0,s.default)(t,e.breakpoints.up("md"),{minWidth:288,maxWidth:568,borderRadius:e.shape.borderRadius}),(0,s.default)(t,e.breakpoints.down("sm"),{flexGrow:1}),t),message:{padding:"8px 0"},action:{display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:24,marginRight:-8}}};function u(e){var t=e.action,n=e.classes,a=e.className,s=e.message,d=(0,i.default)(e,["action","classes","className","message"]);return o.default.createElement(c.default,(0,r.default)({component:p.default,headlineMapping:{body1:"div"},role:"alertdialog",square:!0,elevation:6,className:(0,l.default)(n.root,a)},d),o.default.createElement("div",{className:n.message},s),t?o.default.createElement("div",{className:n.action},t):null)}t.styles=g,u.propTypes={};var h=(0,d.default)(g,{name:"MuiSnackbarContent"})(u);t.default=h},2197:function(e,t,n){"use strict";n.r(t);var a=n(7),r=n(8),i=n(10),s=n(9),o=n(11),l=n(0),d=n.n(l),c=n(2182),p=n(81),m=n(72),g=n(1761),u=n.n(g),h=n(1753),f=n(17),x=n(16),b=n(14),w=n(80);function v(){var e=Object(f.a)(["\n  display: flex;\n  flex-direction: row;\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n  width: 100%;\n  height: 100vh;\n  * {\n    box-sizing: border-box;\n  }\n  input {\n    box-sizing: content-box !important;\n  }\n  input:-webkit-autofill {\n    -webkit-box-shadow: 0 0 0px 1000px #f3fbff inset;\n  }\n\n  .mateSignInPageImgPart {\n    width: 50%;\n    height: 100%;\n    overflow: hidden;\n    @media (max-width: 1050px) {\n      width: 40%;\n    }\n    @media (max-width: 768px) {\n      width: 100%;\n      margin: 30px 0;\n      display: none;\n    }\n    @media (max-width: 480px) {\n      width: 100%;\n      margin: 15px 0;\n    }\n    .mateSignInPageImg {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      width: 100%;\n      height: 100%;\n\n      img {\n        width: 100%;\n      }\n    }\n  }\n  .mateSignInPageContent {\n    width: 50%;\n    overflow-y: auto;\n    height: 100%;\n    @media (max-width: 1050px) {\n      width: 60%;\n    }\n    @media (max-width: 768px) {\n      width: 100%;\n    }\n    display: flex;\n    flex-direction: column;\n    padding: 70px 60px;\n    @media (min-width: 1400px) {\n      padding: 85px;\n    }\n    @media (max-width: 1050px) {\n      padding: 40px;\n    }\n    @media (max-width: 480px) {\n      padding: 20px;\n    }\n    background: #f3fbff;\n    border-left: 1px solid #d9ddf6;\n    .scrollbar-track {\n      &.scrollbar-track-y,\n      &.scrollbar-track-x {\n        display: none !important;\n      }\n    }\n    .mateSignInPageLink {\n      display: flex;\n      flex-direction: row;\n      justify-content: center;\n      padding-bottom: 15px;\n      overflow: hidden;\n      .mateSignInPageLinkBtn {\n        border: 0;\n        background: transparent;\n        padding: 16px 42px;\n        border-bottom: 2px solid #bec4c7;\n        font-size: 16px;\n        transition: all 0.3s ease;\n        outline: 0;\n        &:hover {\n          border-bottom: 2px solid #3949ab;\n          color: #3949ab;\n          cursor: pointer;\n        }\n        &.active {\n          border-bottom: 2px solid #3949ab;\n          color: #3949ab;\n          padding: 16px 32px;\n        }\n      }\n    }\n    .mateSignInPageGreet {\n      padding-top: 15px;\n\n      h1 {\n        font-size: 60px;\n        font-weight: 300;\n        margin-bottom: 18px;\n        margin-top: 0;\n        text-transform: capitalize;\n      }\n      p {\n        font-size: 16px;\n        line-height: 25px;\n        font-weight: 400;\n        letter-spacing: 0.1px;\n      }\n    }\n    .mateSignInPageForm {\n      width: 100%;\n      display: flex;\n      flex-shrink: 0;\n      flex-direction: row;\n      @media (max-width: 480px) {\n        flex-direction: column;\n        justify-content: flex-start;\n        margin-top: -25px;\n      }\n      .mateInputWrapper {\n        margin-right: 15px;\n        width: calc(50% - 15px);\n        @media (max-width: 480px) {\n          margin-right: 0px;\n          width: 100%;\n        }\n        > div {\n          width: 100%;\n          > div {\n            input {\n              &::-webkit-input-placeholder {\n                color: ",";\n              }\n\n              &:-moz-placeholder {\n                color: ",";\n              }\n\n              &::-moz-placeholder {\n                color: ",";\n              }\n              &:-ms-input-placeholder {\n                color: ",";\n              }\n            }\n          }\n        }\n      }\n      .mateLoginSubmit {\n        width: auto;\n        margin-left: auto;\n        display: inline-flex;\n        align-items: flex-end;\n        margin-bottom: 7px;\n        @media (max-width: 767px) {\n          margin-left: 0;\n        }\n\n        button {\n          min-height: 0;\n          background: ",";\n          color: #fff;\n          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n            0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n            0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n          border-radius: 3px;\n        }\n      }\n    }\n\n    .homeRedirection {\n      width: 100%;\n      display: flex;\n      align-items: center;\n      margin-top: 25px;\n      font-size: 15px;\n      color: ",";\n\n      a {\n        text-decoration: none;\n        margin-left: 5px;\n      }\n    }\n  }\n"]);return v=function(){return e},e}var y=x.b.div(v(),Object(b.palette)("grayscale",0),Object(b.palette)("grayscale",0),Object(b.palette)("grayscale",0),Object(b.palette)("grayscale",0),Object(b.palette)("indigo",6),Object(b.palette)("grey",5)),E=Object(w.a)(y),P=n(1392),k=n.n(P),S=n(44),I=n(28),j=n(41),N=I.a.resetPassword,O=function(e){function t(){var e,n;Object(a.a)(this,t);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return(n=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).state={redirectToReferrer:!1,register:{user_name:"",user_password:"",authKey:"",confirmPassword:""},validate:!1,open:!1,success:!1,error:"",message:""},n.validateAndSubmit=function(){var e=n.state.register,t=""!==e.user_name;(t=(t=(t=t&&e.user_password===e.confirmPassword)&&""!==e.user_password)&&""!==e.authKey)?(n.setState({validate:!1}),n.shownError=!1,n.props.resetPassword(e)):n.setState({validate:!0})},n}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){if(!0===e.success)alert("User password reset successfully, please login"),this.props.history.push("/signin");else if(e.error&&!this.shownError)return this.shownError=!0,alert("An error occurred trying to create the user, please check the details and try again"),void this.setState({error:e.error,open:!0})}},{key:"render",value:function(){var e=this;return d.a.createElement(E,{className:"mateSignInPage"},d.a.createElement("div",{className:"mateSignInPageImgPart"},d.a.createElement("div",{className:"mateSignInPageImg"},d.a.createElement("img",{src:u.a,alt:"Kiwi standing on oval"}))),d.a.createElement("div",{className:"mateSignInPageContent"},d.a.createElement("div",{className:"mateSignInPageLink"},d.a.createElement(c.a,{to:"#"},d.a.createElement("button",{className:"mateSignInPageLinkBtn",type:"button",onClick:function(){e.props.history.push("/signin")}},"Login"),d.a.createElement("button",{className:"mateSignInPageLinkBtn",type:"button",onClick:function(){e.props.history.push("/signup")}},"Sign Up"),d.a.createElement("button",{className:"mateSignInPageLinkBtn active",type:"button",onClick:function(){e.props.history.push("/resetpass")}},"Reset Password"))),d.a.createElement("div",{className:"mateSignInPageGreet"},d.a.createElement("p",{style:{textAlign:"center"}},d.a.createElement("img",{src:"/dyna-logo.png",alt:"Logo"})),d.a.createElement("p",null,"Welcome to DataLytics Platform, This is the registration page. Only authorized users may use this"),d.a.createElement("p",{class:"hasError"},this.state.error?d.a.createElement(k.a,{message:"Failed to create User - Please check configuration and try again"}):"")),d.a.createElement(S.d,null,d.a.createElement(S.a,null,d.a.createElement("div",{className:"mateInputWrapper"},d.a.createElement(h.a,{error:this.state.validate&&""===this.state.register.user_name,fullWidth:!0,label:"Enter Username",value:this.state.register.user_name,onChange:function(t){var n=e.state.register;n.user_name=t.target.value,e.setState({register:n})},margin:"normal"})),d.a.createElement("div",{className:"mateInputWrapper"},d.a.createElement(h.a,{error:this.state.validate&&""===this.state.register.authKey,type:"password",fullWidth:!0,label:"Enter Dynapreneur Key",value:this.state.register.authKey,onChange:function(t){var n=e.state.register;n.authKey=t.target.value,e.setState({register:n})},margin:"normal"})),d.a.createElement("div",{className:"mateInputWrapper"},d.a.createElement(h.a,{error:this.state.validate&&(""===this.state.register.user_password||this.state.register.confirmPassword!==this.state.register.user_password),type:"password",fullWidth:!0,label:"Enter new password",value:this.state.register.user_password,onChange:function(t){var n=e.state.register;n.user_password=t.target.value,e.setState({register:n})},margin:"normal"})),d.a.createElement("div",{className:"mateInputWrapper"},d.a.createElement(h.a,{error:this.state.validate&&(""===this.state.register.confirmPassword||this.state.register.confirmPassword!==this.state.register.user_password),type:"password",fullWidth:!0,label:"Confirm password",value:this.state.register.confirmPassword,onChange:function(t){var n=e.state.register;n.confirmPassword=t.target.value,e.setState({register:n})},margin:"normal"})),d.a.createElement("div",{className:"mateLoginSubmit"},d.a.createElement(p.a,{type:"primary",onClick:this.validateAndSubmit},d.a.createElement(m.a,{id:"page.resetPassSave"}))))),d.a.createElement("p",{className:"homeRedirection"},"Or go back to"," ",d.a.createElement(c.a,{to:"/dashboard"},d.a.createElement(p.a,{color:"primary"},"Homepage")))))}}]),t}(l.Component);t.default=Object(j.b)(function(e){return{success:e.Auth.success,message:e.Auth.message,error:e.Auth.error}},{resetPassword:N})(O)}}]);
//# sourceMappingURL=1.6ee6836c.chunk.js.map