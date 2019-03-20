var meteo = new Object();
meteo.apikey = "f8abcb2ff76caa83de8aaebdc2d3c5c0";
meteo.unidades = "&units=metric";
meteo.idioma = "&lang=en";
meteo.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";

meteo.cargarDatos = function (ciudad) {
    $.ajax({
        dataType: "json",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + meteo.unidades + meteo.idioma + "&APPID=" + meteo.apikey,
        method: 'GET',
        success: function (data) {
            meteo.datos = data;
            meteo.verDatos();
        },
        error: function () {
            $(".contentCard").append(meteo.error);
        }
    });
}

meteo.changeCover = function (weatherIcon) {
    let coverImage = "paris_default.jpg";

    if (weatherIcon == '01d') {
        coverImage = "paris_day_clear.jpeg";
    } else if (weatherIcon == '02d' ||
        weatherIcon == '03d' || weatherIcon == '04d') {
        coverImage = "paris_day_clouds.png";
    } else if (weatherIcon == '09d' ||
        weatherIcon == '10d' || weatherIcon == '11d' ||
        weatherIcon == '13d') {
            coverImage = "paris_day_rain.jpg";
    }else if (weatherIcon == '01n') {
        coverImage = "paris_night_clear.jpg";
    } else if (weatherIcon == '02n' ||
        weatherIcon == '03n' || weatherIcon == '04n') {
        coverImage = "paris_night_clouds.jpg";
    } else if (weatherIcon == '09n' ||
        weatherIcon == '10n' || weatherIcon == '11n' ||
        weatherIcon == '13n') {
            coverImage = "paris_night_rain.jpg";
    }

    $("html").css({
        'background': 'url(img/' + coverImage + ') no-repeat center center fixed',
        'background-size': 'cover'
    });
};

meteo.verDatos = function () {
    var content = "";
    var icon = meteo.datos.weather[0].icon;
    content += ("<h2>Weather in " + meteo.datos.name + ", " + meteo.datos.sys.country + "</h2>");
    content += ("<img src='http://openweathermap.org/img/w/" + icon + ".png'>");
    content += ("<p>Temperature: " + meteo.datos.main.temp + " degrees Celsius</p>");
    content += ("<p>Max temperature: \n " + meteo.datos.main.temp_max + " degrees Celsius</p>");
    content += ("<p>Minimum temperature: " + meteo.datos.main.temp_min + " degrees Celsius</p>");
    content += ("<br/>");
    content += ("<p>Pressure: " + meteo.datos.main.pressure + " mm</p>");
    content += ("<p>Humidity: " + meteo.datos.main.humidity + "%</p>");
    content += ("<p>Sunrise: " + new Date(meteo.datos.sys.sunrise * 1000).toLocaleTimeString() + "</p>");
    content += ("<p>Sunset: " + new Date(meteo.datos.sys.sunset * 1000).toLocaleTimeString() + "</p>");
    content += ("<p>Wind direction: " + meteo.datos.wind.deg + "  degrees</p>");
    content += ("<p>Wind speed: " + meteo.datos.wind.speed + " m/s</p>");
    content += ("<br/>");
    content += ("<p>Meassurement time: " + new Date(meteo.datos.dt * 1000).toLocaleTimeString() + "</p>");
    content += ("<p>Meassurement date: " + new Date(meteo.datos.dt * 1000).toLocaleDateString() + "</p>");
    content += ("<p>Description: " + meteo.datos.weather[0].description + "</p>");
    content += ("<p>Visibility: " + meteo.datos.visibility + " m</p>");
    content += ("<p>Clouds: " + meteo.datos.clouds.all + " %</p>");
    var head = $("<div class='content'></div>").html(content);
    $("body").append(head);
    meteo.changeCover(icon);
};

meteo.cargarDatos('Paris');


class CurrencyExchange {
    constructor() {
    }
    cargarDatos() {
        var eurAmount = $('#eurAmountField').val();

        if (!isNaN(eurAmount) && eurAmount.length != 0) {

            var endpoint = 'live'
            var access_key = '07e419fad6672ddc04591bc9866468c6';

            // get the most recent exchange rates via the "live" endpoint:
            $.ajax({
                async: false,
                url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key,
                dataType: 'jsonp',
                success: function (json) {
                    let usdeur = json.quotes.USDEUR;
                    let usdjpy = json.quotes.USDJPY;
                    let usdgbp = json.quotes.USDGBP;
                    let usdchf = json.quotes.USDCHF;
                    let usdkrw = json.quotes.USDKRW;

                    let eurusd = 1 / usdeur;
                    let eurjpy = eurusd * usdjpy;
                    let eurgbp = eurusd * usdgbp;
                    let eurchf = eurusd * usdchf;
                    let eurkrw = eurusd * usdkrw;

                    let head = $("<div id='eurusd'></div>").html("<h2>Euro to USD</h2>");
                    $("#moneyExchanger").append(head);
                    $("#eurusd").append("<p>1 EUR = " + eurusd + " USD</p>");
                    $("#eurusd").append(eurAmount + " EUR = " + (eurAmount * eurusd) + " USD");

                    head = $("<div id='eurgbp'></div>").html("<h2>Euro to GBP</h2>");
                    $("#moneyExchanger").append(head);
                    $("#eurgbp").append("<p>1 EUR = " + eurgbp + " GBP</p>");
                    $("#eurgbp").append(eurAmount + " EUR = " + (eurAmount * eurgbp) + " GBP");

                    head = $("<div id='eurchf'></div>").html("<h2>Euro to CHF</h2>");
                    $("#moneyExchanger").append(head);
                    $("#eurchf").append("<p>1 EUR = " + eurchf + " CHF</p>");
                    $("#eurchf").append(eurAmount + " EUR = " + (eurAmount * eurchf) + " CHF");
                }
            });
        }
    }
}

var exchanger = new CurrencyExchange()


class WikiSearch {
    searchParis() {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Par%C3%ADs",
            dataType: "jsonp",
            method: 'GET',
            success: function (data) {
                let resumen = data.query.pages["22989"].extract;
                $("#wiki_container").append(resumen);
            },
            error: function () {
                $(".contentCard").append(meteo.error);
            }
        });
    }
}

var ws = new WikiSearch();
ws.searchParis();

class ImageSearch {
    loadImages() {
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI,
            {
                tags: "Paris",
                tagmode: "any",
                format: "json"
            })
            .done(function (data) {
                $.each(data.items, function (i, item) {
                    $("<img>").attr("src", item.media.m).appendTo("#imagenes");
                    if (i === 20) {
                        return false;
                    }
                });
            });
    }
}

var is = new ImageSearch();
is.loadImages();


