import engine from './engine';
import Titles from './game/stages/Titles';

engine
  .withBackgroundColor('black')
  .mountInto('camera')
  .startStage(Titles)
  .start();