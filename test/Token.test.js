	import {tokens} from "./helpers"
	const Token = artifacts.require('./Token')

	require('chai')
	.use(require("chai-as-promised"))
	.should()

	contract('Token', ([deployer, receiver])=> {
		let token 
		const name = 'HCF Token'
		const symbol = "HCF"
		const decimal = "18"
		const totalSupply = tokens(1000000).toString()



		beforeEach(async ()=> {
			token = await Token.new()
		})

		describe("deployment", ()=> {
			it("track the name ", async ()=> {
				const result = await token.name()
				result.should.equal(name)
			})

			it("track the symboll ", async ()=> {
				const result = await token.symbol()
				result.should.equal(symbol)
			})

			it("track the decimal ", async ()=> {
				const result = await token.decimal()
				result.toString().should.equal(decimal)
			})

			it("track the totalSupply ", async ()=> {
				const result = await token.totalSupply()
				result.toString().should.equal(totalSupply.toString())
			})

			it("assign totalSupply to the deployer", async()=> {
				const result = await token.balanceOf(deployer)
				result.toString().should.equal(totalSupply.toString())
			})

		})


		describe("sending tokens", ()=>{
			let amount
			let result


			describe('success', async () => {

				beforeEach(async ()=> {
					amount = tokens(100)
					result = await token.transfer(receiver, amount,{ from: deployer })
				})

				it("transfer token balance", async () => {
					let balanceOf 

					balanceOf = await token.balanceOf(deployer)
					balanceOf.toString().should.equal(tokens(999900).toString())
					balanceOf = await token.balanceOf(receiver)
					balanceOf.toString().should.equal(tokens(100).toString());
				})

				it("emits a transfer event", async () => {
					const log = result.logs[0]
					log.event.should.equal('Transfer')
					const event = log.args
					event.from.toString().should.equal(deployer, 'from is correct')
					event.to.toString().should.equal(receiver, 'to address is correct')
					event.value.toString().should.equal(amount.toString(), 'amount is correct')
				})
			})

			describe("failure", async() => {
				let invalidAmount 
				invalidAmount = tokens(10000000000)
				await token.transfer(receiver, invalidAmount,{from :deployer}).should.be.rejectedWith('');
			})
		})

	})