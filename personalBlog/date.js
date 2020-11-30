var a = new Date();


module.exports.getTime = ()=>
{
    return a.toLocaleTimeString("en-US");
}