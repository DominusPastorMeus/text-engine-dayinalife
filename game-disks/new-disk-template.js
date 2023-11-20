// This simple game disk can be used as a starting point to create a new adventure.
// Change anything you want, add new rooms, etc.
const newDiskTemplate = () => ({
  roomId: 'dream', // Set this to the ID of the room you want the player to start in.
  rooms: [
    {
      id: 'dream', // Unique identifier for this room. Entering a room will set the disk's roomId to this.
      name: 'The Mountain', // Displayed each time the player enters the room.
      desc: `There you are. It's dark and it's silent. Your eyes begin to adjust. There's a path to the MOUNTAIN, but your BAG is on the ground. Type ITEMS to see a list of items in the room.`, // Displayed when the player first enters the room.
      items: [
        {
          name: 'path',
          desc: 'It leads to the MOUNTAIN.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO MOUNTAINS to try the door.`), // Called when the player uses the item.
        },
        {
          name: ['bag', 'bags'], // The player can refer to this item by either name. The game will use the first name.
          desc: `You have to pick up the bag in order to climb.`,
        },
        {
          name: 'axe',
          desc: `You could probably USE it to cut the VINES, unblocking the door.`,
          isTakeable: true, // Allows the player to take the item.
          onUse() {
            // Remove the block on the room's only exit.
            const room = getRoom('dream');
            const exit = getExit('The Mountain', room.exits);

            if (exit.block) {
              delete exit.block;
              println(`You picked up the bag. It is extremely heavy, but at least now you can go to the MOUNTAIN.`);

              // Update the axe's description.
              getItem('axe').desc = `Why is it so heavy? what's in it?.`;
            } else {
              println(`You try to open the bag, but you can't for some reason.`);
            }
          },
        }
      ],
      exits: [
        {
          dir: 'mountain', // "dir" can be anything. If it's north, the player will type "go north" to get to the room called "A Forest Clearing".
          id: 'clearing',
          block: `The PATH leading to the MOUNTAIN... you'll need a BAG.`, // If an exit has a block, the player will not be able to go that direction until the block is removed.
        },
      ],
    },
    {
      id: 'path',
      name: 'the Mountain path',
      desc: `It’s completely dark, but simultaneously brighter than day. The sky is covered by billions upon billions of stars. 
      So many that against the backdrop of the inky black sky, that the sky itself ceases to be seen. BACK is foot of the MOUNTAIN.`,
      exits: [
        {
          dir: 'back',
          id: 'dream',
        },
      ],
    }
  ],
});
