export function GameItem({ game }) {
    return (
      <li>
        🎮 <strong>{game.title}</strong> — {game.description}
      </li>
    );
  }
  