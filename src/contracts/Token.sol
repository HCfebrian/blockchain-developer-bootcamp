pragma solidity ^0.5.0;
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Token{
	using SafeMath for uint;
	string public name = "HCF Token";
	string public symbol = "HCF";
	uint256 public decimal = 18;
	uint256 public totalSupply ;

	//events
	event Transfer(address indexed from, address indexed to, uint256 value);

	//track balance
	mapping(address => uint256) public balanceOf;

	//send tokens
	function transfer(address _to, uint256 _value) public returns (bool success){
		require(balanceOf[msg.sender] >= _value);
		balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
		balanceOf[_to]  = balanceOf[_to].add(_value);
		emit Transfer(msg.sender, _to, _value);
		return true;
	}

	constructor() public {
		totalSupply = 1000000 * (10 ** decimal);
		balanceOf[msg.sender] = totalSupply;
	}


}




