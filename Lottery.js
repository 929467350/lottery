"use strict";
var Lottery = /** @class */ (function () {
    function Lottery(options) {
        this.count = 0;
        this.timer = 0;
        this.started = false;
        this.el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
        this.index = options.index || 0;
        this.end = options.end || 1;
        this.total = options.total || 4;
        this.speed = options.speed || 100;
        this.nodes = this.el.querySelectorAll('.lottery-ui');
        this.handle = options.handle || function () {};
        this.init();
    }
    Lottery.prototype.init = function () {
        if (this.started)
            return;
        this.started = true;
        this.roll();
        return this;
    };
    Lottery.prototype.roll = function () {
        var _this = this;
        this.nodes.forEach(function (node) {
            node.classList.remove('active');
        });
        this.index++;
        if (this.index > this.nodes.length - 1) {
            this.count++;
            this.index = 0;
        }
        this.nodes[this.index].classList.add('active');
        if (this.count >= this.total && this.index === this.end) {
            setTimeout(function () {
                _this.handle.call(_this, _this);
                _this.started = false;
            }, 500);
            clearTimeout(this.timer);
        } else {
            if (this.count >= this.total - 3) {
                this.speed += 10;
            } else if (this.count >= this.total - 1) {
                this.speed += 30;
            }
            this.timer = setTimeout(function () {
                _this.roll();
            }, this.speed);
        }
        return this;
    };
    return Lottery;
}());