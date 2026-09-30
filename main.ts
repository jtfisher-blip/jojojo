let lastTime = 0
let rpm = 0
let mph = 0

// 1. MEASURE YOUR ANEMOMETER: Change 2.5 to the distance (in inches) 
// from the center axle to the middle of a cup.
let radiusInches = 2.5

pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    let now = input.runningTime()
    if (lastTime > 0) {
        let period = now - lastTime
        rpm = 60000 / period

        // Convert RPM to MPH: (RPM * 2 * Pi * radius * 60) / 63360
        // Simplified multiplier for inches to MPH is 0.00595
        mph = rpm * 2 * Math.PI * radiusInches * 0.00595
    }
    lastTime = now
})

basic.forever(function () {
    // If it's been more than 3 seconds since the last pulse, assume it's stopped
    if (input.runningTime() - lastTime > 3000) {
        rpm = 0
        mph = 0
    }
    // Displays the wind speed rounded to the nearest whole mile per hour
    basic.showNumber(Math.round(mph))
    basic.pause(1000)