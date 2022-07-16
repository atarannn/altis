jQuery(document).ready(function($){
    var url = document.location.href;
    new Clipboard('.copy_link', {text: function(){ return url;}});
    $('.copy_link').click(function(){
        alert('Посилання успішно скопійовано.');
    });
});

