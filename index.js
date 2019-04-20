import ReactDOM from 'react-dom';
import App from './components/App';
import content from './assets/content.json';

const root = window.document.getElementById('root');
ReactDOM.render(<App content={content} />, root);