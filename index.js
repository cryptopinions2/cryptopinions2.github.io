        var MAX_TEXT_LENGTH=150;
        var MAX_WORD_LENGTH=40;
        var opinionTextSet=new Set()
        var opinionDataByIndex={}
        var tempDisableLinks=false
        console.log('test')
            //var provider = new Web3.providers.HttpProvider("http://localhost:8545");//
            //var contract = require("truffle-contract");
        exports.main=function main(document){
        //var contractAddress="0x0798a20400b03de443cbf5cf5f8c141495d6c1c0"//"0x009e566e314e73bedd64a0d3f483cd1215cdad9c"
        var accountAddress=null
        var $=require('jquery')
        //$("p").hide()//
        function setRatingBar(index,icon,comment){
            var ratingbar=document.getElementsByClassName('correctbar'+index)[0]
            setRatingBarLong(ratingbar,icon,comment)
        }
        function setRatingBarLong(ratingbar,icon,comment){
            ratingbar.innerHTML=""
            var rbtext=document.createElement("div");
            rbtext.innerHTML ='<img src="'+icon+'" class="iconbar"/>'+ comment
            rbtext.classList.add("bartext")
            ratingbar.appendChild(rbtext);
        }
        function createBox(i,aclass,infoclass,icon,comment){
                var adiv = document.createElement("div");
                var ratingbar=document.createElement("div");
                var rbtext=document.createElement("div");
                ratingbar.classList.add("correctbar")
                ratingbar.classList.add("correctbar"+i)
                setRatingBarLong(ratingbar,icon,comment)
                adiv.appendChild(ratingbar);
                var adiv2 = document.createElement("div");
                var span=document.createElement("span");
                adiv2.classList.add(aclass);
                adiv2.classList.add("allopinionboxes")
                adiv2.classList.add("insidebox"+i);
                adiv2.appendChild(span);
                adiv.appendChild(adiv2)
                var ahr=document.createElement("hr")
                ahr.setAttribute("width","75%")
                ahr.setAttribute("color","#E6ECF0")
                adiv.appendChild(ahr)
                var info=document.createElement("div")
                info.classList.add(infoclass)
                info.classList.add("info"+i);
                info.classList.add('info')
                info.setAttribute("index",i)
                info.innerHTML="..."
                adiv.appendChild(info)
                return adiv
        }
        function createButton(icon,text,addto,callback){
            var button = document.createElement("button");
            //var iconspan=document.createElement("span");
            //iconspan.classList.add("icon");
            //button.appendChild(iconspan);
            console.log('iconwas '+icon)
            if(icon!=null){
                button.innerHTML ='<img src="'+icon+'" class="icon">'+ text;//what
            }
            else{
                button.textContent = text;
            }
            //button.innerHTML='<div class="icontest"></div>'+text;
            addto.appendChild(button);
            button.addEventListener ("click", function() {
              callback()
            });
        }
        function getIcon(comment,isCorrect){
            if(comment=="Unclaimed"){
                return "greyplus.svg"
            }
            else{
                var icon="redx.svg"
                if(isCorrect){
                    icon="check.svg"
                }
                return icon
            }
        }
        function storeData(ether,address,saddress,asaddress,totalsponsored,totalantisponsored,text,j,comment,isCorrect){
            opinionDataByIndex[j]={'ether':ether,'address':address,'saddress':saddress,'asaddress':asaddress,'totalsponsored':totalsponsored,'totalantisponsored':totalantisponsored,'text':text,'comment':comment,'isCorrect':isCorrect}
        }
        function updateAll(onlymine,newopinion){
                    var element=document.getElementById("content")
                var element2=document.createElement('div')
                element.appendChild(element2)
                element=element2
            //var element=document.getElementById("content")
            var count=0
            getTotalSupply(function(totalSupply){
                console.log('total supply: '+totalSupply)
                for(var j=0;j<totalSupply;j++){
                    //console.log('j is what first:'+j)
                    getOpinion(j,function(ether,address,saddress,asaddress,totalsponsored,totalantisponsored,text,j,comment,isCorrect){
                         if(onlymine){
                            console.log('onlymine '+address)
                            if(web3.eth.defaultAccount!=address && web3.eth.defaultAccount!=saddress && web3.eth.defaultAccount!=asaddress){
                                return
                            }
                        }
                        if(newopinion){
                            if(comment!="Unclaimed"){
                                return
                            }
                        }
                        storeData(ether,address,saddress,asaddress,totalsponsored,totalantisponsored,text,j,comment,isCorrect)
                        text=textSanityCheck(text)
                        var adiv=null;//createBox(j,"insidebox","smallinfo","check.svg")
                        var maintext=text;
                        var info=null;
                        var icon=getIcon(comment,isCorrect)
                        //var buttondiv=document.createElement('div')
                        //buttondiv.classList.add('buttoncontainer')
                        if(comment=="Unclaimed"){//indicates unclaimed
                            adiv=createBox(j,"insidebox","smallinfounclaimed",icon,comment)
                            maintext=""
                            info=getInfoUnclaimed(ether)
                        }
                        else{
                            adiv=createBox(j,"insidebox","smallinfo",icon,comment)
                            info=getInfoShort(ether,address)
                            var sponsorbutton=document.createElement('button')
                            sponsorbutton.textContent='Sponsor'
                            sponsorbutton.classList.add('small')
                            adiv.appendChild(sponsorbutton)
                            sponsorbutton.addEventListener ("click", function(){
                                console.log('button click 1')
                                tempDisableLinks=true
                                sponsorOpinion(web3.eth.accounts[0],j,ether,true,1,function(){ //callback
                                    removeModal()
                                    displayTransactionMessage()
                                });
                                //makeSponsorFunction(j,ether)
                            });
                        }

                        //sponsorbutton.classList.add('
                        //fillButtonContainer(buttondiv,j,ether,address,saddress,asaddress,comment)
                        
                        adiv.classList.add("box");
                        var link=document.createElement("a")
                        link.setAttribute("href","#opinion?i="+j)
                        link.appendChild(adiv)
                        link.onclick=function(){
                            console.log('link click')
                            if(!tempDisableLinks){
                                changeState()
                            }
                            tempDisableLinks=false
                        }
                        element.appendChild(link)//adiv)
                        console.log('i is what now:'+j)
                        //console.log('should be modifying:'+element.children[j].children[0].textContent)
                        adiv.getElementsByClassName("insidebox"+j)[0].children[0].textContent=maintext;
                        console.log(ether,address,text);
                        $('.insidebox'+j).textfill({innertag:'span',debug:false});
                        adiv.getElementsByClassName("info"+j)[0].innerHTML=info;
                        count++
                        if(count==totalSupply){//if they are all finished loading
                            sortOpinions()
                        }
                    });
                }
            });
//
            //registerOpinion(web3.eth.accounts[0],3,"fourth registered opinion",web3.toWei(1,'ether'));
            //console.log('elementchildren :'+element.children.length)
            //callContractTest(element.children[0].children[0])
            //element.children[0].children[0].innerHTML
            for(var i=0;i<element.children.length;i++){
                var topElement=element.children[i]
                //topElement.children[0].innerHTML=web3.eth.accounts[0]
                accountAddress=web3.eth.accounts[0]
                
                //console.log('elementchildren :'+i+" "+)
                //console.log('testregioarg: '+i+" "+element.children[i]);
            }
        }
        function onOpinionTextEntryChange(){
            var tochange=document.getElementsByClassName("allopinionboxes")[0].children[0]
            var texttoenter=document.getElementsByClassName("opinionbox")[0].value
            texttoenter=textSanityCheck(texttoenter)
            tochange.textContent=texttoenter
            $('.allopinionboxes').textfill({ innerTag:"span"});
            document.getElementById("charlimit").textContent=texttoenter.length+"/"+MAX_TEXT_LENGTH
            //console.log('texttoenter '+texttoenter)
        }
        function isAddressInvolved(address,saddress,asaddress){
            var myaddr=web3.eth.accounts[0]
            if(myaddr==address){
                return "Owner"
            }
             else if(myaddr==asaddress){
                return "Anti-Sponsor"
             }
              else if(myaddr==saddress){
                return "Sponsor"
              }
              else{
                  return ""
              }
        }
        function fillButtonContainer(buttondiv,index,ether,address,saddress,asaddress,comment){
            if(typeof buttondiv =="undefined"){
                return;
            }
            buttondiv.innerHTML=""
            if(comment=="Unclaimed"){
                makeRegisterButton(buttondiv,index,ether);
            }
            else{
                var addressInvolvement=isAddressInvolved(address,saddress,asaddress)
                if(addressInvolvement==""){
                    makeSponsorButtons(buttondiv,index,ether);
                }
                else{
                    var involvedInfo=document.createElement('div')
                    involvedInfo.textContent="You are the current "+addressInvolvement+" of this opinion!"
                    involvedInfo.classList.add('largeinfo')
                    buttondiv.appendChild(involvedInfo)
                    console.log('vcxmb,n ')
                }
            }
        }
        function updateAllSingle(index){
            getOpinion(index,function(ether,address,saddress,asaddress,totalsponsored,totalantisponsored,text,index,comment,isCorrect){
                       
                         text=textSanityCheck(text)
                        console.log('getopinion commentgrewgre: '+comment)
                        var element=document.getElementById("content")
                        var adiv=null
                        var buttondiv=document.createElement('div')
                        buttondiv.classList.add('buttoncontainer')
                        if(comment=="Unclaimed"){//indicates unclaimed
                            adiv=createBox(index,"insideboxlarge","largeinfounclaimed","greyplus.svg",comment)
                            var textboxandlimit=document.createElement('div')
                            textboxandlimit.classList.add('textboxandlimit')
                            var textbox=document.createElement("textarea")
                            textbox.placeholder="Your opinion here"
                            textbox.classList.add("opinionbox")
                            textbox.addEventListener('input',onOpinionTextEntryChange);
                            textbox.cols=50;
                            textbox.rows=5;
                            textbox.maxLength=MAX_TEXT_LENGTH
                            textboxandlimit.appendChild(textbox)
                            var charLimitDisplay=document.createElement("div")
                            charLimitDisplay.id="charlimit"
                            charLimitDisplay.textContent="0/"+MAX_TEXT_LENGTH
                            textboxandlimit.appendChild(charLimitDisplay)
                            adiv.appendChild(textboxandlimit)
                            //makeRegisterButton(buttondiv,index,ether);
                            fillButtonContainer(buttondiv,index,ether,address,saddress,asaddress,comment)
                            element.appendChild(adiv)
                             //console.log("bshrsrth"+document.getElementById("insidebox"+index).children[0])
                            // document.getElementById("insidebox"+index).innerHTML="<textarea rows='5' cols='50'>"
                            adiv.getElementsByClassName("info"+index)[0].innerHTML=getInfoUnclaimed(ether)
                        }
                        else{
                            var icon="redx.svg"
                            if(isCorrect){
                                icon="check.svg"
                            }
                            adiv=createBox(index,"insideboxlarge","largeinfo",icon,comment)
                            
                            fillButtonContainer(buttondiv,index,ether,address,saddress,asaddress,comment)
                            
                            console.log('testing something '+document.getElementById('info'+index))
                            
                            adiv.getElementsByClassName("info"+index)[0].innerHTML=getInfoLong(ether,address,saddress,asaddress,totalsponsored,totalantisponsored)
                            element.appendChild(adiv)
                        }
                        adiv.appendChild(buttondiv)
                        adiv.classList.add("largebox");
                        adiv.getElementsByClassName("insidebox"+index)[0].children[0].textContent=text;
                        console.log(ether,address,text);
                        $('.insidebox'+index).textfill({
                                                                        innerTag:"span",
                                                                        debug:false});
                    });
                    

        }
        var modal = document.getElementById('myModal');
        var modalContent=document.getElementById('modal-internal')
        //var span = document.getElementsByClassName("close")[0];
        //span.onclick = function() {
        //    modal.style.display = "none";
        //}
        window.onclick = function(event) {
            if (event.target == modal) {
                removeModal()
            }
        }
        function removeModal(){
                modalContent.innerHTML=""
                modal.style.display = "none";
        }
        function displayTransactionMessage(){
            displayModalMessage("Transaction Submitted")
        }
        function displayModalMessage(message){
            modal.style.display = "block";
            modalContent.textContent=message;
            setTimeout(removeModal,3000)
        }
        var aboutPage=document.getElementById('about')
        function hideAboutPage(){
            aboutPage.style.display="none"
        }
        function showAboutPage(){
            aboutPage.style.display="block"
        }
        function makeRegisterButton(adiv,index,ether){
            createButton("check.svg","Claim Opinion",adiv,function(){
                            console.log("sponsoring");
                            var opinionText=document.getElementsByClassName("opinionbox")[0].value
                            getTotalSupply(function(totalSupply){
                                getDuplicate(totalSupply,opinionText,function(hasDuplicate){
                                    if(hasDuplicate){
                                        displayModalMessage("Opinion already registered")
                                    }
                                    else{
                                        registerOpinion(web3.eth.accounts[0],index,opinionText,ether,function(){
                                            displayTransactionMessage()
                                        });
                                    }
                                });
                            });
                        });
        }
        function makeSmallSponsorButton(adiv,index,ether){
            
        }
        function makeSponsorButton(adiv,index,ether){
                            createButton("check.svg","Sponsor",adiv,makeSponsorFunction(index,ether));
        }
        function makeSponsorFunction(index,ether){
            return function(){
                            console.log("sponsoring");
                            modal.style.display = "block";

                            var modalinfo=document.createElement('div')
                            modalinfo.innerHTML=weiToDisplay(ether)+" Eth"
                            modalContent.appendChild(modalinfo)
                            modalContent.classList.add('infomodal')
                            var modalInfo2=document.createElement('div')
                            modalInfo2.textContent="90% goes to the previous sponsor, 10% fee to opinion owner. 90% of the next sponsor payment will go to you. The cost to sponsor and antisponsor increases. Your selected label is displayed on the opinion."
                            modalInfo2.classList.add('descriptiveText')
                            modalContent.appendChild(modalInfo2)
                            modalContent.appendChild(createSelectFromDict(commentMapLike))
                                                        createButton("check.svg","Sponsor",modalContent,function(){
                                var e=document.getElementById('finalizeSponsor')
                                sponsorOpinion(web3.eth.accounts[0],index,ether,true,e.options[e.selectedIndex].value,function(){ //callback
                                    removeModal()
                                    displayTransactionMessage()
                                });//
                                
                            });
                            //sponsorOpinion(web3.eth.accounts[0],index,ether,true,1);
                        }
        }
        function makeAntisponsorButton(adiv,index,ether){
                            createButton("redx.svg","Anti-Sponsor",adiv,function(){
                            console.log("antisponsoring");
                            modal.style.display = "block";

                            var modalinfo=document.createElement('div')
                            modalinfo.innerHTML=weiToDisplay(ether)+" Eth"
                            modalContent.appendChild(modalinfo)
                            modalContent.classList.add('infomodal')
                            var modalInfo2=document.createElement('div')
                            modalInfo2.textContent="90% goes to the previous antisponsor. 90% of the next antisponsor payment will go to you. The opinion owner gets nothing, and the cost to sponsor also increases. Your selected label is displayed on the opinion."
                            modalInfo2.classList.add('descriptiveText')
                            modalContent.appendChild(modalInfo2)
                            modalContent.appendChild(createSelectFromDict(commentMapDislike))
                            createButton("redx.svg","Anti-Sponsor",modalContent,function(){
                                var e=document.getElementById('finalizeSponsor')
                                sponsorOpinion(web3.eth.accounts[0],index,ether,false,e.options[e.selectedIndex].value,function(){ //callback
                                    removeModal()
                                    displayTransactionMessage()
                                });//
                                
                            });
                            //sponsorOpinion(web3.eth.accounts[0],index,ether,false,101);//
                        });
        }
        function makeSponsorButtons(adiv,index,ether){
                        makeSponsorButton(adiv,index,ether)
                        makeAntisponsorButton(adiv,index,ether)
        }
        function createSelectFromDict(dict){
            var select=document.createElement("select")
            select.id="finalizeSponsor"
            var option
            for (var key in dict){
              console.log( key, dict[key] );
              option=document.createElement('option')
              option.value=key
              option.textContent=dict[key]
              select.appendChild(option)
            }
            return select
        }
        /*
        function initializeParts(){
            var element=document.getElementById("content")
            var adiv=document.createElement("div");
            adiv.classList.add('center-screen');
            element.appendChild(adiv)
        }*/
        function getInfoShort(price,owner){
            return "Owner:<br>"+owner.substring(0,15)+"...<br><br>Price to sponsor: "+weiToDisplay(price)+" Eth";
        }
        function getInfoUnclaimed(price){
            return "Cost: "+weiToDisplay(price)+" Eth";
        }
        function buildESLink(address){
            return "<a style='font-weight:normal' href=https://etherscan.io/address/"+address+">"+address+"</a>"
        }
        function getInfoLong(price,owner,sponsor,antisponsor,totalsponsor,totalantisponsor){
            var info="Owner: "+buildESLink(owner)+"<div style='color:green'>Sponsor: "+buildESLink(sponsor)+"<br>Total sponsored: "+weiToDisplay(web3.toDecimal(totalsponsor))+" Eth</div><div style='color:red'>Antisponsor: "+buildESLink(antisponsor)+"<br>Total antisponsored: "+weiToDisplay(web3.toDecimal(totalantisponsor))+" Eth</div>"+"<br><br>Price to sponsor: "+weiToDisplay(price)+" Eth";
            return info
        }
        /*
        function clearDuplicates(){
            var itemsArr = Array.prototype.slice.call(document.getElementById('content').children[0].children);
            
            opinionTextSet
        }
        */
        function removeFromArray(array,item){
            var index = array.indexOf(item);
            //console.log('removing from array '+array+" "+typeof(array[0])+" "+typeof(item)+" "+index)
            if (index !== -1) array.splice(index, 1);
            //console.log('new array '+array)
        }
        //sort opinions and also clear duplicates
        function sortOpinions(){
            var itemsArr = Array.prototype.slice.call(document.getElementById('content').children[0].children);
            //console.log('sortopinions '+itemsArr.length)
            var indexArr=[]
            if(window.location.href.indexOf('#opinion')>-1){
                return;
            }
            var itemsByIndex={}
            for(var i=0;i<itemsArr.length;i++){
                var info=itemsArr[i].getElementsByClassName('info')[0]
                if(typeof info != "undefined"){
                    var index=info.getAttribute("index")
                    itemsByIndex[index]=itemsArr[i]
                    indexArr.push(index)
                }
            }
            //console.log('sorting indexes '+indexArr)
            
            var newdiv=document.createElement('div')
            indexArr.sort(function(a, b) {
              var aeth=opinionDataByIndex[a]['ether']
              var beth=opinionDataByIndex[b]['ether']
              //console.log('sorting '+aeth+' '+beth)
              if(aeth == beth){
                return (a > b ? -1 : 1)
              }
              else{
                if(aeth>beth){
                        return -1
                }
                else{
                    return 1
                }
              }
            });
            
           
            //clear duplicates
            opinionTextSet=new Set()
            var numOpinions=indexArr.length
            if(opinionDataByIndex.length>=numOpinions){
                for(var i=0;i< numOpinions;i++){
                    var itemtext=opinionDataByIndex[i]['text']
                    if(opinionDataByIndex[i]['comment']=='Unclaimed'){
                        continue;
                    }
                    //console.log('clearing duplicate text check: '+'^'+i)
                    if(opinionTextSet.has(itemtext)){
                        //console.log('clearing duplicate has text')
                        removeFromArray(indexArr,i+"")
                    }
                    else{
                        //console.log('clearing duplicate no text')
                        opinionTextSet.add(itemtext)
                    }
                }
        }
        else{
            console.log('opiniondatabyindex was not populated when sortopinions ran')
        }
            
            
            for (i = 0; i < indexArr.length; ++i) {
               var newitem=itemsByIndex[indexArr[i]]
              newdiv.appendChild(newitem);
            }
            var content=document.getElementById('content')
            content.innerHTML=""
            content.appendChild(newdiv)
        }
        function refreshInfo(){
            console.log('refreshinfo')
            sortOpinions()
            var allinfo=document.getElementsByClassName('info')
            Array.prototype.forEach.call(allinfo, function(info) {
                var index=info.getAttribute('index')
                getOpinion(index,function(ether,address,saddress,asaddress,totalsponsored,totalantisponsored,text,index,comment,isCorrect){
                    var textbox=document.getElementsByClassName("insidebox"+index)[0]
                    if(typeof textbox !="undefined" && comment!='Unclaimed'){
                        textbox.children[0].textContent=textSanityCheck(text);
                    }
                    $('.insidebox'+index).textfill({innertag:'span',debug:false});
                    if(comment!="Unclaimed"){
                        var textboxandlimit=document.getElementsByClassName('textboxandlimit')[0]
                        if(typeof textboxandlimit != "undefined"){
                            textboxandlimit.style.display = "none"
                        }
                    }
                    var icon=getIcon(comment,isCorrect)
                    setRatingBar(index,icon,comment)
                    if(info.classList.contains('smallinfo')){
                        info.innerHTML=getInfoShort(ether,address)
                    }
                    if(info.classList.contains('largeinfo')){
                        info.innerHTML=getInfoLong(ether,address,saddress,asaddress,totalsponsored,totalantisponsored)
                        var buttondiv=document.getElementsByClassName('buttoncontainer')[0]
                        fillButtonContainer(buttondiv,index,ether,address,saddress,asaddress,comment)
                    }
                    if(info.classList.contains('smallinfounclaimed') || info.classList.contains('largeinfounclaimed')){
                        info.innerHTML=getInfoUnclaimed(ether)
                        var buttondiv=document.getElementsByClassName('buttoncontainer')[0]
                        fillButtonContainer(buttondiv,index,ether,address,saddress,asaddress,comment)
                    }
                });
            });
            setTimeout(refreshInfo, 5000);
        }
        function weiToDisplay(ethprice){
            return formatEthValue(web3.fromWei(ethprice,'ether'))
        }
        function formatEthValue(ethstr){
            return parseFloat(parseFloat(ethstr).toFixed(5));
        }
        function textSanityCheck(text){
            
            text=text.replace(/[^\x00-\x7F]/g, ""); //only ascii
            var newtext=text;
            if(text.length>MAX_TEXT_LENGTH){
                newtext=text.substring(0,MAX_TEXT_LENGTH)+"..."
            }
            var words=newtext.split(" ");
            newtext=""
            for(var i=0;i<words.length;i++){
                var word=words[i]
                if(word.length>MAX_WORD_LENGTH){
                    word=word.substring(0,MAX_WORD_LENGTH)+"..."
                }
                newtext+=word+" "
            }
            return newtext
        }
        var refreshIsSet=false
            function init() {
                
                web3.version.getNetwork((err, netId) => {
                  switch (netId) {
                    case "1":
                      console.log('This is mainnet')
                      break
                    case "2":
                        displayModalMessage('Please connect to Ethereum Mainnet using Metamask')
                      console.log('This is the deprecated Morden test network.')
                      break
                    case "3":
                        displayModalMessage('Please connect to Ethereum Mainnet using Metamask')
                      console.log('This is the ropsten test network.')
                      break
                    default:
                      displayModalMessage('Please connect to Ethereum Mainnet using Metamask')
                      console.log('This is an unknown network.')
                  }
                })
                hideAboutPage()
                
                var url=window.location.href
                var index=getParameterByName('i')
                
                if(window.location.href.indexOf('#opinion')>-1){
                    console.log('looking at single opinion')
                    updateAllSingle(index);
                }
                else if(window.location.href.indexOf('#about')>-1){
                    showAboutPage()
                }
                else if(window.location.href.indexOf('#myopinions')>-1){
                    updateAll(true);
                    applyHeaderText("My Opinions:")
                }
                else if(window.location.href.indexOf('#newopinion')>-1){
                    updateAll(false,true);
                    applyHeaderText("Register new opinion:")
                }
                else{
                    updateAll();
                }
                
                //set links in page to call changeState
                var links=document.getElementsByTagName('a')
                for(var i = 0;i < links.length; i++){
                    //console.log('link: '+links[i])
                    links[i].onclick=changeState
                }
                
                //refreshInfo()
                if(!refreshIsSet){
                    setTimeout(refreshInfo,5000);
                    refreshIsSet=true
                }
            }
            setTimeout(init, 100);
            
            particlesJS.load('particles-js', 'particles.json', function() {
            console.log('callback - particles.js config loaded');
            });
            
            
            function applyHeaderText(text){
                    var caption=document.getElementById('caption')
                    caption.textContent=text
                    caption.style.display='block'
            }
            function clearAll(){
                console.log('clearall')
                var caption=document.getElementById('caption')
                    caption.style.display='none'
                var content=document.getElementById('content')
                content.innerHTML=""
            }
            
            function changeState(){
                console.log('changing state')
                clearAll()
                setTimeout(init,100)
            }
    }