/*
FONTS USED:
https://fontesk.com/moshita-mono-typeface/
https://fontesk.com/damn-font/
https://fontesk.com/shadower-font/
https://fontesk.com/mikhail-font/
https://fontesk.com/steppe-font/
https://fontesk.com/arina-font/
https://fontesk.com/femme-fatale-font/
https://fontesk.com/min-sans-typeface/

ALL OF THEM ARE FREE FOR COMMERCIAL USE
*/

const Y_AXIS = 1;
const X_AXIS = 2;

const K = window.innerWidth / (186 * 4);
const WIDTH = 186 * K;
const HEIGHT = 263 * K;

const font_names = ["Arina.ttf",
    "DAMN.ttf",
    "HSEFonts_Gernik_Mikhail.ttf",
    "MinSans-Regular.ttf",
    "MoshitaMono.ttf",
    "Shadower.ttf",
    "Steppe.ttf"];

let fonts = [];

function preload() {
    for (let i = 0; i < font_names.length; i++) {
        fonts.push(loadFont("assets/" + font_names[i]));
    }
}

function randInt(lower, upper) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
}

function generateRandColor(lower, upper) {
    let h = randInt(0, 100);
    let s = randInt(0, 100);
    let b = randInt(lower, upper);

    return color(h, s, b);
}

function generateRandBrightColor() {
    let h = randInt(0, 100);
    let s = 100;
    let b = 100;

    return color(h, s, b);
}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis === X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    strokeWeight(0);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function setup() {
    // colormode
    colorMode(HSB, 100);

    // Create the canvas
    createCanvas(WIDTH, HEIGHT);

    let bg_color = generateRandColor(0, 50);
    background(bg_color);

    // flags
    var circlePlaced = false, squarePlaced = false, gradientSquarePlace = false, starPlaced = false;

    // circle
    if (Math.random() > 0.3) {
        circlePlaced = true;

        let circle_x = randInt(0, WIDTH);
        let circle_y = randInt(0, HEIGHT);
        let circle_radius = randInt(50, WIDTH);
        let circle_color = generateRandColor(50, 100);

        fill(circle_color);
        strokeWeight(0);
        ellipse(circle_x, circle_y, circle_radius, circle_radius);
    }


    // square
    if (Math.random() > 0.3) {
        squarePlaced = true;

        let square_x = randInt(0, WIDTH);
        let square_y = randInt(0, HEIGHT);
        let square_radius = randInt(50, WIDTH);
        let square_color = generateRandColor(50, 100);
        let k_angle = randInt(1, 5)

        fill(square_color);
        strokeWeight(0);
        rotate(PI / k_angle);
        rect(square_x, square_y, square_radius, square_radius);
        rotate(-PI / k_angle);

    }


    // gradient square
    if (Math.random() > 0) {
        gradientSquarePlace = true;

        let square_x = randInt(0, WIDTH);
        let square_y = randInt(0, HEIGHT);
        let square_radius = randInt(100, 300);
        let square_color1 = generateRandColor(75, 100);
        let square_color2 = generateRandColor(75, 100);

        setGradient(square_x, square_y, square_radius, square_radius, square_color1, square_color2, randInt(1, 2));
    }

    // star
    if (Math.random() > 0.5) {
        starPlaced = true;

        let star_x = randInt(20, WIDTH - 20);
        let star_y = randInt(20, HEIGHT - 20);
        let star_radius1 = randInt(10, 60);
        let star_radius2 = randInt(50, 100);
        let star_color = generateRandColor(0, 100);
        let star_npoints = randInt(3, 10);

        fill(star_color);
        star(star_x, star_y, star_radius1, star_radius2, star_npoints);
    }



    // text
    textAlign(CENTER, CENTER);
    
    let font_size = randInt(40, 100);
    textSize(font_size);
    
    let first_letter_font = fonts[randInt(0, fonts.length - 1)];
    let first_letter_color = generateRandBrightColor();
    let first_letter_x = randInt(50, WIDTH - 100);
    let first_letter_y = randInt(50, HEIGHT - 100);
    
    let second_letter_font = fonts[randInt(0, fonts.length - 1)];
    let second_letter_color = generateRandBrightColor();
    let second_letter_x = randInt(first_letter_x + 60, WIDTH - 10);
    let second_letter_y = first_letter_y
    
    // text
    textFont(second_letter_font);
    fill(second_letter_color);
    text("Ы", second_letter_x, second_letter_y);

    textFont(first_letter_font);
    fill(first_letter_color);
    text("В", first_letter_x, first_letter_y);    
}
