"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/web-vitals";
exports.ids = ["vendor-chunks/web-vitals"];
exports.modules = {

/***/ "(ssr)/./node_modules/web-vitals/dist/web-vitals.js":
/*!****************************************************!*\
  !*** ./node_modules/web-vitals/dist/web-vitals.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCLS: () => (/* binding */ h),\n/* harmony export */   getFCP: () => (/* binding */ d),\n/* harmony export */   getFID: () => (/* binding */ L),\n/* harmony export */   getLCP: () => (/* binding */ F),\n/* harmony export */   getTTFB: () => (/* binding */ P)\n/* harmony export */ });\nvar e, t, n, i, r = function(e, t) {\n    return {\n        name: e,\n        value: void 0 === t ? -1 : t,\n        delta: 0,\n        entries: [],\n        id: \"v2-\".concat(Date.now(), \"-\").concat(Math.floor(8999999999999 * Math.random()) + 1e12)\n    };\n}, a = function(e, t) {\n    try {\n        if (PerformanceObserver.supportedEntryTypes.includes(e)) {\n            if (\"first-input\" === e && !(\"PerformanceEventTiming\" in self)) return;\n            var n = new PerformanceObserver(function(e) {\n                return e.getEntries().map(t);\n            });\n            return n.observe({\n                type: e,\n                buffered: !0\n            }), n;\n        }\n    } catch (e) {}\n}, o = function(e, t) {\n    var n = function n(i) {\n        \"pagehide\" !== i.type && \"hidden\" !== document.visibilityState || (e(i), t && (removeEventListener(\"visibilitychange\", n, !0), removeEventListener(\"pagehide\", n, !0)));\n    };\n    addEventListener(\"visibilitychange\", n, !0), addEventListener(\"pagehide\", n, !0);\n}, u = function(e) {\n    addEventListener(\"pageshow\", function(t) {\n        t.persisted && e(t);\n    }, !0);\n}, c = function(e, t, n) {\n    var i;\n    return function(r) {\n        t.value >= 0 && (r || n) && (t.delta = t.value - (i || 0), (t.delta || void 0 === i) && (i = t.value, e(t)));\n    };\n}, f = -1, s = function() {\n    return \"hidden\" === document.visibilityState ? 0 : 1 / 0;\n}, m = function() {\n    o(function(e) {\n        var t = e.timeStamp;\n        f = t;\n    }, !0);\n}, v = function() {\n    return f < 0 && (f = s(), m(), u(function() {\n        setTimeout(function() {\n            f = s(), m();\n        }, 0);\n    })), {\n        get firstHiddenTime () {\n            return f;\n        }\n    };\n}, d = function(e, t) {\n    var n, i = v(), o = r(\"FCP\"), f = function(e) {\n        \"first-contentful-paint\" === e.name && (m && m.disconnect(), e.startTime < i.firstHiddenTime && (o.value = e.startTime, o.entries.push(e), n(!0)));\n    }, s = window.performance && performance.getEntriesByName && performance.getEntriesByName(\"first-contentful-paint\")[0], m = s ? null : a(\"paint\", f);\n    (s || m) && (n = c(e, o, t), s && f(s), u(function(i) {\n        o = r(\"FCP\"), n = c(e, o, t), requestAnimationFrame(function() {\n            requestAnimationFrame(function() {\n                o.value = performance.now() - i.timeStamp, n(!0);\n            });\n        });\n    }));\n}, p = !1, l = -1, h = function(e, t) {\n    p || (d(function(e) {\n        l = e.value;\n    }), p = !0);\n    var n, i = function(t) {\n        l > -1 && e(t);\n    }, f = r(\"CLS\", 0), s = 0, m = [], v = function(e) {\n        if (!e.hadRecentInput) {\n            var t = m[0], i = m[m.length - 1];\n            s && e.startTime - i.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (s += e.value, m.push(e)) : (s = e.value, m = [\n                e\n            ]), s > f.value && (f.value = s, f.entries = m, n());\n        }\n    }, h = a(\"layout-shift\", v);\n    h && (n = c(i, f, t), o(function() {\n        h.takeRecords().map(v), n(!0);\n    }), u(function() {\n        s = 0, l = -1, f = r(\"CLS\", 0), n = c(i, f, t);\n    }));\n}, T = {\n    passive: !0,\n    capture: !0\n}, y = new Date, g = function(i, r) {\n    e || (e = r, t = i, n = new Date, w(removeEventListener), E());\n}, E = function() {\n    if (t >= 0 && t < n - y) {\n        var r = {\n            entryType: \"first-input\",\n            name: e.type,\n            target: e.target,\n            cancelable: e.cancelable,\n            startTime: e.timeStamp,\n            processingStart: e.timeStamp + t\n        };\n        i.forEach(function(e) {\n            e(r);\n        }), i = [];\n    }\n}, S = function(e) {\n    if (e.cancelable) {\n        var t = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;\n        \"pointerdown\" == e.type ? function(e, t) {\n            var n = function() {\n                g(e, t), r();\n            }, i = function() {\n                r();\n            }, r = function() {\n                removeEventListener(\"pointerup\", n, T), removeEventListener(\"pointercancel\", i, T);\n            };\n            addEventListener(\"pointerup\", n, T), addEventListener(\"pointercancel\", i, T);\n        }(t, e) : g(t, e);\n    }\n}, w = function(e) {\n    [\n        \"mousedown\",\n        \"keydown\",\n        \"touchstart\",\n        \"pointerdown\"\n    ].forEach(function(t) {\n        return e(t, S, T);\n    });\n}, L = function(n, f) {\n    var s, m = v(), d = r(\"FID\"), p = function(e) {\n        e.startTime < m.firstHiddenTime && (d.value = e.processingStart - e.startTime, d.entries.push(e), s(!0));\n    }, l = a(\"first-input\", p);\n    s = c(n, d, f), l && o(function() {\n        l.takeRecords().map(p), l.disconnect();\n    }, !0), l && u(function() {\n        var a;\n        d = r(\"FID\"), s = c(n, d, f), i = [], t = -1, e = null, w(addEventListener), a = p, i.push(a), E();\n    });\n}, b = {}, F = function(e, t) {\n    var n, i = v(), f = r(\"LCP\"), s = function(e) {\n        var t = e.startTime;\n        t < i.firstHiddenTime && (f.value = t, f.entries.push(e), n());\n    }, m = a(\"largest-contentful-paint\", s);\n    if (m) {\n        n = c(e, f, t);\n        var d = function() {\n            b[f.id] || (m.takeRecords().map(s), m.disconnect(), b[f.id] = !0, n(!0));\n        };\n        [\n            \"keydown\",\n            \"click\"\n        ].forEach(function(e) {\n            addEventListener(e, d, {\n                once: !0,\n                capture: !0\n            });\n        }), o(d, !0), u(function(i) {\n            f = r(\"LCP\"), n = c(e, f, t), requestAnimationFrame(function() {\n                requestAnimationFrame(function() {\n                    f.value = performance.now() - i.timeStamp, b[f.id] = !0, n(!0);\n                });\n            });\n        });\n    }\n}, P = function(e) {\n    var t, n = r(\"TTFB\");\n    t = function() {\n        try {\n            var t = performance.getEntriesByType(\"navigation\")[0] || function() {\n                var e = performance.timing, t = {\n                    entryType: \"navigation\",\n                    startTime: 0\n                };\n                for(var n in e)\"navigationStart\" !== n && \"toJSON\" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));\n                return t;\n            }();\n            if (n.value = n.delta = t.responseStart, n.value < 0 || n.value > performance.now()) return;\n            n.entries = [\n                t\n            ], e(n);\n        } catch (e) {}\n    }, \"complete\" === document.readyState ? setTimeout(t, 0) : addEventListener(\"load\", function() {\n        return setTimeout(t, 0);\n    });\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2ViLXZpdGFscy9kaXN0L3dlYi12aXRhbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFJQSxHQUFFQyxHQUFFQyxHQUFFQyxHQUFFQyxJQUFFLFNBQVNKLENBQUMsRUFBQ0MsQ0FBQztJQUFFLE9BQU07UUFBQ0ksTUFBS0w7UUFBRU0sT0FBTSxLQUFLLE1BQUlMLElBQUUsQ0FBQyxJQUFFQTtRQUFFTSxPQUFNO1FBQUVDLFNBQVEsRUFBRTtRQUFDQyxJQUFHLE1BQU1DLE1BQU0sQ0FBQ0MsS0FBS0MsR0FBRyxJQUFHLEtBQUtGLE1BQU0sQ0FBQ0csS0FBS0MsS0FBSyxDQUFDLGdCQUFjRCxLQUFLRSxNQUFNLE1BQUk7SUFBSztBQUFDLEdBQUVDLElBQUUsU0FBU2hCLENBQUMsRUFBQ0MsQ0FBQztJQUFFLElBQUc7UUFBQyxJQUFHZ0Isb0JBQW9CQyxtQkFBbUIsQ0FBQ0MsUUFBUSxDQUFDbkIsSUFBRztZQUFDLElBQUcsa0JBQWdCQSxLQUFHLENBQUUsNkJBQTJCb0IsSUFBRyxHQUFHO1lBQU8sSUFBSWxCLElBQUUsSUFBSWUsb0JBQXFCLFNBQVNqQixDQUFDO2dCQUFFLE9BQU9BLEVBQUVxQixVQUFVLEdBQUdDLEdBQUcsQ0FBQ3JCO1lBQUU7WUFBSSxPQUFPQyxFQUFFcUIsT0FBTyxDQUFDO2dCQUFDQyxNQUFLeEI7Z0JBQUV5QixVQUFTLENBQUM7WUFBQyxJQUFHdkI7UUFBQztJQUFDLEVBQUMsT0FBTUYsR0FBRSxDQUFDO0FBQUMsR0FBRTBCLElBQUUsU0FBUzFCLENBQUMsRUFBQ0MsQ0FBQztJQUFFLElBQUlDLElBQUUsU0FBU0EsRUFBRUMsQ0FBQztRQUFFLGVBQWFBLEVBQUVxQixJQUFJLElBQUUsYUFBV0csU0FBU0MsZUFBZSxJQUFHNUIsQ0FBQUEsRUFBRUcsSUFBR0YsS0FBSTRCLENBQUFBLG9CQUFvQixvQkFBbUIzQixHQUFFLENBQUMsSUFBRzJCLG9CQUFvQixZQUFXM0IsR0FBRSxDQUFDLEVB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QUU0RSxlQUFlLEVBQUMsRUFBQztnQkFBRyxPQUFPM0U7WUFBQztZQUFJLElBQUdDLEVBQUVJLEtBQUssR0FBQ0osRUFBRUssS0FBSyxHQUFDTixFQUFFNEUsYUFBYSxFQUFDM0UsRUFBRUksS0FBSyxHQUFDLEtBQUdKLEVBQUVJLEtBQUssR0FBQ3dDLFlBQVlsQyxHQUFHLElBQUc7WUFBT1YsRUFBRU0sT0FBTyxHQUFDO2dCQUFDUDthQUFFLEVBQUNELEVBQUVFO1FBQUUsRUFBQyxPQUFNRixHQUFFLENBQUM7SUFBQyxHQUFFLGVBQWEyQixTQUFTbUQsVUFBVSxHQUFDdkMsV0FBV3RDLEdBQUUsS0FBRzZCLGlCQUFpQixRQUFRO1FBQVcsT0FBT1MsV0FBV3RDLEdBQUU7SUFBRTtBQUFHO0FBQXVFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc253Yy8uL25vZGVfbW9kdWxlcy93ZWItdml0YWxzL2Rpc3Qvd2ViLXZpdGFscy5qcz9kYTU1Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBlLHQsbixpLHI9ZnVuY3Rpb24oZSx0KXtyZXR1cm57bmFtZTplLHZhbHVlOnZvaWQgMD09PXQ/LTE6dCxkZWx0YTowLGVudHJpZXM6W10saWQ6XCJ2Mi1cIi5jb25jYXQoRGF0ZS5ub3coKSxcIi1cIikuY29uY2F0KE1hdGguZmxvb3IoODk5OTk5OTk5OTk5OSpNYXRoLnJhbmRvbSgpKSsxZTEyKX19LGE9ZnVuY3Rpb24oZSx0KXt0cnl7aWYoUGVyZm9ybWFuY2VPYnNlcnZlci5zdXBwb3J0ZWRFbnRyeVR5cGVzLmluY2x1ZGVzKGUpKXtpZihcImZpcnN0LWlucHV0XCI9PT1lJiYhKFwiUGVyZm9ybWFuY2VFdmVudFRpbWluZ1wiaW4gc2VsZikpcmV0dXJuO3ZhciBuPW5ldyBQZXJmb3JtYW5jZU9ic2VydmVyKChmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRFbnRyaWVzKCkubWFwKHQpfSkpO3JldHVybiBuLm9ic2VydmUoe3R5cGU6ZSxidWZmZXJlZDohMH0pLG59fWNhdGNoKGUpe319LG89ZnVuY3Rpb24oZSx0KXt2YXIgbj1mdW5jdGlvbiBuKGkpe1wicGFnZWhpZGVcIiE9PWkudHlwZSYmXCJoaWRkZW5cIiE9PWRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZXx8KGUoaSksdCYmKHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsbiwhMCkscmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsbiwhMCkpKX07YWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIixuLCEwKSxhZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIixuLCEwKX0sdT1mdW5jdGlvbihlKXthZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwoZnVuY3Rpb24odCl7dC5wZXJzaXN0ZWQmJmUodCl9KSwhMCl9LGM9ZnVuY3Rpb24oZSx0LG4pe3ZhciBpO3JldHVybiBmdW5jdGlvbihyKXt0LnZhbHVlPj0wJiYocnx8bikmJih0LmRlbHRhPXQudmFsdWUtKGl8fDApLCh0LmRlbHRhfHx2b2lkIDA9PT1pKSYmKGk9dC52YWx1ZSxlKHQpKSl9fSxmPS0xLHM9ZnVuY3Rpb24oKXtyZXR1cm5cImhpZGRlblwiPT09ZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlPzA6MS8wfSxtPWZ1bmN0aW9uKCl7bygoZnVuY3Rpb24oZSl7dmFyIHQ9ZS50aW1lU3RhbXA7Zj10fSksITApfSx2PWZ1bmN0aW9uKCl7cmV0dXJuIGY8MCYmKGY9cygpLG0oKSx1KChmdW5jdGlvbigpe3NldFRpbWVvdXQoKGZ1bmN0aW9uKCl7Zj1zKCksbSgpfSksMCl9KSkpLHtnZXQgZmlyc3RIaWRkZW5UaW1lKCl7cmV0dXJuIGZ9fX0sZD1mdW5jdGlvbihlLHQpe3ZhciBuLGk9digpLG89cihcIkZDUFwiKSxmPWZ1bmN0aW9uKGUpe1wiZmlyc3QtY29udGVudGZ1bC1wYWludFwiPT09ZS5uYW1lJiYobSYmbS5kaXNjb25uZWN0KCksZS5zdGFydFRpbWU8aS5maXJzdEhpZGRlblRpbWUmJihvLnZhbHVlPWUuc3RhcnRUaW1lLG8uZW50cmllcy5wdXNoKGUpLG4oITApKSl9LHM9d2luZG93LnBlcmZvcm1hbmNlJiZwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lJiZwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKFwiZmlyc3QtY29udGVudGZ1bC1wYWludFwiKVswXSxtPXM/bnVsbDphKFwicGFpbnRcIixmKTsoc3x8bSkmJihuPWMoZSxvLHQpLHMmJmYocyksdSgoZnVuY3Rpb24oaSl7bz1yKFwiRkNQXCIpLG49YyhlLG8sdCkscmVxdWVzdEFuaW1hdGlvbkZyYW1lKChmdW5jdGlvbigpe3JlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtvLnZhbHVlPXBlcmZvcm1hbmNlLm5vdygpLWkudGltZVN0YW1wLG4oITApfSkpfSkpfSkpKX0scD0hMSxsPS0xLGg9ZnVuY3Rpb24oZSx0KXtwfHwoZCgoZnVuY3Rpb24oZSl7bD1lLnZhbHVlfSkpLHA9ITApO3ZhciBuLGk9ZnVuY3Rpb24odCl7bD4tMSYmZSh0KX0sZj1yKFwiQ0xTXCIsMCkscz0wLG09W10sdj1mdW5jdGlvbihlKXtpZighZS5oYWRSZWNlbnRJbnB1dCl7dmFyIHQ9bVswXSxpPW1bbS5sZW5ndGgtMV07cyYmZS5zdGFydFRpbWUtaS5zdGFydFRpbWU8MWUzJiZlLnN0YXJ0VGltZS10LnN0YXJ0VGltZTw1ZTM/KHMrPWUudmFsdWUsbS5wdXNoKGUpKToocz1lLnZhbHVlLG09W2VdKSxzPmYudmFsdWUmJihmLnZhbHVlPXMsZi5lbnRyaWVzPW0sbigpKX19LGg9YShcImxheW91dC1zaGlmdFwiLHYpO2gmJihuPWMoaSxmLHQpLG8oKGZ1bmN0aW9uKCl7aC50YWtlUmVjb3JkcygpLm1hcCh2KSxuKCEwKX0pKSx1KChmdW5jdGlvbigpe3M9MCxsPS0xLGY9cihcIkNMU1wiLDApLG49YyhpLGYsdCl9KSkpfSxUPXtwYXNzaXZlOiEwLGNhcHR1cmU6ITB9LHk9bmV3IERhdGUsZz1mdW5jdGlvbihpLHIpe2V8fChlPXIsdD1pLG49bmV3IERhdGUsdyhyZW1vdmVFdmVudExpc3RlbmVyKSxFKCkpfSxFPWZ1bmN0aW9uKCl7aWYodD49MCYmdDxuLXkpe3ZhciByPXtlbnRyeVR5cGU6XCJmaXJzdC1pbnB1dFwiLG5hbWU6ZS50eXBlLHRhcmdldDplLnRhcmdldCxjYW5jZWxhYmxlOmUuY2FuY2VsYWJsZSxzdGFydFRpbWU6ZS50aW1lU3RhbXAscHJvY2Vzc2luZ1N0YXJ0OmUudGltZVN0YW1wK3R9O2kuZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZShyKX0pKSxpPVtdfX0sUz1mdW5jdGlvbihlKXtpZihlLmNhbmNlbGFibGUpe3ZhciB0PShlLnRpbWVTdGFtcD4xZTEyP25ldyBEYXRlOnBlcmZvcm1hbmNlLm5vdygpKS1lLnRpbWVTdGFtcDtcInBvaW50ZXJkb3duXCI9PWUudHlwZT9mdW5jdGlvbihlLHQpe3ZhciBuPWZ1bmN0aW9uKCl7ZyhlLHQpLHIoKX0saT1mdW5jdGlvbigpe3IoKX0scj1mdW5jdGlvbigpe3JlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIixuLFQpLHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyY2FuY2VsXCIsaSxUKX07YWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLG4sVCksYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJjYW5jZWxcIixpLFQpfSh0LGUpOmcodCxlKX19LHc9ZnVuY3Rpb24oZSl7W1wibW91c2Vkb3duXCIsXCJrZXlkb3duXCIsXCJ0b3VjaHN0YXJ0XCIsXCJwb2ludGVyZG93blwiXS5mb3JFYWNoKChmdW5jdGlvbih0KXtyZXR1cm4gZSh0LFMsVCl9KSl9LEw9ZnVuY3Rpb24obixmKXt2YXIgcyxtPXYoKSxkPXIoXCJGSURcIikscD1mdW5jdGlvbihlKXtlLnN0YXJ0VGltZTxtLmZpcnN0SGlkZGVuVGltZSYmKGQudmFsdWU9ZS5wcm9jZXNzaW5nU3RhcnQtZS5zdGFydFRpbWUsZC5lbnRyaWVzLnB1c2goZSkscyghMCkpfSxsPWEoXCJmaXJzdC1pbnB1dFwiLHApO3M9YyhuLGQsZiksbCYmbygoZnVuY3Rpb24oKXtsLnRha2VSZWNvcmRzKCkubWFwKHApLGwuZGlzY29ubmVjdCgpfSksITApLGwmJnUoKGZ1bmN0aW9uKCl7dmFyIGE7ZD1yKFwiRklEXCIpLHM9YyhuLGQsZiksaT1bXSx0PS0xLGU9bnVsbCx3KGFkZEV2ZW50TGlzdGVuZXIpLGE9cCxpLnB1c2goYSksRSgpfSkpfSxiPXt9LEY9ZnVuY3Rpb24oZSx0KXt2YXIgbixpPXYoKSxmPXIoXCJMQ1BcIikscz1mdW5jdGlvbihlKXt2YXIgdD1lLnN0YXJ0VGltZTt0PGkuZmlyc3RIaWRkZW5UaW1lJiYoZi52YWx1ZT10LGYuZW50cmllcy5wdXNoKGUpLG4oKSl9LG09YShcImxhcmdlc3QtY29udGVudGZ1bC1wYWludFwiLHMpO2lmKG0pe249YyhlLGYsdCk7dmFyIGQ9ZnVuY3Rpb24oKXtiW2YuaWRdfHwobS50YWtlUmVjb3JkcygpLm1hcChzKSxtLmRpc2Nvbm5lY3QoKSxiW2YuaWRdPSEwLG4oITApKX07W1wia2V5ZG93blwiLFwiY2xpY2tcIl0uZm9yRWFjaCgoZnVuY3Rpb24oZSl7YWRkRXZlbnRMaXN0ZW5lcihlLGQse29uY2U6ITAsY2FwdHVyZTohMH0pfSkpLG8oZCwhMCksdSgoZnVuY3Rpb24oaSl7Zj1yKFwiTENQXCIpLG49YyhlLGYsdCkscmVxdWVzdEFuaW1hdGlvbkZyYW1lKChmdW5jdGlvbigpe3JlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtmLnZhbHVlPXBlcmZvcm1hbmNlLm5vdygpLWkudGltZVN0YW1wLGJbZi5pZF09ITAsbighMCl9KSl9KSl9KSl9fSxQPWZ1bmN0aW9uKGUpe3ZhciB0LG49cihcIlRURkJcIik7dD1mdW5jdGlvbigpe3RyeXt2YXIgdD1wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXXx8ZnVuY3Rpb24oKXt2YXIgZT1wZXJmb3JtYW5jZS50aW1pbmcsdD17ZW50cnlUeXBlOlwibmF2aWdhdGlvblwiLHN0YXJ0VGltZTowfTtmb3IodmFyIG4gaW4gZSlcIm5hdmlnYXRpb25TdGFydFwiIT09biYmXCJ0b0pTT05cIiE9PW4mJih0W25dPU1hdGgubWF4KGVbbl0tZS5uYXZpZ2F0aW9uU3RhcnQsMCkpO3JldHVybiB0fSgpO2lmKG4udmFsdWU9bi5kZWx0YT10LnJlc3BvbnNlU3RhcnQsbi52YWx1ZTwwfHxuLnZhbHVlPnBlcmZvcm1hbmNlLm5vdygpKXJldHVybjtuLmVudHJpZXM9W3RdLGUobil9Y2F0Y2goZSl7fX0sXCJjb21wbGV0ZVwiPT09ZG9jdW1lbnQucmVhZHlTdGF0ZT9zZXRUaW1lb3V0KHQsMCk6YWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwoZnVuY3Rpb24oKXtyZXR1cm4gc2V0VGltZW91dCh0LDApfSkpfTtleHBvcnR7aCBhcyBnZXRDTFMsZCBhcyBnZXRGQ1AsTCBhcyBnZXRGSUQsRiBhcyBnZXRMQ1AsUCBhcyBnZXRUVEZCfTtcbiJdLCJuYW1lcyI6WyJlIiwidCIsIm4iLCJpIiwiciIsIm5hbWUiLCJ2YWx1ZSIsImRlbHRhIiwiZW50cmllcyIsImlkIiwiY29uY2F0IiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImEiLCJQZXJmb3JtYW5jZU9ic2VydmVyIiwic3VwcG9ydGVkRW50cnlUeXBlcyIsImluY2x1ZGVzIiwic2VsZiIsImdldEVudHJpZXMiLCJtYXAiLCJvYnNlcnZlIiwidHlwZSIsImJ1ZmZlcmVkIiwibyIsImRvY3VtZW50IiwidmlzaWJpbGl0eVN0YXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1IiwicGVyc2lzdGVkIiwiYyIsImYiLCJzIiwibSIsInRpbWVTdGFtcCIsInYiLCJzZXRUaW1lb3V0IiwiZmlyc3RIaWRkZW5UaW1lIiwiZCIsImRpc2Nvbm5lY3QiLCJzdGFydFRpbWUiLCJwdXNoIiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJnZXRFbnRyaWVzQnlOYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicCIsImwiLCJoIiwiaGFkUmVjZW50SW5wdXQiLCJsZW5ndGgiLCJ0YWtlUmVjb3JkcyIsIlQiLCJwYXNzaXZlIiwiY2FwdHVyZSIsInkiLCJnIiwidyIsIkUiLCJlbnRyeVR5cGUiLCJ0YXJnZXQiLCJjYW5jZWxhYmxlIiwicHJvY2Vzc2luZ1N0YXJ0IiwiZm9yRWFjaCIsIlMiLCJMIiwiYiIsIkYiLCJvbmNlIiwiUCIsImdldEVudHJpZXNCeVR5cGUiLCJ0aW1pbmciLCJtYXgiLCJuYXZpZ2F0aW9uU3RhcnQiLCJyZXNwb25zZVN0YXJ0IiwicmVhZHlTdGF0ZSIsImdldENMUyIsImdldEZDUCIsImdldEZJRCIsImdldExDUCIsImdldFRURkIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/web-vitals/dist/web-vitals.js\n");

/***/ })

};
;