/**
 * @preserve Galleria Twelve Theme 2011-02-14
 * http://galleria.aino.se
 *
 * Copyright (c) 2011, Aino
 * Licensed under the MIT license.
 */
 
/*global jQuery, Galleria */

(function($) {

Galleria.addTheme({
    name: 'twelvetes',
    author: 'Galleria',
//    css: 'galleria.twelve.css',
    defaults: {
        transition: "pulse",
        transitionSpeed: 500,
        imageCrop: true,
        thumbCrop: true,
        carousel: false,
        _locale: {
            show_thumbnails: "Show thumbnails",
            hide_thumbnails: "Hide thumbnails",
            play: "Play slideshow",
            pause: "Pause slideshow",
            enter_fullscreen: "Enter fullscreen",
            exit_fullscreen: "Exit fullscreen",
            popout_image: "Popout image",
            showing_image: "Showing image %s of %s"
        },
        _showFullscreen: true,
        _showPopout: true,
        _showProgress: true,
        _showTooltip: true
    },
    init: function (s) {
        this.addElement("bar", "fullscreen", "play", "popout", "thumblink", "s1", "s2", "s3", "s4", "progress");
        this.append({
            stage: "progress",
            container: ["bar", "tooltip"],
            bar: ["fullscreen", "play", "popout", "thumblink", "info", "s1", "s2", "s3", "s4"]
        });
        this.prependChild("info", "counter");
        var t = this,
            M = this.$("thumbnails-container"),
            N = this.$("thumblink"),
            I = this.$("fullscreen"),
            Y = this.$("play"),
            W = this.$("popout"),
            Q = this.$("bar"),
            Z = this.$("progress"),
            ga = s.transition,
            U = s._locale,
            ea = false,
            ca = false,
            fa = !! s.autoplay,
            c = false,
            la = function () {
                M.height(t.getStageHeight()).width(t.getStageWidth()).css("top", ea ? 0 : t.getStageHeight() + 30)
            };
        la();
        s._showTooltip && t.bindTooltip({
            thumblink: U.show_thumbnails,
            fullscreen: U.enter_fullscreen,
            play: U.play,
            popout: U.popout_image,
            caption: function () {
                var y = t.getData(),
                    d = "";
                if (y) {
                    if (y.title && y.title.length) d += "<strong>" + y.title + "</strong>";
                    if (y.description && y.description.length) d += "<br>" + y.description
                }
                return d
            },
            counter: function () {
                return U.showing_image.replace(/\%s/, t.getIndex() + 1).replace(/\%s/, t.getDataLength())
            }
        });
        this.bind("play", function () {
            fa = true;
            Y.addClass("playing")
        });
        this.bind("pause", function () {
            fa = false;
            Y.removeClass("playing");
            Z.width(0)
        });
        s._showProgress && this.bind("progress", function (y) {
            Z.width(y.percent / 100 * this.getStageWidth())
        });
        this.bind("loadstart", function (y) {
            y.cached || this.$("loader").show()
        });
        this.bind("loadfinish", function () {
            Z.width(0);
            this.$("loader").hide();
            this.refreshTooltip("counter", "caption")
        });
        this.bind("thumbnail", function (y) {
            $(y.thumbTarget).hover(function () {
                t.setInfo(y.thumbOrder);
                t.setCounter(y.thumbOrder)
            }, function () {
                t.setInfo();
                t.setCounter()
            }).click(function () {
                N.click()
            })
        });
        this.bind("fullscreen_enter", function () {
            ca = true;
            t.setOptions("transition", "none");
            I.addClass("open");
            Q.css("bottom", 0);
            this.defineTooltip("fullscreen", U.exit_fullscreen);
            this.addIdleState(Q, {
                bottom: -31
            })
        });
        this.bind("fullscreen_exit", function () {
            ca = false;
            Galleria.utils.clearTimer("bar");
            t.setOptions("transition", ga);
            I.removeClass("open");
            Q.css("bottom", 0);
            this.defineTooltip("fullscreen", U.enter_fullscreen);
            this.removeIdleState(Q, {
                bottom: -31
            })
        });
        this.bind("rescale", la);
        this.addIdleState(this.get("image-nav-left"), {
            left: -36
        });
        this.addIdleState(this.get("image-nav-right"), {
            right: -36
        });
        N.click(function () {
            if (ea && c) t.play();
            else {
                c = fa;
                t.pause()
            }
            M.animate({
                top: ea ? t.getStageHeight() + 30 : 0
            }, {
                easing: "galleria",
                duration: 400,
                complete: function () {
                    t.defineTooltip("thumblink", ea ? U.show_thumbnails : U.hide_thumbnails);
                    N[ea ? "removeClass" : "addClass"]("open");
                    ea = !ea
                }
            })
        });
        if (s._showPopout) W.click(function (y) {
            t.openLightbox();
            y.preventDefault()
        });
        else {
            W.remove();
            if (s._showFullscreen) {
                this.$("s4").remove();
                this.$("info").css("right", 40);
                I.css("right", 0)
            }
        }
        Y.click(function () {
            t.defineTooltip("play", fa ? U.play : U.pause);
            if (fa) t.pause();
            else {
                ea && N.click();
                t.play()
            }
        });
        if (s._showFullscreen) I.click(function () {
            ca ? t.exitFullscreen() : t.enterFullscreen()
        });
        else {
            I.remove();
            if (s._show_popout) {
                this.$("s4").remove();
                this.$("info").css("right", 40);
                W.css("right", 0)
            }
        }
        if (!s._showFullscreen && !s._showPopout) {
            this.$("s3,s4").remove();
            this.$("info").css("right", 10)
        }
    }
});

}(jQuery));