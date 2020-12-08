console.log(' %c Theme WebStack %c https://github.com/gogobody/WebStack', 'color:#444;background:#eee;padding:5px 0', 'color:#eee;background:#444;padding:5px');

/**
 * gloabl vars
 */
// Sidebar Toggle
var public_vars = public_vars || {};

// Sideber Menu Setup function
var sm_duration = .2,
    sm_transition_delay = 150;

public_vars.$body = $("body");
public_vars.$pageContainer = public_vars.$body.find(".page-container");

public_vars.$sidebarMenu = public_vars.$body.find('.sidebar-menu');
public_vars.$sidebarProfile = public_vars.$sidebarMenu.find('.sidebar-user-info');
public_vars.$mainMenu = public_vars.$sidebarMenu.find('.main-menu');
public_vars.$sidebarInner = $(".sidebar-menu-inner");
public_vars.$horizontalNavbar = public_vars.$body.find('.navbar.horizontal-menu');
public_vars.$horizontalMenu = public_vars.$horizontalNavbar.find('.navbar-nav');

public_vars.$mainContent = public_vars.$pageContainer.find('.main-content');
public_vars.$userInfoMenu = public_vars.$body.find('nav.navbar.user-info-navbar');
/**
 * main func
 * @type {{init: webStack.init, nightModeInit: webStack.nightModeInit}}
 */
var webStack = {
    init: function () {
        this.siteEventInit()
        this.resetStyle()
        this.toggleBarInit()
    },
    resetStyle:function(){
        var width = $(window).width()
        if (768 < width && width < 987){
            $(".sidebar-menu.toggle-others").addClass("collapsed")
        }
        this.resizeNavBar()
    },
    nightModeInit: function () {
        if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
            if (new Date().getHours() > 22 || new Date().getHours() < 6) {
                document.body.classList.add('night');
                document.cookie = "night=1;path=/";
            } else {
                document.body.classList.remove('night');
                document.cookie = "night=0;path=/";
            }
        } else {
            var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || 0;
            if (parseInt(night) === 0) {
                document.body.classList.remove('night');
                document.querySelector('nav.navbar').classList.remove('night');
            } else {
                document.body.classList.add('night');
                document.querySelector('nav.navbar').classList.add('night');
            }
        }
    },
    siteEventInit: function () {
        $(document).on('click', '.has-sub', function () {
            var _this = $(this)
            if (!$(this).hasClass('expanded')) {
                setTimeout(function () {
                    _this.find('ul').attr("style", "")
                }, 300);

            } else {
                $('.has-sub ul').each(function (id, ele) {
                    var _that = $(this)
                    if (_this.find('ul')[0] !== ele) {
                        setTimeout(function () {
                            _that.attr("style", "")
                        }, 300);
                    }
                })
            }
        })
        $('.user-info-menu .hidden-sm').click(function () {
            if ($('.sidebar-menu').hasClass('collapsed')) {
                $('.has-sub.expanded > ul').attr("style", "")
            } else {
                $('.has-sub.expanded > ul').show()
            }
        })
        $("#main-menu li ul li").click(function () {
            $(this).siblings('li').removeClass('active'); // 删除其他兄弟元素的样式
            $(this).addClass('active'); // 添加当前元素的样式
        });
    },
    resizeNavBar:function(){
        var navbar = document.querySelector("nav.navbar")
        var leftw = document.querySelector("div.sidebar-menu.toggle-others.fixed").offsetWidth+"px"
        navbar.style.left = leftw
        public_vars.$pageContainer[0].style.paddingLeft = leftw
    },
    toggleBarInit: function () {
        // toggle
        $("a.smooth").click(function (ev) {
            if (npage !== 'index') {
                window.location.href = siteUrl + $(this).attr("href")
                return false
            }
            var that = this
            ev.preventDefault();
            $("#main-menu li").each(function () {
                $(this).removeClass("active");
            });
            $(this).parent("li").addClass("active");

            public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible');
            public_vars.$sidebarInner.toggleClass('onfixed')
            $("html, body").animate({
                scrollTop: $($(that).attr("href")).offset().top - 95
            }, {
                duration: 500,
                easing: "swing"
            });
        });
        // Setup Sidebar Menu
        setup_sidebar_menu();


        // Setup Horizontal Menu
        setup_horizontal_menu();
        // sidebar click function
        $('a[data-toggle="sidebar"]').each(function (i, el) {
            $(el).on('click', function (ev) {
                ev.preventDefault();
                if (public_vars.$sidebarMenu.hasClass('collapsed')) {
                    public_vars.$sidebarMenu.removeClass('collapsed');
                    // ps_init();
                } else {
                    public_vars.$sidebarMenu.addClass('collapsed');
                    // ps_destroy();
                }
                webStack.resizeNavBar()
            });
        });

        // Mobile Menu Trigger
        $('a[data-toggle="mobile-menu"]').on('click', function (ev) {
            ev.preventDefault();
            public_vars.$sidebarInner.toggleClass('onfixed')
            public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible');
            if (public_vars.$userInfoMenu.hasClass('mobile-is-visible')){
                public_vars.$userInfoMenu.toggleClass('mobile-is-visible');
                // ps_destroy();

            }else {
                // ps_init()
            }
        });
        // Mobile User Info Menu Trigger
        $('a[data-toggle="user-info-menu"]').on('click', function (ev) {
            ev.preventDefault();
            public_vars.$userInfoMenu.toggleClass('mobile-is-visible');
            public_vars.$sidebarInner.toggleClass('onfixed')
            if (public_vars.$mainMenu.hasClass('mobile-is-visible')){
                public_vars.$mainMenu.toggleClass('mobile-is-visible');
            }
            // ps_destroy();
        });
    }
}

