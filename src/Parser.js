define(function () {
    'use strict';

    function init(path) {
        this._path = path;
        this._path = this._path.replace(/\\/g, '/');
        this._path = this._path.replace(/\/+/g, '/');

        this._dirs = this._path.split('/');
        if (this._dirs[0] === '') {
            this._basedOnRoot = true;
            this._dirs.shift();
        }
        else {
            this._basedOnRoot = false;
        }
        this._file = this._dirs.pop();
        this._ext = '';
        var segs = this._file.split('.');
        if (segs.length > 1) {
            this._ext = segs.pop();
        }
        this._base = segs.join('.');
    }

    function Ctor(path) {
        init.call(this, path);
    }

    var p = Ctor.prototype;

    p.dirs = function() {
        return this._dirs;
    };

    p.base = function() {
        return this._base;
    };

    p.ext = function (value) {
        if (value != null) {
            value += '';
            this._ext = value;
        }
        return this._ext;
    };

    p.file = function() {
        return this._base + (this._ext !== ''?'.' + this._ext: '');
    };

    p.concat = function(path) {
        return new Ctor(this.toString() + '/' + path);
    };

    p.toString = function() {
        return (this._basedOnRoot?'/':'') + this._dirs.join('/') + '/' + this.file();
    };

    return Ctor;
});