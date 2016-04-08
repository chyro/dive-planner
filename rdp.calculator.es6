/**
 * RDP calculator
 *
 * Implements a UI based on the RDP library
 *
 * Note: Many functions assume that the plan is a series of dive separated
 * by intervals, if there is ever a different sequence for whatever reason
 * many functions will need to be fixed.
 *
 * Transitions:
 * - D.end-group => I.start-group
 * - I.end-group => D.start-group+1
 * - D.end-o2exp => D.start-o2exp+1
 * Dives:
 * - start-group, depth => residual-duration // RDP
 * - ox-per, depth => adjusted-depth // formula
 * - adjusted-depth, residual-duration, duration => end-group // RDP
 * Intervals:
 * - start-group, duration => end-group // RDP
 * TODO: ox-per, depth => opp (formula), start-o2exp, duration, opp => end-o2exp (table)
 */

const baseLayout = `<div class="plan"></div><div class="controls"><button class="add-dive">+</button><span class="log"></span></div>`;
const templateDive = `<div class="dive">
    <input class="start-group" />
    <input class="start-o2exp" />
    <input class="depth" placeholder="depth" />
    <input class="ox-per" value="21" />
    <input class="opp locked" disabled="disabled" />
    <input class="adjusted-depth locked" disabled="disabled" />
    <input class="duration" placeholder="time" />
    <input class="residual-duration locked" disabled="disabled" />
    <input class="end-group" />
    <input class="end-o2exp" />
</div>`;
const templateInterval = `<div class="interval">
    <input class="start-group" />
    <input class="duration" placeholder="time" />
    <input class="end-group" />
</div>`;

const RDPFormulas = {
    dive: [
        { in: ["depth", "start-group"], optional: {}, out: "residual-duration",
            how: function(params) { return myRDP.getResidualNitrogene(parseInt(params.depth), params["start-group"]); } },
        { in: ["ox-per", "depth"], optional: {}, out: "adjusted-depth",
            how: function(params) { return Math.floor(((1-params["ox-per"]/100)*(parseInt(params.depth)+10)/.79)-10); } },
        { in: ["adjusted-depth", "duration"], optional: {"residual-duration":0}, out: "end-group",
            how: function(params) { return myRDP.getGroupAfterDive(parseInt(params["adjusted-depth"]), parseInt(params["residual-duration"]) + parseInt(params.duration)); } }
    ],
    interval: [
        { in: ["start-group", "duration"], optional: {}, out: "end-group",
            how: function(params) { return myRDP.getGroupAfterSurface(params["start-group"], parseInt(params.duration)); } }
    ]
};

class RDPCalculator {
    constructor(area) {
        this.area = area;

        // Set up layout (e.g. buttons to add dives)
        $(area).append($(baseLayout));
        this.divePlan = $(".plan", area)[0];
        this.controls = $(".controls", area)[0];
        // Control events
        var that = this;
        $(".add-dive", this.controls).on("click", function(e) { that.addDive(); } );

        // Set up one dive
        this._addDive();
    }

    log(message) {
        $(".log", this.controls).text(message);
    }

    /**
     * User add dive: control event handler
     *
     * Creates one more interval and dive at the end of the current plan.
     */
    addDive() {
        this._addInterval();
        this._addDive();
    }

    //delDive(div) {} // maybe someday

    filter() {
        //TODO: check allowed data type for each field (should be in input's data-format attribute as regexp maybe)
    }

    /**
     * User recalculate: input field event handler
     *
     * Brute-force: try all the formulas on all the fields until none apply anymore.
     * Smarter: try to apply each formula that applies to the last changed field, if any do the same on result fields.
     * Brute-force is safer (error self-recovery).
     */
    recalculate(lastChanged) {
        if ($(lastChanged).val() == "") {
            $(lastChanged).removeClass("user-input");
        } else {
            $(lastChanged).addClass("user-input");
        }

        // Clear calculated values from previous round (which had a different user input)
        $('input.calculated', this.divePlan).val("");
        $('input.calculated', this.divePlan).removeClass("calculated");
        this.log("");

        try {
            this.bruteRecalculate();
        } catch (err) {
            this.log(err);
        }
    }

    smartRecalculate(lastChanged) {
        //for each formula
        //    if lastChanged is required && other fields are available
        //        apply formula
        //        if something changed
        //            smartRecalculate(changedField)
    }

    bruteRecalculate() {
        //console.log(lastChanged);

        let somethingChanged = true;
        while (somethingChanged) {
            somethingChanged = false;
            let index = 1;
            while (true) { // looping through dives - breaks loop when index overflows
                // Try to calculate dive fields
                // if ($('.dive.num'+index, this.divePlan).length == 0) break; // of course there is or it would have stopped earlier
                let changed = this.recalculateDive(index);
                somethingChanged = somethingChanged || changed;
                changed = this.transitionDive(index);
                somethingChanged = somethingChanged || changed;

                // Try to calculate interval fields
                if ($('.interval.num'+index, this.divePlan).length == 0) { // no more dive
                    break;
                }
                changed = this.recalculateInterval(index);
                somethingChanged = somethingChanged || changed;
                changed = this.transitionInterval(index);
                somethingChanged = somethingChanged || changed;

                // loop onto next dive
                index++;
            }
        }
    }