var searchWidget = {
    init: function () {
        this.search()
    },
    search: function () {
        var searchIcon = $(".search-icon")
        searchIcon.css("opacity", "1");
        var listIndex = -1;
        var hotList = 0;
        var searchData = {
            "thisSearch": "https://www.baidu.com/s?wd=",
            "thisSearchIcon": "url('/usr/themes/WebStack/images/search_icon.png')",
            "hotStatus": true,
            "data": [{
                name: "百度",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -80px 0px",
                position: "0px 0px",
                url: "https://www.baidu.com/s?wd="
            }, {
                name: "谷歌",
                img: "url('/usr/themes/WebStack/images/search_icon.png')  -105px 0px",
                position: "-40px 0px",
                url: "https://www.google.com/search?q="
            }, {
                name: "必应",
                img: "url('/usr/themes/WebStack/images/search_icon.png')  -80px -25px",
                position: "0px -40px",
                url: "https://cn.bing.com/search?q="
            }, {
                name: "好搜",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -105px -25px",
                position: "-40px -40px",
                url: "https://www.so.com/s?q="
            }, {
                name: "搜狗",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -80px -50px",
                position: "0px -80px",
                url: "https://www.sogou.com/web?query="
            }, {
                name: "淘宝",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -105px -50px",
                position: "-40px -80px",
                url: "https://s.taobao.com/search?q="
            }, {
                name: "京东",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -80px -75px",
                position: "0px -120px",
                url: "http://search.jd.com/Search?keyword="
            }, {
                name: "天猫",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -105px -75px",
                position: "-40px -120px",
                url: "https://list.tmall.com/search_product.htm?q="
            }, {
                name: "1688",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -80px -100px",
                position: "0px -160px",
                url: "https://s.1688.com/selloffer/offer_search.htm?keywords="
            }, {
                name: "知乎",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -105px -100px",
                position: "-40px -160px",
                url: "https://www.zhihu.com/search?type=content&q="
            }, {
                name: "微博",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -80px -125px",
                position: "0px -200px",
                url: "https://s.weibo.com/weibo/"
            }, {
                name: "B站",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -105px -125px",
                position: "-40px -200px",
                url: "http://search.bilibili.com/all?keyword="
            }, {
                name: "豆瓣",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -80px -150px",
                position: "0px -240px",
                url: "https://www.douban.com/search?source=suggest&q="
            }, {
                name: "优酷",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -105px -150px",
                position: "-40px -240px",
                url: "https://so.youku.com/search_video/q_"
            }, {
                name: "GitHub",
                img: "url('/usr/themes/WebStack/images/search_icon.png') -80px -175px",
                position: "0px -280px",
                url: "https://github.com/search?utf8=✓&q="
            }]
        };
        var localSearchData = localStorage.getItem("searchData");
        if (localSearchData) {
            searchData = JSON.parse(localSearchData)
        }
        var txt_ = $("#txt")
        var box_ul_li = $("#box ul li")

        function filterChildren(element) {
            return $(element).contents().filter(function (index, content) {
                return content.nodeType === 3
            }).text().trim()
        }

        function getHotkeyword(value) {
            $.ajax({
                type: "GET",
                url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                async: true,
                data: {wd: value},
                dataType: "jsonp",
                jsonp: "cb",
                success: function (res) {
                    $("#box ul").text("");
                    hotList = res.s.length;
                    if (hotList) {
                        $("#box").css("display", "block");
                        for (var i = 0; i < hotList; i++) {
                            $("#box ul").append("<li><span>" + (i + 1) + "</span> " + res.s[i] + "</li>");
                            box_ul_li = $("#box ul li")
                            box_ul_li.eq(i).click(function () {
                                var thisText = filterChildren(this);
                                txt_.val(thisText);
                                window.open(searchData.thisSearch + thisText);
                                $("#box").css("display", "none")
                            });
                            if (i === 0) {
                                box_ul_li.eq(i).css({"border-top": "none"});
                                $("#box ul span").eq(i).css({"color": "#fff", "background": "#f54545"})
                            } else {
                                if (i === 1) {
                                    $("#box ul span").eq(i).css({"color": "#fff", "background": "#ff8547"})
                                } else {
                                    if (i === 2) {
                                        $("#box ul span").eq(i).css({"color": "#fff", "background": "#ffac38"})
                                    }
                                }
                            }
                        }
                    } else {
                        $("#box").css("display", "none")
                    }
                },
                error: function (res) {
                    console.log(res)
                }
            })
        }

        txt_.keyup(function (e) {
            if ($(this).val()) {
                if (e.keyCode === 38 || e.keyCode === 40 || !searchData.hotStatus) {
                    return
                }
                getHotkeyword($(this).val())
            } else {
                $(".search-clear").css("display", "none");
                $("#box").css("display", "none")
            }
        });
        txt_.keydown(function (e) {
            if (e.keyCode === 40) {
                listIndex === (hotList - 1) ? listIndex = 0 : listIndex++;
                box_ul_li.eq(listIndex).addClass("current").siblings().removeClass("current");
                var hotValue = filterChildren(box_ul_li.eq(listIndex));
                txt_.val(hotValue)
            } else if (e.keyCode === 38) {
                if (e.preventDefault) {
                    e.preventDefault()
                }
                if (e.returnValue) {
                    e.returnValue = false
                }
                listIndex === 0 || listIndex === -1 ? listIndex = (hotList - 1) : listIndex--;
                box_ul_li.eq(listIndex).addClass("current").siblings().removeClass("current");
                var hotValue = filterChildren(box_ul_li.eq(listIndex));
                txt_.val(hotValue)
            } else if (e.keyCode === 13) {
                window.open(searchData.thisSearch + txt_.val());
                $("#box").css("display", "none");
                txt_.blur();
                box_ul_li.removeClass("current");
                listIndex = -1
            }
        });
        txt_.focus(function () {
            $(".search-box").css("box-show", "inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3)");
            if ($(this).val() && searchData.hotStatus) {
                getHotkeyword($(this).val())
            }
        });
        txt_.blur(function () {
            setTimeout(function () {
                $("#box").css("display", "none")
            }, 250)
        });
        for (var i = 0; i < searchData.data.length; i++) {
            $(".search-engine-list").append('<li><span style="background:' + searchData.data[i].img + '"/></span>' + searchData.data[i].name + "</li>")
        }
        $(".search-icon, .search-engine").hover(function () {
            $(".search-engine").css("display", "block")
        }, function () {
            $(".search-engine").css("display", "none")
        });
        var hotBtn = $("#hot-btn")
        hotBtn.click(function () {
            $(this).toggleClass("off");
            searchData.hotStatus = !searchData.hotStatus;
            localStorage.searchData = JSON.stringify(searchData)
        });
        searchData.hotStatus ? hotBtn.removeClass("off") : hotBtn.addClass("off");
        $(".search-engine-list li").click(function () {
            var index = $(this).index();
            searchData.thisSearchIcon = searchData.data[index].position;
            searchIcon.css("background-position", searchData.thisSearchIcon);
            searchData.thisSearch = searchData.data[index].url;
            $(".search-engine").css("display", "none");
            localStorage.searchData = JSON.stringify(searchData)
        });
        searchIcon.css("background-position", searchData.thisSearchIcon);
        $("#search-btn").click(function () {
            var textValue = txt_.val();
            if (textValue) {
                window.open(searchData.thisSearch + textValue);
                $("#box ul").html("")
            } else {
                // 请输入关键词！
                txt_.focus()
            }
        })
    }
}


