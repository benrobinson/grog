export default function TileSheet(imageAsset, tileWidth, tileHeight) {

  const columnCount = Math.floor(imageAsset.width / tileWidth);
  const rowCount = Math.floor(imageAsset.height / tileHeight);

  let column, ci, row, ri, tiles = [];

  for (ri = 0; ri < rowCount; ri++) {
    row = ri * tileHeight;
    tiles[ri] = [];
    for (ci = 0; ci < columnCount; ci++) {
      column = ci * tileWidth;
      tiles[ri][ci] = [row, column, tileWidth, tileHeight];
    }
  }

  const getTile = (x, y) => tiles[x][y];

  return { imageAsset, getTile, tileWidth, tileHeight }
}