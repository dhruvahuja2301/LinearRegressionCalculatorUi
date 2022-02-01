function load1() {
    set_variable("c0", "9.8\n3.8\n6.0\n0.9\n5.4\n1.4\n16.2\n19.5\n2.1\n0.94\n43.80 \n3.9\n1.7"), set_variable("c1", "7.6\n1.7\n2.4\n0.49\n4.7\n1.4\n12.20\n10.8\n3.27\n2.16\n28.3\n2.0\n1.41\n")
}

function toggle_options() {
    GEBI("options_btn").checked ? display_blocks("options", "block") : display_blocks("options", "none")
}

function rerun_after() {
    "" != GEBI("Distribution1").innerHTML && (calculate_simple_regression(), GEBI("Distribution1").scrollIntoView())
}

function calculate_simple_regression() {
    display_blocks("remark", "none"), display_blocks("results2", "block"), set_local("400", "k,add_trend,alpha,change,digits,use_alpha,steps,c0,c1,h0,h1", "");
    var e, s, r, t = get_var("add_trend"),
        o = get_var("k"),
        n = GEBI("steps").checked,
        u = GEBI("force_zero").checked,
        l = get_variable("use_alpha"),
        i = get_var("h0"),
        b = get_var("h1"),
        p = "",
        d = get_variable("alpha"),
        h = get_variable("change"),
        c = get_variable("change_type"),
        g = get_variable("digits");
    input1 = get_columns("tab1", 0, 1), (r = input1.table)[0].length != r[1].length && alert("Please enter equal number of X's and Y's. You entered X:" + r[0].length + ", Y:" + r[1].length);
    var _, v = pure_simple_regression(r, d, u, g, o),
        m = v.anova,
        f = v.test;
    "f" == c ? _ = Math.pow(h, 2) : "f2" == c ? _ = h : "r2" == c ? _ = h / (1 - h) : debug.error("Change type must be one of the following: f,f2,r2. currently it is: " + c);
    var S, x = regression_power(v.n, 1, _, d, "regression", u);
    set_variable("c2", v.HTML.pred_y), set_variable("c3", v.HTML.residuals), display_blocks("h2,h3,c2,c3", "block"), v.test.pvalue < d && (p = i + " predicted " + b + ", "), set_variable("report1", p + v.report), set_variable("message", regression_message(v, d, u, g)), draw_pvalue("Distribution1", v.test.left_cval, v.test.right_cval, v.test.pvalue, v.test.F, "F", {
        df1: 1,
        df2: v.anova.DFE
    }, 3, l), S = t ? trendlines1() : "";
    var y = {
        title: "Residuals histogram",
        colors: ["#9ed21c"],
        dataOpacity: .6,
        legend: "none"
    };
    draw_chart2("Histogram", v.e_array2, "Histogram1", y, !1), y = {
        title: "Line Fit Plot",
        series: {
            0: {
                pointSize: 6,
                pointShape: "triangle"
            },
            1: {
                pointSize: 5
            }
        },
        colors: ["red", "blue"],
        dataOpacity: 1,
        trendlines: S,
        hAxis: {
            title: "X"
        },
        vAxis: {
            title: "Y"
        }
    }, draw_chart2("ScatterChart", v.xy, "linear1", y, !1), y = {
        title: "Residual Plot",
        colors: ["green"],
        pointSize: 5,
        trendlines: S,
        hAxis: {
            title: "X"
        },
        vAxis: {
            title: "Residuals"
        },
        legend: "none"
    }, draw_chart2("ScatterChart", v.xe, "residuals", y, !1), draw_gauge_op("F P-value", "gauge1", f.pvalue, d), draw_gauge_effect("R Square", "gauge2", v.r2, .1), draw_gauge_corr("Correlation", "gauge3", v.r, .1), draw_gauge("SW P-value", "gauge4", v.SW.pvalue, d), draw_gauge_power("Power", "gauge5", x.power, .2), draw_qqplot("Residuals: QQ - Plot", "curve_chart3", r[3]), s = 0 <= a ? " + " : " - ", e = "<b>Ŷ = " + xround(v.b0, g) + s + xround(Math.abs(v.b1), g) + "X  </b><br/><br/>", set_variable("formula1", e);
    html_table1(!0, "stable1", v.step_table, "table table-bordered table-sm white_backgroud overflow_bw", "tableLeft", "", "", div = !1);
    n && set_variable("step_message", v.step_message);
    anova_table(!0, "anova1", m.SST, m.SSR, m.SSE, m.DFT, m.DFR, m.DFE, m.MSR, m.MSE, f.F, f.pvalue, d, g, "regression", u);
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip()
    }), GEBI("start").scrollIntoView(), gtag("event", "Regression", {
        event_category: "linear_regression",
        event_label: "simple_linear_regression",
        value: v.ms_res.n
    })
}

