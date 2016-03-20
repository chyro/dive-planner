
// RDP table, front, top/left
const RDP1aCSV = `,10,12,14,16,18,20,22,25,30,35,40,42
A,10,9,8,7,6,6,5,4,3,3,5,4
B,20,17,15,13,11,10,9,8,6,5,5,4
C,26,23,19,17,15,13,12,10,8,7,6,6
D,30,26,22,19,16,15,13,11,9,8,7,6
E,34,29,24,21,18,16,15,13,10,9,7,7
F,37,32,27,23,20,18,16,14,11,9,8,8
G,41,35,29,25,22,20,18,15,12,10,9,
H,45,38,32,27,24,21,19,17,13,11,,
I,50,42,35,29,26,23,21,18,14,12,,
J,54,45,37,32,28,25,22,19,15,13,,
K,59,49,40,34,30,26,24,21,16,14,,
L,64,53,43,37,32,28,25,22,17,,,
M,70,57,47,39,34,30,27,23,19,,,
N,75,62,50,42,36,32,29,25,20,,,
O,82,66,53,45,39,34,30,26,,,,
P,88,71,57,48,41,36,32,28,,,,
Q,95,76,61,50,43,38,34,29,,,,
R,104,82,64,53,46,40,36,,,,,
S,112,88,68,56,48,42,37,,,,,
T,122,94,73,60,51,44,,,,,,
U,133,101,77,63,53,45,,,,,,
V,145,108,82,67,55,,,,,,,
W,160,116,87,70,56,,,,,,,
X,178,125,92,72,,,,,,,,
Y,199,134,98,,,,,,,,,
Z,219,147,,,,,,,,,,`; // depth, duration => group
// RDP table, front, bottom/right
const RDP1bCSV = `,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
A,180,,,,,,,,,,,,,,,,,,,,,,,,,
B,228,47,,,,,,,,,,,,,,,,,,,,,,,,
C,250,69,21,,,,,,,,,,,,,,,,,,,,,,,
D,259,78,30,8,,,,,,,,,,,,,,,,,,,,,,
E,268,87,38,16,7,,,,,,,,,,,,,,,,,,,,,
F,275,94,46,24,15,7,,,,,,,,,,,,,,,,,,,,
G,282,101,53,31,22,13,6,,,,,,,,,,,,,,,,,,,
H,288,107,59,37,28,20,12,5,,,,,,,,,,,,,,,,,,
I,294,113,65,43,34,26,18,11,5,,,,,,,,,,,,,,,,,
J,300,119,71,49,40,31,24,17,11,5,,,,,,,,,,,,,,,,
K,305,124,76,54,45,37,29,22,16,10,4,,,,,,,,,,,,,,,
L,310,129,81,59,50,42,34,27,21,15,9,4,,,,,,,,,,,,,,
M,315,134,85,64,55,46,39,32,25,19,14,9,4,,,,,,,,,,,,,
N,319,138,90,68,59,51,43,36,30,24,18,13,8,3,,,,,,,,,,,,
O,324,143,94,72,63,55,47,41,34,28,23,17,12,8,3,,,,,,,,,,,
P,328,147,98,76,67,59,51,45,38,32,27,21,16,12,7,3,,,,,,,,,,
Q,331,150,102,80,71,63,55,48,42,36,30,25,20,16,11,7,3,,,,,,,,,
R,335,154,106,84,75,67,59,52,46,40,34,29,24,19,15,11,7,3,,,,,,,,
S,339,158,109,87,78,70,63,56,49,43,38,32,27,23,18,14,10,6,3,,,,,,,
T,342,161,113,91,82,73,66,59,53,47,41,36,31,26,22,17,13,10,6,2,,,,,,
U,345,164,116,94,85,77,69,62,56,50,44,39,34,29,25,21,17,13,9,6,2,,,,,
V,348,167,119,97,88,80,72,65,59,53,47,42,37,33,28,24,20,16,12,9,5,2,,,,
W,351,170,122,100,91,83,75,68,62,56,50,45,40,36,31,27,23,19,15,12,8,5,2,,,
X,354,173,125,103,94,86,78,71,65,59,53,48,43,39,34,30,26,22,18,15,11,8,5,2,,
Y,357,176,128,106,97,89,81,74,68,62,56,51,46,41,37,33,29,25,21,18,14,11,8,5,2,
Z,360,179,131,109,100,91,84,77,71,65,59,54,49,44,40,35,31,28,24,20,17,14,11,8,5,2`; // group, time => group
// RDP table, back, odd lines
const RDP2aCSV = `,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
10,10,20,26,30,34,37,41,45,50,54,59,64,70,75,82,88,95,104,112,122,133,145,160,178,199,219
12,9,17,23,26,29,32,35,38,42,45,49,53,57,62,66,71,76,82,88,94,101,108,116,125,134,147
14,8,15,19,22,24,27,29,32,35,37,40,43,47,50,53,57,61,64,68,73,77,82,87,92,98,
16,7,13,17,19,21,23,25,27,29,32,34,37,39,42,45,48,50,53,56,60,63,67,70,72,,
18,6,11,15,16,18,20,22,24,26,28,30,32,34,36,39,41,43,46,48,51,53,55,56,,,
20,6,10,13,15,16,18,20,21,23,25,26,28,30,32,34,36,38,40,42,44,45,,,,,
22,5,9,12,13,15,16,18,19,21,22,24,25,27,29,30,32,34,36,37,,,,,,,
25,4,8,10,11,13,14,15,17,18,19,21,22,23,25,26,28,29,,,,,,,,,
30,3,6,8,9,10,11,12,13,14,15,16,17,19,20,,,,,,,,,,,,
35,3,5,7,8,9,9,10,11,12,13,14,,,,,,,,,,,,,,,
40,2,5,6,7,7,8,9,,,,,,,,,,,,,,,,,,,`; // group, depth => residual (time)
// RDP table, back, even lines
const RDP2bCSV = `,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
10,209,199,193,189,185,182,178,174,169,165,160,155,149,144,137,131,124,115,107,97,86,74,59,41,20,
12,138,130,124,121,118,115,112,109,105,102,98,94,90,85,81,76,71,65,59,53,46,39,31,22,13,
14,90,83,79,76,74,71,69,66,63,61,58,55,51,48,45,41,37,34,30,25,21,16,11,6,,
16,65,59,55,53,51,49,47,45,43,40,38,35,3,30,27,24,22,19,16,12,9,5,2,,,
18,50,45,41,40,38,36,34,32,30,28,26,24,22,20,17,15,13,10,8,5,3,,,,,
20,39,35,32,30,29,27,25,24,22,20,19,17,15,13,11,9,7,5,3,,,,,,,
22,32,28,25,24,22,21,19,18,16,15,13,12,10,8,7,5,3,,,,,,,,,
25,25,21,19,18,16,15,14,12,11,10,8,7,6,4,3,,,,,,,,,,,
30,17,14,12,11,10,9,8,7,6,5,4,3,,,,,,,,,,,,,,
35,11,9,7,6,5,5,4,3,,,,,,,,,,,,,,,,,,
40,7,4,,,,,,,,,,,,,,,,,,,,,,,,`; // group, depth => no-decompression limit (time)

