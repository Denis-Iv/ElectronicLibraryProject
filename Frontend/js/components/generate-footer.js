$(function () {
    var bar = '';
    bar += ' <section class="footer">'
    bar += '<section class="footer">'
    bar += '    <div class="container text-center">'
    bar += '        <div class="row">'
    bar += '            <div class="col-md-3">'
    bar += '                <h1>Useful Links</h1>'
    bar += '                <a href="legalInfo.html"><p>Privacy Policy</p></a>'
    bar += '                <a href="legalInfo.html"><p>Terms of Use</p></a>'
    bar += '                <a href="legalInfo.html"><p>Return Policy</p></a>   '                     
    bar += '            </div>'
    bar += '            <div class="col-md-3">'
    bar += '                <h1>Company</h1>'
    bar += '                <a href="companyInfo.html"><p>About Us</p></a>'
    bar += '                <a href="companyInfo.html"><p>Contact Us</p></a>'
    bar += '                <a href="companyInfo.html"><p>Career</p></a>'
    bar += '                <a href="companyInfo.html"><p>Affiliate</p></a>'
    bar += '            </div>'
    bar += '            <div class="col-md-3">'
    bar += '                <h1>Follow Us</h1>'
    bar += '                <a href="https://www.facebook.com/"><p><i class="fa fa-facebook-official"></i> Facebook</p></a>'
    bar += '                <a href="http://linkedin.com/"><p><i class="fa fa-linkedin"></i> Linkedin</p></a>'
    bar += '                <a href="https://www.youtube.com/"><p><i class="fa fa-youtube-play"></i> YouTube</p></a>'
    bar += '                <a href="https://twitter.com/"><p><i class="fa fa-twitter"></i> Twitter</p></a>'
    bar += '            </div>'
    bar += '        </div> '              
    bar += '    </div>'
    bar += '</section>'
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