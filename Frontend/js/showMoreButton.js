$(function() {        
    $('.filters-list').each(function() {
        var $list = $(this);
        $list.before('<span class="more-less">Покажи по-малко</span>');
        $list.find('.filter:gt(5)').hide();        
    });    
  
    $('.more-less').click(function() {
        var $btn = $(this);
        $btn.next().find('.filter:gt(5)').toggle();    
        $btn.text($btn.text() == 'Покажи по-малко' ? 'Покажи повече' : 'Покажи по-малко');   
    });

    setTimeout(function() {
            $('.more-less').trigger('click');
        },40);   
})