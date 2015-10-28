var request = require('request'),
    xml2js = require('xml2js'),  // require the feed-read module
    fs   = require('fs'),
    parser = new xml2js.Parser(),
    destination = '/var/www/crysfel.com/hexo/public/creedprofetas/data.json';


var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};

var options = {
    url     : 'http://iministers.podomatic.com/rss2.xml',
    method  : 'GET',
    headers : headers
};

request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        parser.parseString(body, function (err, result) {
            var creedRegExp = /^Creed a sus Profetas/ig,
                creedRegExp2= /^Creed en sus Profetas/ig,
                articles = [],
                data     = result.rss.channel[0],
                article, groups,
                post;

            
            for(var i=0,len=data.item.length;i<len;i++){
                article = data.item[i];
                

                if(creedRegExp.test(article.title[0])){
                    var titleRegExp = /^Creed a sus Profetas.*[\:\-](.*)$/ig,
                        egw = /El Camino a Cristo/ig;
                
                    groups = titleRegExp.exec(article.title[0]);
                    post = {
                        title   : groups[1].trim(),
                        book    : egw.test(article.title[0]),
                        pubDate : article.pubDate,
                        content : article['itunes:summary'][0],
                        tns     : article['itunes:image'][0].$.href,
                        mp3     : {
                            url     : article.enclosure[0].$.url,
                            length  : article.enclosure[0].$.length
                        }
                    };
                    articles.push(post);
                }else if(creedRegExp2.test(article.title[0])){
                    var titleRegExp = /^Creed en sus Profetas.*[\:\-](.*)$/ig,
                        egw = /El Camino a Cristo/ig;

                    groups = titleRegExp.exec(article.title[0]);
                    post = {
                        title   : groups[1].trim(),
                        book    : egw.test(article.title[0]),
                        pubDate : article.pubDate,
                        content : article['itunes:summary'][0],
                        tns     : article['itunes:image'][0].$.href,
                        mp3     : {
                            url     : article.enclosure[0].$.url,
                            length  : article.enclosure[0].$.length
                        }
                    };
                    articles.push(post);
                }
            }

            fs.writeFile(destination, JSON.stringify({updatedAt:data.pubDate,data:articles}),'utf8', function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            }); 
        });
    }
});