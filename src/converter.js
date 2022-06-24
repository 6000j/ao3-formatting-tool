function startConversion() {
    let input = readInput();
    let convertType = "footnotes"; // This is going to rely on a dropdown later once I have the base process done
    let output = convertText(input, convertType);
    setText(output);
}

function setText(input) {
    let textbox = document.getElementById("textInput");
    textbox.value = input;
}

function readInput() {
    let textbox = document.getElementById("textInput");
    let inputText = textbox.value;
    return inputText;
}


function convertText(inputText, convertType) {

    let output = inputText;
    console.log(convertType);
    switch (convertType) {
        case "footnotes":
            output = toFootnotes(inputText);
            break;
        default:
            console.log("defaulted");
            break;
    }

    return output;
}

// Conversion functions
function toFootnotes(text) {
    console.log("we got to conversion")
    let reStart = /\[(\S+?)\]/g;
    let reEnd = /\[\[(\S+?)\](.+?)\]/g;
    // Testing
    //let output = text;
    let textSplit = text.split("[TEXTBREAK]");
    let output = textSplit[0].replaceAll(reStart, toEntryFootnote); // This sets up our "opening" footnotes. Note that we specifically do not allow spaces in here. This means we can "use" spaces for later on!
    output += textSplit[1].replaceAll(reEnd, toExitFootnote); // You have to "encapsulate" the footnote twice, once at the start for the value and once at the end to indicate where the "back" button should go !
    return output;
}

function toEntryFootnote(text) {
    let name = text.slice(1, -1); // Removing the brackets around it here so we can use this in our creation of the footnote code
    let output = "<a name=\"return1\" id=\"return1\"></a><sup>[<a href=\"#note1\" title=\"click to see footnote\">1</a>]</sup>"; // This is our "base" setup, we then run .replace on it a couple times
    output = output.replaceAll("1", name);
    return output;
}

function toExitFootnote(text) {
    let reName = /\[\[(\S*)\]/g; // Grabbing the "name" of the footnote
    let name = text.match(reName)[0];
    name = name.slice(2,-1);
    console.log("wo");
    console.log(name);
    let reValue = /\[\[(\S+?)\](.+?)\]/;
    let value = text.replace(reValue, "$2"); // hopefully this grabs the "content" of the text!
    console.log(value);
    let output = "<a name=\"note1\" id=\"note1\"></a><sup>1</sup>textblock<sup>[<a href=\"#return1\" title=\"return to text\">return to text</a>]</sup>";
    output = output.replaceAll("1", name);
    output = output.replaceAll("textblock", value);
    return output;
}