function pure_simple_regression(e, s, r, t, o) {
    var n, u, l, i, p, d, h, c, g, _, v, m, f, S, x, y, w, M, T, k, F, R, E, z = measures(e[0]),
        X = measures(e[1]),
        D = z.average,
        q = X.average,
        I = z.s,
        Y = X.s,
        G = Math.pow(I, 2),
        C = Math.pow(Y, 2),
        P = 0,
        B = 0,
        H = 0,
        L = "",
        W = 0,
        j = 0,
        O = 0,
        A = [],
        V = [
            ["X", "e"]
        ],
        Q = [
            ["value"]
        ],
        $ = "",
        J = "",
        K = "",
        N = "",
        U = "",
        Z = "",
        ee = z.n;
    for (h = 0; h < ee; h++) r ? (m = e[0][h], P += x = e[0][h] * e[1][h], B += Math.pow(e[0][h], 2)) : (P += x = (m = e[0][h] - D) * (S = e[1][h] - q), K += xround(m, t) + "\n", N += xround(S, t) + "\n"), f = Math.pow(m, 2), U += xround(f, t) + String.fromCharCode(10), Z += xround(x, t) + String.fromCharCode(10);
    if (W = X.ss, l = z.ss, r || (B = l), a = P / B, r) {
        for (h = W = b = 0; h < ee; h++) O += Math.pow(e[1][h] - a * e[0][h], 2), W += Math.pow(e[1][h], 2);
        j = W - O, r2 = 1 - O / W, w = ee - 1, y = ee
    } else b = q - a * D, r2 = Math.pow(a, 2) * (G / C), O = W - (j = W * r2), w = ee - 2, y = ee - 1;
    H = Math.pow(r2, .5), a < 0 && (H = -H), i = j / (O / w), M = O / w, T = Math.sqrt(M), _ = xround(a, t), r ? (u = [
        ["x<sup>2</sup>", "xy"],
        [U, Z],
        [hbold(xround(B, t)), hbold(xround(P, t))]
    ], L += "Ŷ = b<sub>1</sub>X<br>", L += html_frac([
        ["b<sub>1</sub> = ", "Σx<sub>i</sub>y<sub>i</sub>"],
        ["", "Σx<sub>i</sub><sup>2</sup>"]
    ])) : (u = [
        ["x-x̄", "y-ȳ", "(x-x̄)<sup>2</sup>", "(x-x̄)(y-ȳ)"],
        [K, N, U, Z],
        [0, 0, hbold(xround(l, t)) + " (SS<sub>x</sub>)", hbold(xround(P, t)) + " (SP<sub>xy</sub>)"]
    ], L += "Ŷ = b<sub>0</sub> +b<sub>1</sub>X<br>", L += html_frac([
        ["b<sub>1</sub> = ", "SP<sub>xy</sub>", " = ", "Σ(x<sub>i</sub>-x̄)(y<sub>i</sub>-ȳ)"],
        ["", "SS<sub>x</sub>", "", "Σ(x<sub>i</sub>-x̄)<sup>2</sup>"],
        [hbold(xround(B, t)), hbold(xround(P, t))]
    ])), L += html_frac([
        ["b<sub>1</sub> = ", xround(P, t), " = " + _],
        ["", xround(B, t), ""]
    ]), E = r ? (F = "&Sigma; ŷ<sub>i</sub><sup>2</sup>", R = "&Sigma; y<sub>i</sub><sup>2</sup>", "'") : (L += "b<sub>0</sub> = ȳ - b<sub>1</sub>x̄<br>", L += "x̄ = " + xround(D, t) + "<br>", L += "ȳ = " + xround(q, t) + "<br>", L += "b<sub>0</sub> = " + xround(q, t) + " " + -_ + "*" + xround(D, t) + " = " + xround(b, t) + "<br>", F = "&Sigma;( ŷ<sub>i</sub> - ȳ)<sup>2</sup>", R = "&Sigma;( y<sub>i</sub> - ȳ)<sup>2</sup>", ""), L += html_frac([
        ["R<sup>2</sup> = ", "SS" + E + "<sub>Regression</sub>", "=", F, "=", xround(j, t), "= " + xround(r2, t)],
        ["", "SS" + E + "<sub>total</sub>", "", R, "", xround(W, t), ""]
    ]), L += "The standard deviation of the residuals is:<br>", L += html_frac([
        ["S<sup>2</sup><sub>res</sub> = ", "&Sigma;( y<sub>i</sub> - ŷ)<sup>2</sup>"],
        ["", "n - 2"]
    ]), L += "<b><u>Residual outliers</u></b><br>", L += "S<sub>res</sub> = √MSE = √" + xrd(M, t) + " = " + xrd(T, t) + ".<br>", n = C * (1 - r2) * (ee - 1) / (ee - 2) / (G * (ee - 1)), p = a / Math.pow(n, .5);
    var se = Math.pow(M * (1 / ee + Math.pow(D, 2) / l), .5);
    d = b / se, T_b_pval = 2 * (1 - jStat.studentt.cdf(d, w)), display_blocks("Distribution1", "block"), type = "F", test = "400_regression";
    var re = 1 - jStat.centralF.cdf(i, 1, w),
        ae = jStat.centralF.inv(1 - s, 1, w);
    k = j / 1, M = O / w;
    var te = [],
        oe = [];
    for (xy = [
            ["X", "Ŷ", "Y"]
        ], h = 0; h < ee; h++) {
        var ne = b + a * e[0][h],
            ue = 1 * xround(e[1][h] - ne, t);
        A.push(ue.toString()), Q.push([ue]), xy.push([1 * e[0][h], ne, 1 * e[1][h]]), V.push([1 * e[0][h], ue]), te.push(ne.toString()), oe.push(ue.toString()), $ += xround(ne, t) + String.fromCharCode(10)
    }
    var le, ie = measures(oe),
        be = calculate_fence(oe, 1.5),
        pe = "",
        de = 0,
        he = "",
        ce = 0;
    for (c = -(g = o * T), L += "The average of the residulas is always zero.<br>", L += "The outliers thresholds are: &plusmn;k*S<sub>res</sub>.<br>", L += "Thresholds = &plusmn;" + o + "*" + xrd(T, t) + " = &plusmn;" + xrd(g, t) + ".<br>", h = 0; h < ee; h++)(oe[h] < be.lower || oe[h] > be.upper) && (0 != pe.length && (pe += ","), pe += xround(oe[h], t), de++), oe[h] < c || oe[h] > g ? (le = xround(oe[h], t) + " ⇐", 0 != he.length && (he += ","), he += xround(oe[h], t), ce++) : le = xround(oe[h], t), J += le + String.fromCharCode(10);
    0 < ce && (L += "We tagged the outliers  with an arrow (⇐) at the 'Residual' column."), e[2] = te, e[3] = oe;
    var ge = {
            SST: W,
            SSR: j,
            SSE: O,
            DFT: y,
            DFR: 1,
            DFE: w,
            MSR: k,
            MSE: M
        },
        _e = {
            residuals: J,
            pred_y: $
        },
        ve = {
            F: i,
            pvalue: re,
            accepted: s < re,
            right_cval: ae,
            left_cval: "ninfinite"
        },
        me = sw_test(e[3]);
    return v = "<i>R</i><sup>2</sup> = " + xrd2(r2, 2) + ", <i>F</i>(1," + w + ") = " + xrd(ve.F, 2) + ", " + apa_pval(ve.pvalue) + ".<br>", {
        report: v += "β = " + xrd2(a, 2) + ", " + apa_pval(ve.pvalue) + ".",
        HTML: _e,
        test: ve,
        anova: ge,
        SW: me,
        e_array: A,
        e_array2: Q,
        xy: xy,
        xe: V,
        r: H,
        r2: r2,
        b1: a,
        b0: b,
        n: ee,
        outliers: pe,
        outliers_count: de,
        z_outliers: he,
        z_outliers_count: ce,
        ms_res: ie,
        Ta: p,
        Tb: d,
        Tb_pvalue: T_b_pval,
        step_message: L,
        step_table: u
    }
}

