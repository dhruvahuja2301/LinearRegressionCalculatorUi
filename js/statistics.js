var isDebug = !0;
isDebug && window.console && console.log && console.warn && console.error ? window.debug = {
    log: window.console.log,
    warn: window.console.warn,
    error: window.console.error
} : window.debug = {
    log: function () { },
    warn: function () { },
    error: function () { }
};
var table_class = "table table-bordered table-sm bg-light-white overflow_bw",
    ODistribution = [{
        type: "Normal",
        discrete: !1,
        statisticName: "Z",
        min: -4,
        max: 4,
        minc: -30,
        maxc: 30,
        maxX: 0,
        symmetrical: 1,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "Normal2",
        discrete: !1,
        statisticName: "Z",
        min: -4,
        max: 4,
        minc: -30,
        maxc: 30,
        maxX: 0,
        symmetrical: 1,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "T",
        discrete: !1,
        statisticName: "T",
        min: -4,
        max: 4,
        minc: -30,
        maxc: 30,
        maxX: 0,
        symmetrical: 1,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "F",
        discrete: !1,
        statisticName: "F",
        min: 0,
        max: 6,
        minc: 0,
        maxc: 1500,
        maxX: 0,
        symmetrical: 0,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "NChi-Square",
        discrete: !1,
        statisticName: "Nχ²",
        min: 0,
        max: 500,
        minc: 0,
        maxc: 1e4,
        maxX: 0,
        symmetrical: 0,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "Chi-Square",
        discrete: !1,
        statisticName: "χ²",
        min: 0,
        max: 500,
        minc: 0,
        maxc: 1e4,
        maxX: 0,
        symmetrical: 0,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "U",
        discrete: !1,
        statisticName: "Z",
        min: 0,
        max: 500,
        minc: 0,
        maxc: 1e4,
        maxX: 0,
        symmetrical: 1,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "Wilcoxon Signed",
        discrete: !1,
        statisticName: "Z",
        left: "0",
        min: 0,
        max: 500,
        minc: 0,
        maxc: 1e4,
        maxX: 0,
        symmetrical: 1,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "binomial",
        discrete: !0,
        statisticName: "X",
        min: 0,
        max: 500,
        minc: 0,
        maxc: 1e4,
        maxX: 0,
        symmetrical: 0,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "poisson",
        discrete: !0,
        statisticName: "Pois",
        min: 0,
        max: 500,
        minc: 0,
        maxc: 1e4,
        maxX: 0,
        symmetrical: 0,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "spr",
        discrete: !1,
        statisticName: "spr",
        min: 0,
        max: 1,
        minc: -30,
        maxc: 30,
        maxX: 0,
        symmetrical: 0,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "weibull",
        discrete: !1,
        statisticName: "W",
        min: 0,
        max: 500,
        minc: 0,
        maxc: 1e4,
        maxX: 0,
        symmetrical: 0,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "kolmogorov",
        discrete: !1,
        statisticName: "D",
        min: 0,
        max: .7,
        minc: 0,
        maxc: 1e4,
        maxX: 0,
        symmetrical: 0,
        xWidth: function () {
            return this.max - this.min
        }
    }, {
        type: "lilliefors",
        discrete: !1,
        statisticName: "D",
        min: 0,
        max: .7,
        minc: 0,
        maxc: 1e4,
        maxX: 0,
        symmetrical: 0,
        xWidth: function () {
            return this.max - this.min
        }
    }];

function distribution_param(e) {
    var t = findO(ODistribution, "type", e);
    return ODistribution[t]
}

function FtoZ(e, t, r) {
    return (Math.pow((2 * r + t * e / 3 + t - 2) * e / (2 * r + 4 * t * e / 3), 1 / 3) - (1 - 2 / (9 * t))) / Math.sqrt(2 / (9 * t))
}

function binomial_approx(e, t, r) {
    var n = t * r,
        o = Math.sqrt(t * r * (1 - r)),
        a = "Uses the  <b>normal approximation</b> (&mu;= " + xround(n, 3) + ", &sigma;= " + xround(o, 3) + ") or combination of normal and binomial";
    return use_normal = document.getElementById("normal"), use_normal && (use_normal.innerHTML = a), jStat.normal.cdf(e, n, o)
}

function poisson_approx(e, t) {
    var r = t,
        n = Math.sqrt(t),
        o = "Uses the  <b>normal approximation</b> (&mu;= " + xround(r, 3) + ", &sigma;= " + xround(n, 3) + ") or combination of normal and binomial";
    return use_normal = document.getElementById("normal"), use_normal && (use_normal.innerHTML = o), jStat.normal.cdf(e, r, n)
}

function f_approx(e, t) {
    var r = t,
        n = (Math.pow((2 * r.df2 + r.df1 * e / 3 + r.df1 - 2) * e / (2 * r.df2 + 4 * r.df1 * e / 3), 1 / 3) - (1 - 2 / (9 * r.df1))) / Math.sqrt(2 / (9 * r.df1));
    return jStat.normal.cdf(n, 0, 1)
}

function inv_f_approx(e, t) {
    var r = t,
        n = 2 / (9 * r.df1),
        o = jStat.normal.inv(e, 0, 1),
        a = Math.pow(o * Math.sqrt(n) + 1 - n, 3),
        i = r.df1 / 3,
        l = 2 * r.df2 + r.df1 - 2 - 4 * a * r.df1 / 3,
        s = -2 * r.df2 * a;
    return (-l + Math.sqrt(Math.pow(l, 2) - 4 * i * s)) / (2 * i)
}

function ncchi_distribution_d(e, t, r) {
    return (ncchi_distribution(e + 1e-6, t, r) - ncchi_distribution(e, t, r)) / 1e-6
}
var pdf_calc = dist_density;

function dist_density(e, t, r) {
    return (Distribution(e, t + 1e-6, r) - Distribution(e, t, r)) / 1e-6
}

function ncf_distribution(e, t, r, n) {
    for (var o, a = n / 2, i = t / 2, l = r / 2, s = 0, u = t * e / (t * e + r), c = Math.exp(-a), d = 1e-7 * c, f = 0;
        (f < 3 || d < o) && f < 20; f++) s += o = Math.pow(a, f) * jStat.beta.cdf(u, i + f, l) / factorial(f);
    return s *= c
}

function GenFunction(e, t, r) {
    return pdf(e, t, r)
}

function pdf(e, t, r) {
    var n = r;
    t = Number(t);
    var o = 0;
    if ("Normal" == e) o = jStat.normal.pdf(t, n.mean, n.std);
    else if ("T" == e) o = jStat.studentt.pdf(t, n.df);
    else if ("NCT" == e) o = jStat.noncentralt.pdf(t, n.df, n.ncp);
    else if ("F" == e) t <= 0 ? o = 0 : (o = jStat.centralF.pdf(t, n.df1, n.df2)) || (o = jStat.normal.pdf(FtoZ(t, n.df1, n.df2), 0, 1));
    else if ("NChi-Square" == e) o = ncchi_distribution_d(t, n.df, n.ncp);
    else if ("Chi-Square" == e) t <= 0 ? o = 0 : (o = jStat.chisquare.pdf(t, n.df)) || (o = jStat.normal.pdf(t, n.df, Math.sqrt(2 * n.df)));
    else if ("weibull" == e) o = jStat.weibull.pdf(t, n.scale, n.shape);
    else if ("exponential" == e) o = jStat.exponential.pdf(t, n.rate);
    else if ("beta" == e) o = jStat.weibull.pdf(t, n.alpha, n.beta);
    else if ("binomial" == e || "poisson" == e) {
        if ("binomial" == e ? o = t < 0 || t > n.n ? 0 : jStat.binomial.pdf(t, n.n, n.p) : "poisson" == e ? o = jStat.poisson.pdf(t, n.lambda) : debug.error("please enter the correct distribution type, you enter: " + e), isNaN(o) || o == 1 / 0)
            if ("binomial" == e) o = binomial_approx(t, n.n, n.p);
            else if ("poisson" == e) return poisson_approx(t, n.lambda) - poisson_approx(t, n.lambda)
    } else {
        if ("spr" == e) return dist_density("spr", t, n);
        if ("kolmogorov" == e) return dist_density("kolmogorov", t, r);
        if ("lilliefors" == e) return dist_density("lilliefors", t, r);
        console.error("Error: you enterd type:" + e + ' please insert type ("Normal" or "T" or etc)')
    }
    return o
}

function factorial(e) {
    for (var t = 1, r = 1; r <= e; r++) t *= r;
    return t
}

function ncchi_distribution(e, t, r) {
    for (var n = 0, o = 0, a = 0;
        (a < 3 || 1e-7 < o) && a < 20; a++) n += o = jStat.chisquare.cdf(e, t + 2 * a) * Math.pow(r / 2, a) / factorial(a);
    return n = Math.exp(-r / 2) * n
}

function Distribution(e, t, r) {
    if (t == -1 / 0) return 0;
    if (t == 1 / 0) return 1;
    var n, o, a = r;
    return "Normal" == e ? jStat.normal.cdf(t, a.mean, a.std) : "T" == e ? jStat.studentt.cdf(t, a.df) : "Chi-Square" == e ? jStat.chisquare.cdf(t, a.df) : "F" == e ? ((n = jStat.centralF.cdf(t, a.df1, a.df2)) || (n = f_approx(t, r)), n) : "weibull" == e ? jStat.weibull.cdf(t, a.scale, a.shape) : "exponential" == e ? jStat.exponential.cdf(t, a.rate) : "beta" == e ? jStat.beta.cdf(t, a.alpha, a.beta) : "spr" == e ? 1 - f_spr(t, a.n, !0) : "binomial" == e ? (!(n = t < 0 ? 0 : jStat.binomial.cdf(t, a.n, a.p)) && 0 != n || n == 1 / 0 ? n = binomial_approx(t, r) : (o = document.getElementById("normal")) && (o.innerHTML = "Uses the <b>binomial distribution</b>"), n) : "poisson" == e ? t < 0 ? 0 : ((n = jStat.poisson.cdf(t, a.lambda)) && n != 1 / 0 ? (o = document.getElementById("normal")) && (o.innerHTML = "Uses the <b>poisson distribution</b>") : n = poisson_approx(t, a.lambda), n) : "NChi-Square" == e ? ncchi_distribution(t, a.df, a.ncp) : "kolmogorov" == e ? ks_distribution(t, r) : "lilliefors" == e ? lili_distribution(t, r) : void 0
}

function InvDistribution(e, t, r) {
    var n, o = r,
        a = 0,
        i = 0;
    if ("Normal" == e) return jStat.normal.inv(t, o.mean, o.std);
    if ("T" == e) return jStat.studentt.inv(t, o.df);
    if ("Chi-Square" == e) return jStat.chisquare.inv(t, o.df);
    if ("F" == e) return (n = jStat.centralF.inv(t, o.df1, o.df2)) || (n = inv_f_approx(t, r)), n;
    if ("weibull" == e) return jStat.weibull.inv(t, o.scale, o.shape);
    if ("exponential" == e) return jStat.exponential.inv(t, o.rate);
    if ("beta" == e) return jStat.beta.inv(t, o.alpha, o.beta);
    if ("spr" == e) return inv_f_spr(1 - t, o.n);
    if ("binomial" != e && "poisson" != e) return "kolmogorov" == e ? inv_distribution(t, r, {
        fun: ks_distribution
    }, 0, 1) : "lilliefors" == e ? inv_distribution(t, r, {
        fun: lili_distribution
    }, 0, 1) : void debug.error("Distribution type: " + e + " doesn't exist.");
    for (; i < t;) i += pdf(e, a, r), a += 1;
    return a - 1
}

function inv_distribution(e, t, r, n, o, a) {
    var i = 1;
    for (1e-8; 1e-8 < i;) {
        i = o - n;
        var l = (n + o) / 2;
        if (p1 = r.fun(l, t), p1 == e) return l;
        p1 < e ? n = l : o = l
    }
    var s = -log10(1e-8) - 1;
    return 1 * xrd(l, s)
}

function regression_power(e, t, r, n, o, a) {
    return void 0 === a && (a = 4), void 0 === o && (o = !1), f_power2(e, t, e - t - (o ? 0 : 1), r, n, a)
}

function anova_power(e, t, r, n, o, a, i, l, s, u) {
    var c, d, f, h, m, p, b, _;
    return 0 == r || "" == r || void 0 === r ? f_power2(e, t - 1, h = e - t, n, o, u) : (l && (_ = e / (t * r)), s ? (d = e - t * r, f = (t - 1) * (r - 1)) : (d = e - t - r + 1, i = a = !0), m = f_power2(e, t - 1, h = l ? t * (_ - 1) : a ? d : f, n, o, u), p = f_power2(e, r - 1, h = l ? e - t * _ - (r - 1) - (t - 1) * (r - 1) : i ? d : f, n, o, u), c = Math.min(m.power, p.power), s ? (l || (h = d), b = f_power2(e, f, h, n, o, u), c = Math.min(c, b.power)) : b = "", {
        power: c,
        factor_a: m,
        factor_b: p,
        factor_ab: b
    })
}

function f_power2(e, t, r, n, o, a) {
    var i, l, s = n * e;
    l = e < t + 2 ? 0 : (i = jStat.centralF.inv(1 - o, t, r), 1 - ncf_distribution(val = i, t, r, s));
    var u = "H<sub>0</sub> assumes the statistic's distribution is: F(" + t + ", " + r + ").<br>";
    return u += "H<sub>1</sub> assumes the statistic's distribution is: Non Central F(" + t + ", " + r + ", " + xround(s, 3) + ").<br>", {
        power: l,
        ncp: s,
        parameters: {
            df1: t,
            df2: r
        },
        cval: i,
        message: u += "The critical value based on the null hypothesis: " + xround(i, a) + ".<br>"
    }
}

function regression_power_old(e, t, r, n, o, a, i) {
    void 0 === a && (a = !1), void 0 === i && (i = 0);
    var l, s, u, c, d, f = r * e;
    d = a ? 0 : 1, c = "anova" == o ? (u = t - 1, 0 == i ? e - t : e - t * i) : e - (u = t) - d, s = e < t + 2 ? 0 : (l = jStat.centralF.inv(1 - n, u, c), 1 - ncf_distribution(val = l, u, c, f));
    var h = "H<sub>0</sub> assumes the statistic's distribution is: F(" + u + ", " + c + ").<br>";
    return h += "H<sub>1</sub> assumes the statistic's distribution is: Non Central F(" + u + ", " + c + ", " + xround(f, 3) + ").<br>", {
        power: s,
        ncp: f,
        parameters: {
            df1: u,
            df2: c
        },
        cval: l,
        message: h += "The critical value based on the null hypothesis: " + xround(l, 4) + ".<br>"
    }
}

