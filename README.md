## RDP calculator

[demo](http://chyro.github.io/dive-planner/rdp.calculator.html)

Reads out the RDP tables, and gives the values as a human using the tables would.
The point is not to get simulate gas physics (which proved difficult) but to automate table lookup.

Useful to:
* fill dive log
* plan dives
* cheat at PADI tests, I mean, check answers.

### Technologies:
* ES6, using Babel.js to avoid compiling
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.js'></script>
    <script>$.get("RDP.es6", function(data) { eval(babel(data).code); });</script>
* LESS, using less.js to avoid compiling
    <link href="RDP.less" type="text/css" rel="stylesheet/less" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min.js"></script>
* Uses canvas for graphics - more flexible than images for possibly upcoming multilevel dives.

### Coming (maybe)

* test mode: select random depth / duration / starting group, don't show the answer, user looks up, submits, gets checked
* backwards mode: calculate early values to accomodate for later values
* actual formulas rather than dive tables (not suitable for planning though)

