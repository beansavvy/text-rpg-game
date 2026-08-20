export function generateQuests() {
  return [
    {
      id: 'q-0000',
      name: 'Livestock in Danger',
      description:
        'Wolves have been attacking the town’s livestock. Eliminate 5 wolves to protect the villagers.',
      objectives: [
        {
          type: 'kill',
          target: 'Wolf',
          required: 5,
          progress: 0,
        },
      ],
      rewards: {
        gold: 50,
        items: [],
        experience: 100,
      },
      status: 'not started', // Can be 'not started', 'in progress', 'completed'
    },
    {
      id: 'q-0001',
      name: 'A Hunter’s Request',
      description:
        'A hunter is requesting aid in taking down a bear rampaging in the Ancient Forest of Eldarin. Bring back 1 bear pelt.',
      objectives: [
        {
          type: 'collect',
          target: 'Bear Pelt',
          required: 1,
          progress: 0,
        },
      ],
      rewards: {
        gold: 100,
        items: [],
        experience: 150,
      },
      status: 'not started',
    },
  ];
}
