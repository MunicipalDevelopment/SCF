/*
 SeeClickFix plugin for Leaflet.
*/
L.SCF = L.Class.extend({

    options: {
        box:[35.02212,-106.79672,35.20636,-106.48911]
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);

        url = "https://seeclickfix.com/api/v2/issues?min_lat="+this.options.box[0]+"&min_lng="+this.options.box[1]+"&max_lat="+this.options.box[2]+"&max_lng="+this.options.box[3]+"&per_page=100";
        hold=[];
      
    },

_getData: function(u) {

  howmanytimes=0;
  var count;
  var http=new XMLHttpRequest();
  http.open("GET", u, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        var d= JSON.parse(http.responseText);
        count=d.metadata.pagination.pages;
      entries=d.metadata.pagination.entries;
      start(count,entries,u);
      }//end if
  }
  http.send();

function start(c,entries,u){
  for(var x=1;x<c+1;x++){
    getData(x,entries,c,u);}

  }

function getData(page,entries,c,u){


    var urlPage = u+"&page="+page;
    var http=new XMLHttpRequest();
    http.open("GET", urlPage, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
       if(http.readyState == 4 && http.status == 200) {
            var d= JSON.parse(http.responseText);
            howmanytimes+=1;
              for(var x=0;x<d.issues.length;x++){
              var temp = L.circleMarker([d.issues[x].lat,d.issues[x].lng],2).bindPopup("<h3>"+d.issues[x].status+"</h3>"+d.issues[x].description).addTo(map);

              //hold.push([d.issues[x].id,d.issues[x].status,d.issues[x].summary,d.issues[x].description,d.issues[x].rating,d.issues[x].lat,d.issues[x].lng,d.issues[x].address,d.issues[x].created_at,d.issues[x].acknowledged_at,d.issues[x].closed_at,d.issues[x].reopened_at,d.issues[x].updated_at,d.issues[x].shortened_url,d.issues[x].media.video_url,d.issues[x].media.image_full,d.issues[x].media.image_square_100x100,d.issues[x].media.representative_image_url,d.issues[x].point.type,d.issues[x].point.coordinates,d.issues[x].url,d.issues[x].html_url,d.issues[x].request_type.id,d.issues[x].request_type.title,d.issues[x].request_type.url,d.issues[x].request_type.related_issues_url,d.issues[x].comment_url,d.issues[x].flag_url,d.issues[x].reporter.id,d.issues[x].reporter.name,d.issues[x].reporter.witty_title,d.issues[x].reporter.avatar.full,d.issues[x].reporter.avatar.square_100x100,d.issues[x].reporter.avatar.role,d.issues[x].reporter.avatar.civic_points]);

                  }


        }//end if

    }
http.send();
}


},//data

    getAll: function() {
      this._getData(url);
    }, //end all

    getClosed: function() {
      curl=url+"&status=closed"
      this._getData(curl);
    },//end closed

    getOpen: function() {
      var ourl=url+"&status=open"
      this._getData(ourl);
    },// end Open

    getAcknowledged: function() {
      var aurl=url+"&status=acknowledged"
      this._getData(aurl);
    },// end acknowledged

    getArchived: function() {
      var archurl=url+"&status=archived"
      this._getData(archurl);
    },// end archived

    removeAll: function() {
      for(var x in map._layers){
		      if(map._layers[x].hasOwnProperty('_tiles')){}else{
		          map.removeLayer(map._layers[x]);}
	           }
    },


     getBySearch: function(term) {
      var archurl=url+"&search="+term
      this._getData(archurl);
    },// end archived



    byID: function(id) {
	var UID = "https://seeclickfix.com/api/v2/issues/"+id
    	var http=new XMLHttpRequest();
    	http.open("GET", UID, true);
    	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   	 http.onreadystatechange = function() {//Call a function when the state changes.
      	 if(http.readyState == 4 && http.status == 200) {
           	 var d= JSON.parse(http.responseText);
            	
             
              var temp = L.circleMarker([d.lat,d.lng],2).bindPopup("<h3>"+d.status+"</h3>"+d.description).addTo(map);
              

        }//end if

    }
	http.send();
     
	
	





    },//byID


}); // end class

L.scf = function (options) {
    return new L.SCF(options);
};
