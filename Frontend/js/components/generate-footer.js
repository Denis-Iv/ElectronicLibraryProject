$(function () {
    var bar = '';
    bar += ' <section class="footer">'
    bar += '<div class="content flow">'
    bar += '<div class="even-columns">'
    bar += '    <div class="col">'
    bar += '        <h1>Полезни връзки</h1>'
    bar += '        <a href="legalInfo.html"><p>Защита на личните данни</p></a>'
    bar += ' <br>'
    bar += '        <a href="legalInfo.html"><p>Условия на ползване</p></a>'
    bar += ' <br>'
    bar += '        <a href="legalInfo.html"><p>Политика на връщане</p></a> '    
    bar += '    </div>'
    bar += '    <div class="col">'
    bar += '        <h1>Компанията</h1>'
    bar += '        <a href="companyInfo.html"><p>За нас</p></a>'
    bar += ' <br>'
    bar += '        <a href="companyInfo.html"><p>Контакти</p></a>'
    bar += ' <br>'
    bar += '        <a href="companyInfo.html"><p>Кариера</p></a>'
    bar += '    </div>'
    bar += '    <div class="col">'
    bar += '        <h1>Последвайте ни</h1>'
    bar += '        <a href="https://www.facebook.com/"><p><i class="fa fa-facebook-official"></i> Facebook</p></a>'
    bar += ' <br>'
    bar += '        <a href="https://www.youtube.com/"><p><i class="fa fa-youtube-play"></i> YouTube</p></a>'
    bar += ' <br>'
    bar += '        <a href="https://twitter.com/"><p><i class="fa fa-twitter"></i> Twitter</p></a>'
    bar += '    </div>'
    bar += '</div>'
    bar += '</div>'   
    bar += '</section>'

$("#footer-placeholder").html(bar);

var id = getValueByName("id");
$("#" + id).addClass("active");
});

function getValueByName(name) {
var url = document.getElementById('generate-footer').getAttribute('src');
var param = new Array();
if (url.indexOf("?") != -1) {
    var source = url.split("?")[1];
    items = source.split("&");
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var parameters = item.split("=");
        if (parameters[0] == "id") {
            return parameters[1];
        }
    }
}
}