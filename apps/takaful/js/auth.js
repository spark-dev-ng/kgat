(function($) {

$('#specta').on('click', function(){
	$.ajax({
      method: "GET",
      type:'GET',
      url: "./home.php",
      header:{"Content-Type":"application/json"},
    })
    .done(function( msg ) {
      var params = "crollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000";
        if(msg.length>10){
        	window.window.open(msg,'',params);
        }
    });
});

})(jQuery);