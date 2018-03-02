(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("index.js", function(exports, require, module) {
'use strict';

var MAX_TEXT_LENGTH = 150;
var opinionTextSet = new Set();
var opinionDataByIndex = {};
console.log('test');
//var provider = new Web3.providers.HttpProvider("http://localhost:8545");//
//var contract = require("truffle-contract");
exports.main = function main(document) {
    //var contractAddress="0x0798a20400b03de443cbf5cf5f8c141495d6c1c0"//"0x009e566e314e73bedd64a0d3f483cd1215cdad9c"
    var accountAddress = null;
    var $ = require('jquery');
    //$("p").hide()//
    function setRatingBar(index, icon, comment) {
        var ratingbar = document.getElementsByClassName('correctbar' + index)[0];
        setRatingBarLong(ratingbar, icon, comment);
    }
    function setRatingBarLong(ratingbar, icon, comment) {
        ratingbar.innerHTML = "";
        var rbtext = document.createElement("div");
        rbtext.innerHTML = '<img src="' + icon + '" class="iconbar"/>' + comment;
        rbtext.classList.add("bartext");
        ratingbar.appendChild(rbtext);
    }
    function createBox(i, aclass, infoclass, icon, comment) {
        var adiv = document.createElement("div");
        var ratingbar = document.createElement("div");
        var rbtext = document.createElement("div");
        ratingbar.classList.add("correctbar");
        ratingbar.classList.add("correctbar" + i);
        setRatingBarLong(ratingbar, icon, comment);
        adiv.appendChild(ratingbar);
        var adiv2 = document.createElement("div");
        var span = document.createElement("span");
        adiv2.classList.add(aclass);
        adiv2.classList.add("allopinionboxes");
        adiv2.classList.add("insidebox" + i);
        adiv2.appendChild(span);
        adiv.appendChild(adiv2);
        var ahr = document.createElement("hr");
        ahr.setAttribute("width", "75%");
        ahr.setAttribute("color", "#E6ECF0");
        adiv.appendChild(ahr);
        var info = document.createElement("div");
        info.classList.add(infoclass);
        info.classList.add("info" + i);
        info.classList.add('info');
        info.setAttribute("index", i);
        info.innerHTML = "...";
        adiv.appendChild(info);
        return adiv;
    }
    function createButton(icon, text, addto, callback) {
        var button = document.createElement("button");
        //var iconspan=document.createElement("span");
        //iconspan.classList.add("icon");
        //button.appendChild(iconspan);
        console.log('iconwas ' + icon);
        if (icon != null) {
            button.innerHTML = '<img src="' + icon + '" class="icon">' + text; //what
        } else {
            button.textContent = text;
        }
        //button.innerHTML='<div class="icontest"></div>'+text;
        addto.appendChild(button);
        button.addEventListener("click", function () {
            callback();
        });
    }
    function getIcon(comment, isCorrect) {
        if (comment == "Unclaimed") {
            return "greyplus.svg";
        } else {
            var icon = "redx.svg";
            if (isCorrect) {
                icon = "check.svg";
            }
            return icon;
        }
    }
    function storeData(ether, address, saddress, asaddress, totalsponsored, totalantisponsored, text, j, comment, isCorrect) {
        opinionDataByIndex[j] = { 'ether': ether, 'address': address, 'saddress': saddress, 'asaddress': asaddress, 'totalsponsored': totalsponsored, 'totalantisponsored': totalantisponsored, 'text': text, 'comment': comment, 'isCorrect': isCorrect };
    }
    function updateAll(onlymine, newopinion) {
        var element = document.getElementById("content");
        var element2 = document.createElement('div');
        element.appendChild(element2);
        element = element2;
        //var element=document.getElementById("content")
        var count = 0;
        getTotalSupply(function (totalSupply) {
            console.log('total supply: ' + totalSupply);
            for (var j = 0; j < totalSupply; j++) {
                //console.log('j is what first:'+j)
                getOpinion(j, function (ether, address, saddress, asaddress, totalsponsored, totalantisponsored, text, j, comment, isCorrect) {
                    if (onlymine) {
                        console.log('onlymine ' + address);
                        if (web3.eth.defaultAccount != address && web3.eth.defaultAccount != saddress && web3.eth.defaultAccount != asaddress) {
                            return;
                        }
                    }
                    if (newopinion) {
                        if (comment != "Unclaimed") {
                            return;
                        }
                    }
                    storeData(ether, address, saddress, asaddress, totalsponsored, totalantisponsored, text, j, comment, isCorrect);
                    text = textSanityCheck(text);
                    var adiv = null; //createBox(j,"insidebox","smallinfo","check.svg")
                    var maintext = text;
                    var info = null;
                    var icon = getIcon(comment, isCorrect);
                    if (comment == "Unclaimed") {
                        //indicates unclaimed
                        adiv = createBox(j, "insidebox", "smallinfounclaimed", icon, comment);
                        maintext = "";
                        info = getInfoUnclaimed(ether);
                    } else {
                        adiv = createBox(j, "insidebox", "smallinfo", icon, comment);
                        info = getInfoShort(ether, address);
                    }
                    adiv.classList.add("box");
                    var link = document.createElement("a");
                    link.setAttribute("href", "#opinion?i=" + j);
                    link.appendChild(adiv);
                    link.onclick = changeState;
                    element.appendChild(link); //adiv)
                    console.log('i is what now:' + j);
                    //console.log('should be modifying:'+element.children[j].children[0].textContent)
                    adiv.getElementsByClassName("insidebox" + j)[0].children[0].textContent = maintext;
                    console.log(ether, address, text);
                    $('.insidebox' + j).textfill({ innertag: 'div', debug: false });
                    adiv.getElementsByClassName("info" + j)[0].innerHTML = info;
                    count++;
                    if (count == totalSupply) {
                        //if they are all finished loading
                        sortOpinions();
                    }
                });
            }
        });
        //
        //registerOpinion(web3.eth.accounts[0],3,"fourth registered opinion",web3.toWei(1,'ether'));
        //console.log('elementchildren :'+element.children.length)
        //callContractTest(element.children[0].children[0])
        //element.children[0].children[0].innerHTML
        for (var i = 0; i < element.children.length; i++) {
            var topElement = element.children[i];
            //topElement.children[0].innerHTML=web3.eth.accounts[0]
            accountAddress = web3.eth.accounts[0];

            //console.log('elementchildren :'+i+" "+)
            //console.log('testregioarg: '+i+" "+element.children[i]);
        }
    }
    function onOpinionTextEntryChange() {
        var tochange = document.getElementsByClassName("allopinionboxes")[0].children[0];
        var texttoenter = document.getElementsByClassName("opinionbox")[0].value;
        texttoenter = textSanityCheck(texttoenter);
        tochange.textContent = texttoenter;
        $('.allopinionboxes').textfill({ innerTag: "span" });
        document.getElementById("charlimit").textContent = texttoenter.length + "/" + MAX_TEXT_LENGTH;
        //console.log('texttoenter '+texttoenter)
    }
    function isAddressInvolved(address, saddress, asaddress) {
        var myaddr = web3.eth.accounts[0];
        if (myaddr == address) {
            return "Owner";
        } else if (myaddr == asaddress) {
            return "Anti-Sponsor";
        } else if (myaddr == saddress) {
            return "Sponsor";
        } else {
            return "";
        }
    }
    function fillButtonContainer(buttondiv, index, ether, address, saddress, asaddress, comment) {
        if (typeof buttondiv == "undefined") {
            return;
        }
        buttondiv.innerHTML = "";
        if (comment == "Unclaimed") {
            makeRegisterButton(buttondiv, index, ether);
        } else {
            var addressInvolvement = isAddressInvolved(address, saddress, asaddress);
            if (addressInvolvement == "") {
                makeSponsorButtons(buttondiv, index, ether);
            } else {
                var involvedInfo = document.createElement('div');
                involvedInfo.textContent = "You are the current " + addressInvolvement + " of this opinion!";
                involvedInfo.classList.add('largeinfo');
                buttondiv.appendChild(involvedInfo);
                console.log('vcxmb,n ');
            }
        }
    }
    function updateAllSingle(index) {
        getOpinion(index, function (ether, address, saddress, asaddress, totalsponsored, totalantisponsored, text, index, comment, isCorrect) {

            text = textSanityCheck(text);
            console.log('getopinion commentgrewgre: ' + comment);
            var element = document.getElementById("content");
            var adiv = null;
            var buttondiv = document.createElement('div');
            buttondiv.classList.add('buttoncontainer');
            if (comment == "Unclaimed") {
                //indicates unclaimed
                adiv = createBox(index, "insideboxlarge", "largeinfounclaimed", "greyplus.svg", comment);
                var textboxandlimit = document.createElement('div');
                textboxandlimit.classList.add('textboxandlimit');
                var textbox = document.createElement("textarea");
                textbox.placeholder = "Your opinion here";
                textbox.classList.add("opinionbox");
                textbox.addEventListener('input', onOpinionTextEntryChange);
                textbox.cols = 50;
                textbox.rows = 5;
                textbox.maxLength = MAX_TEXT_LENGTH;
                textboxandlimit.appendChild(textbox);
                var charLimitDisplay = document.createElement("div");
                charLimitDisplay.id = "charlimit";
                charLimitDisplay.textContent = "0/" + MAX_TEXT_LENGTH;
                textboxandlimit.appendChild(charLimitDisplay);
                adiv.appendChild(textboxandlimit);
                //makeRegisterButton(buttondiv,index,ether);
                fillButtonContainer(buttondiv, index, ether, address, saddress, asaddress, comment);
                element.appendChild(adiv);
                //console.log("bshrsrth"+document.getElementById("insidebox"+index).children[0])
                // document.getElementById("insidebox"+index).innerHTML="<textarea rows='5' cols='50'>"
                adiv.getElementsByClassName("info" + index)[0].innerHTML = getInfoUnclaimed(ether);
            } else {
                var icon = "redx.svg";
                if (isCorrect) {
                    icon = "check.svg";
                }
                adiv = createBox(index, "insideboxlarge", "largeinfo", icon, comment);

                fillButtonContainer(buttondiv, index, ether, address, saddress, asaddress, comment);

                console.log('testing something ' + document.getElementById('info' + index));

                adiv.getElementsByClassName("info" + index)[0].innerHTML = getInfoLong(ether, address, saddress, asaddress, totalsponsored, totalantisponsored);
                element.appendChild(adiv);
            }
            adiv.appendChild(buttondiv);
            adiv.classList.add("largebox");
            adiv.getElementsByClassName("insidebox" + index)[0].children[0].textContent = text;
            console.log(ether, address, text);
            $('.insidebox' + index).textfill({
                innerTag: "span",
                debug: false });
        });
    }
    var modal = document.getElementById('myModal');
    var modalContent = document.getElementById('modal-internal');
    //var span = document.getElementsByClassName("close")[0];
    //span.onclick = function() {
    //    modal.style.display = "none";
    //}
    window.onclick = function (event) {
        if (event.target == modal) {
            removeModal();
        }
    };
    function removeModal() {
        modalContent.innerHTML = "";
        modal.style.display = "none";
    }
    function displayTransactionMessage() {
        displayModalMessage("Transaction Submitted");
    }
    function displayModalMessage(message) {
        modal.style.display = "block";
        modalContent.textContent = message;
        setTimeout(removeModal, 3000);
    }
    var aboutPage = document.getElementById('about');
    function hideAboutPage() {
        aboutPage.style.display = "none";
    }
    function showAboutPage() {
        aboutPage.style.display = "block";
    }
    function makeRegisterButton(adiv, index, ether) {
        createButton("check.svg", "Claim Opinion", adiv, function () {
            console.log("sponsoring");
            var opinionText = document.getElementsByClassName("opinionbox")[0].value;
            getTotalSupply(function (totalSupply) {
                getDuplicate(totalSupply, opinionText, function (hasDuplicate) {
                    if (hasDuplicate) {
                        displayModalMessage("Opinion already registered");
                    } else {
                        registerOpinion(web3.eth.accounts[0], index, opinionText, ether, function () {
                            displayTransactionMessage();
                        });
                    }
                });
            });
        });
    }
    function makeSponsorButtons(adiv, index, ether) {
        createButton("check.svg", "Sponsor", adiv, function () {
            console.log("sponsoring");
            modal.style.display = "block";

            var modalinfo = document.createElement('div');
            modalinfo.innerHTML = weiToDisplay(ether) + " Eth";
            modalContent.appendChild(modalinfo);
            modalContent.classList.add('infomodal');
            var modalInfo2 = document.createElement('div');
            modalInfo2.textContent = "90% goes to the previous sponsor, 10% fee to opinion owner. 90% of the next sponsor payment will go to you. The cost to sponsor and antisponsor increases. Your selected label is displayed on the opinion.";
            modalInfo2.classList.add('descriptiveText');
            modalContent.appendChild(modalInfo2);
            modalContent.appendChild(createSelectFromDict(commentMapLike));
            createButton("check.svg", "Sponsor", modalContent, function () {
                var e = document.getElementById('finalizeSponsor');
                sponsorOpinion(web3.eth.accounts[0], index, ether, true, e.options[e.selectedIndex].value, function () {
                    //callback
                    removeModal();
                    displayTransactionMessage();
                }); //
            });
            //sponsorOpinion(web3.eth.accounts[0],index,ether,true,1);
        });
        createButton("redx.svg", "Anti-Sponsor", adiv, function () {
            console.log("antisponsoring");
            modal.style.display = "block";

            var modalinfo = document.createElement('div');
            modalinfo.innerHTML = weiToDisplay(ether) + " Eth";
            modalContent.appendChild(modalinfo);
            modalContent.classList.add('infomodal');
            var modalInfo2 = document.createElement('div');
            modalInfo2.textContent = "90% goes to the previous antisponsor. 90% of the next antisponsor payment will go to you. The opinion owner gets nothing, and the cost to sponsor also increases. Your selected label is displayed on the opinion.";
            modalInfo2.classList.add('descriptiveText');
            modalContent.appendChild(modalInfo2);
            modalContent.appendChild(createSelectFromDict(commentMapDislike));
            createButton("redx.svg", "Anti-Sponsor", modalContent, function () {
                var e = document.getElementById('finalizeSponsor');
                sponsorOpinion(web3.eth.accounts[0], index, ether, false, e.options[e.selectedIndex].value, function () {
                    //callback
                    removeModal();
                    displayTransactionMessage();
                }); //
            });
            //sponsorOpinion(web3.eth.accounts[0],index,ether,false,101);//
        });
    }
    function createSelectFromDict(dict) {
        var select = document.createElement("select");
        select.id = "finalizeSponsor";
        var option;
        for (var key in dict) {
            console.log(key, dict[key]);
            option = document.createElement('option');
            option.value = key;
            option.textContent = dict[key];
            select.appendChild(option);
        }
        return select;
    }
    /*
    function initializeParts(){
        var element=document.getElementById("content")
        var adiv=document.createElement("div");
        adiv.classList.add('center-screen');
        element.appendChild(adiv)
    }*/
    function getInfoShort(price, owner) {
        return "Owner:<br>" + owner.substring(0, 15) + "...<br><br>Price to sponsor: " + weiToDisplay(price) + " Eth";
    }
    function getInfoUnclaimed(price) {
        return "Cost: " + weiToDisplay(price) + " Eth";
    }
    function buildESLink(address) {
        return "<a style='font-weight:normal' href=https://etherscan.io/address/" + address + ">" + address + "</a>";
    }
    function getInfoLong(price, owner, sponsor, antisponsor, totalsponsor, totalantisponsor) {
        var info = "Owner: " + buildESLink(owner) + "<div style='color:green'>Sponsor: " + buildESLink(sponsor) + "<br>Total sponsored: " + weiToDisplay(web3.toDecimal(totalsponsor)) + " Eth</div><div style='color:red'>Antisponsor: " + buildESLink(antisponsor) + "<br>Total antisponsored: " + weiToDisplay(web3.toDecimal(totalantisponsor)) + " Eth</div>" + "<br><br>Price to sponsor: " + weiToDisplay(price) + " Eth";
        return info;
    }
    /*
    function clearDuplicates(){
        var itemsArr = Array.prototype.slice.call(document.getElementById('content').children[0].children);
        
        opinionTextSet
    }
    */
    function removeFromArray(array, item) {
        var index = array.indexOf(item);
        //console.log('removing from array '+array+" "+typeof(array[0])+" "+typeof(item)+" "+index)
        if (index !== -1) array.splice(index, 1);
        //console.log('new array '+array)
    }
    //sort opinions and also clear duplicates
    function sortOpinions() {
        var itemsArr = Array.prototype.slice.call(document.getElementById('content').children[0].children);
        //console.log('sortopinions '+itemsArr.length)
        var indexArr = [];
        if (window.location.href.indexOf('#opinion') > -1) {
            return;
        }
        var itemsByIndex = {};
        for (var i = 0; i < itemsArr.length; i++) {
            var info = itemsArr[i].getElementsByClassName('info')[0];
            if (typeof info != "undefined") {
                var index = info.getAttribute("index");
                itemsByIndex[index] = itemsArr[i];
                indexArr.push(index);
            }
        }
        //console.log('sorting indexes '+indexArr)

        var newdiv = document.createElement('div');
        indexArr.sort(function (a, b) {
            var aeth = opinionDataByIndex[a]['ether'];
            var beth = opinionDataByIndex[b]['ether'];
            //console.log('sorting '+aeth+' '+beth)
            if (aeth == beth) {
                return a > b ? -1 : 1;
            } else {
                if (aeth > beth) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });

        //clear duplicates
        opinionTextSet = new Set();
        var numOpinions = indexArr.length;
        if (opinionDataByIndex.length >= numOpinions) {
            for (var i = 0; i < numOpinions; i++) {
                var itemtext = opinionDataByIndex[i]['text'];
                if (opinionDataByIndex[i]['comment'] == 'Unclaimed') {
                    continue;
                }
                //console.log('clearing duplicate text check: '+'^'+i)
                if (opinionTextSet.has(itemtext)) {
                    //console.log('clearing duplicate has text')
                    removeFromArray(indexArr, i + "");
                } else {
                    //console.log('clearing duplicate no text')
                    opinionTextSet.add(itemtext);
                }
            }
        } else {
            console.log('opiniondatabyindex was not populated when sortopinions ran');
        }

        for (i = 0; i < indexArr.length; ++i) {
            var newitem = itemsByIndex[indexArr[i]];
            newdiv.appendChild(newitem);
        }
        var content = document.getElementById('content');
        content.innerHTML = "";
        content.appendChild(newdiv);
    }
    function refreshInfo() {
        console.log('refreshinfo');
        sortOpinions();
        var allinfo = document.getElementsByClassName('info');
        Array.prototype.forEach.call(allinfo, function (info) {
            var index = info.getAttribute('index');
            getOpinion(index, function (ether, address, saddress, asaddress, totalsponsored, totalantisponsored, text, index, comment, isCorrect) {
                var textbox = document.getElementsByClassName("insidebox" + index)[0];
                if (typeof textbox != "undefined" && comment != 'Unclaimed') {
                    textbox.children[0].textContent = textSanityCheck(text);
                }
                $('.insidebox' + index).textfill({ innertag: 'div', debug: false });
                if (comment != "Unclaimed") {
                    var textboxandlimit = document.getElementsByClassName('textboxandlimit')[0];
                    if (typeof textboxandlimit != "undefined") {
                        textboxandlimit.style.display = "none";
                    }
                }
                var icon = getIcon(comment, isCorrect);
                setRatingBar(index, icon, comment);
                if (info.classList.contains('smallinfo')) {
                    info.innerHTML = getInfoShort(ether, address);
                }
                if (info.classList.contains('largeinfo')) {
                    info.innerHTML = getInfoLong(ether, address, saddress, asaddress, totalsponsored, totalantisponsored);
                    var buttondiv = document.getElementsByClassName('buttoncontainer')[0];
                    fillButtonContainer(buttondiv, index, ether, address, saddress, asaddress, comment);
                }
                if (info.classList.contains('smallinfounclaimed') || info.classList.contains('largeinfounclaimed')) {
                    info.innerHTML = getInfoUnclaimed(ether);
                    var buttondiv = document.getElementsByClassName('buttoncontainer')[0];
                    fillButtonContainer(buttondiv, index, ether, address, saddress, asaddress, comment);
                }
            });
        });
        setTimeout(refreshInfo, 5000);
    }
    function weiToDisplay(ethprice) {
        return formatEthValue(web3.fromWei(ethprice, 'ether'));
    }
    function formatEthValue(ethstr) {
        return parseFloat(parseFloat(ethstr).toFixed(5));
    }
    function textSanityCheck(text) {
        text = text.replace(/[^\x00-\x7F]/g, ""); //only ascii
        var newtext = text;
        if (text.length > MAX_TEXT_LENGTH) {
            newtext = text.substring(0, MAX_TEXT_LENGTH) + "...";
        }
        return newtext;
    }
    var refreshIsSet = false;
    function init() {

        web3.version.getNetwork(function (err, netId) {
            switch (netId) {
                case "1":
                    console.log('This is mainnet');
                    break;
                case "2":
                    displayModalMessage('Please connect to Ethereum Mainnet using Metamask');
                    console.log('This is the deprecated Morden test network.');
                    break;
                case "3":
                    displayModalMessage('Please connect to Ethereum Mainnet using Metamask');
                    console.log('This is the ropsten test network.');
                    break;
                default:
                    displayModalMessage('Please connect to Ethereum Mainnet using Metamask');
                    console.log('This is an unknown network.');
            }
        });
        hideAboutPage();

        var url = window.location.href;
        var index = getParameterByName('i');

        if (window.location.href.indexOf('#opinion') > -1) {
            console.log('looking at single opinion');
            updateAllSingle(index);
        } else if (window.location.href.indexOf('#about') > -1) {
            showAboutPage();
        } else if (window.location.href.indexOf('#myopinions') > -1) {
            updateAll(true);
            applyHeaderText("My Opinions:");
        } else if (window.location.href.indexOf('#newopinion') > -1) {
            updateAll(false, true);
            applyHeaderText("Register new opinion:");
        } else {
            updateAll();
        }

        //set links in page to call changeState
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            //console.log('link: '+links[i])
            links[i].onclick = changeState;
        }

        //refreshInfo()
        if (!refreshIsSet) {
            setTimeout(refreshInfo, 5000);
            refreshIsSet = true;
        }
    }
    setTimeout(init, 100);

    particlesJS.load('particles-js', 'particles.json', function () {
        console.log('callback - particles.js config loaded');
    });

    function applyHeaderText(text) {
        var caption = document.getElementById('caption');
        caption.textContent = text;
        caption.style.display = 'block';
    }
    function clearAll() {
        console.log('clearall');
        var caption = document.getElementById('caption');
        caption.style.display = 'none';
        var content = document.getElementById('content');
        content.innerHTML = "";
    }

    function changeState() {
        console.log('changing state');
        clearAll();
        setTimeout(init, 100);
    }
};
});

;require.register("index_oldver.js", function(exports, require, module) {
"use strict";

console.log('test');
//var provider = new Web3.providers.HttpProvider("http://localhost:8545");
//var contract = require("truffle-contract");
exports.main = function main(document) {
    var testAbi = [{
        "constant": true,
        "inputs": [],
        "name": "balanceOf",
        "outputs": [{
            "name": "v1",
            "type": "uint256"
        }, {
            "name": "v2",
            "type": "uint256"
        }, {
            "name": "v3",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }];
    var balanceOfID = '722713f7';
    abiDecoder.addABI(testAbi);
    var contractAddress = "0x009e566e314e73bedd64a0d3f483cd1215cdad9c";
    var accountAddress = null;

    //testss
    function callContractTest(htmltoreplace) {
        //web3.personal.unlockAccount(accountAddress,password,0)
        var contractAbi = web3.eth.contract(testAbi);
        var myContract = contractAbi.at(contractAddress);
        // suppose you want to call a function named myFunction of myContract
        var outputData = myContract.balanceOf.getData();
        //console.log('outputdata '+outputData)
        var endstr = web3.eth.call({ to: contractAddress, from: accountAddress, data: outputData }, function (error, result) {
            if (!error) {
                console.log(result);
                console.log('resultdecoded: ');
                console.log(web3.toDecimal(splitHex(result, [64, 64, 1000])[0]));
                //console.log(abiDecoder.decodeMethod(result,balanceOfID))
            } else {
                console.error(error);
            }
        });

        //return web3.toAscii(outputData);//endstr//web3.toAscii(endstr)
        //finally paas this data parameter to send Transaction
        //console.log(web3.eth.sendTransaction({to:contractAddress, from:accountAddress, data: outputData}));
    }
    function updateAll() {
        var element = document.getElementById("content");
        getOpinion(0, function (ether, address, text) {
            element.children[0].children[0].textContent = text;
            console.log(ether, address, text);
        });
        registerOpinion(web3.eth.accounts[0], 3, "fourth registered opinion", web3.toWei(1, 'ether'));
        //console.log('elementchildren :'+element.children.length)
        //callContractTest(element.children[0].children[0])
        //element.children[0].children[0].innerHTML
        for (var i = 0; i < element.children.length; i++) {
            var topElement = element.children[i];
            //topElement.children[0].innerHTML=web3.eth.accounts[0]
            accountAddress = web3.eth.accounts[0];

            //console.log('elementchildren :'+i+" "+)
            //console.log('testregioarg: '+i+" "+element.children[i]);
        }
    }
    function updateClient() {
        if (web3.eth.accounts[0] !== accountAddress) {
            accountAddress = web3.eth.accounts[0];
            if (accountAddress) {
                web3.eth.defaultAccount = accountAddress;
            }
        }
        //riot.update();
        updateAll();
    }
    var element = document.getElementById("content");
    for (var i = 0; i < 100; i++) {

        var adiv = document.createElement("div");
        adiv.classList.add("box");
        var adiv2 = document.createElement("div");
        adiv2.innerHTML = "Hello " + i + " " + web3.eth + " " + web3.eth.accounts.length;
        adiv.appendChild(adiv2);
        /*+" "+web3.eth.getBlock(48, function(error, result){
                    if(!error)
                        console.log(result)
                    else
                        console.error(error);
                });*/
        element.appendChild(adiv);
    }

    function refresh() {
        updateAll();
        //setTimeout(refresh, 5000);
    }
    setTimeout(refresh, 1000);
};
});

;require.register("initialize.js", function(exports, require, module) {
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // do your setup here
  console.log('Initialized app');
  //var main=require('index')
  //console.log(main)
  //index=require('index');
  //main();
  //main.main()
});
var $ = require('jquery');
console.log('Tasty Brunch, just trying to use jQuery!', $('body'));
console.log('test2??');
require('index');
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */

//var web3=require('web3');
});

require.register("logger.js", function(exports, require, module) {
'use strict';

console.log('Hello, world');
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map