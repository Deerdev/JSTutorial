import React, { Component } from 'react';

function logProps(SubComponent) {
    class LogProps extends Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }
  
      render() {
        const {forwardedRef, ...rest} = this.props;
  
        // Assign the custom prop "forwardedRef" as a ref
        return <SubComponent ref={forwardedRef} {...rest} />;
      }
    }
  
    // Note the second param "ref" provided by React.forwardRef.
    // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
    // And it can then be attached to the Component.
    return React.forwardRef((props, ref) => {
      return <LogProps {...props} forwardedRef={ref} />;
    });
  }

  function FancyButton(props) {
    return <button className="FancyButtom">props.children</button>
  }

  // 定义高阶组件
  const LogProps = logProps(FancyButton)

  
// 使用高阶组件，并传递ref
  class TestRef extends Component {
    constructor(props) {
      super(props)
      this.ref = React.createRef()
    }
    render() {
      return <LogProps ref={this.ref} />
    }
  }