




var a = new Date() ;

module.exports.getDate = function ()
{
    var options = {
        weekday:'long',
        year: 'numeric',
        month:'long',
        day: 'numeric'
      };
      return a.toLocaleDateString("en-US",options);
}
/////////////////////////////////////////////////////
module.exports.getDayy = getDayy;

function getDayy(){
    return a.getDay();
}
/////////////////////////////////////////////////////

module.exports.getTime = ()=>{
    return a.toLocaleTimeString("en-US");
}