/*! geolib.isPointInsideRobust $version$
* !!EXPERIMENTAL!!
*
* Robust version of isPointInside for Geolib.js
*
* Based on https://github.com/mikolalysenko/robust-point-in-polygon
* by Mikola Lysenko, licensed under MIT
*
* @author Manuel Bieh
* @url http://www.manuelbieh.com/
* @version $version$
* @license MIT
*
*/
;(function(global, geolib, undefined) {

    var addOn = function(geolib) {

        var SPLITTER = +(Math.pow(2, 27) + 1.0);

        var NUM_EXPAND = 5;
        var EPSILON     = 1.1102230246251565e-16;
        var ERRBOUND3   = (3.0 + 16.0 * EPSILON) * EPSILON;
        var ERRBOUND4   = (7.0 + 56.0 * EPSILON) * EPSILON;

        var twoProduct = function(a, b, result) {
            var x = a * b;
            var c = SPLITTER * a;
            var abig = c - a;
            var ahi = c - abig;
            var alo = a - ahi;
            var d = SPLITTER * b;
            var bbig = d - b;
            var bhi = d - bbig;
            var blo = b - bhi;
            var err1 = x - (ahi * bhi);
            var err2 = err1 - (alo * bhi);
            var err3 = err2 - (ahi * blo);
            var y = alo * blo - err3;
            if(result) {
                result[0] = y;
                result[1] = x;
                return result;
            }
            return [ y, x ];
        };

        var fastTwoSum = function(a, b, result) {
            var x = a + b;
            var bv = x - a;
            var av = x - bv;
            var br = b - bv;
            var ar = a - av;
            if(result) {
                result[0] = ar + br;
                result[1] = x;
                return result;
            }
            return [ar+br, x];
        };

        var twoSum = fastTwoSum;

        var linearExpansionSum = function(e, f) {
            var ne = e.length|0;
            var nf = f.length|0;
            if(ne === 1 && nf === 1) {
                return scalarScalar(e[0], f[0]);
            }
            var n = ne + nf;
            var g = new Array(n);
            var count = 0;
            var eptr = 0;
            var fptr = 0;
            var abs = Math.abs;
            var ei = e[eptr];
            var ea = abs(ei);
            var fi = f[fptr];
            var fa = abs(fi);
            var a, b;
            if(ea < fa) {
                b = ei;
                eptr += 1;
                if(eptr < ne) {
                    ei = e[eptr];
                    ea = abs(ei);
                }
            } else {
                b = fi;
                fptr += 1;
                if(fptr < nf) {
                    fi = f[fptr];
                    fa = abs(fi);
                }
            }
            if((eptr < ne && ea < fa) || (fptr >= nf)) {
                a = ei;
                eptr += 1;
                if(eptr < ne) {
                    ei = e[eptr];
                    ea = abs(ei);
                }
            } else {
                a = fi;
                fptr += 1;
                if(fptr < nf) {
                    fi = f[fptr];
                    fa = abs(fi);
                }
            }
            var x = a + b;
            var bv = x - a;
            var y = b - bv;
            var q0 = y;
            var q1 = x;
            var _x, _bv, _av, _br, _ar;
            while(eptr < ne && fptr < nf) {
                if(ea < fa) {
                    a = ei;
                    eptr += 1;
                    if(eptr < ne) {
                        ei = e[eptr];
                        ea = abs(ei);
                    }
                } else {
                    a = fi;
                    fptr += 1;
                    if(fptr < nf) {
                        fi = f[fptr];
                        fa = abs(fi);
                    }
                }
                b = q0;
                x = a + b;
                bv = x - a;
                y = b - bv;
                if(y) {
                    g[count++] = y;
                }
                _x = q1 + x;
                _bv = _x - q1;
                _av = _x - _bv;
                _br = x - _bv;
                _ar = q1 - _av;
                q0 = _ar + _br;
                q1 = _x;
            }
            while(eptr < ne) {
                a = ei;
                b = q0;
                x = a + b;
                bv = x - a;
                y = b - bv;
                if(y) {
                    g[count++] = y;
                }
                _x = q1 + x;
                _bv = _x - q1;
                _av = _x - _bv;
                _br = x - _bv;
                _ar = q1 - _av;
                q0 = _ar + _br;
                q1 = _x;
                eptr += 1;
                if(eptr < ne) {
                    ei = e[eptr];
                }
            }
            while(fptr < nf) {
                a = fi;
                b = q0;
                x = a + b;
                bv = x - a;
                y = b - bv;
                if(y) {
                    g[count++] = y;
                }
                _x = q1 + x;
                _bv = _x - q1;
                _av = _x - _bv;
                _br = x - _bv;
                _ar = q1 - _av;
                q0 = _ar + _br;
                q1 = _x;
                fptr += 1;
                if(fptr < nf) {
                    fi = f[fptr];
                }
            }
            if(q0) {
                g[count++] = q0;
            }
            if(q1) {
                g[count++] = q1;
            }
            if(!count) {
                g[count++] = 0.0;
            }
            g.length = count;
            return g;
        };

        var robustSum = linearExpansionSum;

        var scaleLinearExpansion = function(e, scale) {
            var n = e.length;
            if(n === 1) {
                var ts = twoProduct(e[0], scale);
                if(ts[0]) {
                    return ts;
                }
                return [ ts[1] ];
            }
            var g = new Array(2 * n);
            var q = [0.1, 0.1];
            var t = [0.1, 0.1];
            var count = 0;
            twoProduct(e[0], scale, q);
            if(q[0]) {
                g[count++] = q[0];
            }
            for(var i=1; i<n; ++i) {
                twoProduct(e[i], scale, t);
                var pq = q[1];
                twoSum(pq, t[0], q);
                if(q[0]) {
                    g[count++] = q[0];
                }
                var a = t[1];
                var b = q[1];
                var x = a + b;
                var bv = x - a;
                var y = b - bv;
                q[1] = x;
                if(y) {
                    g[count++] = y;
                }
            }
            if(q[1]) {
                g[count++] = q[1];
            }
            if(count === 0) {
                g[count++] = 0.0;
            }
            g.length = count;
            return g;
        };

        var robustScale = scaleLinearExpansion;

        var scalarScalar = function(a, b) {
            var x = a + b;
            var bv = x - a;
            var av = x - bv;
            var br = b - bv;
            var ar = a - av;
            var y = ar + br;
            if(y) {
                return [y, x];
            }
            return [x];
        };

        var robustSubtract = function(e, f) {
            var ne = e.length|0;
            var nf = f.length|0;
            if(ne === 1 && nf === 1) {
                return scalarScalar(e[0], -f[0]);
            }
            var n = ne + nf;
            var g = new Array(n);
            var count = 0;
            var eptr = 0;
            var fptr = 0;
            var abs = Math.abs;
            var ei = e[eptr];
            var ea = abs(ei);
            var fi = -f[fptr];
            var fa = abs(fi);
            var a, b;
            if(ea < fa) {
                b = ei;
                eptr += 1;
                if(eptr < ne) {
                    ei = e[eptr];
                    ea = abs(ei);
                }
            } else {
                b = fi;
                fptr += 1;
                if(fptr < nf) {
                    fi = -f[fptr];
                    fa = abs(fi);
                }
            }
            if((eptr < ne && ea < fa) || (fptr >= nf)) {
                a = ei;
                eptr += 1;
                if(eptr < ne) {
                    ei = e[eptr];
                    ea = abs(ei);
                }
            } else {
                a = fi;
                fptr += 1;
                if(fptr < nf) {
                    fi = -f[fptr];
                    fa = abs(fi);
                }
            }
            var x = a + b;
            var bv = x - a;
            var y = b - bv;
            var q0 = y;
            var q1 = x;
            var _x, _bv, _av, _br, _ar;
            while(eptr < ne && fptr < nf) {
                if(ea < fa) {
                    a = ei;
                    eptr += 1;
                    if(eptr < ne) {
                        ei = e[eptr];
                        ea = abs(ei);
                    }
                } else {
                    a = fi;
                    fptr += 1;
                    if(fptr < nf) {
                        fi = -f[fptr];
                        fa = abs(fi);
                    }
                }
                b = q0;
                x = a + b;
                bv = x - a;
                y = b - bv;
                if(y) {
                    g[count++] = y;
                }
                _x = q1 + x;
                _bv = _x - q1;
                _av = _x - _bv;
                _br = x - _bv;
                _ar = q1 - _av;
                q0 = _ar + _br;
                q1 = _x;
            }
            while(eptr < ne) {
                a = ei;
                b = q0;
                x = a + b;
                bv = x - a;
                y = b - bv;
                if(y) {
                    g[count++] = y;
                }
                _x = q1 + x;
                _bv = _x - q1;
                _av = _x - _bv;
                _br = x - _bv;
                _ar = q1 - _av;
                q0 = _ar + _br;
                q1 = _x;
                eptr += 1;
                if(eptr < ne) {
                    ei = e[eptr];
                }
            }
            while(fptr < nf) {
                a = fi;
                b = q0;
                x = a + b;
                bv = x - a;
                y = b - bv;
                if(y) {
                    g[count++] = y;
                }
                _x = q1 + x;
                _bv = _x - q1;
                _av = _x - _bv;
                _br = x - _bv;
                _ar = q1 - _av;
                q0 = _ar + _br;
                q1 = _x;
                fptr += 1;
                if(fptr < nf) {
                    fi = -f[fptr];
                }
            }
            if(q0) {
                g[count++] = q0;
            }
            if(q1) {
                g[count++] = q1;
            }
            if(!count) {
                g[count++] = 0.0;
            }
            g.length = count;
            return g;
        };

        var cofactor = function(m, c) {
            var result = new Array(m.length-1);
            for(var i=1; i<m.length; ++i) {
                var r = result[i-1] = new Array(m.length-1);
                for(var j=0,k=0; j<m.length; ++j) {
                    if(j === c) {
                        continue;
                    }
                    r[k++] = m[i][j];
                }
            }
            return result;
        };

        var matrix = function(n) {
            var result = new Array(n);
            for(var i=0; i<n; ++i) {
                result[i] = new Array(n);
                for(var j=0; j<n; ++j) {
                    result[i][j] = ["m", j, "[", (n-i-1), "]"].join("");
                }
            }
            return result;
        };

        var sign = function(n) {
            if(n & 1) {
                return "-";
            }
            return "";
        };

        var generateSum = function(expr) {
            if(expr.length === 1) {
                return expr[0];
            } else if(expr.length === 2) {
                return ["sum(", expr[0], ",", expr[1], ")"].join("");
            } else {
                var m = expr.length>>1;
                return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("");
            }
        };

        var determinant = function(m) {
            if(m.length === 2) {
                return [["sum(prod(", m[0][0], ",", m[1][1], "),prod(-", m[0][1], ",", m[1][0], "))"].join("")];
            } else {
                var expr = [];
                for(var i=0; i<m.length; ++i) {
                    expr.push(["scale(", generateSum(determinant(cofactor(m, i))), ",", sign(i), m[0][i], ")"].join(""));
                }
                return expr;
            }
        };

        var orientation = function(n) {
            var pos = [];
            var neg = [];
            var m = matrix(n);
            var args = [];
            for(var i=0; i<n; ++i) {
                if((i&1)===0) {
                    pos.push.apply(pos, determinant(cofactor(m, i)));
                } else {
                    neg.push.apply(neg, determinant(cofactor(m, i)));
                }
                args.push("m" + i);
            }
            var posExpr = generateSum(pos);
            var negExpr = generateSum(neg);
            var funcName = "orientation" + n + "Exact";
            var code = [
                "function ",
                funcName,
                "(", args.join(), "){var p=",
                posExpr,
                ",n=",
                negExpr,
                ",d=sub(p,n);return d[d.length-1];};return ",
                funcName
            ].join("");
            var proc = new Function("sum", "prod", "scale", "sub", code);
            return proc(robustSum, twoProduct, robustScale, robustSubtract);
        };

        var orient;
        var orientation3Exact = orientation(3);
        var orientation4Exact = orientation(4);

        var CACHED = [
            function orientation0() { return 0; },
            function orientation1() { return 0; },
            function orientation2(a, b) {
                return b[0] - a[0];
            },
            function orientation3(a, b, c) {
                var l = (a[1] - c[1]) * (b[0] - c[0]);
                var r = (a[0] - c[0]) * (b[1] - c[1]);
                var det = l - r;
                var s;
                if(l > 0) {
                    if(r <= 0) {
                        return det;
                    } else {
                        s = l + r;
                    }
                } else if(l < 0) {
                    if(r >= 0) {
                        return det;
                    } else {
                        s = -(l + r);
                    }
                } else {
                    return det;
                }
                var tol = ERRBOUND3 * s;
                if(det >= tol || det <= -tol) {
                    return det;
                }
                return orientation3Exact(a, b, c);
            },
            function orientation4(a,b,c,d) {
                var adx = a[0] - d[0];
                var bdx = b[0] - d[0];
                var cdx = c[0] - d[0];
                var ady = a[1] - d[1];
                var bdy = b[1] - d[1];
                var cdy = c[1] - d[1];
                var adz = a[2] - d[2];
                var bdz = b[2] - d[2];
                var cdz = c[2] - d[2];
                var bdxcdy = bdx * cdy;
                var cdxbdy = cdx * bdy;
                var cdxady = cdx * ady;
                var adxcdy = adx * cdy;
                var adxbdy = adx * bdy;
                var bdxady = bdx * ady;
                var det = adz * (bdxcdy - cdxbdy) +
                    bdz * (cdxady - adxcdy) +
                    cdz * (adxbdy - bdxady);
                var permanent = (Math.abs(bdxcdy) + Math.abs(cdxbdy)) * Math.abs(adz) +
                    (Math.abs(cdxady) + Math.abs(adxcdy)) * Math.abs(bdz) +
                    (Math.abs(adxbdy) + Math.abs(bdxady)) * Math.abs(cdz);
                var tol = ERRBOUND4 * permanent;
                if ((det > tol) || (-det > tol)) {
                    return det;
                }
                return orientation4Exact(a,b,c,d);
            }
        ];

        var slowOrient = function(args) {
            var proc = CACHED[args.length];
            if(!proc) {
                proc = CACHED[args.length] = orientation(args.length);
            }
            return proc.apply(undefined, args);
        };

        var generateOrientationProc = function() {
            while(CACHED.length <= NUM_EXPAND) {
                CACHED.push(orientation(CACHED.length));
            }
            var args = [];
            var procArgs = ["slow"];
            for(var i=0; i<=NUM_EXPAND; ++i) {
                args.push("a" + i);
                procArgs.push("o" + i);
            }
            var code = [
                "function getOrientation(",
                args.join(),
                "){switch(arguments.length){case 0:case 1:return 0;"
            ];
            for(i=2; i<=NUM_EXPAND; ++i) {
                code.push("case ", i, ":return o", i, "(", args.slice(0, i).join(), ");");
            }
            code.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation");
            procArgs.push(code.join(""));

            var proc = Function.apply(undefined, procArgs);
            orient = proc.apply(undefined, [slowOrient].concat(CACHED));
            for(i=0; i<=NUM_EXPAND; ++i) {
                orient[i] = CACHED[i];
            }
        };

        generateOrientationProc();

        var robustPointInPolygon = function(vs, point) {
            // transform from geolib format to array syntax
            var x = geolib.longitude(point);
            var y = geolib.latitude(point);
            var coords = vs.map(function(coords) {
                return [geolib.longitude(coords), geolib.latitude(coords)];
            });

            vs = coords;
            point = [x,y];

            var n = vs.length;
            var inside = 1;
            var lim = n;

            var s, c, yk, px, p;

            for(var i = 0, j = n-1; i<lim; j=i++) {
                var a = vs[i];
                var b = vs[j];
                var yi = a[1];
                var yj = b[1];
                if(yj < yi) {
                    if(yj < y && y < yi) {
                        s = orient(a, b, point);
                        if(s === 0) {
                            return 0;
                        } else {
                            inside ^= (0 < s)|0;
                        }
                    } else if(y === yi) {
                        c = vs[(i+1)%n];
                        yk = c[1];
                        if(yi < yk) {
                            s = orient(a, b, point);
                            if(s === 0) {
                                return 0;
                            } else {
                                inside ^= (0 < s)|0;
                            }
                        }
                    }
                } else if(yi < yj) {
                    if(yi < y && y < yj) {
                        s = orient(a, b, point);
                        if(s === 0) {
                            return 0;
                        } else {
                            inside ^= (s < 0)|0;
                        }
                    } else if(y === yi) {
                        c = vs[(i+1)%n];
                        yk = c[1];
                        if(yk < yi) {
                            s = orient(a, b, point);
                            if(s === 0) {
                                return 0;
                            } else {
                                inside ^= (s < 0)|0;
                            }
                        }
                    }
                } else if(y === yi) {
                    var x0 = Math.min(a[0], b[0]);
                    var x1 = Math.max(a[0], b[0]);
                    if(i === 0) {
                        while(j>0) {
                            var k = (j+n-1)%n;
                            p = vs[k];
                            if(p[1] !== y) {
                                break;
                            }
                            px = p[0];
                            x0 = Math.min(x0, px);
                            x1 = Math.max(x1, px);
                            j = k;
                        }
                        if(j === 0) {
                            if(x0 <= x && x <= x1) {
                                return 0;
                            }
                            return 1;
                        }
                        lim = j+1;
                    }
                    var y0 = vs[(j+n-1)%n][1];
                    while(i+1<lim) {
                        p = vs[i+1];
                        if(p[1] !== y) {
                            break;
                        }
                        px = p[0];
                        x0 = Math.min(x0, px);
                        x1 = Math.max(x1, px);
                        i += 1;
                    }
                    if(x0 <= x && x <= x1) {
                        return 0;
                    }
                    var y1 = vs[(i+1)%n][1];
                    if(x < x0 && (y0 < y !== y1 < y)) {
                        inside ^= 1;
                    }
                }
            }
            return 2 * inside - 1;
        };

        return {

            /**
            * @param      object      coordinate to check e.g. {latitude: 51.5023, longitude: 7.3815}
            * @param      array       array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
            * @return     integer     -1 if point is inside, 0 if point is on boundaries, 1 if point is outside
            */
            isPointInsideRobust: function(latlng, coords) {
                return robustPointInPolygon(coords, latlng);
            },

            isInside: function() {
                return this.isPointInsideRobust.apply(this, arguments);
            }

        };

	};


	// Node module
	if (typeof module !== 'undefined' &&
		typeof module.exports !== 'undefined') {

        module.exports = function(geolib) {
            geolib.extend(addOn(geolib), true);
            return geolib;
        };

	// AMD module
	} else if (typeof define === "function" && define.amd) {

		define(["geolib"], function (geolib) {
			geolib.extend(addOn(geolib), true);
			return geolib;
		});

	// we're in a browser
	} else {

		geolib.extend(addOn(geolib), true);

	}

}(this, this.geolib));
