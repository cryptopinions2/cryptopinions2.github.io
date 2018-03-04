abi=[
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tocheck",
				"type": "string"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "hasPriorDuplicate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToCodeRef",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ceoAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "SYMBOL",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "promoCreatedCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "priceOf",
		"outputs": [
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "string"
			},
			{
				"name": "b",
				"type": "string"
			}
		],
		"name": "compareStrings",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "opinionIndexToOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "NAME",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "opinionIndexToApproved",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "DEFAULT_TEXT",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "implementsERC721",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "tokensOfOwner",
		"outputs": [
			{
				"name": "ownerTokens",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "cooAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "total",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getOpinion",
		"outputs": [
			{
				"name": "sellingPrice",
				"type": "uint256"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "sponsor",
				"type": "address"
			},
			{
				"name": "antisponsor",
				"type": "address"
			},
			{
				"name": "amountsponsored",
				"type": "uint256"
			},
			{
				"name": "amountantisponsored",
				"type": "uint256"
			},
			{
				"name": "acomment",
				"type": "uint8"
			},
			{
				"name": "opinionText",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "codeToAddressRef",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newCOO",
				"type": "address"
			}
		],
		"name": "setCOO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "deleteThis",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "oldPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "newPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "prevOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "TokenSold",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newprice",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"name": "_newOpinion",
				"type": "string"
			}
		],
		"name": "registerOpinion",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newCEO",
				"type": "address"
			}
		],
		"name": "buyCryptopinions",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			}
		],
		"name": "Birth",
		"type": "event"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "takeOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"name": "comment",
				"type": "uint8"
			},
			{
				"name": "_likesOpinion",
				"type": "bool"
			}
		],
		"name": "sponsorOpinion",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newCEO",
				"type": "address"
			}
		],
		"name": "setCEO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ref",
				"type": "bytes32"
			},
			{
				"name": "addr",
				"type": "address"
			}
		],
		"name": "registerRef",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			}
		],
		"name": "payout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "createInitialItems",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
commentMapLike={


1:'Correct',
2:'Right',
3:'Insightful',
4:'Profound',
5:'True',
6:'Accurate',
7:'Brilliant',
8:'Yes',
9:'Good'
}
commentMapDislike={
101:'Incorrect',
102:'Wrong',
103:'Stupid',
104:'Sad',
105:'Fake',
106:'Lies',
107:'False',
108:'No',
109:'Bad'}
commentMap=Object.assign({0:'Unclaimed'},commentMapLike,commentMapDislike)
contractAddress="0x393B5fd2b993EaF419fbadAB630BC9bd3d5792E9"//"0x67d7399a6e1a79f4df1cb3318af71d188aaeaee6"//"0x4aa74d9773a8b2892b083c015ab1e907fa701c78"//"0x5668f88389d762ffe9a63263f7579dc33bd6ab7b"//"0x3afabc0656632d6ca39e886c6214b2d970b099b9";//"0x6ec00fdb2a1250ed6c35717b85f51cc7a1016f4a";//"0x011e673f5696750a932859ecf2aad4b19af792bf"//"0xac040bab5815f27df1d08613a8a1144803e94dcc";
//var accountAddress=null;
//function trimString(str){
 //   return str.replace(/[|&;$%@"<>()+,]/g, "");
//}

function getTotalSupply(callback){//idk
    var contractAbi = web3.eth.contract(abi);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.totalSupply.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            callback(web3.toDecimal(result));
        }
        else{
             console.error("gettotalsupply error: "+error);
        }
    });
}
function getDuplicate(id,text,callback){
    var contractAbi = web3.eth.contract(abi);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.hasPriorDuplicate.getData(text,id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('getduplicate result '+result)
            callback(web3.toDecimal(result)>0)
        }
        else{
            console.error("getduplicate error: "+error);
        }
    });
}
function getOpinion(id,callback){
    var contractAbi = web3.eth.contract(abi);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.getOpinion.getData(id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log(result)
            console.log('getopinion success')
            results=splitHex(result,[64,64,64,64,64,64,64,64,1000]);
            //testResults(result,[64,64,8,1000])
            var ether=web3.toDecimal("0x"+results[0])
            var address="0x"+results[1].substring(24);
            var address2="0x"+results[2].substring(24);
            var address3="0x"+results[3].substring(24);
            var totalsponsored="0x"+results[4].substring(24);
            var totalantisponsored="0x"+results[5].substring(24);
            var timestamp=web3.toDecimal("0x"+results[7])
            var text=web3.toAscii("0x"+results[8].substring(128))
            console.log('timestamp: '+timestamp)
            console.log('opinion: '+text+'^\n'+results[8])
            var commentNum=web3.toDecimal("0x"+results[6])
            //console.log('web3interaction comment:'+commentNum+" "+id+" "+results[6])
            
            var comment=commentMap[commentNum]
            text=text.replace(/[^\x20-\x7E]/g, '');
            text=text.replace('`','')
            iscorrect=commentNum<100;
            //console.log('w3i iscorrect'+iscorrect)
            callback(ether,address,address2,address3,totalsponsored,totalantisponsored,text,id,comment,iscorrect,timestamp);
            //console.log(ether,address,text)
        }
        else{
            console.error("getopinion error: "+error);
        }
                                     })
}
function sponsorOpinion(accountAddress,id,eth,supporting,flair,callback){
    var contractAbi = web3.eth.contract(abi);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.sponsorOpinion.getData(id,flair,supporting);
    console.log('output data sponsoring:'+outputData)
    web3.eth.sendTransaction({to:contractAddress, from:accountAddress, data: outputData, value: eth,gas:400000},
    function(error,result){
         if(!error){
            //console.log("sponsoropinion result: "+result)
            callback()
         }
         else{
            console.error(error);
        }
    });
}
function registerOpinion(accountAddress,id,text,eth,callback){
    var contractAbi = web3.eth.contract(abi);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.registerOpinion.getData(id,text);
    //console.log('output data:'+outputData)
    /* 
    var gasEstimate=web3.eth.estimateGas({
        to:contractAddress,
        data:outputData
    },    function(error,result){
        if(!error){
            console.log('gas estimate: '+result);
        }
        else{
            console.error('gas estimate error: ');
            console.error(error)
        }
                                     }); */
    
    web3.eth.sendTransaction({to:contractAddress, from:accountAddress, data: outputData, value: eth,gas:400000},
    function(error,result){
         if(!error){
            //console.log("registeropinion result: "+result)
            callback()
         }
         else{
            console.error(error);
        }
    });
}