function cor_power_(e, t, r, n, o) {
    atanh = Math.atanh, pow = Math.pow, sqrt = Math.sqrt;
    var a, i, l = r - 2;
    "2" == o && (e = Math.abs(e));
    var s = (atanh(e) + e / (2 * (r - 1)) - atanh(t)) * sqrt(r - 3);
    return "3" == o || "1" == o ? (i = jStat.studentt.inv(1 - n, l), i = Math.sqrt(pow(i, 2) / (pow(i, 2) + r - 2)), zrc = atanh(i), a = jStat.normal.cdf(zr - zr0 - zrc, 0, 1) * sqrt(r - 3)) : "2" == o && (i = jStat.studentt.inv(1 - n / 2, l), a = jStat.normal.cdf(s - i, 0, 1) + jStat.normal.cdf(-s - i, 0, 1)), a
}

function cor_power(e, t, r, n, o) {
    var a, i = r - 2;
    "2" == o ? e = Math.abs(e) : "1" == o && (e = -e);
    var l = atanh(e) + e / (2 * (r - 1)),
        s = atanh(t),
        u = sqrt(r - 3);
    return "3" == o || "1" == o ? (CVal = jStat.studentt.inv(1 - n, i), CVal = Math.sqrt(pow(CVal, 2) / (pow(CVal, 2) + r - 2)), zrc = atanh(CVal), a = jStat.normal.cdf((l - s - zrc) * u, 0, 1)) : "2" == o && (CVal = jStat.studentt.inv(n / 2, i), CVal = sqrt(pow(CVal, 2) / (pow(CVal, 2) + r - 2)), zrc = atanh(CVal), a = jStat.normal.cdf((l - s - zrc) * u, 0, 1) + jStat.normal.cdf((-l + s - zrc) * u, 0, 1)), {
        power: a,
        cval: CVal
    }
}

function f_power(e, t, r, n, o, a) {
    var i, l, s = 0,
        u = 0;
    void 0 === a && (a = 6);
    "3" == o ? (u = jStat.centralF.inv(1 - e, t - 1, r - 1), l = 1 - jStat.centralF.cdf(u / n, t - 1, r - 1), i = "the critical value is: <b>" + xround(u, a) + "</b>") : "1" == o ? (s = jStat.centralF.inv(e, t - 1, r - 1), 1 - (l = jStat.centralF.cdf(s / n, t - 1, r - 1)), i = "the critical value is: <b>" + xround(s, a) + "</b>") : "2" == o && (s = jStat.centralF.inv(e / 2, t - 1, r - 1), u = jStat.centralF.inv(1 - e / 2, t - 1, r - 1), l = 1 - jStat.centralF.cdf(u / n, t - 1, r - 1) + jStat.centralF.cdf(s / n, t - 1, r - 1), i = "The critical values are: <b>" + xround(s, a) + ", " + xround(u, a) + "</b>");
    var c = document.getElementById("message12");
    if (null != c) {
        draw_power_distribution("power_chart", s, u, 0, "F", t - 1, r - 1, o, n);
        var d = "H<sub>0</sub> assumes the statistic distributes F(X," + (t - 1) + "," + (r - 1) + ")<br>";
        d += "H<sub>1</sub> assumes the statistic distributes F(X/" + xround(n, a) + "," + (t - 1) + "," + (r - 1) + ")<br>", d += i + ", based on the null hypothesis.<br>", c.innerHTML = d
    }
    return l
}

function z_power(e, t, r, n, o, a, i, l, s, u) {
    void 0 === u && (u = 6);
    var c, d, f, h = 0,
        m = 0;
    "one.sample" == s ? (f = t, 0 == n && (n = o / a)) : "two.sample" == s ? (f = t * r * (Math.pow(a, 2) + Math.pow(i, 2)) / (2 * r * Math.pow(a, 2) + 2 * t * Math.pow(i, 2)), 0 == n && (n = o / Math.sqrt((Math.pow(a, 2) + Math.pow(i, 2)) / 2))) : debug.error('sample should be one of the following: "one.sample" , "two.sample" not:' + s), "3" == l ? (d = 1 - normal_distribution((m = inv_normal_distribution(1 - e)) - Math.sqrt(f) * Math.abs(n)), c = "the critical value is: " + xround(m, u)) : "1" == l ? (1 - (d = normal_distribution((h = inv_normal_distribution(e)) + Math.sqrt(f) * Math.abs(n))), c = "The critical value is: " + xround(h, u)) : "2" == l && (h = inv_normal_distribution(e / 2), d = 1 - normal_distribution((m = inv_normal_distribution(1 - e / 2)) - Math.sqrt(f) * n) + normal_distribution(h - Math.sqrt(f) * n), c = "The critical values are: " + xround(h, u) + ", " + xround(m, u)), ncp = n * Math.sqrt(f);
    var p = document.getElementById("message12");
    if (null != p) {
        draw_power_distribution("power_chart", h, m, 0, "Normal", 1, 1, l, ncp);
        var b = "H<sub>1</sub> assumes the statistic distributes shifted normal distribution.<br>";
        b += c + ", based on standard normal distribution.<br>", b += "Cohen's  effect size is: d=" + xround(n, u) + ".<br>", b += "The standard distribution shift is: " + xround(ncp, u) + ".<br>", p.innerHTML = b
    }
    return d
}

function t_power(e, t, r, n, o, a, i, l, s, u, c, d) {
    var f, h, m, p, b;
    void 0 === c && (c = 0), void 0 === d && (d = 6);
    var _, g, v = 0,
        w = 0;
    "two.sample" == s ? "equal" == u ? (0 == n ? h = (f = Math.sqrt(((1 * t - 1) * Math.pow(a, 2) + (1 * r - 1) * Math.pow(i, 2)) / (1 * t + 1 * r - 2))) * Math.sqrt(1 / t + 1 / r) : p = n * Math.sqrt(1 / (1 / (1 * t) + 1 / (1 * r))), m = t + r - 2) : "unequal" == u ? (f = Math.sqrt((Math.pow(a, 2) + Math.pow(i, 2)) / 2), h = Math.sqrt(Math.pow(a, 2) / t + Math.pow(i, 2) / r), 0 != n && (p = n * f / h), m = Math.pow(Math.pow(a, 2) / t + Math.pow(i, 2) / r, 2) / (Math.pow(a, 4) / (Math.pow(t, 2) * (t - 1)) + Math.pow(i, 4) / (Math.pow(r, 2) * (r - 1)))) : debug.error("type must be 'equal' or 'unequal' ") : "one.sample" == s ? (b = 1 * t, f = a, m = t - 1 - c, 0 == n ? h = a / Math.sqrt(b) : p = n * Math.sqrt(b)) : debug.error('sample should be one of the following: "one.sample" , "two.sample" not:' + s), 0 == n && (p = o / h, n = o / f), "3" == l ? (w = InvDistribution("T", 1 - e, {
        df: m
    }), g = 1 - jStat.noncentralt.cdf(w, m, p), _ = "the critical value is: " + xround(w, d)) : "1" == l ? (v = -InvDistribution("T", 1 - e, {
        df: m
    }), g = 1 - (1 - jStat.noncentralt.cdf(v, m, p)), _ = "The critical value is: " + xround(v, d)) : "2" == l && (t *= 1, v = InvDistribution("T", e / 2, {
        df: m
    }), w = InvDistribution("T", 1 - e / 2, {
        df: m
    }), g = 1 - (jStat.noncentralt.cdf(w, m, p) - jStat.noncentralt.cdf(v, m, p)), _ = "The critical values are: <b>" + xround(v, d) + ", " + xround(w, d) + "</b>");
    var y = document.getElementById("message12");
    if (null != y) {
        var x = "H<sub>0</sub> assumes the statistic distribute <b>T(" + xround(m, d) + ")</b>.<br>";
        x += "H<sub>1</sub> assumes the statistic distribute <b>Noncentral-T(" + xround(m, d) + "," + xround(p, d) + ")</b>.<br>", x += "The Noncentral T is not symmetric as the T distribution.<br>", x += _ + ", null hypothesis.<br>", x += "The Cohen's effect size is: <b>d = " + xround(n, d) + "</b><br>", x += "The noncentrality parameter is: <b>ncp = " + xround(p, d) + "</b><br>", y.innerHTML = x
    }
    return g
}

function pairwiseprobabilities(e) {
    for (var t = [], r = 0; r < e.length; r++) {
        for (var n = [], o = 0; o < e.length; o++) n.push(jStat.normal.cdf(e[o] - e[r], 0, Math.sqrt(2)));
        t.push(n)
    }
    return t
}

function array_flatten(e) {
    for (var t = [], r = 0; r < e.length; r++)
        for (var n = 0; n < e[r].length; n++) t.push(e[r][n]);
    return t
}

function show_array(e, t, r) {
    for (var n = "", o = 0; o < e.length; o++) o < t || o >= e.length - t ? (n += e[o], o < e.length - 1 && (n += r)) : o == t && (n += "...+");
    return n
}

function check_r_package(e) {
    return 'if(!"' + e + '" %in% installed.packages()){install.packages("' + e + '")}<br>library(' + e + ")<br>"
}

function r_array(e, t, r, n, o) {
    void 0 === n && (n = !1), void 0 === o && (o = "list");
    for (var a, i = "", l = e + "=" + (l = "list" == o ? "list" : "cbind") + "(", s = r.length, u = 0; u < s; u++) i += r_vector2(a = t + (u + 1), r[u]) + "<br>", l += a, u < s - 1 && (l += ",");
    return i += l + ")"
}

function r_list(e, t) {
    var r, n, o = "",
        a = "";
    for (r = 0; r < t.length; r++) o += r_vector2(n = "x" + r, t[r]) + "<br>", a += n, r < t.length - 1 && (a += ",");
    return o += e + " <- list(" + a + ")<br>"
}

function r_data_frame(e, t) {
    var r, n, o, a = "",
        i = "";
    for (r = 0; r < t.length; r++) a += r_vector2(n = (o = t[r]).shift(), o) + "<br>", i += n, r < t.length - 1 && (i += ",");
    return a += e + " <- data.frame(" + i + ")<br>"
}

function join2(e) {
    for (var t = "", r = 0; r < e.length; r++) 0 < r && (t += ","), checkVal(e[r]) ? t += e[r] : t += '"' + e[r] + '"';
    return t
}

function r_c(e, t, r) {
    void 0 === r && (r = !1);
    var n = "",
        o = "";
    return r && (n = "scale(", o = ")"), e + " = " + n + "c(" + join2(t) + ")" + o
}

function r_vector2(e, t, r) {
    void 0 === r && (r = !1);
    var n, o = 0,
        a = [];
    if (t.length <= 300) vec1 = r_c(e, t, r);
    else {
        for (vec1 = "", n = Math.ceil(t.length) / 300, o = 0; o < n; o++) sub_vector = t.slice(300 * o, 300 * (o + 1)), vec1 += r_c(e + o, sub_vector) + "<br>", a.push(e + o);
        vec1 += r_c(e, a, r).replaceAll('"', "")
    }
    return vec1
}

function r_alternative(e) {
    return 1 == e ? "less" : 2 == e ? "two.sided" : 3 == e ? "greater" : void 0
}

function r_alternative2(e) {
    return 1 == e || 3 == e ? "one.sided" : 2 == e ? "two.sided" : void 0
}

function r_alternative3(e) {
    return 1 == e || 3 == e ? "one.tail" : 2 == e ? "two.tail" : void 0
}

function in_list(e, t, r) {
    return in_array(e, t.split(","), r)
}

function equal_array(e, t) {
    if (e.length != t.length || Array.isArray(e) != Array.isArray(t)) return !1;
    var r, n = !Array.isArray(e[0]);
    for (r = 0; r < e.length; r++)
        if (n) {
            if (e[r] != t[r]) return !1
        } else if (!equal_array(e[r], t[r])) return !1;
    return !0
}

function in_array2d(e, t) {
    e.length;
    for (var r = 0; r < t.length; r++)
        if (equal_array(e, t[r])) return r;
    return -1
}

function in_array(e, t, r) {
    for (var n = 0; n < t.length; n++)
        if (r && e == t[n] || !r && -1 != t[n].indexOf(e)) return !0;
    return !1
}

function transposeArray(e, t) {
    var r, n, o, a = [];
    if (Array.isArray(e[0])) {
        for (n = e[0].length, r = 1; r < e.length; r++) n = Math.max(e[r].length, n);
        for (r = 0; r < n; r++) a.push([]);
        for (r = 0; r < n; r++)
            for (var i = 0; i < e.length; i++) o = void 0 !== e[i][r] ? e[i][r] : t, a[r].push(o)
    } else
        for (r = 0; r < e.length; r++) a.push([e[r]]);
    return a
}

function rerun_function(e, t) {
    0 < get_variable(e).length && t()
}

function cell_color(e, t) {
    x = document.getElementById(e), x.classList.remove("red_back", "yellow_back", "green_back1", "green_back2"), 1 * x.value < t ? add_class(e, "red_back") : 1 * x.value < 2 * t ? add_class(e, "yellow_back") : 1 * x.value < 4 * t ? add_class(e, "green_back1") : add_class(e, "green_back2")
}

function add_class(e, t) {
    element = document.getElementById(e), -1 == element.className.split(" ").indexOf(t) && (element.className += " " + t)
}

function span_class(e, t) {
    return "<span class='" + t + "'>" + e + "</span>"
}

function span_color(e, t) {
    return 1 * e < t ? "<span class='red1'>" + e + "</span>" : 1 * e < 2 * t ? "<span class='yellow1'>" + e + "</span>" : "<span class='green1'>" + e + "</span>"
}

function div_backcolor(e, t) {
    return 1 * e < t ? "<div class='red_back'>" + e + "</div>" : 1 * e < 2 * t ? "<div class='yellow_back'>" + e + "</div>" : 1 * e < 4 * t ? "<div class='green_back1'>" + e + "</div>" : "<div class='green_back2'>" + e + "</div>"
}

function outliers_tukey(e, t, r) {
    var n, o = "",
        a = 0,
        i = calculate_fence(e, t);
    for (n = 0; n < e.length; n++)(e[n] > i.upper || e[n] < i.lower) && (a++, 0 == o.length ? o += e[n] : o += ", " + e[n], "true" != r && 1 != r || (e.splice(n, 1), n--));
    return {
        outliers: o,
        outlier_count: a,
        n: e.length
    }
}

function calculate_fence(e, t) {
    var r, n, o, a, i, l = copy_2d_array(e);
    for (void 0 === t && (t = 1.5), i = 0; i < l.length; i++) checkVal(l[i]) || (l.splice(i, 1), i--);
    var s = (l = l.sort(function (e, t) {
        return e - t
    })).length,
        u = (o = odd(s) ? (n = l[(s + 1) / 2 - 1], odd((s + 1) / 2) ? (r = 1 * l[(s + 3) / 4 - 1], 1 * l[(3 * s + 1) / 4 - 1]) : (r = (1 * l[(a = (s + 1) / 4) - 1] + 1 * l[a]) / 2, (1 * l[(i = (3 * s - 1) / 4) - 1] + 1 * l[i]) / 2)) : (n = (1 * l[s / 2 - 1] + 1 * l[s / 2]) / 2, odd(s / 2) ? (r = 1 * l[(s + 2) / 4 - 1], 1 * l[(3 * s + 2) / 4 - 1]) : (r = (1 * l[(a = s / 4) - 1] + 1 * l[a]) / 2, (1 * l[(i = 3 * s / 4) - 1] + 1 * l[i]) / 2))) - r;
    return {
        lower: r - t * u,
        upper: o + t * u,
        Q1: r,
        Q3: o,
        median: n
    }
}
atanh = Math.atanh, tanh = Math.tanh, pow = Math.pow, sqrt = Math.sqrt, exp = Math.exp;
var pow = Math.pow,
    sqrt = Math.sqrt;

