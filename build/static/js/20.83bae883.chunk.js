(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1339:function(e,t,n){"use strict";e.exports={VerticalTimeline:n(1399).default,VerticalTimelineElement:n(1400).default}},1340:function(e,t,n){},1355:function(e,t,n){"use strict";var o=n(0),r=n(375);if("undefined"===typeof o)throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");var i=(new o.Component).updater;e.exports=r(o.Component,o.isValidElement,i)},1399:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(n(0)),r=a(n(1)),i=a(n(15));function a(e){return e&&e.__esModule?e:{default:e}}var l=function(e){var t=e.animate,n=e.children,r=e.className,a=e.layout;return o.default.createElement("div",{className:(0,i.default)(r,"vertical-timeline",{"vertical-timeline--animate":t,"vertical-timeline--two-columns":"2-columns"===a,"vertical-timeline--one-column":"1-column"===a})},n)};l.propTypes={children:r.default.oneOfType([r.default.arrayOf(r.default.node),r.default.node]).isRequired,className:r.default.string,animate:r.default.bool,layout:r.default.oneOf(["1-column","2-columns"])},l.defaultProps={animate:!0,className:"",layout:"2-columns"},t.default=l},1400:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0),a=u(i),l=u(n(1)),s=u(n(15)),c=u(n(1401));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onVisibilitySensorChange=n.onVisibilitySensorChange.bind(n),n.state={visible:!1},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),r(t,[{key:"onVisibilitySensorChange",value:function(e){e&&this.setState({visible:!0})}},{key:"render",value:function(){var e=this.props,t=e.id,n=e.children,r=e.icon,i=e.iconStyle,l=e.iconOnClick,u=e.date,d=e.position,p=e.style,h=e.className,f=e.visibilitySensorProps,b=this.state.visible;return a.default.createElement("div",{id:t,className:(0,s.default)(h,"vertical-timeline-element",{"vertical-timeline-element--left":"left"===d,"vertical-timeline-element--right":"right"===d,"vertical-timeline-element--no-children":""===n}),style:p},a.default.createElement(c.default,o({},f,{onChange:this.onVisibilitySensorChange}),a.default.createElement("div",null,a.default.createElement("span",{style:i,onClick:l,className:"vertical-timeline-element-icon "+(b?"bounce-in":"is-hidden")},r),a.default.createElement("div",{className:"vertical-timeline-element-content "+(b?"bounce-in":"is-hidden")},n,a.default.createElement("span",{className:"vertical-timeline-element-date"},u)))))}}]),t}();d.propTypes={id:l.default.string,children:l.default.oneOfType([l.default.arrayOf(l.default.node),l.default.node]),className:l.default.string,icon:l.default.element,iconStyle:l.default.shape({}),iconOnClick:l.default.func,style:l.default.shape({}),date:l.default.node,position:l.default.string,visibilitySensorProps:l.default.shape({})},d.defaultProps={id:"",children:"",className:"",icon:null,iconStyle:null,style:null,date:"",position:"",iconOnClick:null,visibilitySensorProps:{partialVisibility:!0,offset:{bottom:80}}},t.default=d},1401:function(e,t,n){"use strict";var o=n(0),r=n(25),i=n(1),a=n(1355),l=n(1402);e.exports=a({displayName:"VisibilitySensor",propTypes:{onChange:i.func,active:i.bool,partialVisibility:i.oneOfType([i.bool,i.oneOf(["top","right","bottom","left"])]),delayedCall:i.bool,offset:i.oneOfType([i.shape({top:i.number,left:i.number,bottom:i.number,right:i.number}),i.shape({direction:i.oneOf(["top","right","bottom","left"]),value:i.number})]),scrollCheck:i.bool,scrollDelay:i.number,scrollThrottle:i.number,resizeCheck:i.bool,resizeDelay:i.number,resizeThrottle:i.number,intervalCheck:i.bool,intervalDelay:i.number,containment:"undefined"!==typeof window?i.instanceOf(window.Element):i.any,children:i.oneOfType([i.element,i.func]),minTopValue:i.number},getDefaultProps:function(){return{active:!0,partialVisibility:!1,minTopValue:0,scrollCheck:!1,scrollDelay:250,scrollThrottle:-1,resizeCheck:!1,resizeDelay:250,resizeThrottle:-1,intervalCheck:!0,intervalDelay:100,delayedCall:!1,offset:{},containment:null,children:o.createElement("span")}},getInitialState:function(){return{isVisible:null,visibilityRect:{}}},componentDidMount:function(){this.node=r.findDOMNode(this),this.props.active&&this.startWatching()},componentWillUnmount:function(){this.stopWatching()},componentDidUpdate:function(e){this.node=r.findDOMNode(this),this.props.active&&!e.active?(this.setState(this.getInitialState()),this.startWatching()):this.props.active||this.stopWatching()},getContainer:function(){return this.props.containment||window},addEventListener:function(e,t,n,o){var r;this.debounceCheck||(this.debounceCheck={});var i=function(){r=null,this.check()}.bind(this),a={target:e,fn:o>-1?function(){r||(r=setTimeout(i,o||0))}:function(){clearTimeout(r),r=setTimeout(i,n||0)},getLastTimeout:function(){return r}};e.addEventListener(t,a.fn),this.debounceCheck[t]=a},startWatching:function(){this.debounceCheck||this.interval||(this.props.intervalCheck&&(this.interval=setInterval(this.check,this.props.intervalDelay)),this.props.scrollCheck&&this.addEventListener(this.getContainer(),"scroll",this.props.scrollDelay,this.props.scrollThrottle),this.props.resizeCheck&&this.addEventListener(window,"resize",this.props.resizeDelay,this.props.resizeThrottle),!this.props.delayedCall&&this.check())},stopWatching:function(){if(this.debounceCheck)for(var e in this.debounceCheck)if(this.debounceCheck.hasOwnProperty(e)){var t=this.debounceCheck[e];clearTimeout(t.getLastTimeout()),t.target.removeEventListener(e,t.fn),this.debounceCheck[e]=null}this.debounceCheck=null,this.interval&&(this.interval=clearInterval(this.interval))},roundRectDown:function(e){return{top:Math.floor(e.top),left:Math.floor(e.left),bottom:Math.floor(e.bottom),right:Math.floor(e.right)}},check:function(){var e,t,n=this.node;if(!n)return this.state;if(e=function(e){return void 0===e.width&&(e.width=e.right-e.left),void 0===e.height&&(e.height=e.bottom-e.top),e}(this.roundRectDown(n.getBoundingClientRect())),this.props.containment){var o=this.props.containment.getBoundingClientRect();t={top:o.top,left:o.left,bottom:o.bottom,right:o.right}}else t={top:0,left:0,bottom:window.innerHeight||document.documentElement.clientHeight,right:window.innerWidth||document.documentElement.clientWidth};var r=this.props.offset||{};"object"===typeof r&&(t.top+=r.top||0,t.left+=r.left||0,t.bottom-=r.bottom||0,t.right-=r.right||0);var i={top:e.top>=t.top,left:e.left>=t.left,bottom:e.bottom<=t.bottom,right:e.right<=t.right},a=e.height>0&&e.width>0,s=a&&i.top&&i.left&&i.bottom&&i.right;if(a&&this.props.partialVisibility){var c=e.top<=t.bottom&&e.bottom>=t.top&&e.left<=t.right&&e.right>=t.left;"string"===typeof this.props.partialVisibility&&(c=i[this.props.partialVisibility]),s=this.props.minTopValue?c&&e.top<=t.bottom-this.props.minTopValue:c}"string"===typeof r.direction&&"number"===typeof r.value&&(console.warn("[notice] offset.direction and offset.value have been deprecated. They still work for now, but will be removed in next major version. Please upgrade to the new syntax: { %s: %d }",r.direction,r.value),s=l(r,e,t));var u=this.state;return this.state.isVisible!==s&&(u={isVisible:s,visibilityRect:i},this.setState(u),this.props.onChange&&this.props.onChange(s,i)),u},render:function(){return this.props.children instanceof Function?this.props.children({isVisible:this.state.isVisible,visibilityRect:this.state.visibilityRect}):o.Children.only(this.props.children)}})},1402:function(e,t){e.exports=function(e,t,n){var o=e.direction,r=e.value;switch(o){case"top":return n.top+r<t.top&&n.bottom>t.bottom&&n.left<t.left&&n.right>t.right;case"left":return n.left+r<t.left&&n.bottom>t.bottom&&n.top<t.top&&n.right>t.right;case"bottom":return n.bottom-r>t.bottom&&n.left<t.left&&n.right>t.right&&n.top<t.top;case"right":return n.right-r>t.right&&n.left<t.left&&n.top<t.top&&n.bottom>t.bottom}}},1420:function(e,t,n){"use strict";n.d(t,"a",function(){return h});var o=n(21),r=n(22),i=n(27),a=n(26),l=n(28),s=n(0),c=n.n(s),u=n(1329),d=n(1357),p=n(1328),h=(n(1352),function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(a.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.description,o=e.stretched,r=e.data;return c.a.createElement(u.a,{title:t,description:n,stretched:o},r.map(function(e){return c.a.createElement(p.d,null,e.widgets.map(function(e){return c.a.createElement(p.b,null,c.a.createElement(d.a,{title:e.title,duration:"Jun 24 - Jul 23",amount:e.amount,currency:e.currency,data:e.data,upward:"upward"==e.direction,downward:"downward"==e.direction,style:{marginBottom:40}}))}))}))}}]),t}(s.Component))},1421:function(e,t,n){"use strict";var o=n(21),r=n(22),i=n(27),a=n(26),l=n(28),s=n(0),c=n.n(s),u=n(1329),d=(n(1328),n(1337)),p={labels:Array.apply(null,{length:30}).map(Number.call,Number),datasets:[{label:"Worker Score",fill:!0,lineTension:.1,backgroundColor:"rgba(72,166,242,1)",borderColor:"rgba(72,166,242,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(72,166,242,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(72,166,242,1)",pointHoverBorderColor:"rgba(72,166,242,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:Array.apply(null,{length:30}).map(Function.call,function(){return Math.random()+4})},{label:"Supplier Score",fill:!0,lineTension:.1,backgroundColor:"orange",borderColor:"orange",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"orange",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"orange",pointHoverBorderColor:"orange",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:Array.apply(null,{length:30}).map(Function.call,function(){return Math.random()+2})},{label:"Agent Score",fill:!0,lineTension:.1,backgroundColor:"purple",borderColor:"purple",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"purple",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"purple",pointHoverBorderColor:"purple",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:Array.apply(null,{length:30}).map(Function.call,function(){return Math.random()+3})},{label:"Investment Score",fill:!0,lineTension:.1,backgroundColor:"darkgreen",borderColor:"darkgreen",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"darkgreen",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"darkgreen",pointHoverBorderColor:"darkgreen",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:Array.apply(null,{length:30}).map(Function.call,function(){return Math.random()+2})}]},h={scales:{yAxes:[{stacked:!0}],xAxes:[{stacked:!0}]}},f=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(a.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return c.a.createElement(d.a,{data:p,options:h})}}]),t}(c.a.Component);n.d(t,"a",function(){return b});var b=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(a.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.description,o=e.stretched;e.data;return c.a.createElement(u.a,{title:t,description:n,stretched:o},c.a.createElement(f,null))}}]),t}(s.Component)},1728:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),i=n(1330),a=n(1328),l=(n(1342),n(1343),n(1356)),s=n(1421),c=n(1420);n(1329),n(1339),n(1340);function u(e){return{labels:["","","","","","","","","","","","","","","",""],datasets:[{label:"",backgroundColor:e,borderWidth:0,data:[65,59,80,81,56,55,40,88,58,19,22,60,40,85,22,21]}]}}var d=[{widgets:[{title:"Stock Score",currency:"d",amount:"3.2",progress:"67",color:"rgb(153, 102, 255)",direction:"upward",data:u("rgba(72,166,242,1)")},{title:"Inventory Score",currency:"d",amount:"3.1",progress:"67",color:"rgb(153, 102, 255)",direction:"upward",data:u("orange")}]},{widgets:[{title:"Inventory Health Score",currency:"d",amount:"2.1",progress:"42",color:"rgb(153, 102, 255)",direction:"downward",data:u("purple")},{title:"Expiration Score",currency:"d",amount:"4.2",progress:"80",color:"rgb(153, 102, 255)",direction:"upward",data:u("darkgreen")}]}];t.default=function(){return r.a.createElement(i.a,null,r.a.createElement(a.d,null,r.a.createElement(a.b,null,r.a.createElement(s.a,{title:"Inventory Optimisation Score",description:"Your Inventory Optimisation Score over time"})),r.a.createElement(a.b,null,r.a.createElement(c.a,{title:"Inventory Optimisation Matrix",description:"Your Inventory Optimisation Matrix for different scores",data:d}))),r.a.createElement(a.d,null,r.a.createElement(a.b,null,r.a.createElement(l.a,{title:"Sales Agent Profitability",description:"Your Sales Staff and the revenue they bring in"})),r.a.createElement(a.b,null,r.a.createElement(l.a,{title:"Supplier Score",description:"A rating of your suppliers and how well they perform"}))))}}}]);
//# sourceMappingURL=20.83bae883.chunk.js.map