/**
 * Extension of the Array class, providing line and column headers
 * as well as some utility functions.
 *
 * Might be best to architect differently:
 * - extend the Array prototype?
 * - have those be static functions taking an array as first parameter?
 *   (but then where to store the headers?)
 *
 * Could that be simplified using objects / properties rather than 3 arrays?
 */
class ArrayUtil {
    constructor (content, lineHeaders, colHeaders) {
        this.lineHeaders = lineHeaders;
        this.colHeaders = colHeaders;
        this.content = content; // 2D array
    }
    getColumn (colnum) {
        let column = [];
        for (let i = 0; i < this.content.length; i++) {
          column.push(this.content[i][colnum]);
       }
        return column;
    }
    getLine (linenum) {
        return this.content[linenum];
    }
    getVal (linenum, colnum) {
        return this.content[linenum][colnum];
    }
    /**
     * Returns the index of the lowest fitting value
     *
     * For instance, when calling getMinFitIndex([10, 20, 30], 25), 25 doesn't fit
     * in 20 (index 1) but does in 30 (index 2), so the returned value is 2.
     *
     * TODO: Handle the case where there are no matching values => exception?
     */
    static getIndexMinFit (value, data) {
        for (let i = 0; i < data.length; i++) {
            //TODO: if data[i] is empty, we've run out => return;
            if (data[i] >= value) return i;
        }
    }

    static getIndexMaxFit (value, data) {
        for (let i = data.length; i >= 0; i--) {
            //TODO: if data[i] is empty, we've run out => return;
            if (data[i] >= value && data[i] != undefined) return i;
        }
    }
}

class CSV {
    static parse (...options) {
        return new CSV(...options);
    }
    constructor (strCSV, hasColHeaders = true, hasLineHeaders = false) {
        //let csvLines = strCSV.split("\n");
        //this.body = csvLines.map(l => k.split(','));
        this.body = strCSV.split("\n").map(l => l.split(','));
        if (hasColHeaders) {
            //this.colHeaders = this.body[0];
            //this.body.shift();
            this.colHeaders = this.body.shift();
            if (hasLineHeaders) {
                this.colHeaders.shift();
            }
        }
        if (hasLineHeaders) {
            this.lineHeaders = [];
            for (let i = 0; i < this.body.length; i++) {
                //this.lineHeaders.push(this.body[i][0]);
                //this.body[i].shift();
                this.lineHeaders.push(this.body[i].shift());
            }
        }
        //cleaning up empty cells
        this.body = this.body.map(l => l.map (v => v == "" ? undefined : v));
    }
}

/**
 * RDP calculator
 *
 * Reads out the RDP tables, and gives the values as a human using the tables would.
 */