function get_sample_parametres(e, t) {
    var r, n = measures(e);
    return "Normal" == t ? r = {
        mean: n.average,
        std: n.s
    } : "exponential" == t && (r = {
        rate: 1 / n.average
    }), r
}

function ks_statistic(e, t, r) {
    var n, o, a, i, l, s, u, c, d, f, h, m = copy_sort(e),
        p = measures(m),
        b = p.n,
        _ = 0,
        g = 0,
        v = [];
    "" == r ? (r = get_sample_parametres(e, t), "Normal" == t ? (f = "'pnorm',mean=mean(x),sd=sd(x)", h = "mean=mean(x),sd=sd(x)") : "exponential" == t && (f = "'pexp',rate=1/mean(x)", h = "rate=1/mean(x)")) : "Normal" == t ? (f = "'pnorm',mean=" + r.mean + ",sd=" + r.std, h = "mean=" + r.mean + ",sd=" + r.std) : "exponential" == t && (f = "'pexp',rate=" + r.rate, h = "rate=" + r.rate);
    var w = [
        ["i", "x", b_tooltip("F<sub>E,i-1</sub> = (i-1)/n", "Empirical cumulative distribution function (CDF)"), b_tooltip("F<sub>E,i</sub> = i/n", "Empirical cumulative distribution function"), b_tooltip("F<sub>M</sub>", "Model cumulative distribution function, using the expected distribution: "), b_tooltip("D<sup>+</sup>", "F<sub>E,i</sub> - F<sub>M</sub>"), b_tooltip("D<sup>-</sup>", "F<sub>M</sub> - F<sub>E,i-1</sub>")]
    ],
        y = [
            ["x", "Model", "Empirical"]
        ],
        x = [
            ["x", ".", "D-", "D+", "D"]
        ],
        k = [
            ["i", "F<sub>E,i-1</sub>", "F<sub>E,i</sub>", "F<sub>M</sub>", "D<sup>+</sup>", "D<sup>-</sup>"]
        ];
    for (n = 0; n < m.length; n++) {
        a = n / b, i = (n + 1) / b, (d = (l = Distribution(t, m[n], r)) - a) < (c = i - l) ? (s = a, v.push(c)) : (s = i, v.push(d)), _ = Math.max(_, c), g = Math.max(g, d), w.push([n + 1, m[n], xrd(a, 6), xrd(i, 6), xrd(l, 6), xrd(c, 6), xrd(d, 6)]), y.push([m[n], l, s]), s < l ? x.push(["i" + (n + 1), s, l - s, 0, 0]) : x.push(["i" + (n + 1), l, 0, s - l, 0]), o = n + 1;
        var M = JSON.parse(JSON.stringify(r));
        for (var S in M) M[S] = xrd(M[S], 3);
        var E = "...";
        F0 = "F<sub>E," + (o - 1) + "</sub> = (" + o + " - 1)/n =" + xrd(a, 6), F1 = "F<sub>E," + o + "</sub> = " + o + "/n =" + xrd(i, 6), FM = "F<sub>M</sub>(" + m[n] + ") = F(" + t + "," + m[n] + "," + show_parameters(M) + ") = " + xrd(l, 6), D1 = "D<sup>+</sup> = F<sub>E," + o + "</sub> - F<sub>M</sub> = " + xrd(c, 6), D0 = "D<sup>-</sup> = F<sub>M</sub> - F<sub>E," + (o - 1) + "</sub> = " + xrd(d, 6), n <= 10 || b - 10 < n ? k.push([n, F0, F1, FM, D1, D0]) : 11 == n && k.push([E, E, E, E, E, E])
    }
    w.push(["", "", "", "", "<b>Max:</b>", hbold(xrd(_, 6)), hbold(xrd(g, 6))]), u = Math.max(_, g);
    var F = xrd(u, 6);
    for (n = 1; n <= m.length; n++) w[n][5] == F && (w[n][5] = span_class(hbold(w[n][5]), "green1")), w[n][6] == F && (w[n][6] = span_class(hbold(w[n][6]), "green1"));
    var T = [];
    for (n = 0; n < v.length; n++) v[n] == u && (T.push(m[n]), x[n + 1][3] > x[n + 1][2] ? (x[n + 1][4] = x[n + 1][3], x[n + 1][3] = 0) : (x[n + 1][4] = x[n + 1][2], x[n + 1][2] = 0));
    return {
        D: u,
        Dp: _,
        Dm: g,
        table: w,
        chart: y,
        chart2: x,
        ticks: T,
        ms: p,
        r_dist: f,
        r_list: h,
        steps: k
    }
}

function copy_sort(e) {
    var t = copy_2d_array(e);
    return clean_array(t = t.sort(function (e, t) {
        return e - t
    }), !0), t
}

function sw_test(e, t) {
    var r = copy_2d_array(e);
    r = r.sort(function (e, t) {
        return e - t
    });
    for (var n = 0; n < r.length && Number(r[n]) <= 0; n++) 0 == r[n].length && (r.splice(n, 1), n--);
    var o = measures(r),
        a = o.ss,
        i = o.n;
    if (i <= 5e3) {
        var l = 0,
            s = Math.round(i / 2 - .1),
            u = SW_a(i);
        for (n = 0; n < s; n++) {
            l += (r[i - n - 1] - r[n]) * u[n]
        }
        var c = Math.pow(l, 2) / a,
            d = .0038915 * Math.pow(Math.log(i), 3) - .083751 * Math.pow(Math.log(i), 2) - .31082 * Math.log(i) - 1.5861,
            f = Math.exp(.0030302 * Math.pow(Math.log(i), 2) - .082676 * Math.log(i) - .4803),
            h = (Math.log(1 - c) - d) / f,
            m = 1 - jStat.normal.cdf(h, 0, 1),
            p = inv_normal_distribution(1 - t);
        return {
            w: c,
            b: l,
            statistic: h,
            pvalue: m,
            cval1: -1 / 0,
            cval2: p,
            range1: 1 - Math.exp(f * p + d),
            range2: 1,
            n: r.length,
            ms: o
        }
    }
}

function SW_a(e) {
    return e <= 50 ? SW_a1(e) : e <= 5e3 ? SW_a2(e) : void alert("maximum 5000 values")
}

function SW_a1(e) {
    return [
        [.7071],
        [.7071],
        [.6872, .1677],
        [.6646, .2413],
        [.6431, .2806, .0875],
        [.6233, .3031, .1401],
        [.6052, .3164, .1743, .0561],
        [.5888, .3244, .1976, .0947],
        [.5739, .3291, .2141, .1224, .0399],
        [.5601, .3315, .226, .1429, .0695],
        [.5475, .3325, .2347, .1586, .0922, .0303],
        [.5359, .3325, .2412, .1707, .1099, .0539],
        [.5251, .3318, .246, .1802, .124, .0727, .024],
        [.515, .3306, .2495, .1878, .1353, .088, .0433],
        [.5056, .329, .2521, .1939, .1447, .1005, .0593, .0196],
        [.4968, .3273, .254, .1988, .1524, .1109, .0725, .0359],
        [.4886, .3253, .2553, .2027, .1587, .1197, .0837, .0496, .0163],
        [.4808, .3232, .2561, .2059, .1641, .1271, .0932, .0612, .0303],
        [.4734, .3211, .2565, .2085, .1686, .1334, .1013, .0711, .0422, .014],
        [.4643, .3185, .2578, .2119, .1736, .1399, .1092, .0804, .053, .0263],
        [.459, .3156, .2571, .2131, .1764, .1443, .115, .0878, .0618, .0368, .0122],
        [.4542, .3126, .2563, .2139, .1787, .148, .1201, .0941, .0696, .0459, .0228],
        [.4493, .3098, .2554, .2145, .1807, .1512, .1245, .0997, .0764, .0539, .0321, .0107],
        [.445, .3069, .2543, .2148, .1822, .1539, .1283, .1046, .0823, .061, .0403, .02],
        [.4407, .3043, .2533, .2151, .1836, .1563, .1316, .1089, .0876, .0672, .0476, .0284, .0094],
        [.4366, .3018, .2522, .2152, .1848, .1584, .1346, .1128, .0923, .0728, .054, .0358, .0178],
        [.4328, .2992, .251, .2151, .1857, .1601, .1372, .1162, .0965, .0778, .0598, .0424, .0253, .0084],
        [.4291, .2968, .2499, .215, .1864, .1616, .1395, .1192, .1002, .0822, .065, .0483, .032, .0159],
        [.4254, .2944, .2487, .2148, .187, .163, .1415, .1219, .1036, .0862, .0697, .0537, .0381, .0227, .0076],
        [.422, .2921, .2475, .2145, .1874, .1641, .1433, .1243, .1066, .0899, .0739, .0585, .0435, .0289, .0144],
        [.4188, .2898, .2463, .2141, .1878, .1651, .1449, .1265, .1093, .0931, .0777, .0629, .0485, .0344, .0206, .0068],
        [.4156, .2876, .2451, .2137, .188, .166, .1463, .1284, .1118, .0961, .0812, .0669, .053, .0395, .0262, .0131],
        [.4127, .2854, .2439, .2132, .1882, .1667, .1475, .1301, .114, .0988, .0844, .0706, .0572, .0441, .0314, .0187, .0062],
        [.4096, .2834, .2427, .2127, .1883, .1673, .1487, .1317, .116, .1013, .0873, .0739, .061, .0484, .0361, .0239, .0119],
        [.4068, .2813, .2415, .2121, .1883, .1678, .1496, .1331, .1179, .1036, .09, .077, .0645, .0523, .0404, .0287, .0172, .0057],
        [.404, .2794, .2403, .2116, .1883, .1683, .1505, .1344, .1196, .1056, .0924, .0798, .0677, .0559, .0444, .0331, .022, .011],
        [.4015, .2774, .2391, .211, .1881, .1686, .1513, .1356, .1211, .1075, .0947, .0824, .0706, .0592, .0481, .0372, .0264, .0158, .0053],
        [.3989, .2755, .238, .2104, .188, .1689, .152, .1366, .1225, .1092, .0967, .0848, .0733, .0622, .0515, .0409, .0305, .0203, .0101],
        [.3964, .2737, .2368, .2098, .1878, .1691, .1526, .1376, .1237, .1108, .0986, .087, .0759, .0651, .0546, .0444, .0343, .0244, .0146, .0049],
        [.394, .2719, .2357, .2091, .1876, .1693, .1531, .1384, .1249, .1123, .1004, .0891, .0782, .0677, .0575, .0476, .0379, .0283, .0188, .0094],
        [.3917, .2701, .2345, .2085, .1874, .1694, .1535, .1392, .1259, .1136, .102, .0909, .0804, .0701, .0602, .0506, .0411, .0318, .0227, .0136, .0045],
        [.3894, .2684, .2334, .2078, .1871, .1695, .1539, .1398, .1269, .1149, .1035, .0927, .0824, .0724, .0628, .0534, .0442, .0352, .0263, .0175, .0087],
        [.3872, .2667, .2323, .2072, .1868, .1695, .1542, .1405, .1278, .116, .1049, .0943, .0842, .0745, .0651, .056, .0471, .0383, .0296, .0211, .0126, .0042],
        [.385, .2651, .2313, .2065, .1865, .1695, .1545, .141, .1286, .117, .1062, .0959, .086, .0765, .0673, .0584, .0497, .0412, .0328, .0245, .0163, .0081],
        [.383, .2635, .2302, .2058, .1862, .1695, .1548, .1415, .1293, .118, .1073, .0972, .0876, .0783, .0694, .0607, .0522, .0439, .0357, .0277, .0197, .0118, .0039],
        [.3808, .262, .2291, .2052, .1859, .1695, .155, .142, .13, .1189, .1085, .0986, .0892, .0801, .0713, .0628, .0546, .0465, .0385, .0307, .0229, .0153, .0076],
        [.3789, .2604, .2281, .2045, .1855, .1693, .1551, .1423, .1306, .1197, .1095, .0998, .0906, .0817, .0731, .0648, .0568, .0489, .0411, .0335, .0259, .0185, .0111, .0037],
        [.377, .2589, .2271, .2038, .1851, .1692, .1553, .1427, .1312, .1205, .1105, .101, .0919, .0832, .0748, .0667, .0588, .0511, .0436, .0361, .0288, .0215, .0143, .0071],
        [.3751, .2574, .226, .2032, .1847, .1691, .1554, .143, .1317, .1212, .1113, .102, .0932, .0846, .0764, .0685, .0608, .0532, .0459, .0386, .0314, .0244, .0174, .0104, .0035]
    ][e - 2]
}

function SW_a2(e) {
    var t = Math.round(e / 2 - .1);
    debug.log("n2=" + t);
    var r, n = [],
        o = [],
        a = 0,
        i = 1;
    for (r = 1; r <= e; r++) {
        var l = InvDistribution("Normal", (r - .375) / ((i = 1) * e + .25), {
            mean: 0,
            std: 1
        });
        o.push(l), a += Math.pow(l, 2)
    }
    var s = 1 / Math.pow(e, .5),
        u = -2.706056 * Math.pow(s, 5) + 4.434685 * Math.pow(s, 4) - 2.07119 * Math.pow(s, 3) - .147981 * Math.pow(s, 2) + .221157 * s + o[e - i] * Math.pow(a, -.5),
        c = -3.582633 * Math.pow(s, 5) + 5.682633 * Math.pow(s, 4) - 1.752461 * Math.pow(s, 3) - .293762 * Math.pow(s, 2) + .042981 * s + o[e - 1 - i] * Math.pow(a, -.5),
        d = (a - 2 * Math.pow(o[e - i], 2) - 2 * Math.pow(o[e - 1 - i], 2)) / (1 - 2 * Math.pow(u, 2) - 2 * Math.pow(c, 2)),
        f = Math.sqrt(d);
    for (n[1 - i] = u, n[2 - i] = c, r = 3; r < t + 1; r++) n[r - i] = -o[r - i] / f;
    return n
}

function sw_link() {
    return '<a class="button-container" href="320ShapiroWilk.html" target="_blank">Shapiro-Wilk Test</a>'
}

function li_bullet(e, t, r) {
    return 0 == e ? '<ul class="list-group">' : 1 == e ? "</ul>" : '<li class="' + r + '1_bullet dot-style list-group-item"><b>' + e + '</b><div class="px-4 pt-1">' + t + "</div></li>"
}

function pos(e) {
    return "S" == right(e, 1).toUpperCase() ? e += "'" : e += "'s", e
}

