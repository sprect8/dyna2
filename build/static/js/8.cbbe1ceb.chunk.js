(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1328:function(e,n,t){"use strict";t.d(n,"d",function(){return u}),t.d(n,"b",function(){return g}),t.d(n,"a",function(){return f}),t.d(n,"e",function(){return b}),t.d(n,"c",function(){return p});var a=t(13),l=t(0),i=t.n(l),r=t(1336),c=t.n(r),o=t(9);function m(){var e=Object(a.a)(["\n  margin-top: 0;\n  margin-bottom: 0;\n"]);return m=function(){return e},e}var s=Object(o.b)(c.a)(m()),u=function(e){return i.a.createElement(s,{container:!0,spacing:24,style:e.style},e.children)},d=function(e){return i.a.createElement(s,{item:!0,xs:e.xs,sm:e.sm,lg:e.lg,md:e.md,style:e.style},e.children)},g=function(e){return i.a.createElement(d,Object.assign({xs:e.xs?e.xs:12,lg:e.lg?e.lg:6,md:e.md?e.md:6,sm:e.sm?e.sm:12,style:e.style},e))},f=function(e){return i.a.createElement(d,Object.assign({xs:e.xs?e.xs:12,lg:e.lg?e.lg:12,md:e.md?e.md:12,sm:e.sm?e.sm:12,style:e.style},e))},p=function(e){return i.a.createElement(d,Object.assign({xs:e.xs?e.xs:12,lg:e.lg?e.lg:4,md:e.md?e.md:4,sm:e.sm?e.sm:6,style:e.style},e))},b=function(e){return i.a.createElement(d,Object.assign({xs:e.xs?e.xs:12,lg:e.lg?e.lg:8,md:e.md?e.md:8,sm:e.sm?e.sm:6,style:e.style},e))}},1330:function(e,n,t){"use strict";var a=t(0),l=t.n(a),i=t(13);function r(){var e=Object(i.a)(["\n  padding: 30px;\n  display: flex;\n  flex-flow: row wrap;\n  "," align-items: flex-start;\n  box-sizing: border-box;\n\n  @media only screen and (max-width: 767px) {\n    padding: 20px;\n  }\n\n  @media (max-width: 580px) {\n    padding: 15px;\n  }\n"]);return r=function(){return e},e}var c=t(9).b.div(r(),"");n.a=function(e){return l.a.createElement(c,Object.assign({className:null!=e.className?"".concat(e.className," layoutContentWrapper"):"layoutContentWrapper"},e,{style:e.style}),e.children)}},1333:function(e,n,t){"use strict";var a=t(0),l=t.n(a),i=t(13),r=t(9),c=t(10);function o(){var e=Object(i.a)(["\n  font-size: 13px;\n  font-weight: 400;\n  color: ",";\n  line-height: 1.5;\n  margin-top: 5px;\n  margin-bottom: 0;\n"]);return o=function(){return e},e}function m(){var e=Object(i.a)(["\n  width: auto;\n  padding: 25px 30px;\n  border-bottom: 1px solid ",";\n\n  &.single {\n    width: 100%;\n    padding: 0 0 25px;\n    margin-bottom: 30px;\n  }\n\n  h3 {\n    font-size: 21px;\n    font-weight: 400;\n    color: ",";\n    margin: 0;\n  }\n"]);return m=function(){return e},e}var s=r.b.div(m(),Object(c.palette)("grey",3),Object(c.palette)("grey",9)),u=r.b.p(o(),Object(c.palette)("grey",5)),d=function(e){return l.a.createElement(s,{style:e.style,className:"".concat(e["data-single"]?"single":""," ").concat(e.className)},e.title?l.a.createElement("h3",null,e.title):"",e.subtitle?l.a.createElement(u,null," ",e.subtitle," "):"")},g=t(131),f=t(82),p=t(374);function b(){var e=Object(i.a)(["\n  &.noShadow {\n    background-color: transparent;\n    box-shadow: none;\n\n    "," {\n      padding: 30px 0;\n    }\n\n    "," {\n      padding: 30px 0;\n    }\n  }\n\n  &.stretched {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n\n    "," {\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n    }\n\n    "," {\n      height: 100%;\n    }\n  }\n"]);return b=function(){return e},e}function x(){var e=Object(i.a)(["\n  font-size: 13px;\n  color: ",";\n  font-weight: inherit;\n  line-height: 1;\n  padding: 5px 10px;\n  background: ",";\n  border-radius: 12px;\n  display: inline-block;\n"]);return x=function(){return e},e}function E(){var e=Object(i.a)(["\n  width: 100%;\n  padding: 35px;\n  background-color: ",";\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n\n  @media only screen and (max-width: 767px) {\n    padding: 35px 15px;\n    overflow: hidden;\n    overflow-x: auto;\n  }\n\n  &.transparent {\n    background-color: transparent;\n    "," display: flex;\n    flex-wrap: wrap;\n    align-items: flex-start;\n    justify-content: flex-start;\n    padding: 0;\n    margin-top: 35px;\n  }\n\n  &.left {\n    align-items: flex-start;\n    justify-content: flex-start;\n  }\n\n  &.center {\n    align-items: center;\n    justify-content: center;\n  }\n\n  &.right {\n    align-items: flex-end;\n    justify-content: flex-end;\n  }\n\n  &.column {\n    flex-direction: column;\n  }\n"]);return E=function(){return e},e}function h(){var e=Object(i.a)(["\n  width: 100%;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  margin-bottom: 5px;\n"]);return h=function(){return e},e}function v(){var e=Object(i.a)(["\n  font-size: 14px;\n  color: ",';\n  font-weight: inherit;\n  line-height: 1.5;\n  margin-bottom: 5px;\n  position: relative;\n  padding-left: 44px;\n\n  &:before {\n    content: "";\n    width: 4px;\n    height: 4px;\n    background-color: ',";\n    display: inline-block;\n    margin: 0;\n    transform: scale(0.8);\n    border-radius: 50%;\n    position: absolute;\n    top: 9px;\n    left: 20px;\n  }\n"]);return v=function(){return e},e}function y(){var e=Object(i.a)(["\n  padding: 40px 30px;\n\n  @media only screen and (max-width: 767px) {\n    padding: 30px 15px;\n  }\n\n  &.nopadding {\n    padding: 0;\n  }\n\n  &.scrolling {\n    overflow-x: auto;\n  }\n\n  > p {\n    font-size: 14px;\n    color: ",";\n    font-weight: inherit;\n    line-height: 1.5;\n    margin: 0 0 25px;\n    text-align: ",";\n  }\n"]);return y=function(){return e},e}var w=r.b.div(y(),Object(c.palette)("grey",9),function(e){return"rtl"===e["data-rtl"]?"right":"left"}),j=(r.b.li(v(),Object(c.palette)("grey",9),Object(c.palette)("grey",9)),r.b.ul(h()),r.b.div(E(),Object(c.palette)("grey",12),"")),N=(r.b.span(x(),Object(c.palette)("grey",9),Object(c.palette)("grey",2)),Object(r.b)(p.a)(b(),s,w,w,j)),O=Object(f.a)(w),k=N,S=function(e){return l.a.createElement(O,{className:"".concat(e["no-padding"]?"nopadding":""," ").concat(e.className?e.className:"")},e.scroll?l.a.createElement(g.a,{style:{overflowY:"hidden"}},e.children):e.children)};n.a=function(e){return l.a.createElement(k,{elevation:e.elevation?e.elevation:1,className:"".concat(e["data-noshadow"]?"noShadow":""," ").concat(e.stretched?"stretched":""," ").concat(e.className?e.className:"","\n    "),style:e.style,onClick:function(){e.onClick&&e.onClick()}},e.title?l.a.createElement(d,{title:e.title,subtitle:e.subtitle}):"",l.a.createElement(S,e,e.children))}},1743:function(e,n,t){"use strict";t.r(n);var a=t(0),l=t.n(a),i=t(1330),r=t(1333),c=t(1328),o=(t(57),t(109)),m=t(45),s=t(1349),u=t.n(s),d=t(1350),g=t.n(d),f=t(1351),p=t.n(f),b=t(131),x=t(1570),E=t.n(x),h=t(1437),v=t.n(h),y=t(1438),w=t.n(y),j=t(1439),N=t.n(j),O=t(1440),k=t.n(O),S=E.a,C=t(1339),D=(t(1340),0);function V(e,n,t,a,l){return{id:D+=1,name:e,item:n,units:t,unitcosts:a,total:l}}var T=[V("Jones","Pencil",95,1.99,189.05),V("Kivell","Binder",50,19.99,999.5),V("Jardine","Pencil",36,4.99,179.64),V("Gill","Pen",27,19.99,539.73),V("Sorvino","Pencil",56,2.99,167.44)];n.default=function(e){e.classes;return l.a.createElement(i.a,null,l.a.createElement(c.a,null,l.a.createElement(r.a,{title:"Staff Management"},l.a.createElement(o.a,{variant:"fab",color:"primary","aria-label":"add",style:{float:"right",marginRight:"auto",marginLeft:"8px"}},l.a.createElement(m.a,null,"add")),l.a.createElement(b.a,{style:{width:"100%"}},l.a.createElement(S,null,l.a.createElement(N.a,null,l.a.createElement(k.a,null,l.a.createElement(w.a,null,"Rep"),l.a.createElement(w.a,null,"Item"),l.a.createElement(w.a,{numeric:!0},"Units"),l.a.createElement(w.a,{numeric:!0},"UnitCost"),l.a.createElement(w.a,{numeric:!0},"Total"))),l.a.createElement(v.a,null,T.map(function(e){return l.a.createElement(k.a,{key:e.id},l.a.createElement(w.a,null,e.name),l.a.createElement(w.a,null,e.item),l.a.createElement(w.a,{numeric:!0},e.units),l.a.createElement(w.a,{numeric:!0},e.unitcosts),l.a.createElement(w.a,{numeric:!0},e.total))})))))),l.a.createElement(c.a,null,l.a.createElement(C.VerticalTimeline,null,l.a.createElement(C.VerticalTimelineElement,{className:"vertical-timeline-element--work",date:"2011 - present",iconStyle:{background:"rgb(33, 150, 243)",color:"#fff"},icon:l.a.createElement(u.a,null)},l.a.createElement("h3",{className:"vertical-timeline-element-title"},"Creative Director"),l.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Miami, FL"),l.a.createElement("p",null,"Creative Direction, User Experience, Visual Design, Project Management, Team Leading")),l.a.createElement(C.VerticalTimelineElement,{className:"vertical-timeline-element--work",date:"2010 - 2011",iconStyle:{background:"rgb(33, 150, 243)",color:"#fff"},icon:l.a.createElement(u.a,null)},l.a.createElement("h3",{className:"vertical-timeline-element-title"},"Art Director"),l.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"San Francisco, CA"),l.a.createElement("p",null,"Creative Direction, User Experience, Visual Design, SEO, Online Marketing")),l.a.createElement(C.VerticalTimelineElement,{className:"vertical-timeline-element--work",date:"2008 - 2010",iconStyle:{background:"rgb(33, 150, 243)",color:"#fff"},icon:l.a.createElement(u.a,null)},l.a.createElement("h3",{className:"vertical-timeline-element-title"},"Web Designer"),l.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Los Angeles, CA"),l.a.createElement("p",null,"User Experience, Visual Design")),l.a.createElement(C.VerticalTimelineElement,{className:"vertical-timeline-element--work",date:"2006 - 2008",iconStyle:{background:"rgb(33, 150, 243)",color:"#fff"},icon:l.a.createElement(u.a,null)},l.a.createElement("h3",{className:"vertical-timeline-element-title"},"Web Designer"),l.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"San Francisco, CA"),l.a.createElement("p",null,"User Experience, Visual Design")),l.a.createElement(C.VerticalTimelineElement,{className:"vertical-timeline-element--education",date:"April 2013",iconStyle:{background:"rgb(233, 30, 99)",color:"#fff"},icon:l.a.createElement(g.a,null)},l.a.createElement("h3",{className:"vertical-timeline-element-title"},"Content Marketing for Web, Mobile and Social Media"),l.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Online Course"),l.a.createElement("p",null,"Strategy, Social Media")),l.a.createElement(C.VerticalTimelineElement,{className:"vertical-timeline-element--education",date:"November 2012",iconStyle:{background:"rgb(233, 30, 99)",color:"#fff"},icon:l.a.createElement(g.a,null)},l.a.createElement("h3",{className:"vertical-timeline-element-title"},"Agile Development Scrum Master"),l.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Certification"),l.a.createElement("p",null,"Creative Direction, User Experience, Visual Design")),l.a.createElement(C.VerticalTimelineElement,{className:"vertical-timeline-element--education",date:"2002 - 2006",iconStyle:{background:"rgb(233, 30, 99)",color:"#fff"},icon:l.a.createElement(g.a,null)},l.a.createElement("h3",{className:"vertical-timeline-element-title"},"Bachelor of Science in Interactive Digital Media Visual Imaging"),l.a.createElement("h4",{className:"vertical-timeline-element-subtitle"},"Bachelor Degree"),l.a.createElement("p",null,"Creative Direction, Visual Design")),l.a.createElement(C.VerticalTimelineElement,{iconStyle:{background:"rgb(16, 204, 82)",color:"#fff"},icon:l.a.createElement(p.a,null)}))))}}}]);
//# sourceMappingURL=8.cbbe1ceb.chunk.js.map