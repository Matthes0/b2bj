// import { GameItem } from '../GameItem/GameItem';

// export function GameList({ games }) {
//   return (
//     <ul className="game-list">
//       {games.map((game) => (
//         <GameItem key={game.id} game={game} />
//       ))}
//     </ul>
//   );
// }

import { GameItem } from '../GameItem/GameItem';

export function GameList({ games }) {
  const filteredGames = games.filter(game => game.title.toLowerCase() !== 'blackjack');

  return (
    <ul className="game-list">
      {filteredGames.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </ul>
  );
}
