import React from 'react';
import { PopularGames } from '../PopularGames/PopularGames';
import { HelpSection } from '../HelpSection/HelpSection';
import { RulesSection } from '../RulesSection/RulesSection';

export function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <PopularGames />
        <HelpSection />
        <RulesSection />
      </div>
    </footer>
  );
}


