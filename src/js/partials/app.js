$( document ).ready(function() {

    // Sign up

    $("#signup").click(function(e){
        e.preventDefault();

        $.post("test.php",
            {
                fullname: $("#fullname").val(),
                email: $("#email").val()
            },
            function(data, status){
                var obj = JSON.parse(data);

                console.log(obj);
                if (obj.status == 400) {
                    $(".error").html(obj.detail)
                    $(".error").show().delay(5000).fadeOut();
                } else {
                    $(".success").html("You have been subscribed.")
                    $(".success").show().delay(5000).fadeOut();
                }


            });
    });

    // Select

    $(".custom-select").each(function() {
        var classes = $(this).attr("class"),
            id      = $(this).attr("id"),
            name    = $(this).attr("name");
        var template =  '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function() {
            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function() {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function() {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".custom-select-trigger").on("click", function() {
        $('html').one('click',function() {
            $(".custom-select").removeClass("opened");
        });
        $(this).parents(".custom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function() {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    });


    // Scroll to

    $(".header_scroll a").on("click", function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1000);
    });

    // Swiper


    var swiper = new Swiper( '.swiper-container.two', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        effect: 'coverflow',
        loop: false,
        centeredSlides: true,
        slidesPerView: '3',
        coverflowEffect: {
            rotate: 0,
            stretch: 100,
            modifier: 1.5,
            slideShadows : false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    } );

    var element = document.querySelector('.example');

    var slider = new Bee3D(element, {
        effect: 'coverflow',
        focus: 3,
        listeners: {
            keys: true,
            touches: false
        },
        navigation: {
            enabled: true
        },
        loop: {
            enabled: true,
            continuous: true
        }
    });
});


// Countdown

CountDownTimer('10/13/2018 06:0 AM', 'countdown');

function CountDownTimer(dt, id)
{
    var end = new Date(dt);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById(id).innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(id).innerHTML = days + '<span>:</span>';
        document.getElementById(id).innerHTML += hours + '<span>:</span>';
        document.getElementById(id).innerHTML += minutes + '<span>:</span>';
        document.getElementById(id).innerHTML += seconds + '';
    }

    timer = setInterval(showRemaining, 1000);
}