pragma solidity ^0.8.3;

// a library for performing overflow-safe math, courtesy of DappHub (https://github.com/dapphub/ds-math)

library SafeMath {
    function safeAdd(uint x, uint y, uint bitsize) internal pure returns (uint z) {
        require((z = x + y) % 2**bitsize >= x, 'ds-math-add-overflowdfsfwf');
    }

    function safeSub(uint x, uint y, uint bitsize) internal pure returns (uint z) {
        require((z = x - y) % 2**bitsize <= x, 'ds-math-sub-underflow');
    }

    
}
