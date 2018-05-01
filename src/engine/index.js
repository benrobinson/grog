import Engine from './Engine';
import Camera from './Camera';
import Entities from './Entities';
import Events from './Events';
import Stage from './Stage';
import Ticker from './Ticker';

export default new Engine(
  new Camera(),
  new Entities(),
  new Events(),
  new Stage(),
  new Ticker());