var WebStackInit = function () {
    $('[data-toggle="tooltip"]').tooltip();
    webStack.init()
    searchWidget.init()
}


//global function
//夜间模式切换
function switchNightMode() {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || 0;

    if (parseInt(night) === 0) {
        document.body.classList.add('night');
        document.querySelector('nav.navbar').classList.add('night');
        document.cookie = "night=1;path=/"
    } else {
        document.body.classList.remove('night');
        document.querySelector('nav.navbar').classList.remove('night');
        document.cookie = "night=0;path=/"
    }
}


// Is xs device
function isxs() {
    return is('devicescreen') || is('sdevicescreen');
}

// Get current breakpoint
function get_current_breakpoint() {
    var width = jQuery(window).width(),
        breakpoints = public_vars.breakpoints;

    for (var breakpont_label in breakpoints) {
        var bp_arr = breakpoints[breakpont_label],
            min = bp_arr[0],
            max = bp_arr[1];

        if (max === -1)
            max = width;

        if (min <= width && max >= width) {
            return breakpont_label;
        }
    }

    return null;
}

// Check current screen breakpoint
function is(screen_label) {
    return get_current_breakpoint() === screen_label;
}

//
// function ps_init() {
//     if (isxs())
//         return;
//
//     if (jQuery.isFunction(jQuery.fn.perfectScrollbar)) {
//         if (public_vars.$sidebarMenu.hasClass('collapsed') || !public_vars.$sidebarMenu.hasClass('fixed')) {
//             return;
//         }
//
//         public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar({
//             wheelSpeed: 1,
//             wheelPropagation: public_vars.wheelPropagation
//         });
//     }
// }
//
// function ps_destroy() {
//     if (jQuery.isFunction(jQuery.fn.perfectScrollbar)) {
//         public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('destroy');
//     }
// }
//
// // Perfect scroll bar functions by Arlind Nushi
// function ps_update(destroy_init) {
//     if (isxs())
//         return;
//
//     if (jQuery.isFunction(jQuery.fn.perfectScrollbar)) {
//         if (public_vars.$sidebarMenu.hasClass('collapsed')) {
//             return;
//         }
//
//         public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('update');
//
//         if (destroy_init) {
//             ps_destroy();
//             ps_init();
//         }
//     }
// }

