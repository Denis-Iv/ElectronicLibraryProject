$.get("components/navigation.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});

$.get("components/footer.html", function(data){
    $("#footer-placeholder").replaceWith(data);
});