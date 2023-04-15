const { ethers } = require("hardhat")
let addr
async function main() {
    const voteFactory = await ethers.getContractFactory("Vote")
    const vote = await voteFactory.deploy()
    await vote.deployed()
    addr = vote.address
    console.log(addr)
}

main().then(() => {
    module.exportsv = { addr }
    process.exit(0)
}, (error) => {
    console.log(error)
    process.exit(0)
})