this.ajaxUrlConnet = function (data) {
       $.ajax({
           url: '/tbbswrite/opengraph',
           method: "GET",
           async: false,
           cache: false,
           contentType: true,
           processData: true,
           data: {'url': data}
       }).done(function(c) {
           $.each(c, function(key,value){
               console.log(key + ' : ' + value);
           })
           var html=";
           if('video'.indexOf(c['og:type'][0]) >= 0){
               html+='<pre style="width: 300px;overflow: hidden;" onclick="location.href=\"+c['og:url'][0]+'\'">';
               if( !(c['og:video:secure_url'][0] === undefined)){
                   html+='+c['og:video:secure_url'][0]+'">';
               }
               html+='<h1><b>'+c['og:title'][0]+'</b></h1>';
               if( !(c['og:description'] === undefined)){
                   html+='<p>'+c['og:description']+'</p>';
               }
               html+='<p><a href="'+c['og:url'][0]+'">'+c['og:url'][0]+'</a></p>';
               html+='</pre>';
               context.invoke('editor.pasteHTML', html);
           } else {
               html+='<pre style="width: 300px;overflow: hidden;" onclick="location.href=\"+c['og:url'][0]+'\'">';
               if( !(c['og:image'][0] === undefined)){
                   html+='<img src="'+c['og:image'][0]+'" style="width: 100%;height: 100%;" />';
               }
               html+='<p><h1><b>'+c['og:title'][0]+'</b></h1></p>';
               if( !(c['og:description'] === undefined)){
                   html+='<p>'+c['og:description']+'</p>';
               }
               html+='<p><a href="'+c['og:url'][0]+'">'+c['og:url'][0]+'</a></p>';
               html+='</pre>';
               context.invoke('editor.pasteHTML', html);
           }
       }).fail(function() {
           alert('error = ' + data);
       });
}