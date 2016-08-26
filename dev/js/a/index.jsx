import React from 'react';
import ReactDOM,{render} from 'react-dom';
import {hashHistory,browserHistory, Route, Router,Link} from 'react-router';
// import { createHistory, createHashHistory, useBasename } from 'history';


import List from './List.jsx';

 
class Photo extends React.Component {
  render() {

    return <p>
			    hello, winty!
			    <Link to="/list" className="homelink">List</Link>
		    </p>
  }
}



// browserHistory无#号,需要服务器协同配置
// nginx
	// erver {
	//   ...
	//   location / {
	//     try_files $uri /index.html;
	//   }
	// }
// .htaccess
	// RewriteBase /
	// RewriteRule ^index\.html$ - [L]
	// RewriteCond %{REQUEST_FILENAME} !-f
	// RewriteCond %{REQUEST_FILENAME} !-d
	// RewriteRule . /index.html [L]
// hashHistory 有#号


const enter = () => {
	console.log('enter');
	// Router.push('/list1')
}

render((
	<Router history={browserHistory}>
		<Route onEnter={enter} path="/" component={Photo}/>
		<Route path="/list(/:id)" component={List}/>
	</Router>
), document.getElementById('content'));