function sidebar_menu_item_collapse($li, $sub) {
    if ($li.data('is-busy'))
        return;

    var $sub_items = $sub.children();

    $li.removeClass('expanded').data('is-busy', true);
    $sub_items.addClass('hidden-item');
    $sub.animate({height: 0}, function () {
        $li.data('is-busy', false).removeClass('opened');

        $sub.attr('style', '').hide();
        $sub_items.removeClass('hidden-item');

        $li.find('li.expanded ul').attr('style', '').hide().parent().removeClass('expanded');

        // ps_update(true);
    })
}

function sidebar_menu_close_items_siblings($li) {
    $li.siblings().not($li).filter('.expanded, .opened').each(function (i, el) {
        var $_li = jQuery(el),
            $_sub = $_li.children('ul');

        sidebar_menu_item_collapse($_li, $_sub);
    });
}

function sidebar_menu_item_expand($li, $sub) {
    if ($li.data('is-busy') || ($li.parent('.main-menu').length && public_vars.$sidebarMenu.hasClass('collapsed')))
        return;

    $li.addClass('expanded').data('is-busy', true);
    $sub.show();

    var $sub_items = $sub.children(),
        sub_height = $sub.outerHeight(),

        win_y = jQuery(window).height(),
        total_height = $li.outerHeight(),
        current_y = public_vars.$sidebarMenu.scrollTop(),
        item_max_y = $li.position().top + current_y,
        fit_to_viewpport = public_vars.$sidebarMenu.hasClass('fit-in-viewport');

    $sub_items.addClass('is-hidden');
    $sub.height(0);

    $sub.animate({height: sub_height},function () {
        $sub.height('');
    })

    var interval_1 = $li.data('sub_i_1'),
        interval_2 = $li.data('sub_i_2');

    window.clearTimeout(interval_1);

    interval_1 = setTimeout(function () {
        $sub_items.each(function (i, el) {
            var $sub_item = jQuery(el);

            $sub_item.addClass('is-shown');
        });

        var finish_on = sm_transition_delay * $sub_items.length,
            t_duration = parseFloat($sub_items.eq(0).css('transition-duration')),
            t_delay = parseFloat($sub_items.last().css('transition-delay'));

        if (t_duration && t_delay) {
            finish_on = (t_duration + t_delay) * 1000;
        }

        // In the end
        window.clearTimeout(interval_2);

        interval_2 = setTimeout(function () {
            $sub_items.removeClass('is-hidden is-shown');

        }, finish_on);


        $li.data('is-busy', false);

    }, 0);

    $li.data('sub_i_1', interval_1),
        $li.data('sub_i_2', interval_2);
}

