
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/


const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/


const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/

// 用来描述标签的
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`

const qnameCapture = `((?:${ncname}\\:)?${ncname})`

//标签开头
const startTagOpen = new RegExp(`^<${qnameCapture}`)

// 结束标签
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g


const comment = /^<!\--/
const conditionalComment = /^<!\[/


function parserHTML(html){
  function advance(n){
    html = html.substring(n); // 每次根据传入的长度截取html
  }

  function start(tagName){

  }

  function chars(text){
    console.log(text);
  }

  while(html){
    let textEnd = html.indexOf('<');
    if(textEnd === 0){
      parseStartTag(html); //解析开始标签 
      continue;
    }
    let text;
    if(textEnd >= 0){
      text = html.substring(0,textEnd)
    }
    if(text){
      advance(text.length);
      ChannelSplitterNode(text);
    }
  }

  function parseStartTag(html){
    const matches = html.match(startTagOpen)
    if(matches){
      const match = {
        tagName: matches[1],
        attrs: []
      }
      advance(matches[0].length)

      let end, attr
      while(!(end = html.match(startTagClose)) && attr === html.match(attribute)){
        match.attrs.push({name: attr[1],value: attr[3]|| attr[4]|| attr[5]})
        advance(attr[0].length)
      }

      if(end){
        advance(end[0].length)
        return match
      }
    }
  }
}

export function compileToFunction(template){
  let ast = parserHTML(template)
  console.log(ast);
}