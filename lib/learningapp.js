$(document).ready(function() {
    $.get('http://ec2-54-245-31-205.us-west-2.compute.amazonaws.com/learningapp/data/level.xml',initialisePage);
    $('#pays-list li.country').on('vclick',function(){ 
		$('#header-capitale li:first').text($(this).attr("country"));
		$('#header-capitale li:last').text($(this).attr("capitale"));

	});
    $('#capitale').on('pagebeforeshow',function(){ 
     $('#map-canvas').empty();
     setTimeout(function() {
      codeAddress($('#header-capitale li:last').text());
     }, 500);
    });
    
function initialisePage(data) {

           $(data).find('country').each(function () {
           var li=$('#pays-list li:last').clone(true);
           li.removeClass("la-hidden").attr("country",$(this).attr('name'));
           li.attr("capitale",$(this).attr('capital'));
           li.find('a').text($(this).attr('name')); 
           $('#pays-list li:last').removeClass("ui-corner-bottom ui-li-last").after($(li));
           });
}


});

var geocoder, map;
function codeAddress(address) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var myOptions = {
        zoom: 5,
        center: results[0].geometry.location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

         var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
         });
        
/*        setTimeout(function() {
            google.maps.event.trigger(map,'resize');
        }, 500);*/
      }
    });
  }