function setup_sidebar_menu() {
    if (public_vars.$sidebarMenu.length) {
        var $items_with_subs = public_vars.$sidebarMenu.find('li:has(> ul)'),
            toggle_others = public_vars.$sidebarMenu.hasClass('toggle-others');

        $items_with_subs.filter('.active').addClass('expanded');

        // On larger screens collapse sidebar when the window is tablet screen
        if (is('largescreen') && public_vars.$sidebarMenu.hasClass('collapsed') === false) {
            $(window).on('resize', function () {
                if (is('tabletscreen')) {
                    public_vars.$sidebarMenu.addClass('collapsed');
                    // ps_destroy();
                } else if (is('largescreen')) {
                    public_vars.$sidebarMenu.removeClass('collapsed');
                    // ps_init();
                }
            });
        }

        $items_with_subs.each(function (i, el) {
            var $li = jQuery(el),
                $a = $li.children('a'),
                $sub = $li.children('ul');

            $li.addClass('has-sub');

            $a.on('click', function (ev) {
                ev.preventDefault();

                if (toggle_others) {
                    sidebar_menu_close_items_siblings($li);
                }

                if ($li.hasClass('expanded') || $li.hasClass('opened'))
                    sidebar_menu_item_collapse($li, $sub);
                else
                    sidebar_menu_item_expand($li, $sub);
            });
        });
    }
}