function pval_short_msg(e, s, r, a, t, o) {
    var n, u, l;
    return 1 * t < 1 * o ? (u = !1, l = "is", "&lt;") : (u = !0, l = "is not", "&ge;"), n = e + ": " + s + "-tailed, " + r + " = <span class='num_col'>" + a + "</span>, p-value = <span class='num_col'>" + t + "</span>. Hence b " + l + " significantly different from zero. ", u && (n += "It is still most likely recommended not to force b to be zero.<br>"), n
}

function pval_short_msg2(e, s, r, a, t, o, n, u, l) {
    var i, b, p, d, h, c, g, _, v, m = "";
    return v = l ? (_ = "", g = " without intercept", "0") : (_ = "b<sub>0</sub>+ ", g = "", "b<sub>0</sub>"), "linear" == e ? (c = "<b>Y = ", d = "The linear regression model" + g + ", ", h = " resulting in, <b>Y = " + v + " + &epsilon;</b>.<br/>") : "logistic" == e && (c = "<b>ln(odds) = ", d = "The logistic regression model with ", h = " resulting in, <b>ln(odds) = b<sub>0</sub></b>.<br/>"), yax = 2 < u ? (m = "s", c + _ + "b<sub>1</sub>X<sub>1</sub> +...+b<sub>p</sub>X<sub>p</sub> + &epsilon;</b>") : c + _ + "b<sub>1</sub>X + &epsilon;</b>", p = 1 * o < 1 * n ? (b = "reject", "is", i = "&lt;", "provides") : (b = "accept", "is", i = "&ge;", "doesn't provide"), s + ": " + r + "-tailed, " + a + " = <span class='num_col'>" + t + "</span>, p-value = <span class='num_col'>" + o + "</span>. Since p-value " + i + " &alpha; (" + n + "), we " + b + " the H<sub>0</sub>.<br>" + (d + yax + ", " + p + " a better fit than the model without the independent variable" + m + h)
}