    /**
     * @return bool true if some things were calculated i.e. something changed
     */
    recalculateDive(index) {
        return this._recalculate($('.dive.num'+index, this.divePlan), RDPFormulas.dive);
    }

    recalculateInterval(index) {
        return this._recalculate($('.interval.num'+index, this.divePlan), RDPFormulas.interval);
    }

    _recalculate(thing, formulas) {
        let somethingChanged = false
        // Try to apply all matching formulas
        for (let i = 0; i < formulas.length; i++) {
            /* if (this._equationCanBeApplied(thing, formulas[i]) { */
            // checking if it can be apply is pretty much the same complexity as applying it...
            let changed = this._applyEquation(thing, formulas[i]);
            somethingChanged = somethingChanged || changed;
        }

        return somethingChanged;
    }

    /**
     * Attempt to calculate the formulat if possible
     *
     * otherwise throw an exception
     */
    _applyEquation(thing, formula) {
        let variables = {};

        // Check all variables are OK
        for (let i = 0; i < formula.in.length; i++) {
            let fieldName = formula.in[i];
            let fieldVal = $('.'+fieldName, thing).val();
            if (fieldVal == "" ) { return false; }
            // else
            variables[fieldName] = fieldVal;
        }

        // Adding optional fields if available
        for (let fieldName in formula.optional) {
            //let fieldName = formula.optional[i];
            let fieldVal = $('.'+fieldName, thing).val();
            if (fieldVal != "" ) {
                variables[fieldName] = fieldVal;
            } else {
                variables[fieldName] = formula.optional[fieldName];
            }
        }

        // Check target needs to be calculated
        let fieldName = formula.out;
        let fieldVal = $("."+fieldName, thing).val();
        if (fieldVal != "" ) { return false; }
        //TODO: what if more than one equation calculate the field, and we need to keep the min / max?
        // This will be particularly important if calculating backwards (e.g. maximum possible duration
        // of a middle dive), but might also happen if calculating max dive time based on Nitrogen and
        // O2exp limits.
        // Calculated fields can be overwritten by other calculated fields if they are different - depth can
        // only become shallower, duration can only become shorter, etc. Is that viable?

        // Sources are available, target is not known => good time to calculate
        this._setCalculatedValue($("." + fieldName, thing), formula.how(variables));
        return true;
    }

    /**
     * Dive-end transition: set values for following interval and dive
     *
     * Fails silently if the dive is not followed by anything
     */
    transitionDive(index) {
        let somethingChanged = false;

        // Transitioning the nitrogen group (following interval)
        let diveEndGroup = $(".dive.num"+index+" .end-group", this.divePlan).val();
        if (
            diveEndGroup != "" &&
            $(".interval.num"+index+" .start-group", this.divePlan).val() == ""
        ) {
            this._setCalculatedValue($(".interval.num"+index+" .start-group", this.divePlan), diveEndGroup);
            somethingChanged = true;
        }

        // Transitioning the O2 exposure (next dive)
        let diveEndO2exp = $(".dive.num"+index+" .end-o2exp", this.divePlan).val();
        if (
            diveEndO2exp != "" &&
            $('.dive.num'+(index+1)+' .start-o2exp', this.divePlan).val() == ""
        ) {
            this._setCalculatedValue($(".interval.num"+index+" .start-o2exp", this.divePlan), diveEndO2exp);
            somethingChanged = true;
        }

        return somethingChanged;
    }

    /**
     * Interval-end transition: set values for following dive
     */
    transitionInterval(index) {
        let somethingChanged = false;

        let intervalEndGroup = $(".interval.num"+index+" .end-group", this.divePlan).val();
        if (
            intervalEndGroup != "" &&
            $(".dive.num"+(index+1)+" .start-group", this.divePlan).val() == ""
        ) {
            this._setCalculatedValue($(".dive.num"+(index+1)+" .start-group", this.divePlan), intervalEndGroup);
            somethingChanged = true;
        }

        return somethingChanged;
    }

    _setCalculatedValue(field, fieldValue) {
        field.val(fieldValue);
        field.addClass("calculated");
    }

    /**
     * Low level add interval: create the div and fields
     */
    _addInterval() {
        // Create interval area
        let newI = $(templateInterval);
        $(this.divePlan).append(newI);
        let counter = $(".interval", this.divePlan).length;
        newI.addClass("num" + counter);
        // Decorate interval area
        RDPCalculatorStyler.decorateInterval(newI);
        // Add auto-calculate events
        let that = this;
        $("input", newI).on("input", function(e) { that.recalculate(this); } );
    }