function tail(e) {
    return 1 == e ? "left-tailed" : 2 == e ? "two-tailed" : 3 == e ? "right-tailed" : void debug.error("tails must be 1 or 2 or 3")
}
var effect_table = [
    ["d", .2, .5, .8, 0, 1, 0, 1, "d"],
    ["regression", .14, .39, .59, 0, 1, ""],
    ["anova", .1, .25, .4, 0, 1, ""],
    ["F", 1.02, 1.15, 1.35, 1, 1.5, ""],
    ["proportion", .2, .5, .8, 0, 1, ""],
    ["h", .2, .5, .8, 0, 1, ""],
    ["mann", .1, .3, .5, 0, 1, ""],
    ["w", .1, .3, .5, 0, 1, "w"],
    ["phi", .1, .3, .5, 0, 1, "&phi;"],
    ["pearson", .1, .3, .5, 0, 1, "&eta<sup>2</sup>"],
    ["eta2", .01, .06, .14, 0, .28],
    ["r2", .02, .13, .26, 0, .52],
    ["kolmogorov", .1, .2, .3, 0, 0, 2],
    ["lilliefors", .1, .2, .3, 0, 0, 2],
    ["Q-Q", .0063, .0224, .0427, 0, .0853]
];

function effect_level_n(e, t, r) {
    return effect_level_n2(e, t, r).level
}

function effect_level_n2(e, t, r) {
    var n, o, a;
    if (void 0 === r || 0 == r) return effect_level2(e, t);
    var i = effect_table_n(e, r),
        l = i[1],
        s = i[2],
        u = i[3];
    return o = t < l ? (n = "very small", a = "small", l) : t < s ? (a = n = "small", l) : t < u ? (a = n = "medium", s) : (a = n = "large", u), {
        level: n,
        threshold: o,
        th_level: a
    }
}

function effect_table_n(e, t) {
    for (var r, n = [
        ["kolmogorov", [
            [10, .188, .201, .218, 0, 2],
            [20, .143, .162, .185, 0, 2],
            [40, .11, .135, .185, 0, 2],
            [80, .087, .116, .145, 0, 2],
            [160, .072, .102, .133, 0, 2],
            [320, .062, .094, .125, 0, 2],
            [640, .055, .088, .12, 0, 2],
            [1280, .05, .084, .117, 0, 2]
        ]],
        ["xxx", [
            [10, .1, .2, .3, 0, 0, 2],
            [20, .1, .2, .3, 0, 0, 2],
            [30, .1, .2, .3, 0, 0, 2]
        ]]
    ], o = 0; o < n.length; o++)
        if (n[o][0] == e) {
            r = n[o][1];
            for (var a = 0; a < r.length; a++)
                if (t <= r[a][0]) return r[a];
            return r[a - 1]
        }
    debug.error("didn't find distribution type:" + e)
}

function choose_effect(e) {
    var t, r = document.getElementById("size").value;
    "d" == e ? t = "stand" : in_list(e, "anova,regression", !0) && (t = "f"), "w" != e && "F" != e && "F2" != e && (document.getElementById("change_type").value = t), "F" == e ? document.getElementById("ratio").value = effect_size(e, r) : document.getElementById("change").value = effect_size("F2" == e ? "F" : e, r)
}

function effect_size(e, t) {
    for (var r = 0; r < effect_table.length; r++)
        if (effect_table[r][0] == e) {
            if ("small" == t) return effect_table[r][1];
            if ("medium" == t) return effect_table[r][2];
            if ("large" == t) return effect_table[r][3];
            debug.error("You enterd size:" + t + ", the size must be one of: 'small','medium','large'")
        }
    debug.error("You enterd type:" + e + ", the type must be one of: 'anova','regression'")
}

function effect_threshold(e) {
    for (var t = effect_table, r = 0; r < effect_table.length; r++)
        if (t[r][0] == e) return {
            small: t[r][1],
            medium: t[r][2],
            large: t[r][3],
            from: t[r][4],
            to: t[r][5],
            t1: 1 * xround((t[r][1] + t[r][2]) / 2, 3),
            t2: 1 * xround((t[r][2] + t[r][3]) / 2, 3)
        };
    debug.error("The is no " + e + " effect size in the table")
}

function effect_level(e, t) {
    return effect_level2(e, t).level
}

function effect_level2(e, t) {
    for (var r = 0; r < effect_table.length; r++) {
        var n, o, a, i = effect_table[r][1],
            l = effect_table[r][2],
            s = effect_table[r][3];
        if (effect_table[r][0] == e) {
            o = t < i ? (n = "very small", a = "small", i) : t < l ? (a = n = "small", i) : t < s ? (a = n = "medium", l) : (a = n = "large", s);
            break
        }
    }
    return {
        level: n,
        threshold: o,
        th_level: a
    }
}

function power_level(e) {
    if (!(e < 0 || 1 < e)) return e < .6 ? "weak" : e < .8 ? "medium" : "strong";
    debug.console.error("power is: " + e)
}