function msg_5outlier(e, s, r, a, t, o, n, u) {
    var l, i, b, p, d = "<h5 style='color:black;'>" + e + ". Outliers</h5><p>";
    if (l = .05 < n || "" == n ? (i = "In this case,", b = ". Therefore,", "is") : (i = "If", b = ", then", "would be"), 0 == a) d += "The data does not contain any outliers.";
    else if (p = 1 == a ? "" : "s", d += "Outliers may affect the regression line.<br>", "z" == s) {
        var h = 2 * jStat.normal.cdf(-o, 0, 1),
            c = jStat.binomial.cdf(Math.max(a - 1, 0), t, h);
        d += i + " the distribution of the residuals is normal" + b + " the probability of detecting " + a + " valid outlier" + p + " or more " + l + " " + xround(c, u) + ", (outlier" + p + ": " + r + ").<br>", d += "<span class='text-danger'>You should only remove outliers if you identify them as errors!</span>"
    }
    return d += "</p>"
}

function r_msg(e) {
    var s = Math.abs(e);
    return {
        strength: s < .2 ? "very weak" : s < .4 ? "weak" : s < .6 ? "moderate" : s < .8 ? "strong" : "very strong",
        direction: e < 0 ? "inverse" : "direct"
    }
}

function regression_message(e, s, r, a) {
    e.n;
    var t, o, n = r_msg(e.r);
    t = e.SW.pvalue >= s, sw_but1 = t ? ("not ", o = "") : (o = "not ", "", "but"), 0 <= e.b1 ? plus1 = "+" : plus1 = "-";
    var u = "<h5 style='color:black;'>1. Y and X relationship</h5><p>";
    return u += "R Square (R<sup>2</sup>) equals <b><span class='num_col'>" + xround(e.r2, a) + "</span>.</b> It means that " + xround(100 * e.r2, 1) + "% of the variability of Y is explained by X.<br/>", u += "correlation (R) equals <b><span class='num_col'>" + xround(e.r, a) + "</span></b>. It means that there is a <b>" + n.strength + " " + n.direction + " relationship</b> between X and Y.</p>", u += "<h5 style='color:black;'>2. Goodness of fit</h5><p>", u += pval_short_msg2("linear", "Overall regression", "right", "F(1," + e.anova.DFE + ")", xround(e.test.F, a), xround(e.test.pvalue, a), s, 1, r), r || (u += "The Slope (a): two-tailed, T(" + e.anova.DFE + ")=<span class='num_col'>" + xround(e.Ta, a) + "</span>, p-value = <span class='num_col'>" + xround(e.test.pvalue, a) + "</span>. For one predictor it is the same as the p-value for the overall model.<br>", u += pval_short_msg("The Y-intercept (b)", "two", "T(" + e.anova.DFE + ")", xround(e.Tb, a), xround(e.Tb_pvalue, a), s) + ""), u += "<h5 style='color:black;'>3. Residual normality</h5><p>", u += "The linear regression model assumes normality for residual errors. ", u += "Shapiro will p-value equals <span class='num_col'>" + xround(e.SW.pvalue, a) + "</span>. ", u += "It is assumed that the data is " + o + " normally distributed.", t || (100 <= e.n ? u += "But since the sample size is large, it should not adversely affect the regression model.<br>" : 30 <= e.n && "potentially symmetrical" == calculate_skewness_message(e.ms_res.skewness, e.n, "short", 20, 15) ? u += "But since the sample size is moderate, and the population is potentially symmetrical,it should not adversely affect the regression model..<br>" : 0 < e.outliers_count ? u += "you should check the outliers..<br>" : u += "You should consider transformation, or takeing a bigger sample.<br>"), u += "</p>", u += msg_5outlier("4", "z", e.z_outliers, e.z_outliers_count, e.n, 3, e.SW.pvalue, a)
}

