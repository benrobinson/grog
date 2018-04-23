import Application from './Application';
import Camera from './Camera';
import Entities from './Entities';
import Events from './Events';
import Level from './Level';
import Ticker from './Ticker';

export default new Application(
  new Camera(),
  new Entities(),
  new Events(),
  new Level(),
  new Ticker());