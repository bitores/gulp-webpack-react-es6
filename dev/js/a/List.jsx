import React from 'react'
import {Link,History,RouterContext} from 'react-router';


const propTypes = {
  id: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  text: React.PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
  id:5,
  url:"required"
};

class List extends React.Component {
	// RouterContext ~~ history (push, )
	constructor(props, context){
		super(props, context);

		// this.router = this.context.router;
		// console.log(this.context);

		this.onClickDiv = this.onClickDiv.bind(this);
	}

	static methodsAreOk() {
		// static method ... 
	    console.log(`static method  ${this}`);
	}

	onClickDiv (e){
		// e.preventDefault();
		console.log(this.props.text)
		// List.methodsAreOk();
		this.constructor.methodsAreOk();
		// js控制react-router中转
		//`props.history.pushState` and `props.history` and `context.history` are deprecated. Please use `context.router`.
		this.context.router.push('/')

		//---- this.constructor === ...
		//console.log(p.constructor === Person);  // true
		//console.log(Person.prototype.constructor === Person); // true
		//console.log(p.constructor.prototype.constructor === Person); // true
	}

	onClickSpan = (item) => {
		console.log(item,this.refs);
		console.log('页面参数：',this.props.params.id);
	}


	componentDidMount(){
		console.log('mount');
	}

	componentWillUnmount(){
		console.log('un mount');
	}

    render() {
    	let  arr = [12,2,3,4,5,6];
        return (
        	<ul>
        		{arr.map((item, index)=>(
        			<li key={index}
        				onClick={() => {this.onClickDiv();this.onClickSpan(item);}}
        			>
        				<span>{item}</span>
        			</li>
        		))}
        		<Link to="/" className="homelink">Home</Link>
        	</ul>
        )
    }
}

List.contextTypes = {
    router: function(e){console.log(e);}
};
List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;