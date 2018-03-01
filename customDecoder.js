function splitHex(hex,lengths){
    var result=[]
    hex=hex.slice(2)
    for(var i=0;i<lengths.length;i++){
        var part=hex.slice(0,Math.min(lengths[i],hex.length))
        hex=hex.slice(lengths[i])
        result.push(part)
    }
    return result;
}
function testResults(hex,lengths){
    result=splitHex(hex,lengths)
    recompiled=""
    for(var i=0;i<result.length;i++){
        recompiled+=result[i]
    }
    console.log('testing customdecoder 0x'+recompiled+"\n\n"+hex);
}