// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Vote {
    mapping(string => mapping(uint256 => bool)) projects;
    mapping(string => uint256) existing_projects;
    uint256[] likes = new uint256[](100);
    uint256[] dislikes = new uint256[](100);
    uint256 public noofprojects;
    address admin_addr = 0x618d45C330f79819b9f233cE8BBE565D092D6430;

    function addproject(string memory _projectid) public returns (bool) {
        admin_addr = msg.sender;
        address addr = msg.sender;
        if (addr == admin_addr && existing_projects[_projectid] == 0) {
            noofprojects = noofprojects + 1;
            existing_projects[_projectid] = noofprojects;
            return true;
        }
        return false;
    }

    function hasvoted(string memory _projectid, uint256 _aadhar)
        public
        view
        returns (bool)
    {
        if (projects[_projectid][_aadhar] == true) {
            return true;
        }
        return false;
    }

    function like(string memory _projectid, uint256 _aadhar)
        public
        returns (string memory)
    {
        if (existing_projects[_projectid] != 0) {
            if (hasvoted(_projectid, _aadhar) == false) {
                projects[_projectid][_aadhar] = true;
                likes[existing_projects[_projectid]] =
                    likes[existing_projects[_projectid]] +
                    1;
                return "Vote successful";
            }
            return "Already voted";
        }
        return "Project Does not exist";
    }

    function dislike(string memory _projectid, uint256 _aadhar)
        public
        returns (string memory)
    {
        if (existing_projects[_projectid] != 0) {
            if (hasvoted(_projectid, _aadhar) == false) {
                projects[_projectid][_aadhar] = true;
                dislikes[existing_projects[_projectid]] =
                    dislikes[existing_projects[_projectid]] +
                    1;
                return "Vote successful";
            }
            return "Already voted";
        }
        return "Project Does not exist";
    }

    //event someEvent(uint256 l);

    function display_votes(string memory _projectid)
        public
        view
        returns (uint256 l, uint256 d)
    {
        return (
            likes[existing_projects[_projectid]],
            dislikes[existing_projects[_projectid]]
        );
    }
}