class RDP {
    constructor () {
        // Populating RDP tables based on CSV
        let oCSV = CSV.parse(RDP1aCSV, true, true);
        this.RDP1a = new ArrayUtil(oCSV.body, oCSV.lineHeaders, oCSV.colHeaders);
        oCSV = CSV.parse(RDP1bCSV, true, true);
        this.RDP1b = new ArrayUtil(oCSV.body, oCSV.lineHeaders, oCSV.colHeaders);
        oCSV = CSV.parse(RDP2aCSV, true, true);
        this.RDP2a = new ArrayUtil(oCSV.body, oCSV.lineHeaders, oCSV.colHeaders);
        oCSV = CSV.parse(RDP2bCSV, true, true);
        this.RDP2b = new ArrayUtil(oCSV.body, oCSV.lineHeaders, oCSV.colHeaders);
    }

    /**
     * Dive group RDP1a calculator (RDP1a)
     */
    getGroupAfterDive (depth, duration, startGroup = 0, o2percentage = 21) {
        // TODO: calculate adjusted depth (o2percentage, depth)
        // TODO: calculate adjusted duration (startGroup, adjusted depth)

        let colIndex = ArrayUtil.getIndexMinFit(depth, this.RDP1a.colHeaders);
        //< min => min: built-in
        //> max => ERROR: manual
        if (colIndex == undefined) { throw "Off the charts!"; }

        let lineIndex = ArrayUtil.getIndexMinFit(duration, this.RDP1a.getColumn(colIndex));
        //< min => min: built-in
        //> max => ERROR: manual
        if (lineIndex == undefined) { throw "Off the charts!"; }

        return this.RDP1a.lineHeaders[lineIndex];
    }

    /**
     * Surface interval group calculator (RDP1b)
     */
    getGroupAfterSurface (startGroup, duration) {
        let lineIndex = this.RDP1b.lineHeaders.indexOf(startGroup);
        let colIndex = ArrayUtil.getIndexMaxFit(duration, this.RDP1b.getLine(lineIndex));
        //< min => return startGroup: built-in
        //> max => return group 0: manual
        if (colIndex == undefined) { colIndex = 0; }
  
        return this.RDP1b.colHeaders[colIndex];
    }

    /**
     * Residual nitrogene, in time equivalent (RDP2a)
     */
    getResidualNitrogene (depth, group) {
        let colIndex = this.RDP2a.colHeaders.indexOf(group);
        let lineIndex = ArrayUtil.getIndexMinFit(depth, this.RDP2a.lineHeaders);
        //< min => min: built-in
        //> max => ERROR: manual
        if (lineIndex == undefined) throw "Off the charts!";

        let residual = this.RDP2a.getVal(lineIndex,colIndex);
        //if (residual == undefined) throw "Off the charts!";
  
        return residual;
    }

    /**
     * No-decompression limit (RDP2b)
     */
    getNDL (depth, group) {
        let colIndex = this.RDP2a.colHeaders.indexOf(group);
        let lineIndex = ArrayUtil.getIndexMinFit(depth, this.RDP2b.lineHeaders);
        //< min => min: built-in
        //> max => ERROR: manual
        if (lineIndex == undefined) throw "Off the charts!";

        let ndl = this.RDP2b.getVal(lineIndex,colIndex);
        //if (ndl == undefined) throw "Off the charts!";
  
        return ndl;
    }
}

/*
// Array tests
let myArr = new ArrayUtil([[1, 2, 3], [4, 5, 6], [7, 8, 9]], ['L1', 'L2', 'L3'], ['C1', 'C2', 'C3']);
console.log('C1: ' + JSON.stringify(myArr.getColumn(1)) + ''); // [2, 5, 8]
console.log('L2: ' + JSON.stringify(myArr.getLine(2)) + ''); // [7, 8, 9]
console.log(ArrayUtil.getIndexMinFit(15,[0,10,20,30])); // 3
console.log(ArrayUtil.getIndexMinFit(5,[0,10,20,30])); // 1
console.log(ArrayUtil.getIndexMinFit(5,[10,20,30])); // 0
console.log(ArrayUtil.getIndexMinFit(35,[10,20,30])); // undefined
*/
/*
// CSV tests
let oCSV = CSV.parse(RDP1aCSV, true, true);
console.log(oCSV.lineHeaders);
console.log(oCSV.colHeaders);
*/
/*
// RDP tests
let myRDP = new RDP();
console.log('20m, 60min: ' + myRDP.getGroupAfterDive(20, 45) + ''); // U
console.log('10m+e, 60min: ' + myRDP.getGroupAfterDive(10.5, 60) + ''); // N
console.log('W, 2H: ' + myRDP.getGroupAfterSurface('W', 120) + ''); // C
console.log('W, 2H: ' + myRDP.getGroupAfterSurface('W', 125) + ''); // B
console.log('W, 20m: ' + myRDP.getResidualNitrogene(20, 'W') + '/' + myRDP.getNDL(20,'W')); // undefined / undefined
console.log('W, 14m+e: ' + myRDP.getResidualNitrogene(14.5, 'W') + '/' + myRDP.getNDL(14.5,'W')); // 70 / 2
*/