    /**
     * Low level add dive: create the div and fields
     */
    _addDive() {
        // Create dive area
        let newD = $(templateDive);
        $(this.divePlan).append(newD);
        let counter = $(".dive", this.divePlan).length;
        newD.addClass("num" + counter);
        // Decorate dive area
        RDPCalculatorStyler.decorateDive(newD);
        // Add auto-calculate events
        let that = this;
        $("input", newD).on("input", function(e) { that.filter(this); that.recalculate(this); } );
        // TODO: multilevels
    }
}

class DomHelper {
    /**
     * returns the DOM element matching whatever parameter: id, jQ object, etc.
     */
    static domElement(blob) {
        if (typeof blob == "string") { // in case the param is the ID
            blob = document.getElementById(blob);
        }
        if (blob.length != undefined) { // in case the param is a jQ object
            blob = blob[0];
        }
        if (blob == null || blob.appendChild == undefined) { // checking the div is usable
            throw ("Error locating DOM element");
        }
        return blob;
    }
}

/**
 * Uses vanilla JS, because why not
 */
class RDPCalculatorStyler {
    /**
     * Add useless gloss to a dive div
     */
    static decorateDive(div) {
        div = DomHelper.domElement(div);

        let canvas = this._initCanvas(div);

        // Painting the canvas
        this._paintCanvasDive(canvas);
    }

    static decorateInterval(div) {
        div = DomHelper.domElement(div);

        let canvas = this._initCanvas(div);

        // Painting the canvas
        this._paintCanvasInterval(canvas);
    }

    static _initCanvas(div) {
        // Creating canvas for bg
        let canvas = document.createElement('canvas');
        canvas.setAttribute("style", "position:absolute;width:" + div.clientWidth + ";height:" + div.clientHeight + ";z-index:-1;");
        // For some reason not setting the width / height causes the painting to be distorted?
        canvas.setAttribute("width", div.clientWidth);
        canvas.setAttribute("height", div.clientHeight);
        div.appendChild(canvas);
        return canvas;
    }

    /**
     * add color and elems to the decorative canvas
     */
    static _paintCanvasDive(canvas) {
        let library = document.getElementById("library");
        //var c = document.getElementById("myCanvas");
        //let c = $('canvas', div)[0];
        let width = canvas.clientWidth;
        let height = canvas.clientHeight;

        // Drawing bg
        let ctx = canvas.getContext("2d");

        // Sky
        let grd = ctx.createLinearGradient(0, height/4, 0, 0);
        grd.addColorStop(1,"#eff");
        grd.addColorStop(0,"#cff");
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height/4);

        // Sea
        grd = ctx.createLinearGradient(0, height, 0, 0);
        grd.addColorStop(1,"#dff");
        grd.addColorStop(0,"#57c");
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, height/4, width, height);

        // Dive
        ctx.lineWidth = width/100;
        ctx.strokeStyle = "#009";
        ctx.moveTo(10,height/4+10);
        ctx.lineTo(width/4,height/4+10);
        ctx.lineTo(width*1.1/4,height*3/4);
        ctx.lineTo(width*2.9/4,height*3/4);
        ctx.lineTo(width*3/4,height/4+10);
        ctx.lineTo(width-10,height/4+10);
        ctx.stroke();

        // Decorations
        //TODO: unrandomize location for better spread
        let fishes = library.getElementsByClassName("fish");
        let numFishes = 10;
        ctx.save();
        for (var i = 0; i < numFishes; i++) {
            let img = fishes[Math.floor(Math.random()*fishes.length)];
            var direction = Math.floor(Math.random()*2)*2-1; // 1 or -1
            ctx.scale(direction, 1);
            ctx.drawImage(img, Math.random()*width*direction, Math.random()*height/4+height*3/4); // randomly near the bottom
        }
        //TODO: add boat / island / pier
        //TODO: add corals / wreck
    }

    static _paintCanvasInterval(canvas) {
        let library = document.getElementById("library");
        let width = canvas.clientWidth;
        let height = canvas.clientHeight;

        // Drawing bg
        let ctx = canvas.getContext("2d");
        // Sky
        let grd = ctx.createLinearGradient(0, height/4, 0, 0);
        grd.addColorStop(1,"#eff");
        grd.addColorStop(0,"#cff");
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height/4);
        // Sea
        grd = ctx.createLinearGradient(0, height, 0, 0);
        grd.addColorStop(1,"#dff");
        grd.addColorStop(0,"#57c");
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, height/4, width, height);

        //TODO: add chilling dude at surface
    }
}

// Tests
//RDPCalculatorStyler.decorateDive($('.dive.1'));

// Making available to upper scopes
myRDPCalculator = new RDPCalculator($('.rdp-calculator')[0]);