// Horizontal Menu
function setup_horizontal_menu() {
    if (public_vars.$horizontalMenu.length) {
        var $items_with_subs = public_vars.$horizontalMenu.find('li:has(> ul)'),
            click_to_expand = public_vars.$horizontalMenu.hasClass('click-to-expand');

        if (click_to_expand) {
            public_vars.$mainContent.add(public_vars.$sidebarMenu).on('click', function (ev) {
                $items_with_subs.removeClass('hover');
            });
        }

        $items_with_subs.each(function (i, el) {
            var $li = jQuery(el),
                $a = $li.children('a'),
                $sub = $li.children('ul'),
                is_root_element = $li.parent().is('.navbar-nav');

            $li.addClass('has-sub');

            // Mobile Only
            $a.on('click', function (ev) {
                if (isxs()) {
                    ev.preventDefault();

                    // Automatically will toggle other menu items in mobile view
                    if (true) {
                        sidebar_menu_close_items_siblings($li);
                    }

                    if ($li.hasClass('expanded') || $li.hasClass('opened'))
                        sidebar_menu_item_collapse($li, $sub);
                    else
                        sidebar_menu_item_expand($li, $sub);
                }
            });

            // Click To Expand
            if (click_to_expand) {
                $a.on('click', function (ev) {
                    ev.preventDefault();

                    if (isxs())
                        return;

                    // For parents only
                    if (is_root_element) {
                        $items_with_subs.filter(function (i, el) {
                            return jQuery(el).parent().is('.navbar-nav');
                        }).not($li).removeClass('hover');
                        $li.toggleClass('hover');
                    }
                    // Sub menus
                    else {
                        var sub_height;

                        // To Expand
                        if ($li.hasClass('expanded') == false) {
                            $li.addClass('expanded');
                            $sub.addClass('is-visible');

                            sub_height = $sub.outerHeight();

                            $sub.height(0);

                            TweenLite.to($sub, .15, {
                                css: {height: sub_height},
                                ease: Sine.easeInOut,
                                onComplete: function () {
                                    $sub.attr('style', '');
                                }
                            });

                            // Hide Existing in the list
                            $li.siblings().find('> ul.is-visible').not($sub).each(function (i, el) {
                                var $el = jQuery(el);

                                sub_height = $el.outerHeight();

                                $el.removeClass('is-visible').height(sub_height);
                                $el.parent().removeClass('expanded');

                                TweenLite.to($el, .15, {
                                    css: {height: 0}, onComplete: function () {
                                        $el.attr('style', '');
                                    }
                                });
                            });
                        }
                        // To Collapse
                        else {
                            sub_height = $sub.outerHeight();

                            $li.removeClass('expanded');
                            $sub.removeClass('is-visible').height(sub_height);
                            TweenLite.to($sub, .15, {
                                css: {height: 0}, onComplete: function () {
                                    $sub.attr('style', '');
                                }
                            });
                        }
                    }
                });
            }
            // Hover To Expand
            else {
                $li.hoverIntent({
                    over: function () {
                        if (isxs())
                            return;

                        if (is_root_element) {
                            $li.addClass('hover');
                        } else {
                            $sub.addClass('is-visible');
                            sub_height = $sub.outerHeight();

                            $sub.height(0);

                            TweenLite.to($sub, .25, {
                                css: {height: sub_height},
                                ease: Sine.easeInOut,
                                onComplete: function () {
                                    $sub.attr('style', '');
                                }
                            });
                        }
                    },
                    out: function () {
                        if (isxs())
                            return;

                        if (is_root_element) {
                            $li.removeClass('hover');
                        } else {
                            sub_height = $sub.outerHeight();

                            $li.removeClass('expanded');
                            $sub.removeClass('is-visible').height(sub_height);
                            TweenLite.to($sub, .25, {
                                css: {height: 0}, onComplete: function () {
                                    $sub.attr('style', '');
                                }
                            });
                        }
                    },
                    timeout: 200,
                    interval: is_root_element ? 10 : 100
                });
            }
        });
    }
}
