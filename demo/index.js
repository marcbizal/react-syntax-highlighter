import React from 'react';
import { render } from 'react-dom';
import SyntaxHighlighter from '..';

const availableStyles = [
  'agate',
  'androidstudio',
  'arduino-light',
  'arta',
  'ascetic',
  'atelier-cave-dark',
  'atelier-cave-light',
  'atelier-dune-dark',
  'atelier-dune-light',
  'atelier-estuary-dark',
  'atelier-estuary-light',
  'atelier-forest-dark',
  'atelier-forest-light',
  'atelier-heath-dark',
  'atelier-heath-light',
  'atelier-lakeside-dark',
  'atelier-lakeside-light',
  'atelier-plateau-dark',
  'atelier-plateau-light',
  'atelier-savanna-dark',
  'atelier-savanna-light',
  'atelier-seaside-dark',
  'atelier-seaside-light',
  'atelier-sulphurpool-dark',
  'atelier-sulphurpool-light',
  'brown-paper',
  'codepen-embed',
  'color-brewer',
  'dark',
  'darkula',
  'defaultStyle',
  'docco',
  'far',
  'foundation',
  'github-gist',
  'github',
  'googlecode',
  'grayscale',
  'hopscotch',
  'hybrid',
  'idea',
  'ir-black',
  'kimbie.dark',
  'kimbie.light',
  'magula',
  'mono-blue',
  'monokai-sublime',
  'monokai',
  'obsidian',
  'paraiso-dark',
  'paraiso-light',
  'pojoaque',
  'railscasts',
  'rainbow',
  'school-book',
  'solarized-dark',
  'solarized-light',
  'sunburst',
  'tomorrow-night-blue',
  'tomorrow-night-bright',
  'tomorrow-night-eighties',
  'tomorrow-night',
  'tomorrow',
  'vs',
  'xcode',
  'xt256',
  'zenburn'
];
class Component extends React.Component {
  constructor() {
    super();
    const initialCodeString = `function createStyleObject(classNames, style) {
  return classNames.reduce((styleObject, className) => {
    return {...styleObject, ...style[className]};
  }, {});
}

function createClassNameString(classNames) {
  return classNames.join(' ');
}

function createChildren(style, useInlineStyles) {
  let childrenCount = 0;
  return children => {
    childrenCount += 1;
    return children.map((child, i) => createElement({
      node: child,
      style,
      useInlineStyles,
      key:\`code-segment-$\{childrenCount}-$\{i}\`
    }));
  }
}

function createElement({ node, style, useInlineStyles, key }) {
  const { properties, type, tagName, value } = node;
  if (type === "text") {
    return value;
  } else if (tagName) {
    const TagName = tagName;
    const childrenCreator = createChildren(style, useInlineStyles);
    const props = (
      useInlineStyles
      ?
      { style: createStyleObject(properties.className, style) }
      :
      { className: createClassNameString(properties.className) }
    );
    const children = childrenCreator(node.children);
    return <TagName key={key} {...props}>{children}</TagName>;
  }
}
  `;
    this.state = {
      selected: 'tomorrow-night-eighties',
      style: require('../styles/hljs/tomorrow-night-eighties').default,
      code: initialCodeString,
      showLineNumbers: false
    }
  }
  render() {
    const h1Style = {
      fontSize: 42,
      color: 'aliceblue'
    };
    const h2 = {
      fontSize: 24,
      color: 'aliceblue'
    }

    return (
      <div>
        <h1 style={h1Style}>React Syntax Highlighter</h1>
        <h2 style={h2}>Change Style</h2>
        <select
          value={this.state.selected}
          onChange={(e) => this.setState({style: require(`../styles/hljs/${e.target.value}`).default, selected: e.target.value})}
        >
          {availableStyles.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div style={{paddingTop: '10px', fontSize: 16, color: 'aliceblue'}}>
          <label htmlFor="showLineNumbers">Show Line Numbers:</label>
          <input
            type="checkbox"
            checked={this.state.showLineNumbers}
            onChange={() => this.setState({ showLineNumbers: !this.state.showLineNumbers })}
            id="showLineNumbers"
          />
        </div>
        <div style={{paddingTop: 20, display: 'flex'}}>
          <textarea
            style={{flex: 1, marginTop: 11}}
            rows={40}
            cols={100}
            value={this.state.code}
            onChange={(e) => this.setState({code: e.target.value})}
          />
          <div style={{flex: 1, width: '50%'}}>
            <SyntaxHighlighter
              style={this.state.style}
              showLineNumbers={this.state.showLineNumbers}
              wrapLines={true}
              lineProps={(lineNumber) => ({
                style: { display: "block", cursor: "pointer" },
                onClick() {
                  alert(`Line Number Clicked: ${lineNumber}`);
                }
              })}
            >
              {this.state.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  }
}


render(<Component />, document.getElementById('app'));
