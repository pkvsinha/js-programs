// Develop a simple markdown or HTML based rich text editor 
/** PART 1:
 * function transformTextToRichText(string, startPosition, endPosition, richTextAttribute, richTextValue)
 * // possible values for richTextType = BOLD, ITALICS, UNDERLINE, COLOR
 * // possible values for richTextValue = based on type, for example if BOLD , values can be weight of BOLD, 500, 700. Dor colour = RGB
 * return rich text string.
 * 
 * Example: This is an uber interview., 5, 9, BOLD, 500
 * 
 * ouput This is an <b style={'font-weight': 500}>uber</b> interview
 * 
 * "This is an", "uber", "interview".
 */

const { text } = require("stream/consumers");

/* PART 2:
 * Now able to combine multiple rich text attribute over already formatted rich-text,
 * For example : input string: This is an <b>Uber engg</b> interview
 * Where 'Uber engg' is in bold, we need underline to 'engg interview'
 * 
 * Further 'interview' text in red colour
 * 
 * This is an & * () 1 <2>3 <b>Uber <u>engg</u></b><u> <r>interview</r></u>
 * 
 * commdn: 
 * Root
 *  |. TextNode: "This is an"
 *  |. BoldNode: 
 *       |. TextNode: "Uber "
 *       |. UnderlineNode: "Engg"
 *  |. UnderlineNode:
 *        |. TextNode: " interview."
 *
 * This ia an <b>Uber <u>engg</u></b>
*/


const BOLD = "BOLD";
const ITALICS = "ITALICS";
const UNDERLINE = "UNDERLINE";
const COLOR = "COLOR";

const decorateBold = (text, richTextValue) => {
    return `<b style={'font-weight': ${richTextValue}}>${text}</b>`
}
const decorateItalics = (text) => {
    return `<i style={'font-style': 'italic'}>${text}</i>`
}
const decorateUnderline = (text) => {
    return `<span style={'text-decoration': 'underline'}>${text}</span>`
}
const decorateColor = (text, richTextValue) => {
    return `<span style={'color': ${richTextValue}}>${text}</b>`
}

function decorate(text, richTextAttribute, richTextValue) {
    switch(richTextAttribute) {
        case BOLD: return decorateBold(text, richTextAttribute, richTextValue);
        break;
        case ITALICS: return decorateItalics(text, richTextAttribute, richTextValue);
        break;
        case  UNDERLINE: return decorateUnderline(text, richTextAttribute, richTextValue);
        break;
        case COLOR: return decorateColor(text, richTextAttribute, richTextValue);
        break;
        default: return text;
    }
}

class Node {
    constructor(tag) {
        this.tag = tag;
        this.children = []
    }
}

function findFirstMarkup(text) {
    return /<(b|i|span).*>/.exec(text);
}

function findEndTag(str, tag) {
    let endTag = '</' + tag.slice(1, tag.length); // <b> = </ + b>
    return str.indexOf(endTag);
}

function convertTODOM(str) {
    console.log("parsing ", str);
    let txt = str;
    let root = new Node(""); 
    let i = 0;
    // this is a <b>bold <u>underline <c>colored</c> </u></b>
    
    // <b>bold <u>underline <c>colored</c> </u></b>
    // loop some thing else <u>red</u>
    while(txt.length > 0) {
        let re = findFirstMarkup(txt);
        let tag = "<" + re['1'] + ">";
        let index = re['index'];
        // console.log(txt.slice(i, index), "after:: ", tag, index);
        root.children.push(new Node(txt.slice(i, index))); // put the first tag
        let endIndex = findEndTag(str, tag);
        root.children.push(convertTODOM(str.slice(index, endIndex + tag.length + 1)));
        txt = txt.slice(endIndex, txt.length);
        txt = '';
    }
    
    return root;
}

/**
 * @param richTextAttribute: [BOLD, ITALICS, UNDERLINE, COLOR]
 */
function transformTextToRichText(string, startPosition, endPosition, richTextAttribute, richTextValue) {
    if (invalidPositions(string, startPosition, endPosition)) return string; // pre-check
    
    const dom = convertTODOM(string);
    console.log("dom: > ", JSON.stringify(dom));
    
    return string.slice(0, startPosition) 
    + decorate(string.slice(startPosition, endPosition), richTextAttribute, richTextValue)
    + string.slice(endPosition, string.length);
}

function invalidPositions(string, start, end) {
    const n = string.length;
    if (start < 0 || start > end || start > n) return true;
    if (end < 0 || end > n) return true;
    
    return false;
}

console.log(transformTextToRichText("this is <b>bold</b>", 0, 1, "UNDERLINE"));