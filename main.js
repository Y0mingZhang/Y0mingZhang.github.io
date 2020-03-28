var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var card_map = {}
for (var i = 0; i < cards.length; i++) {
    card_map[cards[i]] = i+1;
}

var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = new Array();

function getDeck()
{
	var deck = new Array();

	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < cards.length; x++)
		{
			var card = {Value: cards[x], Suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}


function shuffle()
{
	// for 1000 turns
	// switch the values of two random cards
	for (var i = 0; i < 1000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}

	renderDeck();
}

function renderDeck()
{
	document.getElementById('deck').innerHTML = '';
	for(var i = 0; i < 4; i++)
	{
		var card = document.createElement("div");
		var value = document.createElement("div");
		var suit = document.createElement("div");
		card.className = "card";
		value.className = "value";
		suit.className = "suit " + deck[i].Suit;

		value.innerHTML = deck[i].Value;
		card.appendChild(value);
		card.appendChild(suit);

        document.getElementById("deck").appendChild(card);
        document.getElementById('sol').innerHTML = "";
	}
}

var add = function(x, y)
{
    return x+y;
}
var sub = function(x, y)
{
    return x-y;
}
var mult = function(x, y)
{
    return x*y;
}
var div = function(x, y) {
    if (y == 0) {
        return 999999;
    }
    return x/y;
}



function perm(xs) {
    let ret = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));
  
      if(!rest.length) {
        ret.push([xs[i]])
      } else {
        for(let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]))
        }
      }
    }
    return ret;
  }


function cartesianProduct(...arrays) {
return arrays.reduce((a, b) => {
    return [].concat(...a.map(x => {
    const next = Array.isArray(x) ? x : [x];
    return [].concat(b.map(y => next.concat(...[y])));
    }));
});
}

var ops = [add, sub, mult, div];
var op_map = {add : "+", sub : "-", mult : "*", div : "/"};
var op_combs = cartesianProduct(ops, ops, ops);
add.str = "+";
sub.str = "-";
mult.str = "*";
div.str = "/";



var getsol_ = function() {
    let nums = [];
    let n0,n1,n2,n3,op0,op1,op2;
    let res;

    for (var i = 0; i < 4; i++) {
        nums.push(card_map[deck[i].Value]);
    }
	for (var i = 0; i < 50; i++)
	{
		var location1 = Math.floor((Math.random() * nums.length));
		var location2 = Math.floor((Math.random() * nums.length));
		var tmp = nums[location1];

		nums[location1] = nums[location2];
		nums[location2] = tmp;
	}
    let pn = perm(nums);
    for (let i = 0; i < pn.length; i++) {
        item = pn[i];
        n0 = item[0];
        n1 = item[1];
        n2 = item[2];
        n3 = item[3];
        for (let j = 0; j < op_combs.length; ++j) {
            opitem = op_combs[j];
            op0 = opitem[0];
            op1 = opitem[1];
            op2 = opitem[2];
            
            res = op0(n0, n1);
            res = op1(res, n2);
            res = op2(res, n3);
            if (Math.abs(res - 24)  < 0.01) {
                return `((${n0} ${op0.str} ${n1}) ${op1.str} ${n2}) ${op2.str} ${n3}`;
            }
            res = op1(op0(n0, n1), op2(n2, n3));
            if (Math.abs(res - 24) < 0.01) {
                return `(${n0} ${op0.str} ${n1}) ${op1.str} (${n2} ${op2.str} ${n3})`;
            }
            res = op2(n2, n3)
            res = op1(n1, res)
            res = op0(n0, res)
            if (Math.abs(res - 24) < 0.01) {
                return `${n0} ${op0.str} ( ${n1}  ${op1.str} ( ${n2} ${op2.str} ${n3} ))`;
            }
        }
    }
    return "无解";
}

function getsol()
{   

    document.getElementById('sol').innerHTML = getsol_();
}

function load()
{
	deck = getDeck();
	shuffle();
	renderDeck();
}

window.onload = load;