// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.0;

import './BitMath.sol';
import './SafeMath.sol';
import './Babylonian.sol'; 

// Library to allow for fixed point numbers of variable sizes 
library FixedPoint {

    function abs(int x) public pure returns (int) {
        return x >= 0 ? x : -x;
    }
    // [0, 2**range - 1],  for stepsize of 1 / 2**resolution. total size = range+resolution. Lossy, permits cutting off lower digit, but throws error if upper digit overflows 
    // require range1 + range2 <= 255
    function multiply(uint num1, uint num2, uint res1, uint res2, uint range_out, uint res_out) internal pure returns(uint) {
        if (num1 == 0 || num2 == 0) {
            return 0;
        }
        uint upper_self = num1 >> res1; // * 2^0
        uint lower_self = num1 - (upper_self << res1); // * 2^-res1
        uint upper_other = num2 >> res2; // * 2^0
        uint lower_other = num2 - (upper_other << res2); // * 2^-res2

        // partial products
        uint upper = upper_self * upper_other; // * 2^0
        uint lower = lower_self * lower_other; // * 2^-(res1+res2)
        uint uppers_lowero = upper_self * lower_other; // * 2^-res2
        uint uppero_lowers = upper_other * lower_self; // * 2^-res1

        // so the bit shift does not overflow
        require(upper <= 2**range_out - 1, 'FixedPoint::muluq: upper overflow');

        // lowest unit is 2**-res_out
        uint sum = upper << res_out;
        
        if (res_out >= res1 + res2) {
            sum += (uppers_lowero << res_out - res2) + (uppero_lowers << res_out - res1) + (lower << res_out - res1 - res2);
        } else {
            sum += lower >> res1 + res2 - res_out;

            if (res_out >= res1) {
                sum += uppero_lowers << res_out - res1;
            } else {
                sum += uppero_lowers >> res1 - res_out;
            }

            if (res_out >= res2) {
                sum += uppers_lowero << res_out - res2;
            } else {
                sum += uppers_lowero >> res2 - res_out;
            }
        }

        return sum;
    }

    function divide(uint num1, uint num2, uint res1, uint res2, uint range_out, uint res_out) internal pure returns (uint) {
        require(num2 > 0, 'FixedPoint::divuq: division by zero');
        uint max_shift = 255 - BitMath.mostSignificantBit(num1);
        uint value = (num1 << max_shift) / num2; // 2**-(res1 + max_shift - res2)
        int left_shifts = int(res_out + res2) - int(res1 + max_shift);
    
        
        if (left_shifts < 0) {
            return value >> uint(-left_shifts);
        } else {
            uint z = 0;
            require((z = value << uint(left_shifts)) >> uint(left_shifts) == value, 'FixedPoint::divide: overflow');
            require(z <= uint(2**(range_out+res_out)-1), 'FixedPoint::divide: overflow');
            return z;
        }

    }

    function encode(uint num, uint res_in, uint res_out) internal pure returns (uint) {
        if (res_out <= res_in) {
            return num >> res_in - res_out;
        }

        uint z = 0;
        require((z = num << res_out - res_in) >> res_out - res_in == num, 'FixedPoint::encode: overflow');
        return z;
    }

    function add(uint num1, uint num2, uint res1, uint res2, uint range_out) internal pure returns (uint) {
        return SafeMath.safeAdd(num1, encode(num2, res1, res2), res1+range_out);
    }

    function sub(uint num1, uint num2, uint res1, uint res2, uint range_out) internal pure returns (uint) {
        return SafeMath.safeSub(num1, encode(num2, res1, res2), res1+range_out);
    }

    function sqrt(uint num, uint res_in, uint res_out) internal pure returns (uint) {
        uint max_shift = 255 - BitMath.mostSignificantBit(num);
        max_shift = max_shift - (max_shift+res_in) % 2;
        int unshift = int(max_shift + res_in)/2 - int(res_out);
        if (unshift >= 0)
        {
            return Babylonian.sqrt(num << max_shift) >> uint(unshift);
        } else {
            return Babylonian.sqrt(num << max_shift) << uint(-unshift);
        }
        
    }
    
 
}

// library FixedPoint {
//     // range: [0, 2**112 - 1]
//     // resolution: 1 / 2**112
//     struct uq112x112 {
//         uint224 _x;
//     }

//     // range: [0, 2**144 - 1]
//     // resolution: 1 / 2**112
//     struct uq144x112 {
//         uint256 _x;
//     }

//     uint8 public constant RESOLUTION = 112;
//     uint256 public constant Q112 = 0x10000000000000000000000000000; // 2**112
//     uint256 private constant Q224 = 0x100000000000000000000000000000000000000000000000000000000; // 2**224
//     uint256 private constant LOWER_MASK = 0xffffffffffffffffffffffffffff; // decimal of UQ*x112 (lower 112 bits)

//     // encode a uint112 as a UQ112x112
//     function encode(uint112 x) internal pure returns (uq112x112 memory) {
//         return uq112x112(uint224(x) << RESOLUTION);
//     }

//     // encodes a uint144 as a UQ144x112
//     function encode144(uint144 x) internal pure returns (uq144x112 memory) {
//         return uq144x112(uint256(x) << RESOLUTION);
//     }

//     // decode a UQ112x112 into a uint112 by truncating after the radix point
//     function decode(uq112x112 memory self) internal pure returns (uint112) {
//         return uint112(self._x >> RESOLUTION);
//     }

//     // decode a UQ144x112 into a uint144 by truncating after the radix point
//     function decode144(uq144x112 memory self) internal pure returns (uint144) {
//         return uint144(self._x >> RESOLUTION);
//     }

