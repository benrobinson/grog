import engine from './engine';
import Titles from './game/stages/Titles';

engine
  .mountInto('camera')
  .startStage(Titles)
  .start();