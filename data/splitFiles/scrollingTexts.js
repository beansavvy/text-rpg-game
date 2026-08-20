export function generateScrollingText() {
  const scrollingTexts = [
    function (character) {
      return `Welcome ${
        character.name != null && character.name != ''
          ? character.name
          : 'Player'
      }! <br><br> ##TAB## You find yourself at the edge of the town of Elmere, a small town known for its hardworking folk and occasional traveler. In front of you is the ancient Forest of Eldarin, spanning as far as the eye can see with trees. ##BR## ##TAB## You feel the weight of your pack and the gear you've just acquired, each item a silent promise of the adventures to come. You take a deep breath, tasting the crisp air mingled with the scent of pine and ancient earth. ##BR## ##TAB## Behind you, the village market buzzes faintly, a last vestige of civilization at your back. Your journey begins here, at the crossroads of fate and destiny. ##BR## ##TAB## Will you delve into the shadowy depths of the forest to uncover its secrets, or tread the well-worn paths to seek allies and knowledge in Elmere? The choice is yours, brave soul. ##BR## ##TAB## Your adventure starts now...`;
    },
  ];
  return scrollingTexts;
}
