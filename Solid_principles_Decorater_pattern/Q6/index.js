var Smartphone = /** @class */ (function () {
    function Smartphone() {
    }
    Smartphone.prototype.update = function () {
        console.log("Smartphone received notification");
    };
    return Smartphone;
}());
var Tablet = /** @class */ (function () {
    function Tablet() {
    }
    Tablet.prototype.update = function () {
        console.log("Tablet received notification");
    };
    return Tablet;
}());
var NotificationCenter = /** @class */ (function () {
    function NotificationCenter() {
        this.observers = [];
    }
    NotificationCenter.prototype.attach = function (observer) {
        this.observers.push(observer);
        console.log("Observer added: ".concat(observer.constructor.name));
    };
    NotificationCenter.prototype.detach = function (observer) {
        this.observers = this.observers.filter(function (o) { return o !== observer; });
    };
    NotificationCenter.prototype.notify = function () {
        this.observers.forEach(function (observer) { return observer.update(); });
    };
    return NotificationCenter;
}());
var notificationCenter = new NotificationCenter();
var phone = new Smartphone();
var tab = new Tablet();
notificationCenter.attach(phone);
notificationCenter.attach(tab);
notificationCenter.notify();
