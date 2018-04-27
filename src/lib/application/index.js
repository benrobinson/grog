import Application from './Application';
import Camera from './Camera';
import Entities from '../entities/Entities';
import Events from '../events/Events';
import Level from '../level/Level';
import Ticker from './Ticker';

export default new Application(
  new Camera(),
  new Entities(),
  new Events(),
  new Level(),
  new Ticker());