function anova_table(e, s, r, a, t, o, n, u, l, i, b, p, d, h, c, g) {
    var _, v, m, f, S, x, y, w, M, T, k, F, R, E, z, X, D, q = "";
    void 0 === g && (g = !1), "regression" == c ? (y_average_txt = g ? (z = q = "", X = "0", "zero") : (q = " - 1", z = "minus one", X = "ȳ", "y average"), _ = "p - number of independent variables (X)", v = "Represents the difference between the predicted value (by the regression) and " + y_average_txt + ".<br>SS<sub>regression</sub> = &Sigma;( ŷ<sub>i</sub> - " + X + ")<sup>2</sup>", m = "MS<sub>regression</sub> = SS<sub>regression</sub> / (p" + q + ")<br>The bigger MS<sub>regression</sub> is, the higher the chance that the regession is not significant", f = "F = MS<sub>regression</sub> / MS<sub>residual</sub><br> The bigger F is, the higher the chance that the regression model is significance", S = "1 - P(x &le; F)<br> The smaller p-vlaue is, the higher the chance that the regression model is significance", x = "n - 1 " + q + ", number of overall observations minus number of independent variables (X)  minus one", y = "Represents the difference between the dependent value (y) and the predeicted value (by the regression).<br>SS<sub>residual</sub> = &Sigma;( y<sub>i</sub> - ŷ<sub>i</sub>)<sup>2</sup>  ", w = "MS<sub>residual</sub> = <br>SS<sub>residual</sub> / (n - 1" + q + ")<br> The smaller MSE is, the higher the chance that the regression model is significance.", M = "n" + q + ", overall sample size minus one", T = "SS<sub>total</sub> = SS<sub>regression</sub> + SS<sub>residual</sub><br>SS<sub>total</sub> = &Sigma;( y<sub>i</sub> - " + X + ")<sup>2</sup>", k = "Y Variance = SS<sub>total</sub> / (n" + q + ")<br> Regular sample variance for all observations", F = "<b>Regression</b><br /><span class='small-font'>(between ŷ<sub>i</sub> and " + X + " )</span>", R = "<b>Residual</b><br /><span class='small-font'>(between y<sub>i</sub> and ŷ<sub>i</sub>)</span>", E = "<b>Total</b><span class='small-font'> (between y<sub>i</sub> and " + X + ")</span>") : "anova" == c ? (_ = "<b>k - 1</b>: the number of groups " + z, v = "Represents the difference between the groups&#146; averages and the overall average - the average of all the observations", m = "<b>MSG = SSG / (k - 1)</b><br>The bigger MSG is, the higher the chance that not all the groups&#146; averages equal", f = "<b>F = MSG / MSE</b><br> The bigger F is, the higher the chance that not all the groups&#146; averages equal", S = "<b>P(x &gt; F)</b><br> The smaller p-vlaue is, the higher the chance that not all the groups&#146; averages equal", x = "<b>n - k</b>: the number of overall observations minus one minus the number of groups", y = "Represents the differences within the groups", w = "<b>MSE = SSE / (n - k)</b><br> The smaller MSE is, the higher the chance that the regression model is significance.", M = "<b>n - 1</b>: the overall sample size " + z + ", includes the observations in all the groups", T = "<b>SS<sub>total</sub> = SSG + SSE</b><br> Represent all the differences from the overall average - the average of all the observations,", k = "<b>Sample Variance = SS<sub>total</sub> / (n - 1)</b><br> Regular sample variance for all observations (not group related)", F = "<b>Groups</b> <span class='text-muted'>(between groups)</span>", R = "<b>Error</b> <span class='text-muted'>(within groups)</span>", E = "<b>Total</b>") : debug.error("type=" + c + " it shouble be 'regression' or 'anova' ."), D = p < d ? "red1" : p < 2 * d ? "yellow1" : "green1";
    var I = b_tooltip(xround(p, h), S, D),
        Y = [
            ["Source", "Sum of Square", "Mean Square"],
            [F,b_tooltip(xround(a, h), v), b_tooltip(xround(l, h), m)],
            [R,b_tooltip(xround(t, h), y), b_tooltip(xround(i, h), w)],
            [E,b_tooltip(xround(r, h), T), b_tooltip(xround(r / o, h), k)]
        ];
    return html_table1(e, s, Y, "table table-bordered table-sm white_backgroud overflow_bw", left_column_class = "tableLeft", "", "", div = !1)
}