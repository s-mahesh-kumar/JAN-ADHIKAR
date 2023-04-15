const { ethers } = require("hardhat")
const addr = "0xA581283EA0c2b7722902fB84fC9d70c448DBaCbC"

async function castvote(pid, aid, vote_type) {
    const Vote = await ethers.getContractFactory('Vote')
    const vote = await Vote.attach(addr)

    if(vote_type === "up"){
        await vote.like(pid, aid)
    }
    else{
        await vote.dislike(pid, aid)
    }
    return "success"
}

async function addproject(pid) {
    const Vote = await ethers.getContractFactory('Vote')
    const vote = await Vote.attach(addr)

    await vote.addproject(pid)
    return "success"

}

async function getvotes(pid) {
    const Vote = await ethers.getContractFactory('Vote')
    const vote = await Vote.attach(addr)

    return(await vote.display_votes(pid))

}
/*
module.exports = castvote().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});

module.exports = addproject("a1").then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});

module.exports = getvotes("a1").then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
*/

module.exports = {castvote, addproject, getvotes}