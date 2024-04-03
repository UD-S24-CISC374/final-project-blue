/* In prosses of making tiles for the game gride */

/*Swaps one tile with another*/
function swapTiles(tile1, tile2) {
    var tempNumValue = tile1.numValue;
    var tempSymbol = tile1.symbol;

    tile1.loadTexture(tile2.key);
    tile1.numValue = tile2.numValue;
    tile1.symbol = tile2.symbol;

    tile2.loadTexture(tile1.key);
    tile2.numValue = tempNumValue;
    tile2.symbol = tempSymbol;
}
