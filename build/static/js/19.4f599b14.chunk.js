(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1420:function(e,t,r){"use strict";r.d(t,"a",function(){return p});var a=r(21),n=r(22),l=r(27),i=r(26),o=r(28),c=r(0),s=r.n(c),m=r(1329),u=r(1356),d=r(1328),p=(r(1352),function(e){function t(){return Object(a.a)(this,t),Object(l.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this.props,t=e.title,r=e.description,a=e.stretched,n=e.data;return s.a.createElement(m.a,{title:t,description:r,stretched:a},n.map(function(e){return s.a.createElement(d.d,null,e.widgets.map(function(e){return s.a.createElement(d.b,null,s.a.createElement(u.a,{title:e.title,duration:"Jun 24 - Jul 23",amount:e.amount,currency:e.currency,data:e.data,upward:"upward"==e.direction,downward:"downward"==e.direction,style:{marginBottom:40}}))}))}))}}]),t}(c.Component))},1421:function(e,t,r){"use strict";var a=r(21),n=r(22),l=r(27),i=r(26),o=r(28),c=r(0),s=r.n(c),m=r(1329),u=(r(1328),r(1337)),d={labels:Array.apply(null,{length:30}).map(Number.call,Number),datasets:[{label:"Worker Score",fill:!0,lineTension:.1,backgroundColor:"rgba(72,166,242,1)",borderColor:"rgba(72,166,242,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(72,166,242,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(72,166,242,1)",pointHoverBorderColor:"rgba(72,166,242,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:Array.apply(null,{length:30}).map(Function.call,function(){return Math.random()+4})},{label:"Supplier Score",fill:!0,lineTension:.1,backgroundColor:"orange",borderColor:"orange",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"orange",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"orange",pointHoverBorderColor:"orange",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:Array.apply(null,{length:30}).map(Function.call,function(){return Math.random()+2})},{label:"Agent Score",fill:!0,lineTension:.1,backgroundColor:"purple",borderColor:"purple",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"purple",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"purple",pointHoverBorderColor:"purple",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:Array.apply(null,{length:30}).map(Function.call,function(){return Math.random()+3})},{label:"Investment Score",fill:!0,lineTension:.1,backgroundColor:"darkgreen",borderColor:"darkgreen",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"darkgreen",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"darkgreen",pointHoverBorderColor:"darkgreen",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:Array.apply(null,{length:30}).map(Function.call,function(){return Math.random()+2})}]},p={scales:{yAxes:[{stacked:!0}],xAxes:[{stacked:!0}]}},b=function(e){function t(){return Object(a.a)(this,t),Object(l.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){return s.a.createElement(u.a,{data:d,options:p})}}]),t}(s.a.Component);r.d(t,"a",function(){return f});var f=function(e){function t(){return Object(a.a)(this,t),Object(l.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this.props,t=e.title,r=e.description,a=e.stretched;e.data;return s.a.createElement(m.a,{title:t,description:r,stretched:a},s.a.createElement(b,null))}}]),t}(c.Component)},1727:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),l=r(1330),i=r(1328),o=(r(1342),r(1343),r(1355)),c=r(1421),s=r(1420),m=(r(1329),r(1349)),u=r.n(m),d=r(1350),p=r.n(d),b=r(1351),f=r.n(b),g=r(1339);r(1340);function E(e){return{labels:["","","","","","","","","","","","","","","",""],datasets:[{label:"",backgroundColor:e,borderWidth:0,data:[65,59,80,81,56,55,40,88,58,19,22,60,40,85,22,21]}]}}var h=[{widgets:[{title:"Worker Score",currency:"d",amount:"3.2",progress:"67",color:"rgb(153, 102, 255)",direction:"upward",data:E("rgba(72,166,242,1)")},{title:"Supplier Score",currency:"d",amount:"3.1",progress:"67",color:"rgb(153, 102, 255)",direction:"upward",data:E("orange")}]},{widgets:[{title:"Sales Agent Score",currency:"d",amount:"2.1",progress:"42",color:"rgb(153, 102, 255)",direction:"downward",data:E("purple")},{title:"Investment Score",currency:"d",amount:"4.2",progress:"80",color:"rgb(153, 102, 255)",direction:"upward",data:E("darkgreen")}]}];t.default=function(){return n.a.createElement(l.a,null,n.a.createElement(i.d,null,n.a.createElement(i.b,null,n.a.createElement(c.a,{title:"Cost Efficiency Score",description:"Your Cost Efficiency Score over time"})),n.a.createElement(i.b,null,n.a.createElement(s.a,{title:"Cost Efficiency Matrix",description:"Your Cost Efficiency Score for different scores",data:h}))),n.a.createElement(i.d,null,n.a.createElement(i.b,null,n.a.createElement(o.a,{title:"Sales Agent Profitability",description:"Your Sales Staff and the revenue they bring in"})),n.a.createElement(i.b,null,n.a.createElement(o.a,{title:"Supplier Score",description:"A rating of your suppliers and how well they perform"}))),n.a.createElement(i.d,null,n.a.createElement(i.a,null,n.a.createElement("h3",{className:"withDescription"},"Investments"),n.a.createElement("p",{className:"description"},"These are records of investments you made (Last Month: 3,214 RM Total: 92,321 RM)"),n.a.createElement(g.VerticalTimeline,null,n.a.createElement(g.VerticalTimelineElement,{className:"vertical-timeline-element--work",date:"2011 - present",iconStyle:{background:"rgb(33, 150, 243)",color:"#fff"},icon:n.a.createElement(u.a,null)},n.a.createElement("h3",{className:"vertical-timeline-element-title"},"Creative Director"),n.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Miami, FL"),n.a.createElement("p",null,"Creative Direction, User Experience, Visual Design, Project Management, Team Leading")),n.a.createElement(g.VerticalTimelineElement,{className:"vertical-timeline-element--work",date:"2010 - 2011",iconStyle:{background:"rgb(33, 150, 243)",color:"#fff"},icon:n.a.createElement(u.a,null)},n.a.createElement("h3",{className:"vertical-timeline-element-title"},"Art Director"),n.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"San Francisco, CA"),n.a.createElement("p",null,"Creative Direction, User Experience, Visual Design, SEO, Online Marketing")),n.a.createElement(g.VerticalTimelineElement,{className:"vertical-timeline-element--work",date:"2008 - 2010",iconStyle:{background:"rgb(33, 150, 243)",color:"#fff"},icon:n.a.createElement(u.a,null)},n.a.createElement("h3",{className:"vertical-timeline-element-title"},"Web Designer"),n.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Los Angeles, CA"),n.a.createElement("p",null,"User Experience, Visual Design")),n.a.createElement(g.VerticalTimelineElement,{className:"vertical-timeline-element--work",date:"2006 - 2008",iconStyle:{background:"rgb(33, 150, 243)",color:"#fff"},icon:n.a.createElement(u.a,null)},n.a.createElement("h3",{className:"vertical-timeline-element-title"},"Web Designer"),n.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"San Francisco, CA"),n.a.createElement("p",null,"User Experience, Visual Design")),n.a.createElement(g.VerticalTimelineElement,{className:"vertical-timeline-element--education",date:"April 2013",iconStyle:{background:"rgb(233, 30, 99)",color:"#fff"},icon:n.a.createElement(p.a,null)},n.a.createElement("h3",{className:"vertical-timeline-element-title"},"Content Marketing for Web, Mobile and Social Media"),n.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Online Course"),n.a.createElement("p",null,"Strategy, Social Media")),n.a.createElement(g.VerticalTimelineElement,{className:"vertical-timeline-element--education",date:"November 2012",iconStyle:{background:"rgb(233, 30, 99)",color:"#fff"},icon:n.a.createElement(p.a,null)},n.a.createElement("h3",{className:"vertical-timeline-element-title"},"Agile Development Scrum Master"),n.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Certification"),n.a.createElement("p",null,"Creative Direction, User Experience, Visual Design")),n.a.createElement(g.VerticalTimelineElement,{className:"vertical-timeline-element--education",date:"2002 - 2006",iconStyle:{background:"rgb(233, 30, 99)",color:"#fff"},icon:n.a.createElement(p.a,null)},n.a.createElement("h3",{className:"vertical-timeline-element-title"},"Bachelor of Science in Interactive Digital Media Visual Imaging"),n.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Bachelor Degree"),n.a.createElement("p",null,"Creative Direction, Visual Design")),n.a.createElement(g.VerticalTimelineElement,{iconStyle:{background:"rgb(16, 204, 82)",color:"#fff"},icon:n.a.createElement(f.a,null)})))))}}}]);
//# sourceMappingURL=19.4f599b14.chunk.js.map