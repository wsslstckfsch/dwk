(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{h9W5:function(t,r,e){"use strict";e.r(r),e.d(r,"OrdersModule",function(){return P});var o=e("ofXK"),s=e("tyNb"),i=e("fXoL"),c=e("AytR"),n=e("tk/3");let b=(()=>{class t{constructor(t){this.http=t,this.baseUrl=c.a.apiUrl}getOrdersForUser(){return this.http.get(`${this.baseUrl}/orders`)}getOrderDetailed(t){return this.http.get(`${this.baseUrl}/orders/${t}`)}}return t.\u0275fac=function(r){return new(r||t)(i.Tb(n.b))},t.\u0275prov=i.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var a=e("2rwd");function d(t,r){if(1&t&&(i.Pb(0,"tr",5),i.Pb(1,"td"),i.sc(2),i.Ob(),i.Pb(3,"td"),i.sc(4),i.Zb(5,"date"),i.Ob(),i.Pb(6,"td"),i.sc(7),i.Zb(8,"currency"),i.Ob(),i.Pb(9,"td"),i.sc(10),i.Ob(),i.Ob()),2&t){const t=r.$implicit;i.ec("routerLink","/orders/"+t.id),i.yb(2),i.uc("# ",t.id,""),i.yb(2),i.tc(i.bc(5,5,t.orderDate,"medium")),i.yb(3),i.tc(i.ac(8,8,t.total)),i.yb(3),i.tc(t.status)}}let u=(()=>{class t{constructor(t,r){this.ordersService=t,this.accountService=r}ngOnInit(){this.getOrders()}getOrders(){this.ordersService.getOrdersForUser().subscribe(t=>{this.orders=t},t=>{console.log(t)})}logout(){this.accountService.logout()}}return t.\u0275fac=function(r){return new(r||t)(i.Jb(b),i.Jb(a.a))},t.\u0275cmp=i.Db({type:t,selectors:[["app-orders"]],decls:18,vars:1,consts:[[1,"uk-container","uk-margin-top"],[1,"uk-button","uk-button-default",3,"click"],[1,"uk-overflow-auto"],[1,"uk-table","uk-table-hover"],[3,"routerLink",4,"ngFor","ngForOf"],[3,"routerLink"]],template:function(t,r){1&t&&(i.Pb(0,"div",0),i.Pb(1,"div"),i.Pb(2,"button",1),i.Wb("click",function(){return r.logout()}),i.sc(3," Logout "),i.Ob(),i.Ob(),i.Pb(4,"div",2),i.Pb(5,"table",3),i.Pb(6,"thead"),i.Pb(7,"tr"),i.Pb(8,"th"),i.sc(9,"Order"),i.Ob(),i.Pb(10,"th"),i.sc(11,"Date"),i.Ob(),i.Pb(12,"th"),i.sc(13,"Total"),i.Ob(),i.Pb(14,"th"),i.sc(15,"Status"),i.Ob(),i.Ob(),i.Ob(),i.Pb(16,"tbody"),i.rc(17,d,11,10,"tr",4),i.Ob(),i.Ob(),i.Ob(),i.Ob()),2&t&&(i.yb(17),i.ec("ngForOf",r.orders))},directives:[o.l,s.d],pipes:[o.f,o.d],styles:[""]}),t})();var l=e("GJcC"),p=e("PoZw");function h(t,r){if(1&t&&(i.Nb(0),i.Pb(1,"div",1),i.Pb(2,"div",2),i.Pb(3,"div",3),i.Kb(4,"app-basket-summary",4),i.Ob(),i.Kb(5,"app-order-totals",5),i.Ob(),i.Ob(),i.Mb()),2&t){const t=i.Yb();i.yb(4),i.ec("items",t.order.orderItems)("isBasket",!1)("isOrder",!0),i.yb(1),i.ec("shippingPrice",t.order.shippingPrice)("subtotal",t.order.subtotal)("total",t.order.total)}}const O=[{path:"",component:u},{path:":id",component:(()=>{class t{constructor(t,r){this.route=t,this.ordersService=r}ngOnInit(){this.ordersService.getOrderDetailed(+this.route.snapshot.paramMap.get("id")).subscribe(t=>{this.order=t},t=>{console.log(t)})}}return t.\u0275fac=function(r){return new(r||t)(i.Jb(s.a),i.Jb(b))},t.\u0275cmp=i.Db({type:t,selectors:[["app-order-detailed"]],decls:1,vars:1,consts:[[4,"ngIf"],[1,"uk-container","uk-margin-top"],[1,"checkout-grid"],[1,"uk-overflow-auto"],[3,"items","isBasket","isOrder"],[3,"shippingPrice","subtotal","total"]],template:function(t,r){1&t&&i.rc(0,h,6,6,"ng-container",0),2&t&&i.ec("ngIf",r.order&&r.order.orderItems&&r.order.shippingPrice)},directives:[o.m,l.a,p.a],styles:[""]}),t})(),data:{breadcrumb:{alias:"OrderDetailed"}}}];let f=(()=>{class t{}return t.\u0275mod=i.Hb({type:t}),t.\u0275inj=i.Gb({factory:function(r){return new(r||t)},imports:[[s.g.forChild(O)],s.g]}),t})();var g=e("PCNd");let P=(()=>{class t{}return t.\u0275mod=i.Hb({type:t}),t.\u0275inj=i.Gb({factory:function(r){return new(r||t)},imports:[[o.c,f,g.a]]}),t})()}}]);
//# sourceMappingURL=9.51cc0d2e4882898bbf14.js.map