//     function add(uq112x112 memory self, uq112x112 memory y) internal pure returns (uq112x112 memory) {
//         return uq112x112(self._x + y._x);
//     }

//     function sub(uq112x112 memory self, uq112x112 memory y) internal pure returns (uq112x112 memory) {
//         return uq112x112(self._x - y._x);
//     }

//     function add144(uq144x112 memory self, uq144x112 memory y) internal pure returns (uq144x112 memory) {
//         return uq144x112(self._x + y._x);
//     }

//     function sub144(uq144x112 memory self, uq144x112 memory y) internal pure returns (uq144x112 memory) {
//         return uq144x112(self._x - y._x);
//     }

//     // multiply a UQ112x112 by a uint, returning a UQ144x112
//     // reverts on overflow
//     function mul(uq112x112 memory self, uint256 y) internal pure returns (uq144x112 memory) {
//         uint256 z = 0;
//         require(y == 0 || (z = self._x * y) / y == self._x, 'FixedPoint::mul: overflow');
//         return uq144x112(z);
//     }

//     // multiply a UQ112x112 by an int and decode, returning an int
//     // reverts on overflow
//     function muli(uq112x112 memory self, int256 y) internal pure returns (int256) {
//         uint256 z = FullMath.mulDiv(self._x, uint256(y < 0 ? -y : y), Q112);
//         require(z < 2**255, 'FixedPoint::muli: overflow');
//         return y < 0 ? -int256(z) : int256(z);
//     }

//     // multiply a UQ112x112 by a UQ112x112, returning a UQ112x112
//     // lossy
//     function muluq(uq112x112 memory self, uq112x112 memory other) internal pure returns (uq112x112 memory) {
//         if (self._x == 0 || other._x == 0) {
//             return uq112x112(0);
//         }
//         uint112 upper_self = uint112(self._x >> RESOLUTION); // * 2^0
//         uint112 lower_self = uint112(self._x & LOWER_MASK); // * 2^-112
//         uint112 upper_other = uint112(other._x >> RESOLUTION); // * 2^0
//         uint112 lower_other = uint112(other._x & LOWER_MASK); // * 2^-112

//         // partial products
//         uint224 upper = uint224(upper_self) * upper_other; // * 2^0
//         uint224 lower = uint224(lower_self) * lower_other; // * 2^-224
//         uint224 uppers_lowero = uint224(upper_self) * lower_other; // * 2^-112
//         uint224 uppero_lowers = uint224(upper_other) * lower_self; // * 2^-112

//         // so the bit shift does not overflow
//         require(upper <= uint112(2**112-1), 'FixedPoint::muluq: upper overflow');

//         // this cannot exceed 256 bits, all values are 224 bits
//         uint256 sum = uint256(upper << RESOLUTION) + uppers_lowero + uppero_lowers + (lower >> RESOLUTION);

//         // so the cast does not overflow
//         require(sum <= uint224(2**224-1), 'FixedPoint::muluq: sum overflow');

//         return uq112x112(uint224(sum));
//     }

//     // divide a UQ112x112 by a UQ112x112, returning a UQ112x112
//     function divuq(uq112x112 memory self, uq112x112 memory other) internal pure returns (uq112x112 memory) {
//         require(other._x > 0, 'FixedPoint::divuq: division by zero');
//         if (self._x == other._x) {
//             return uq112x112(uint224(Q112));
//         }
//         if (self._x <= uint144(2**144-1)) {
//             uint256 value = (uint256(self._x) << RESOLUTION) / other._x;
//             require(value <= uint224(2**224-1), 'FixedPoint::divuq: overflow');
//             return uq112x112(uint224(value));
//         }

//         uint256 result = FullMath.mulDiv(Q112, self._x, other._x);
//         require(result <= uint224(2**224-1), 'FixedPoint::divuq: overflow');
//         return uq112x112(uint224(result));
//     }

//     // returns a UQ112x112 which represents the ratio of the numerator to the denominator
//     // can be lossy
//     function fraction(uint256 numerator, uint256 denominator) internal pure returns (uq112x112 memory) {
//         require(denominator > 0, 'FixedPoint::fraction: division by zero');
//         if (numerator == 0) return FixedPoint.uq112x112(0);

//         if (numerator <= uint144(2**144-1)) {
//             uint256 result = (numerator << RESOLUTION) / denominator;
//             require(result <= uint224(2**224-1), 'FixedPoint::fraction: overflow');
//             return uq112x112(uint224(result));
//         } else {
//             uint256 result = FullMath.mulDiv(numerator, Q112, denominator);
//             require(result <= uint224(2**224-1), 'FixedPoint::fraction: overflow');
//             return uq112x112(uint224(result));
//         }
//     }

//     // take the reciprocal of a UQ112x112
//     // reverts on overflow
//     // lossy
//     function reciprocal(uq112x112 memory self) internal pure returns (uq112x112 memory) {
//         require(self._x != 0, 'FixedPoint::reciprocal: reciprocal of zero');
//         require(self._x != 1, 'FixedPoint::reciprocal: overflow');
//         return uq112x112(uint224(Q224 / self._x));
//     }

//     // square root of a UQ112x112
//     // lossy between 0/1 and 40 bits
//     function sqrt(uq112x112 memory self) internal pure returns (uq112x112 memory) {
//         if (self._x <= uint144(2**144-1)) {
//             return uq112x112(uint224(Babylonian.sqrt(uint256(self._x) << 112)));
//         }

//         uint8 safeShiftBits = 255 - BitMath.mostSignificantBit(self._x);
//         safeShiftBits -= safeShiftBits % 2;
//         return uq112x112(uint224(Babylonian.sqrt(uint256(self._x) << safeShiftBits) << ((112 - safeShiftBits) / 2)));
//     }
// }