function show_parameters(e) {
    var t = JSON.stringify(e);
    return "()" == (t = (t = (t = t.replace(/"/g, "")).replace(/{/g, "(")).replace(/}/g, ")")) && (t = ""), t
}

function msg_0subject(e, t, r, n, o) {
    var a = "",
        i = validation_color(o) + "_back";
    return 0 < o && (a = "<span class='text-right h6 " + i + "'><a href='#vmes'>[Validation]</a></span>"), "<h4 class='mt-2' style='color:black;'>" + e + " test, using " + t + show_parameters(n) + " distribution (" + tail(r) + ")" + a + "</h4>"
}

function statistic(e, t, r, n, o, a, i, l) {
    l || (l = "stat");
    var s, u, c, d, f, h, m, p, b = (t - r) / n,
        _ = xrd(b, 3),
        g = "",
        v = g += 0 == r && 1 == n ? stat = t : html_frac([
            [l + " = ", xrd(t, 3) + " - " + xrd(r, 3), " = " + _],
            ["", xrd(n, 3), ""]
        ]),
        w = Distribution(o, b, i),
        y = xrd(w, 3);
    return g += "p = p(x &le; " + _ + ") = " + y + "<br>", "1" == e ? (s = w, g += "pvalue = p = " + y + "<br>", f = r + (c = InvDistribution(o, a, i)) * n, h = d = "∞", m = "-∞", p = t - c * n) : "3" == e ? (s = 1 - w, g += "pvalue = 1 - p = 1 - " + y + "= " + xrd(s, 3) + "<br>", f = c = "-∞", h = r + (d = InvDistribution(o, 1 - a, i)) * n, m = t - d * n, p = "∞") : "2" == e && (s = .5 < w ? 2 * (1 - w) : 2 * w, g += "pvalue = 2*Min(p,1-p) = 2*Min(" + y + "," + xrd(1 - w, 3) + ") = " + xrd(s, 3) + "<br>", f = r + (c = InvDistribution(o, a / 2, i)) * n, h = r + (d = InvDistribution(o, 1 - a / 2, i)) * n, m = t - d * n, p = t - c * n), u = a < s ? "non significant" : "significant", {
        statistic: b,
        stat_name: distribution_param(o).statisticName,
        p: w,
        pvalue: s,
        accepted: a < s,
        cval1: c,
        cval2: d,
        range1: f,
        range2: h,
        ci1: m,
        ci2: p,
        steps: g,
        step_stat: v,
        significant: u
    }
}

function msg_1hypothesis(e, t, r, n, o, a, i, l, s, u) {
    var c, d, f, h, m = n;
    return c = t ? ("", "not ") : ("not ", ""), void 0 === l && (l = 0), t ? 1 == r ? f = "greater than or equal to" : 2 == r ? f = "equal to" : 3 == r ? f = "less than or equal to" : debug.error("tails should be 1 or 2 or 3") : 1 == r ? f = "less than" : 2 == r ? f = "not equal to" : 3 == r ? f = "greater than" : debug.error("tails should be 1 or 2 or 3"), 0 < l ? 0 < l ? h = " + " + l : l < 0 && (h = " - " + -l) : h = "", d = "<h5 >1. H<sub>0</sub> hypothesis</h5>", d += t ? "<span style='color:green;'>Since the p-value &gt; &alpha;, H<sub>0</sub> can not be rejected.<br/>" : "<span style='color:red;'>Since the p-value &lt; &alpha;, H<sub>0</sub> is rejected.<br/>", 3 == i ? t ? (d += "The " + n + "s of all groups assume to be equal.</span><br>", d += "In other words, the difference between the " + n + "s of all groups is not big enough to be statistically significant.<br>") : (d += "Some of the groups' " + n + "s consider to be not equal.</span><br>", d += "In other words, the difference between the " + n + "s of some groups is big enough to be statistically significant.<br>") : (d += "The " + n + " of the <b>" + pos(o) + "</b> population is considered to be " + f + " the ", d += 2 == i ? m + " of the " + pos(a) + " population" + h : "expected " + m + " (" + l + ")", d += ".</span>", d += "<span style='color:#3339b8;'><br/>", 2 == r ? (d += "In other words, the difference between the " + n + " of the <b>" + o + "</b> and ", d += 2 == i ? a + " populations" : "the expected " + m, d += h, d += " is " + c + " big enough to be statistically significant.<br/></span>") : 2 == i && 1 == r && 1 * u + 1 * l <= 1 * s || 3 == r && 1 * s <= 1 * u + 1 * l ? d += "In other words, the results sampled support H<sub>0</sub>. " : (2 == i && 1 == r && 1 * s < 1 * u + 1 * l || 3 == r && 1 * u + 1 * l < 1 * s) && (d += t ? "In other words, the " + n + " of the " + pos(a) + " population is bigger than the " + o + " population, but not enough to be statistically significant" : "In other words, the " + n + " of the " + pos(a) + " population is bigger than the " + pos(o) + " population, and the difference is big enough to be statistically significant")), t && (d += "A non-significance result can not prove that H<sub>0</sub> is correct, only that the null assumption can not be rejected. "), d += "</span>"
}

function msg_2pvalue(e, t, r, n, o, a, i, l) {
    void 0 === i && (i = ""), void 0 === l && (l = "");
    var s = "<h5 style='color:black;'>2. P-value" + l + "</h5><p>";
    return s += "The p-value equals <span class='num_col'>" + xround(r, a) + "</span>", s += "<span class='notbold'>,  ( P(x≤" + xround(t, a) + ") = " + xround(n, a) + " ).</span> It means that ", e ? (s += "the chance of type I error, rejecting a correct H<sub>0</sub>, is too high: <span class='num_col2'>" + xround(r, 4) + "</span> (" + xround(100 * r, 2) + "%). ", s += "The larger the p-value the more it supports H<sub>0</sub>.") : (s += "the chance of type I error (rejecting a correct H<sub>0</sub>) is small: <span class='num_col2'>" + xround(r, 4) + "</span> (" + xround(100 * r, 2) + "%). ", s += "The smaller the p-value the more it supports H<sub>1</sub>.", 0 < i.length && (s += i)), s + "</p>"
}

function msg_3statistic(e, t, r, n, o, a, i, l, s, u, c, d, f, h, m, p) {
    var b;
    b = t ? "" : "not ";
    var _, g, v = "<h5 style='color:black;' >3. Test statistic</h5><p>";
    return g = i ? (_ = "ninfinite" == o ? xround(o, m) : o + 1, "infinite" == a ? xround(a, m) : a - 1) : (_ = xround(o, m), xround(a, m)), v += "The test statistic <b>" + r + "</b> equals <span class='num_col'>" + xround(n, m) + "</span>, which is " + b + " in the <span class='num_col2'>" + 100 * (1 - e) + "%</span> region of acceptance: [<span class='num_col2'>" + _ + " : " + g + "</span>].<br/>", 0 < l.length && (v += l + "=<span class='num_col2'>" + xround(s, 2) + "</span>, is " + b + " in the <span class='num_col2'>" + 100 * (1 - e) + "%</span> region of acceptance: [<span class='num_col2'>" + u + " : " + c + "</span>].<br/>"), "" != d && (v += "The " + 100 * (1 - e) + "% confidence interval of <b>" + d + "</b> is: [" + xround(f, m) + " , " + xround(h, m) + "].<br>"), p && 0 < p && (v += "The standard deviation of the difference, S' equals " + xround(p, 3) + ", is used to calculate the statistic.<br>"), v
}

function msg_4effect(e, t, r, n, o, a) {
    return msg_4effect_new(e, t, r, n, o, a, 0)
}

function msg_4effect_new(e, t, r, n, o, a, i) {
    void 0 === a && (a = 2);
    var l = effect_level_n(e, r, i),
        s = "<h5>4. Effect size</h5><p>";
    return s += "The observed effect size " + t + " is " + hbold(l) + ", <b>" + xround(r, a) + "</b>. ", s += "This indicates that the magnitude of the difference between the ", s += 1 == o ? n + " and the expected " + n : n + " ", (s += " is " + l + ".<br>") + "</p>"
}

function validation_color(e) {
    return color = 1 == e ? "green" : 2 == e ? "yellow" : 3 == e ? "red" : 0 == e ? "" : (debug.error("The severity should be one of: 0,1,2,3 but it is " + e), "black"), color
}

function sw_link() {
    return '<a class="button-container" href="320ShapiroWilk.html" target="_blank">Shapiro-Wilk Test</a>'
}

function sw_message(e, t, r, n, o, a, i, l, s, u, c, d) {
    var f = "",
        h = 1,
        m = i < o;
    t.length;
    var p, b = "",
        _ = ".<br>",
        g = o < i,
        v = "",
        w = ".<br>";
    return g ? b = "<span class='red'>does not </span>" : _ = ", or more accurately, you can't reject the normality assumption.<br>", f += "The assumption was checked based on the " + sw_link() + ". (&alpha;=" + i + ")<br>", f += "It is assumed that <b>" + e + "</b> <b>" + b + "</b>follow a normal distribution", f += " (p-value is " + xround(o, d) + ")", m & r < 15 && (f += "<br>Since the sample size is small (" + r + ") the SW test power is weak, and the SW test may not identify a deviation from the normal distribution."), f += _, 0 < t.length && ((p = a < .05) ? v = "not " : w = ", or more accurately, you can't reject the normality assumption.<br>", f += "It is assumed that <b>" + t + "</b> is <b>" + v + "</b>normally distributed. ", f += " (p-value is " + xround(a, 3) + ")", m & r < 15 && (f += "<br>Since the sample size is small (" + n + ") the SW test power is weak, and the SW test may not identify a deviation from the normal distribution."), f += w), (g || p) && (l ? (f += "The test is considered sensitive to the normality assumption violation.<br>", "You should check the data transformation, for example, log transformation, square-root transformation.<br>", h = 3) : (f += "The test is considered robust for moderate violation of the normality assumption.<br>", "You should check if the sample data is reasonably symmetric around the average. ", "If it isn’t you should consider checking the data transformation, for example, log transformation, square-root transformation. ", 1 == h && (h = 2)), "If none of the transformations work, you should run a non-parametric test.<br>", "The relevant non-parametric test is the " + s + " test", 0 < u.length ? ", press the '<span style='font-weight: bold;'>" + u + "</span>' button.<br>" : ".", 0 < c.length && display_blocks(c, "block")), {
        message: li_bullet("Normality", f, validation_color(h)),
        severity: h
    }
}

function n_message(e, t, r, n) {
    void 0 === n && (n = ""), void 0 === r && (r = "");
    var o = "",
        a = "";
    return e < t ? (severity = 3, o = "The sample size " + e + " is too small!", a = "You should use at lease sample size of " + t + ".") : (severity = 1, o = "The sample size is " + e + "."), 0 < a.length && (o += "<br><br>" + a), {
        message: li_bullet("Sample size" + r, o + n, validation_color(severity)),
        severity: severity
    }
}

function outlier_message(e, t, r, n, o) {
    out = t, void 0 === n && (n = ""), void 0 === o && (o = "");
    var a, i, l, s, u = "",
        c = "",
        d = 100;
    if (u += '<a class="button-container" href="doc_outliers.html" target="_blank">Outliers\' </a>detection method: Tukey Fence, k=1.5.<br>', 0 == Math.max.apply(Math, t.map(function (e) {
        return e.count
    }))) u += "The data doesn't contain outliers.", a = 1;
    else {
        for (s = 0; s < out.length; s++) outlier_percentage = xround(100 * out[s].count / out[s].n, 2), d = Math.max(d, outlier_percentage), l = out[s].count1 ? "s" : "", 0 < out[s].count ? (u += out[s].name + " contains " + out[s].count + " potential outlier" + l + ", which is " + outlier_percentage + "% of the observations. ", u += " (" + out[s].outliers + ").<br>") : u += out[s].name + " doesn't contain outliers. ";
        u += " The <b>" + e + "</b> test is " + (r ? "sensitive" : "robust") + " to the presence of outliers.", d < 5 || !r ? a = 1 : (a = 2, c = "Please check carefully the outliers. ", c += "It is not recommended to remove outliers unless it is an error.")
    }
    0 < c.length && (u += "<br>" + c), 0 < n.length && (u += n);
    li_bullet("Outliers" + o, u, i = validation_color(a));
    return {
        message: li_bullet("Outliers", u, i),
        severity: a
    }
}

function outlier_message_(e, t, r, n, o, a, i, l, s, u) {
    void 0 === s && (s = ""), void 0 === u && (u = "");
    var c, d, f, h, m, p, b = "",
        _ = "";
    m = 1 < n ? "s" : "", p = 1 < i ? "s" : "", b += '<a class="button-container" href="doc_outliers.html" target="_blank">Outliers\' </a>detection method: Tukey Fence, k=1.5.<br>', 0 == n && 0 == i ? (b += "The data doesn't contain outliers.", c = 1) : (0 < n && (b += t + " contains " + n + " potential outlier" + m + ", which is " + (f = xround(100 * n / r, 2)) + "% of the observations.<br>"), 0 < o.length && 0 < i && (b += o + " contains " + i + " potential outlier" + p + ", which is " + (h = xround(100 * i / a, 2)) + "% of the observations.<br>"), b += "The <b>" + e + "</b> test is " + (l ? "sensitive" : "robust") + " to the presence of outliers.", f < 5 && h < 5 || !l ? c = 1 : (c = 2, _ = "Please check carefully the outliers.")), 0 < _.length && (b += "<br>" + _), 0 < s.length && (b += s);
    li_bullet("Outliers" + u, b, d = validation_color(c));
    return {
        message: li_bullet("Outliers", b, d),
        severity: c
    }
}

function power_message(e, t, r, n, o, a, i) {
    void 0 === i && (i = ""), void 0 === a && (a = "");
    var l, s, u = "",
        c = "",
        d = "The test priori power is strong <b>" + xround(t, 4);
    return e ? o <= t ? (u += d + "</b>", s = 1) : n <= t ? (u += "The priori power is medium <b>" + xround(t, 4) + "</b>, hence the test may not reject an incorrect H<sub>0</sub> with a small effect.", s = 2) : t < n && (u += "The priori power is low <b>" + xround(t, 4) + "</b>, hence the test may not reject an incorrect h<sub>0</sub>", s = 3) : s = o <= t ? (u += d + "</b>", 1) : n <= t ? (u += "Although the priori power is medium <b>" + xround(t, 4) + "</b>, the H<sub>0</sub> is rejected. ", u += "The observed effect size may be exaderate.", 2) : (u += "Although the priori power is low <b>" + xround(t, 4) + "</b>, the H<sub>0</sub> is rejected. ", u += "The observed effect size may be exaderate or even in the wrong direction.", 3), l = validation_color(s), 1 != s && (c = "It is suggested to improve the test power by:", c += "<ul><li><b>sample size:</b> use a larger sample.</li>", c += "<li><b>&sigma;:</b> check if the standard deviation can be reduced by eliminating noises that are not relevant to the tested measurement.</li>", c += "<li><b>effect size*:</b>  when planning the research it was possible to increase the effect size, at the price of the ability to identify smaller effect sizes.</li>", 2 == r && (c += "<li><b>test tail:</b> if only one of either the positive or negative changes is relevant, change to the one-tailed test.</li>"), c += "<li><b>&alpha;*:</b> when planning the research it was possible to increase the significance level (α), at the price of increasing the probability of a type I error.</li></ul>", c += "*Note: determining the test power, sample size, effect size and the significant level (α) should be done <b>before</b> collecting the data.<br><br>"), 0 < c.length && (u += "<br><br>" + c), {
        message: li_bullet("Test power" + a, u + i, l),
        severity: s
    }
}

function onlyUnique(e, t, r) {
    return r.indexOf(e) === t
}

function table_to_matrix(e) {
    var t = transposeArray(e, ""),
        r = t[0].filter(onlyUnique);
    r.sort();
    var n = t[1].filter(onlyUnique);
    n.sort();
    for (var o, a, i = create_array(r.length, n.length, ""), l = 0; l < e.length; l++) o = r.indexOf(e[l][0]), a = n.indexOf(e[l][1]), 0 < i[o][a].length && (i[o][a] += ","), i[o][a] += e[l][2];
    return {
        table: i,
        row0: n,
        col0: r
    }
}

function get_excel(e, t, r, n) {
    var o, a, i = document.getElementById(e),
        l = (0 == i.value.length && 0 < i.placeholder.length ? i.placeholder : i.value).split(String.fromCharCode(10)),
        s = [],
        u = [],
        c = "";
    for ((0 == l[l.length - 1].length || 1 == l[l.length - 1].length && "" == l[l.length - 1][0]) && l.pop(), o = 0; o < l.length; o++) l[o] = l[o].split(String.fromCharCode(9)), "" != l[o] && 0 != l[o].length || l.splice(o, 1);
    var d = !0;
    for (a = 0; a < l[0].length; a++) checkVal(l[0][a]) && (d = !1);
    if (d && r) s = l.shift();
    else if (r)
        for (a = 0; a < l[0].length; a++) s.push("Group" + (a + 1));
    for (is_col0 = !0, o = 0; o < l.length; o++) checkVal(l[o][0]) && (is_col0 = !1);
    if (is_col0 && n)
        for (o = 0; o < l.length; o++) u.push(l[o].shift());
    else if (n)
        for (o = 0; o < l[0].length; o++) u.push("Group" + (o + 1));
    return d && is_col0 && r && n && (c = s.shift()), "col" == t && (l = jStat.transpose(l)), {
        table: l,
        row0: s,
        col0: u,
        corner: c
    }
}

function fill_header(e) {
    for (var t = 0; t < e.length; t++) {
        0 == str_clean_space(e[t]).length && (e[t] = "Group" + (t + 1))
    }
}

function get_data(e) {
    var t = split_str(get_var(e));
    return clean_array(t, !0), t
}

function get_columns(e, t, r) {
    for (var n, o, a = [], i = get_table(e, "col", t, r, "end", 1, !0).table, l = 0; l < i.length; l++) i[l] = split_str(i[l]), "Name" == (n = get_var("h" + (l + t))) && (n = "Name-" + (l + 1)), a.push(n);
    var s = split_str(get_variable("c0"));
    clean_str_array(s), 0 < t && (o = get_var("h0"), s.unshift(o)), clean_array(i, !0);
    var u = transposeArray(i, "undefined"),
        c = copy_2d_array(a);
    for (u.unshift(c), l = 0; l < u.length; l++) u[l].unshift(s[l]);
    return {
        table: i,
        header: a,
        left_header: s,
        chart_data: u
    }
}

function clean_table(e, t, r, n, o) {
    var a = document.getElementById(e),
        l = a.rows.length - 1,
        s = a.rows[0].cells.length - 1;
    for (void 0 !== o && "end" != o || (o = l), void 0 !== n && "end" != n || (n = s), i = r; i <= o; i++) {
        for (j = t; j <= n; j++) a.rows[i].cells[j].children[0].value = ""
    }
}

function get_table(e, t, r, n, o, a, i) {
    void 0 === i && (i = !1);
    var l, s, u, c = document.getElementById(e),
        d = c.rows.length - 1,
        f = c.rows[0].cells.length - 1;
    void 0 !== a && "end" != a || (a = d), void 0 !== o && "end" != o || (o = f);
    var h = [],
        m = [],
        p = [];
    if ("row" == t) {
        for (l = n; l <= a; l++) {
            var b = [];
            for (s = r; s <= o; s++) u = g(l, s, i), b.push(u);
            h.push(b)
        }
        for (l = n; l <= a; l++) u = g(l, 0, !1), p.push(u);
        for (s = r; s <= o; s++) u = g(0, s, !1), m.push(u)
    } else if ("col" == t) {
        for (s = r; s <= o; s++) {
            var _ = [];
            for (l = n; l <= a; l++)(u = c.rows[l].cells[s].children[0].value) || (u = c.rows[l].cells[s].children[0].innerHTML), _.push(u);
            h.push(_)
        }
        for (l = n; l <= a; l++) u = g(l, 0, !1), m.push(u);
        for (s = r; s <= o; s++) u = g(0, s, !1), p.push(u)
    } else debug.error("Oriantation must be 'row' or 'col'");
    return {
        table: h,
        row0: m,
        col0: p
    };

    function g(e, t, r) {
        return "" == (u = c.rows[e].cells[t].children[0].value) && (u = c.rows[e].cells[t].children[0].value), r && isNumber(u) && (u *= 1), u
    }
}

function get_rd() {
    var e = get_variable("digits");
    return null == e && (e = 4), 1 * e
}

function set_local(e, t, r) {
    if (0 < r.length && (r = "_" + r + "_"), "undefined" != typeof Storage)
        for (var n = e.substring(0, 3), o = t.split(","), a = 0; a < o.length; a++) {
            var i = get_variable(o[a]);
            null != i && localStorage.setItem(n + r + o[a], JSON.stringify(i))
        }
}

function set_local_columns(e, t, r, n, o, a) {
    null == a && (a = 1);
    var i, l = e.substring(0, 3);
    i = o ? "_" + t : "";
    var s = r.split(",");
    0 < n.length && (n = "_" + n);
    var u = GEBI(t).rows[0].cells.length - a;
    set_local_one(l + n + i + "_columns", u);
    for (var c = 0; c < u; c++)
        for (var d = 0; d < s.length; d++) set_local_one(l + n + i + "_" + s[d] + c, get_variable(s[d] + c))
}

function clear_columns(e, t, r) {
    null == r && (r = 1);
    for (var n = t.split(","), o = GEBI(e).rows[0].cells.length - r, a = 0; a < o; a++)
        for (var i = 0; i < n.length; i++) set_variable(n[i] + a, "")
}

function get_local_columns(e, t, r, n, o, a) {
    var i;
    null == a && (a = 1), i = o ? "_" + t : "";
    var l, s, u = e.substring(0, 3),
        c = r.split(",");
    0 < n.length && (n = "_" + n);
    GEBI(t).rows[0].cells.length;
    var d = get_local_one(u + n + i + "_columns");
    if (null != d) {
        adj_table_col(t, d + a);
        for (var f = 0; f < d; f++)
            for (var h = 0; h < c.length; h++)(s = get_local_one(u + n + i + "_" + (l = c[h] + f))) && set_variable(l, s)
    }
}

function column_color(e, t) {
    void 0 === t && (t = 0);
    var r = color_default(),
        n = document.getElementById(e).rows[0].cells.length - t;
    GEBI("col_color" + (n - 1)).value = r[n - 1]
}

function get_colors(e, t) {
    void 0 === t && (t = 0);
    for (var r = [], n = document.getElementById(e).rows[0].cells.length - t, o = 0; o < n; o++) r.push(get_variable("col_color" + (o + 0)));
    return r
}

function set_colors(e, t) {
    var r, n = document.getElementById(e).rows[0].cells.length;
    r = "red" == t ? color_red() : "orange" == t ? color_orange() : "blue" == t ? color_blue() : "green" == t ? color_green() : "yellow" == t ? color_yellow() : color_default();
    for (var o = 0; o < n; o++) set_variable("col_color" + (o + 0), r[o])
}

function left(e, t) {
    return t <= 0 ? "" : t > String(e).length ? e : String(e).substring(0, t)
}

function right(e, t) {
    if (t <= 0) return "";
    if (t > String(e).length) return e;
    var r = String(e).length;
    return String(e).substring(r, r - t)
}

function set_local_one(e, t) {
    0 == t.length && GEBI(e) && (t = document.getElementById(e).value), null != t && localStorage.setItem(e, JSON.stringify(t))
}

function get_local_list(e, t, r) {
    if ("undefined" != typeof Storage) {
        0 < r.length && (r = "_" + r + "_");
        for (var n = e.substring(0, 3), o = t.split(","), a = 0; a < o.length; a++) {
            var i = o[a];
            set_variable(i, get_local_one(n + r + i))
        }
    }
}

function get_local_one(e) {
    if ("undefined" != typeof Storage) return JSON.parse(localStorage.getItem(e))
}

function measures(e) {
    var t, r, n, o, a, i, l, s, u, c, d = 0,
        f = 0,
        h = 0,
        m = [],
        p = [];
    n = (t = sum1(e)) / (r = e.length);
    for (var b = 0; b < r; b++) residual1 = e[b] - n, c = e[b] + " - " + xround(n, 3), m.push(residual1), p.push([e[b], c, residual1]), d += Math.pow(residual1, 2), f += Math.pow(e[b] - n, 3), h += Math.pow(e[b] - n, 4);
    return i = 1 < r ? d / (r - 1) : 0, l = d / r, o = Math.sqrt(i), a = Math.sqrt(l), s = Math.sqrt(r * (r - 1)) * f / (r * (r - 2) * Math.pow(a, 3)), u = r * (r + 1) * (r - 1) * h / ((r - 2) * (r - 3) * Math.pow(d, 2)) - 3 * Math.pow(r - 1, 2) / ((r - 2) * (r - 3)), {
        sum: t,
        min: min1(e),
        max: max1(e),
        n: r,
        average: n,
        ss: d,
        s: o,
        sigma: a,
        sample_variance: i,
        variance: l,
        residual_table: p,
        residual: m,
        skewness: s,
        kurtosis: u,
        skewness_icon: calculate_skewness_message(s, r, "medium", 20, 15),
        kurtosis_icon: calculate_kurtosis_message(u, r, 20, 15)
    }
}

function calc_ses(e) {
    var t = Math.sqrt(6 * e * (e - 1) / ((e - 2) * (e + 1) * (e + 3))),
        r = html_frac([
            ["SES<sup>2</sup> = ", "6n(n-1)"],
            ["", "(n-2)(n+1)(n+3)"]
        ]);
    return {
        SES: t,
        steps: r += html_frac([
            ["SES<sup>2</sup> = ", "6*" + e + "*(" + e + "-1)", " = " + xrd(t, 3) + "<sup>2</sup>"],
            ["", "(" + e + "-2)(" + e + "+1)(" + e + "+3)", ""]
        ])
    }
}

function calc_sek(e) {
    var t = 2 * calc_ses(e).SES * Math.sqrt((Math.pow(e, 2) - 1) / ((e - 3) * (e + 5))),
        r = html_frac([
            ["SEK<sup>2</sup> = ", "6n(n-1)<sup>2</sup>"],
            ["", "(n-2)(n-3)(n+3)(n+5)"]
        ]);
    return {
        SEK: t,
        steps: r += html_frac([
            ["SEK<sup>2</sup> = ", "6*" + e + "*(" + e + "-1)<sup>2</sup>", " = " + xrd(t, 3) + "<sup>2</sup>"],
            ["", "(" + e + "-2)(" + e + "-3)(" + e + "+3)(" + e + "+5)", ""]
        ])
    }
}

function calculate_skewness_icon(e, t, r, n, o) {
    o || (o = !1), r || (r = 20), n || (n = 15);
    var a = e / calc_ses(t).SES,
        i = "";
    return o && (i = "_big"), a < -2 ? '<img alt="negative_skew" height="' + n + '" src="images/negative_skew' + i + '.png" width="' + r + '" />' : 2 < a ? '<img alt="positive_skew" height="' + n + '" src="images/positive_skew' + i + '.png" width="' + r + '" />' : '<img alt="positive_skew" height="' + n + '" src="images/symmetrical_skew' + i + '.png" width="' + r + '" />'
}

function calculate_kurtosis_icon(e, t, r, n, o) {
    o || (o = !1), r || (r = 20), n || (n = 15);
    var a = e / calc_sek(t).SEK,
        i = "";
    return o && (i = "_big"), message = a < -2 ? '<img alt="negative kurtosis" height="' + n + '" src="images/kurt_thin_tails' + i + '.png" width="' + r + '" />' : 2 < a ? '<img alt="positive kurtosis" height="' + n + '" src="images/kurt_heavy_tails' + i + '.png" width="' + r + '" />' : '<img alt="normal tailes" height="' + n + '" src="images/symmetrical_skew' + i + '.png" width="' + r + '" />', message
}

function calculate_kurtosis_message(e, t, r, n) {
    return calculate_kurtosis_message0(e, t, "medium", r, n)
}

function calculate_kurtosis_message0(e, t, r, n, o) {
    n || (n = 20), o || (o = 15);
    var a = e / calc_sek(t).SEK,
        i = 2 * jStat.normal.cdf(-Math.abs(a), 0, 1),
        l = " (pval=" + Math.round(1e3 * i) / 1e3 + ")",
        s = "",
        u = 1.96,
        c = calculate_kurtosis_icon(e, t, n, o, !1);
    if ("short" == r) {
        s = a < -u ? "Short thin tails" : u < a ? "long heavy tails" : "Normal like tails"
    } else "medium" == r ? s = a < -u ? c + "<b>Platykurtic</b>, short thin tails " + l : u < a ? c + "<b>Leptokurtic</b>, long heavy tails " + l : c + "Potentially <b>Mesokurtic</b>, normal like tails " + l : "long" == r && (s = a < -u ? c + "<b>Platykurtic</b>, negative kurtosis, short thin tails " + l : u < a ? c + "<b>Leptokurtic</b>, positive kurtosis, long heavy tails " + l : c + "Potentially <b>Mesokurtic</b>, normal like tails " + l);
    return s
}

function calculate_skewness_message(e, t, r, n, o) {
    n || (n = 20), o || (o = 15);
    var a, i = e / calc_ses(t).SES,
        l = 2 * jStat.normal.cdf(-Math.abs(i), 0, 1),
        s = " (pval=" + Math.round(1e3 * l) / 1e3 + ")",
        u = '<img alt="negative_skew" height="' + o + '" src="images/negative_skew.png" width="' + n + '" />',
        c = '<img alt="positive_skew" height="' + o + '" src="images/positive_skew.png" width="' + n + '" />',
        d = '<img alt="symmetrical_skew" height="' + o + '" src="images/symmetrical_skew.png" width="' + n + '" />',
        f = 1.96;
    return "short" == r ? a = i < -f ? "Negative skew" : f < i ? "Positive skew" : "Potentially symmetrical" : "medium" == r ? a = i < -f ? u + " <b>Asymmetrical</b>, left/negative" + s : f < i ? c + " <b>Asymmetrical</b>, right/positive" + s : d + " Potentially <b>Symmetrical</b>" + s : "long" == r && (a = i < -f ? u + " <b>Asymmetrical</b>, left/negative skew, long <b>left tail</b>" + s : f < i ? c + " <b>Asymmetrical</b>, right/positive skew, long <b>right tail</b>" + s : d + " Potentially <b>Symmetrical</b>" + s), a
}

function measures0(e) {
    var t = {
        sum: 0,
        n: 0,
        average: 0,
        ss: 0,
        s: 0
    };
    t.sum = sum1(e), t.n = e.length;
    var r = t.sum / t.n;
    t.average = r;
    for (var n = 0; n < t.n; n++) t.ss += Math.pow(e[n] - r, 2), Math.pow(e[n] - r, 3), Math.pow(e[n] - r, 4);
    return t.s = Math.sqrt(t.ss / (t.n - 1)), t
}

function odd(e) {
    return e / 2 - Math.floor(e / 2) != 0
}

function each_arr(e, t, r, n, o) {
    var a, i;
    if (!Array.isArray(e[0]))
        for (a = 0; a < e.length; a++) e[a] = t(e[a], r);
    else
        for (i = 0; i < e.length; i++) each_arr(e[i], t, r)
}

function apa_pval(e) {
    return e < .001 ? "<i>p</i> < .001" : "1" == e.toFixed(3).substring(0, 1) ? "<i>p</i> = " + e.toFixed(3) : "<i>p</i> = " + e.toFixed(3).substring(1)
}

function deleteText(e) {
    var t = document.getElementById(e);
    null !== t && (t.type ? (t.value = "", t.placeholder = "") : t.innerHTML = "")
}

function xrd_apa(e, t) {
    return void 0 !== t && "" != t || (t = 3), parseFloat(e.toFixed(t))
}

function xrd2(e, t) {
    return Math.abs(e) < 1 ? e < 0 ? "-" + xrd(e, t).substring(2) : xrd(e, t).substring(1) : xrd(e, t)
}

function xround(e, t) {
    if (void 0 === t && (t = 6), "string" == typeof t && (t = Number(t)), "infinite" == e) return "&infin;";
    if ("ninfinite" == e) return "-&infin;";
    var r = Math.log10(1 * Math.abs(e));
    10 < (r = r < 0 ? t : Math.round(r + .5) + t) && (r = 10);
    var n = (1 * e).toPrecision(r);
    return "NaN" == (n = (1 * n).toString()) && (n = e), n
}

function create_array(e, t, r) {
    for (var n = [], o = 0; o < e; o++) {
        for (var a = [], i = 0; i < t; i++) a.push(r);
        n.push(a)
    }
    return 1 == e ? n[0] : n
}

function array_to_number(e) {
    for (var t = 0; t < e.length; t++) e[t] = 1 * e[t]
}

function flip_array(e) {
    for (var t = [], r = 0; r < e.length; r++) t.push(e[e.length - 1 - r]);
    return t
}

function copy_object(e) {
    return JSON.parse(JSON.stringify(e))
}

function copy_2d_array(e) {
    for (var t = [], r = !Array.isArray(e[0]), n = 0; n < e.length; n++) t[n] = r ? e[n] : e[n].slice();
    return t
}

function split_str(e) {
    return e.toString().split(/\n|\t|,| /)
}

function array_to_number(e) {
    for (var t, r = 0; r < e.length; r++)(t = Number(e[r])) && (e[r] = t)
}

function split_data(e) {
    var t, r = document.getElementById(e).value;
    return 0 < r.length && (t = r.split(/\n|\t|,| /)), t
}

function clean_empty_array(e) {
    for (var t = 0; t < e.length; t++) 0 == e[t].length && (e.splice(t, 1), t--)
}

function clean_array(e, t) {
    var r;
    if (Array.isArray(e[0]))
        for (r = 0; r < e.length; r++) clean_array(e[r], t);
    else
        for (r = 0; r < e.length; r++) Array.isArray(e[r]) ? clean_array(e[r], t) : checkVal(e[r]) ? t && (e[r] = 1 * e[r]) : (e.splice(r, 1), r--)
}

function clean_str_array(e) {
    var t, r;
    if (!Array.isArray(e[0]))
        for (t = 0; t < e.length; t++) "" != e[t] && " " != e[t] && void 0 !== e[t] || (e.splice(t, 1), t--);
    else
        for (r = 0; r < e.length; r++) clean_str_array(e[r])
}

function trim_array(e) {
    var t, r;
    if (!Array.isArray(e[0]))
        for (t = 0; t < e.length; t++) e[t] = e[t].trim();
    else
        for (r = 0; r < e.length; r++) trim_array(e[r])
}

function str_clean_space(e) {
    return e.replace(/\s/g, "")
}

function check_empty_ids(e, t, r, n) {
    var o = 0;
    e = e.split(",");
    for (var a = 0; a < e.length; a++) {
        var i = GEBI(e[a]);
        null != i && (0 == i.value.length && 0 == i.placeholder.length || !isNumber(i.value) && !isNumber(i.placeholder) && t ? (i.style.backgroundColor = r, o++) : i.style.backgroundColor = "")
    }
    return null != GEBI(n) && set_variable(n, 0 < o ? "<b>Please fill in more data!</b>" : ""), !(0 < o)
}

function check_range(e, t, r, n, o) {
    var a = get_var(e);
    a != r && a != n || !o ? (a < r || n < a) && alert("The " + t + " should be between " + r + " and " + n + ".") : alert("The " + t + " should be between " + r + " and " + n + ", not included")
}

function checkRange(e, t, r, n) {
    var o = "";
    return (parseFloat(t) < r || parseFloat(t) > n) && (o += e + " should in the following range: " + r + "&le;" + e + "&le;" + n + ".\n"), o
}

function checkInt(e, t) {
    var r = "";
    return t % 1 != 0 && (r += e + " should be integer.\n"), r
}

function check_number(e, t) {
    var r = "";
    return checkVal(t) || (r += e + " should be a number.\n"), r
}

function checkVal(e) {
    return !((isNaN(e) || !e || 0 == e.toString().replace(/\s/g, "").length) && "number" != typeof e)
}

function max1(e) {
    return e.reduce(function (e, t) {
        return Math.max(1 * e, 1 * t)
    })
}

function min1(e) {
    return e.reduce(function (e, t) {
        return Math.min(1 * e, 1 * t)
    })
}

function sum1(e) {
    return e.reduce(function (e, t) {
        return 1 * e + 1 * t
    })
}

function sum2(e) {
    for (var t = 0, r = 0; r < e.length; r++) t += sum1(e[r]);
    return t
}

function mult_arrays(e, t) {
    for (var r = [], n = 0; n < e.length; n++) r.push(e[n][0] * t[n][0]);
    return r
}

function array_to_str_enter(e) {
    for (var t = "", r = 0; r < e.length; r++) t += e[r], r < e.length + 1 && (t += "\n");
    return t
}

function array_to_col(e) {
    for (var t = [], r = 0; r < e.length; r++) t.push([e[r]]);
    return t
}

function switch_variable(e, t) {
    var r = get_variable(e);
    set_variable(e, get_variable(t)), set_variable(t, r)
}

function switch1(e, t) {
    var r = e;
    e = t, t = r
}

function set_variable(e, t) {
    var r = GEBI(e);
    if (null == r) debug.error("Can't find HTML element ID: " + r);
    else {
        var n = r.nodeName;
        "checkbox" == r.type ? r.checked = t : in_list(n, "TEXTAREA,INPUT,SELECT", !0) ? r.value = t : r.innerHTML = t
    }
}

function get_var(e) {
    var t, r, n;
    return null != (t = GEBI(e)) ? (r = get_variable(e), n = t.placeholder, 0 == r.length && 0 < n.length ? n : r) : null
}

function get_variable(e) {
    var t = GEBI(e);
    return null == t ? null : (nodeName1 = t.nodeName, "checkbox" == t.type ? t.checked : in_list(nodeName1, "TEXTAREA,INPUT,SELECT", !0) ? t.value : t.innerHTML)
}

function get_variable_desc(e) {
    var t = GEBI(e);
    return null == t ? null : (nodeName1 = t.nodeName, "checkbox" == t.type ? t.checked : "SELECT" == nodeName1 ? t.options[t.selectedIndex].text : in_list(nodeName1, "TEXTAREA,INPUT,SELECT", !0) ? t.value : t.innerHTML)
}

function GEBI(e) {
    return document.getElementById(e)
}

function toggle_method() {
    var e = get_variable("method");
    "tukey" == e ? GEBI("k").value = 1.5 : "z" == e && (GEBI("k").value = 3)
}

function topFunction() {
    document.body.scrollTop = 0, document.documentElement.scrollTop = 0
}

function color1() {
    return ["#B8975B", "#BAAC5D", "#B6BC5E", "#A4BE60", "#91C062", "#7FC264", "#6DC466"]
}

function color2() {
    return ["#A7385F", "#AD3B38", "#B36938", "#BA9C38", "#55C67B", "#5ACBC4", "#6093CF"]
}

function color3() {
    return ["#304FFE", "#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845"]
}

function color_default() {
    return ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
}

function color_default2() {
    return ["#0000ff", "#FF0000", "#FFA500", "#008000", "#800080", "#add8e6", "#FFC0CB", "#90EE90"]
}

function color_red() {
    return ["#DC143C", "#FF0000", "#B22222", "#8B0000", "#CD5C5C", "#F08080", "#E9967A"]
}

function color_orange() {
    return ["#FF4500", "#FF7F50", "#FFA500", "#FFD700", "#FFDAB9"]
}

function color_blue() {
    return ["#6495ED", "#5F9EA0", "#1E90FF", "#0000FF", "#191970"]
}

function color_green() {
    return ["#00FF7F", "#3CB371", "#2E8B57", "#228B22", "#9ACD32"]
}

function color_yellow() {
    return ["#FFFF00", "#FFFACD", "#FFEFD5", "#FFDAB9", "#EEE8AA"]
}

function draw_gauge_power(e, t, r, n) {
    red_from = 0, red_to = 1 - 2 * n, yellow_from = 1 - 2 * n, yellow_to = 1 - n, green_from = 1 - n, green_to = 1, green_color = "#109618", yellow_color = "#FF9900", red_color = "#db6e54", draw_gauge_basic(e, t, r, red_from, red_to, yellow_from, yellow_to, green_from, green_to, green_color, yellow_color, red_color, 0, 1)
}

function draw_gauge_op(e, t, r, n) {
    green_from = 0, green_to = n, yellow_from = n, yellow_to = 2 * n, red_from = 2 * n, red_to = 1, green_color = "#DC3912", yellow_color = "#FF9900", red_color = "#109618", draw_gauge_basic(e, t, r, red_from, red_to, yellow_from, yellow_to, green_from, green_to, green_color, yellow_color, red_color, 0, 1)
}

function draw_gauge_effect2(e, t, r, n) {
    var o = effect_threshold(r);
    red_from = 0, red_to = o.t1, yellow_from = o.t1, yellow_to = o.t2, green_from = o.t2, green_to = 1, high_color = "#00994cd", medium_color = "#00ff00", low_color = "#eef27c", draw_gauge_basic(e, t, n, red_from, red_to, yellow_from, yellow_to, green_from, green_to, high_color, medium_color, low_color, o.from, o.to)
}

function draw_gauge_effect(e, t, r, n) {
    red_from = 0, red_to = .33, yellow_from = .3, yellow_to = .66, green_from = .6, green_to = 1, green_color = "#109618", yellow_color = "#53d17a", red_color = "#d8e6d3", draw_gauge_basic(e, t, r, red_from, red_to, yellow_from, yellow_to, green_from, green_to, green_color, yellow_color, red_color, 0, 1)
}

function draw_gauge_corr(e, t, r, n) {
    red_from = -.3, red_to = .3, yellow_from = -.66, yellow_to = .66, green_from = -1, green_to = 1, green_color = "#105096", yellow_color = "#6f74b5", red_color = "#b3b5d4", draw_gauge_basic(e, t, r, red_from, red_to, yellow_from, yellow_to, green_from, green_to, green_color, yellow_color, red_color, -1, 1)
}

function draw_gauge(e, t, r, n) {
    red_from = 0, red_to = 1 * n, yellow_from = 1 * n, yellow_to = 2 * n, green_from = 1 - 2 * n, green_to = 1, green_color = "#109618", yellow_color = "#FF9900", red_color = "#DC3912", draw_gauge_basic(e, t, r, red_from, red_to, yellow_from, yellow_to, green_from, green_to, green_color, yellow_color, red_color, 0, 1)
}

function draw_gauge_basic(e, n, t, o, a, i, l, s, u, c, d, f, h, m) {
    var p = [
        ["Label", "Value"],
        [e, 1 * t]
    ];
    google.charts.load("current", {
        packages: ["gauge"]
    }), google.charts.setOnLoadCallback(function () {
        var e = google.visualization.arrayToDataTable(p),
            t = new google.visualization.Gauge(document.getElementById(n)),
            r = {
                width: 200,
                height: 200,
                redFrom: o,
                redTo: a,
                yellowFrom: i,
                yellowTo: l,
                greenFrom: s,
                greenTo: u,
                minorTicks: 5,
                greenColor: c,
                yellowColor: d,
                redColor: f,
                min: h,
                max: m
            };
        t.draw(e, r)
    })
}

function array_to_2d(e) {
    for (var t = [], r = 0; r < e.length; r++) t.push([e[r]]);
    return t
}

function qq_data(e) {
    return qq_data_new(e, "Normal", {
        mean: 0,
        std: 1
    })
}

function qq_data_new(e, t, r) {
    xv = copy_2d_array(e), xv.sort(function (e, t) {
        return e - t
    });
    for (var n, o, a = measures(xv), i = 0, l = [
        [t, "Data"]
    ], s = Number(a.n), u = 2 * s, c = [], d = [], f = 0; f < s; f++) o = (xv[f] - a.average) / a.s, n = InvDistribution(t, (2 * f + 1) / u, r), l.push([n, o]), c.push(n), d.push(o), i += Math.abs(n - o);
    return i /= s, {
        data: l,
        correlation: jStat.corrcoeff(c, d),
        average_deviation: i
    }
}

function draw_qqplot(e, t, r) {
    var n = measures(r);
    draw_qqplot_new(e, t, r, "Normal", {
        mean: n.average,
        std: n.s
    })
}

function draw_qqplot_new(e, t, r, n, o) {
    var a = {
        title: e,
        hAxis: {
            title: "Data"
        },
        vAxis: {
            title: n
        },
        legend: {
            position: "bottom",
            maxLines: 2
        },
        colors: ["#ff4d00"],
        pointSize: 5,
        dataOpacity: .8,
        trendlines: {
            0: {
                type: "linear",
                degree: 3,
                color: "black",
                lineWidth: 2,
                showR2: !0,
                visibleInLegend: e
            }
        }
    };
    data = qq_data_new(r, n, o).data, draw_chart2("ScatterChart", data, t, a, !1, "png_qqplot")
}

function trendlines1() {
    return {
        0: {
            type: "linear",
            degree: 1,
            color: "black",
            lineWidth: 2,
            opacity: 1
        }
    }
}

function draw_chart2(n, o, a, l, s, u) {
    var c;
    for (null == u && (u = "png"), cols = o[0].length, rows = o.length, i = 0; i < rows; i++)
        for (j = 0; j < cols; j++) isNaN(Number(o[i][j])) || (o[i][j] = Number(o[i][j]));
    google.charts.load("current", {
        packages: ["corechart"]
    }), google.charts.setOnLoadCallback(function () {
        var e, t = google.visualization.arrayToDataTable(o, s),
            r = document.getElementById(a);
        "ScatterChart" == n ? e = new google.visualization.ScatterChart(r) : "AreaChart" == n ? e = new google.visualization.AreaChart(r) : "LineChart" == n ? e = new google.visualization.LineChart(r) : "ColumnChart" == n ? e = new google.visualization.ColumnChart(r) : "BubbleChart" == n ? e = new google.visualization.BubbleChart(r) : "BarChart" == n ? e = new google.visualization.BarChart(r) : "ComboChart" == n ? e = new google.visualization.ComboChart(r) : "CandlestickChart" == n ? e = new google.visualization.CandlestickChart(r) : "Histogram" == n ? e = new google.visualization.Histogram(r) : "PieChart" == n ? e = new google.visualization.PieChart(r) : debug.consol.error("chart_type is:" + n + " you should enter one of the following: 'ScatterChart', 'AreaChart', 'LineChart', 'ColumnChart','BubbleChart','Histogram' "), e.draw(t, l), google.visualization.events.addListener(e, "ready", function () {
            r.innerHTML = '<img src="' + e.getImageURI() + '">', console.log(r.innerHTML)
        }), (c = GEBI(u)) && (c.outerHTML = '<div id="' + u + '">Right click on: <a href="' + e.getImageURI() + '"> Save image</a>, (please use ' + b_tooltip("'save link as...'", "1. Right-click on &#39;save image &#39;<br>2. Save link as...<br>3. choose name and location<br> 4. Save</div>") + " or " + b_tooltip("'open link in new tab'", "1. Right-click on &#39;save image &#39;<br>2. Open link in new tab...<br>3. Click on the new tab<br>Right click on the chart, and press &#39;save image as&#39 <br>or<br> Press the ⋮  on the upper right corner and Print, Destination: &#39;Save as PDF&#39;") + ").", "function" == typeof jQuery && $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip()
        }))
    })
}

function debugBase64(e) {
    window.open().document.write('<iframe src="' + e + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
}

function find_minmax2(e, t, r) {
    var n = t,
        o = .001,
        a = findO(ODistribution, "type", e),
        i = ODistribution[a];
    if ("Chi-Square" == e || "F" == e || i.discrete || "weibull" == e) {
        if (find_minmax(.01, e, t, r, "Chi-Square" == e ? .1 : 1), min = r.min, max = r.max, i.discrete) {
            var l = df;
            o = .001;
            for (l = "binomial" == e ? n.df : 2 * n.df; max <= l && pdf(e, max, p) > o;) max++;
            for (; 0 < min && pdf(e, min, p) > o;) min--;
            delta2 = 1
        }
    } else max = "Normal2" == e ? (min = i.min * m + df, i.max * m + df) : (min = i.min, i.max);
    r.min = min, r.max = max
}

function find_minmax(e, t, r, n, o) {
    var a, i = findO(ODistribution, "type", t),
        l = ODistribution[i],
        s = 0;
    ccc = o * e;
    var u, c = l.minc,
        d = l.maxc,
        f = 0,
        h = 999;
    for (a = c;
        (h > ccc || 0 == s) && a <= d; a += 1)(h = pdf(t, a, r)) > ccc && 0 == s && (f = Math.round(a) - 1, s = 1);
    u = Math.round(a - 1), f <= 0 && 1e4 < pdf(t, 1e-10, r) && (f = .16), n.min = f, n.max = u
}

function findO(e, t, r) {
    for (var n = e.length, o = 0; o < n;) {
        if (e[o][t] == r) return o;
        o++
    }
    debug.error("didn't find object:" + r)
}

function draw_pvalue(e, t, r, n, o, a, i, l, s) {
    var u, c, d = show_parameters(v = i);
    "3" == l ? (u = "ninfinite", c = InvDistribution(a, 1 - n, i)) : "1" == l ? (u = InvDistribution(a, n, i), c = "infinite") : "2" == l && (c = InvDistribution(a, 1 - n / 2, i), u = InvDistribution(a, n / 2, i));
    var f, h;
    display_blocks(e, "block"), "U" != a && "Wilcoxon Signed" != a || (a = "Normal");
    var m = findO(ODistribution, "type", a),
        p = ODistribution[m],
        b = {
            min: 0,
            max: 0
        };
    find_minmax2(a, i, b);
    var _, g, w, y, x, k, M = ((h = b.max) - (f = b.min)) / 600,
        S = 1 * M,
        E = "p-value";
    _ = "both" == s ? [
        ["x", E, "1 - p-value", "statistic", "(α)"]
    ] : "pvalue" == s ? [
        ["x", E, "1 - p-value", "statistic"]
    ] : [
        ["x", "1 - α", "statistic", "(α)"]
    ];
    for (var F = f; F < h; F += M) {
        var T = pdf(a, F, i);
        y = F <= o + S && o - S <= F ? (x = T, w = g = 0) : (F <= u || c <= F) && "2" == l || F <= u && "1" == l || c <= F && "3" == l ? (x = w = 0, g = T) : (x = g = 0, w = T), (F <= t || r <= F) && "2" == l || F <= t && "1" == l || r <= F && "3" == l ? (k = T, "both" != s && "alpha" != s || (w = 0), "alpha" == s && (y = 0)) : k = 0, "both" == s ? _.push([F, g, w, x, k]) : "pvalue" == s ? _.push([F, g, w, x]) : "alpha" == s && _.push([F, y, x, k])
    }
    draw_chart2("AreaChart", _, e, {
        title: "Distribution: " + a + d,
        legend: {
            position: "bottom",
            maxLines: 2
        },
        colors: "alpha" == s ? ["green", "black", "red"] : ["blue", "green", "black", "red"],
        opacity: .2,
        isStacked: !!p.discrete
    }, !(series1 = "true"))
}

function toggle_insert() {
    GEBI("manual").checked ? (display_blocks("insertSampleManual,insertSample", "block"), display_blocks("insertSampleExcel,insertSample2,results,buttons1", "none")) : GEBI("excel").checked ? (display_blocks("insertSampleExcel,insertSample2", "block"), display_blocks("insertSampleManual,insertSample,results,buttons1", "none")) : (display_blocks("results,buttons1", "block"), display_blocks("insertSampleManual,insertSampleExcel,skew1,skew2,npval1,out1,out2,row_x", "none"), clear_text("outliers_count1"), deleteText("norm_pval1"), deleteText("outlier1"), cal_sam = "no")
}

function focus(e) {
    GEBI(e).scrollIntoView()
}
xrd = xround, window.smoothScroll = function (e) {
    var t = e;
    do {
        if (!(t = t.parentNode)) return;
        t.scrollTop += 1
    } while (0 == t.scrollTop);
    var r = 0;
    do {
        if (e == t) break;
        r += e.offsetTop
    } while (e == e.offsetParent);
    scroll = function (e, t, r, n) {
        30 < (n += 1) || (e.scrollTop = t + (r - t) / 30 * n, setTimeout(function () {
            scroll(e, t, r, n)
        }, .001))
    }, scroll(t, t.scrollTop, r, 0)
};
var hb = hbold;

function hbold(e) {
    return "<b>" + e + "</b>"
}

function exclude_outliers_color() {
    var e = GEBI("exclude_outliers");
    "true" == e.value ? e.classList.add("red_back") : e.classList.remove("red_back")
}

function html_color(e, t, r) {
    "object" != typeof r && (r = [" green1", " yellow1", " red1"]);
    for (var n = "", o = t.length, a = 0; a < o; a++)
        if (e <= t[a]) {
            n = r[a];
            break
        }
    return "" == n && (colors1 = r[o]), "<span '" + r[a] + "'>" + e + "</span>"
}

function html_array_color(e, t, r) {
    for (var n = 0; n < e.length; n++)
        if (Array.isArray(e[n]))
            for (var o = 0; o < e[n].length; o++) e[n][o] = html_color(e[n][o], t, r);
        else e[n] = html_color(e[n], t, r)
}

function td_up(e) {
    return '<td class="text-center border-bottom border-dark">' + e + "</td>"
}

function td_up2(e) {
    return '<td class="text-center" rowspan="2">' + e + "</td>"
}

function td_do(e) {
    return '<td class="text-center">' + e + "</td>"
}

function html_frac(e) {
    for (var t = "<tr>", r = "<tr>", n = 0; n < e[0].length; n++) "" == e[1][n] ? t += td_up2(e[0][n]) : (t += td_up(e[0][n]), r += td_do(e[1][n]));
    return "<table class='my-1'><tbody>" + (t += "</tr>") + (r += "</tr>") + "</tbody></table>"
}

function array_headers(e, t, r, n) {
    var o = copy_2d_array(r),
        a = copy_2d_array(n),
        l = copy_2d_array(e);
    for (i = 0; i < l.length; i++) l[i].unshift(a[i]);
    return o.unshift(t), l.unshift(o), l
}

function html_table1(e, t, r, n, o, a, i, l) {
    return html_table(e, t, r, n, "def", "def", "def", o, "def", a, i, l, "", .05, "")
}

function html_table(e, t, r, n, o, a, i, l, s, u, c, d, f, h, m) {
    void 0 === m && (m = ""), null == d && (d = !0), "def" == n && (n = "table table-bordered table-sm bg-light-white"), "def" == s && (s = "tableLeft"), "def" == l && (l = ""), "def" == a && (a = ""), "def" == o && (o = "bg-primary-white"), "def" == i && (i = ""), "number" == typeof c && (c = [
        [c, 1 * h, "red1", 2 * h, "yellow1", "green1"]
    ]);
    var p, b, _, g, v, w, y = r.length,
        x = r[0].length,
        k = m,
        M = "";
    if ("" != f)
        for (p = 0; p < y; p++)
            for (b = 0; b < x; b++) r[p][b] = xround(r[p][b], f);
    for (d && (k += "<div class='table-responsive'>"), k += "<table class='" + n + "' id='" + u + "'>", p = 0; p < y; p++) {
        for (g = 0 == p ? "<tr class='" + o + "'>" : p == y - 1 ? "<tr class='" + i + "'>" : "<tr>", b = 0; b < x; b++) {
            if (_ = s, 0 != p && 0 != b) {
                w = "";
                for (var S = 0; S < c.length && S <= b; S++) c[S][0] == b && (checkVal(v = 1 * r[p][b]) && (w = v < c[S][1] ? c[S][2] : v < c[S][3] ? c[S][4] : c[S][5]), 0 < w.length && (_ += " " + w))
            }
            0 == b ? _ += " " + l : b == x - 1 && (_ += " " + a), M = 0 < _.length ? " class='" + _ + "' " : "", g += 0 == p ? "<th " + M + ">" + r[p][b] + "</th>" : "<td " + M + ">" + r[p][b] + "</td>"
        }
        k += g += "</tr>"
    } (k += "</table>", d && (k += "</div>"), e) && (document.getElementById(t).innerHTML = k, display_blocks(t, "block"));
    return k
}

function printDivs(e) {
    for (var t = e.split(","), r = "", n = 0; n < t.length; n++) r += document.getElementById(t[n]).innerHTML;
    var o = document.body.innerHTML;
    document.body.innerHTML = r, window.print(), document.body.innerHTML = o
}

function printDiv(e) {
    var t = document.getElementById(e).innerHTML,
        r = document.body.innerHTML;
    document.body.innerHTML = t, window.print(), document.body.innerHTML = r
}

function print_page(e) {
    display_blocks(e, "none"), window.print(), display_blocks(e, "block")
}

function more(e, t, r, n, o, a, l, s) {
    var u = "";
    const1 = Math.ceil(t / 2);
    var c = e.length;
    for (void 0 !== r && 0 != r.length || (r = "+"), void 0 === n && (n = ""), void 0 === o && (o = ""), void 0 === l && (l = "calculate_sd()"), void 0 === s && (l = ""), s = "GEBI('" + s + "').scrollIntoView();", i = 0; i < c; i++) {
        var d = ' <button id="more" onclick="plus(); ' + l + "; " + s + '" type="button" class="mb-1 btn btn-primary " style="border-radius:10px; height: 15px; padding: 2px 10px 0px 10px;"><b>˙˙˙</b></button> +';
        i < const1 || i > c - const1 - 1 ? (u += n + e[i] + o, i < c - 1 && (u += r)) : i == const1 && (u += d)
    }
    return u
}

function plus() {
    var e = GEBI("elements");
    e.value = 1 * e.value + 2
}

function toggle_options() {
    GEBI("options_btn").checked ? display_blocks("options", "") : display_blocks("options", "none")
}

// function toggle_options2() {
//     "More" == get_variable("more").substr(0, 4) ? (display_blocks("options", ""), set_variable("more", "Less options\t&#9650;")) : (display_blocks("options", "none"), set_variable("more", "More options &#x25BC;"))
// }

function like() {
    return '<div class="fb-like" data-href="http://www.statskingdom.com/" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>', '<span class="num_col">If you like the page, please share or like. Questions, comments and suggestions are appreciated. (statskingdom@gmail.com)</span><br><div class="fb-like" data-href="http://www.statskingdom.com/" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>'
}

function html_field(e, t, r, n, o, a, i, l) {
    "def" != n && "" != n || (n = "col-md-6"), "def" != a && "" != a || (a = "number"), "def" != r && "" != r || (r = "input");
    var s = "<div class='form-group " + n + "'>";
    if (s += "<label for='" + e + "' >", s += "" == i ? t : b_tooltip(t, i, l), s += "</label>", "input" == r) s += "<input class='form-control' type='" + a + "' value='" + o + "' id='" + e + "'>";
    else if ("select" == r) {
        s += '<select id="' + e + '" class="form-control">';
        for (var u = 1; u < o.length; u++) s += "<option>" + o[u] + "</option>";
        s += "</select>"
    }
    return s += "</div>"
}

function html_fields2(e, t, r, n) {
    for (var o = "", a = e.split(","), i = t.split(","), l = r.split(","), s = n.split(","), u = 0; u < fld.length; u++) {
        o += hfld(fld[u], dsc[u]);
        o += html_field(i[u], l[u], a[u], "col-md-6", s[u], "number", "", "")
    }
    return o
}

function tooltip_refresh() {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}
var b_t = b_tooltip;

function b_tooltip(e, t, r) {
    return null != r && "" != r || (r = "text-info"), "<span class='d-inline-block' tabindex='0' data-toggle='tooltip' data-html='true' title='" + t + "'>" + ("" == r ? e : "<span class='" + r + "'>" + e + "</span>") + "</span>"
}
var PI = Math.PI,
    PID2 = PI / 2,
    delta5 = 1e-15,
    max_n = 1e3;

function normal_distribution(e) {
    return e < 0 ? e < -10 ? 0 : chi_distribution(e * e, 1) / 2 : 10 < e ? 1 : 1 - chi_distribution(e * e, 1) / 2
}

function normal_distribution_2t(e) {
    var t = e * e;
    return 7 < ABS(e) ? (1 - 1 / t + 3 / (t * t)) * EXP(-t / 2) / (ABS(e) * SQRT(PID2)) : chi_distribution(t, 1)
}

function chi_distribution(e, t) {
    if (max_n < e | max_n < t) {
        var r = normal_distribution_2t((POWER(e / t, 1 / 3) + 2 / (9 * t) - 1) / SQRT(2 / (9 * t))) / 2;
        return t < e ? r : 1 - r
    }
    var n = EXP(-.5 * e);
    t % 2 == 1 && (n *= SQRT(2 * e / PI));
    for (var o = t; 2 <= o;) n = n * e / o, o -= 2;
    for (var a = n, i = t; delta5 * n < a;) n += a = a * e / (i += 2);
    return 1 - n
}

function ABS(e) {
    return Math.abs(e)
}

function SQRT(e) {
    return Math.sqrt(e)
}

function EXP(e) {
    return Math.exp(e)
}

function POWER(e, t) {
    return Math.pow(e, t)
}
var log = Math.log,
    log10 = Math.log10,
    exp = (pow = Math.pow, Math.exp);

function ATAN(e) {
    return Math.atan(e)
}

function SIN(e) {
    return Math.sin(e)
}

function COS(e) {
    return Math.cos(e)
}

function toObject(e) {
    for (var t = {}, r = 0; r < e.length; ++r) t[r] = e[r];
    return t
}

function toString(e) {
    for (var t = "", r = 0; r < e.length; ++r) Array.isArray(e[r]) ? t += "[" + e[r] + "]" : t += e[r], r < e.length - 1 && (t += ", ");
    return t
}

function standardized_1D(e) {
    n = e.length;
    for (var t = [], r = measures0(e), o = 0; o < n; o++) t[o] = (e[o] - r.average) / r.s;
    return t
}

function stat_loop(e, t, r, n) {
    for (var o = 1, a = o, i = t; i <= r;) a += o = o * e * i / (i - n), i += 2;
    return a
}

function t_distribution_2t(e, t) {
    var r = ATAN((e = ABS(e)) / SQRT(t));
    if (1 == t) return 1 - r / PID2;
    var n = SIN(r),
        o = COS(r);
    return t % 2 == 1 ? 1 - (r + n * o * stat_loop(o * o, 2, t - 3, -1)) / PID2 : 1 - n * stat_loop(o * o, 1, t - 3, -1)
}

function inv_normal_distribution(e) {
    return 0 == e ? .5 : .5 < e ? SQRT(inv_chi_distribution(2 * (1 - e), 1)) : -SQRT(inv_chi_distribution(2 * e, 1))
}

function inv_chi_distribution(e, t) {
    for (var r = .5, n = .5, o = 0; delta5 < n;) n /= 2, chi_distribution(o = 1 / r - 1, t) > e ? r -= n : r += n;
    return o
}

function linear_int(e, t, r, n, o) {
    return t + (e - r) * (n - t) / (o - r)
}

function exp_int(e, t, r, n, o) {
    return v = exp((e * (log(r) - log(o)) + t * log(o) - n * log(r)) / (t - n)), v
}

function exp_int_3(e, t, r, n, o) {
    return v = r * POWER(o / r, (e - t) / (n - t)), v
}

function exp_int2(e, t, r, n, o) {
    return v = o + (exp(e) - exp(n)) * (r - o) / (exp(t) - exp(n)), v
}

function log_int(e, t, r, n, o) {
    return t + (log(e) - log(r)) * (n - t) / (log(o) - log(r))
}

function harm_int(e, t, r, n, o) {
    return o + (1 - (1 / t - 1 / e) / (1 / t - 1 / n)) * (r - o)
}

function log_int2(e, t, r, n, o) {
    return t + (log(e) - log(r)) / (log(o) - log(r)) * (n - t)
}

function display_blocks(e, t) {
    for (var r = e.split(","), n = 0; n < r.length; n++) {
        var o = document.getElementById(r[n]);
        null != o && (o.style.display = t)
    }
}

function delete_list(e) {
    e = e.split(",");
    for (var t = 0; t < e.length; t++) deleteText(e[t])
}

function adj_table_rows(e, t, r) {
    var n, o = document.getElementById(e).rows.length - 1;
    if (o < r)
        for (n = o; n < r; n++) insert_row_good(1, e);
    else if (r < o)
        for (n = o; r < n; n--) delete_row(e, 1)
}

function adj_table_col(e, t) {
    adj_table_columns_new(e, 0, t - 1)
}

function adj_table_columns_new(e, t, r, n) {
    var o, a = document.getElementById(e).rows[0].cells.length - 1;
    if (a < r)
        for (o = a; o < r; o++) insert_column(e, 0, n);
    else if (r < a)
        for (o = a; r < o; o--) delete_col(e, 1, -1, 1)
}

function get_local_to_variable(e, t) {
    if (enable_local()) {
        var r = e.substring(0, 3),
            n = get_data_name();
        return JSON.parse(localStorage.getItem(r + n + t))
    }
}

function insert_row_good(e, t) {
    void 0 === t && (t = "table1"), insert_row(e, t);
    var r = document.getElementById(t).rows.length;
    id0 = "x" + (r - 3) + "-0", id = "x" + (r - 2) + "-0";
    var n = document.getElementById(id0),
        o = document.getElementById(id);
    o.value = next_number(n.value, "-"), o.className = "form-control font-weight-bold"
}

function insert_row(e, t) {
    void 0 === t && (t = "table1");
    for (var r = document.getElementById(t), n = r.rows.length, o = r.rows[0].cells.length, a = 0; a < e; a++) {
        for (var i = r.insertRow(n + 0), l = 0; l < o; l++) {
            i.insertCell(l).innerHTML = '<input type="text" class="form-control" id="x' + (n - 1) + "-" + l + '"/>'
        }
        n += 1
    }
    var s = "x" + (n - 2) + "-0",
        u = "x" + (n - 1 - e) + "-0";
    document.getElementById(s).focus(), document.getElementById(u).focus()
}

function delete_row(e, t) {
    var r = document.getElementById(e),
        n = r.rows.length;
    t < n ? r.deleteRow(n - 1) : alert("You can't delete more rows")
}

function insert_column(e, t, r) {
    var n = document.getElementById(e);
    null == n && (n = document.getElementById("table1"));
    for (var o = n.rows.length, a = n.rows[0].cells.length - t, i = 0; i < o; i++) {
        var l = n.rows[i].insertCell(a),
            s = n.rows[i].cells[a - 1].innerHTML;
        9222 !== i && (s = next_id_number(s, r)), l.innerHTML = s;
        var u = GEBI("h" + (i + 2));
        null != u && 0 < u.placeholder.length && (u.placeholder = next_number1(u.placeholder, "-"))
    }
    var c = "inc" + (a + t - 1);
    null != document.getElementById(c) && color(c)
}

function next_number(e, t) {
    var r = !1,
        n = !1,
        o = "",
        a = "";
    for (i = 0; i < e.length; i++)
        if (e[i] == t && (r = !0), r && !n && isNumber(e[i])) {
            for (; isNumber(e[i]);) a += e[i], i++;
            o += 1 * a + 1, n = !0
        } else o += e[i];
    return o
}

function next_number1(e, t) {
    var r = !1,
        n = !1,
        o = "",
        a = "";
    for (i = 0; i < e.length; i++)
        if (e[i] == t && (r = !0), r && !n && isNumber(e[i])) {
            for (; isNumber(e[i]);) a += e[i], i++;
            o += 1 * a + 1, n = !0, i--
        } else o += e[i];
    return o
}

function next_id_number(e, t) {
    var r, n = !0;
    for (r = e.search('id="') + 4; r < e.length && n && '"' != e[r]; r++) e[r] == t && (n = !1);
    n && (t = "");
    var o = "",
        a = "",
        i = !1,
        l = !1,
        s = 0;
    for (t || (l = !0), r = 0; r < e.length; r++) '"' == e[r] && "=" == e[r - 1] && "d" == e[r - 2] && "i" == e[r - 3] || ">" == e[r] && s < 2 ? (i = !0, s++) : "<" != e[r] && '"' != e[r] || (i = !1, "" != a && (o += 1 * a + 1, a = "")), e[r - 1] == t && i && (l = !0), i && l && (isNumber(e[r]) || isNumber(e[r - 1])) ? isNumber(e[r]) ? a += e[r] : (o += 1 * a + 1 + e[r], a = "") : o += e[r];
    return "" != a && (o += 1 * a + 1), o
}

function delete_col(e, t, r, n) {
    var o = document.getElementById(e).rows,
        a = o[0].cells.length - n,
        i = o[0].cells.length + r;
    if (t < a)
        for (var l = 0; l < o.length; l++) o[l].deleteCell(i)
}

function toggle_blocks(e, t, r) {
    var n = document.getElementById(e),
        o = document.getElementById(t);
    document.getElementById(r)[0].checked ? (n.style.display = "block", o.style.display = "none") : (n.style.display = "none", o.style.display = "block")
}

function binomcoefln(e, t) {
    for (var r = 0, n = e - t + 1; n <= e; n++) r += log(n);
    for (n = 1; n <= t; n++) r -= log(n);
    return r
}

function isNumber(e) {
    return !isNaN(e) && "" != e && -1 == e.indexOf(" ")
}