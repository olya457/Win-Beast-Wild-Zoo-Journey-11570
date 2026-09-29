import { ImageSourcePropType } from 'react-native';
export const artwork = {
  logo: require('../assets/win-beast-zoo-logo.png'),
  map: require('../assets/win-beast-zoo-map.png'),
  onboarding: [
    require('../assets/win-beast-zoo-entrance.jpg'),
    require('../assets/win-beast-zoo-entrance.jpg'),
    require('../assets/win-beast-zoo-waterfall.jpg'),
    require('../assets/win-beast-zoo-savannah.jpg'),
    require('../assets/win-beast-zoo-atrium.jpg'),
  ],
};
export type Dish = {
  id: string;
  name: string;
  category: string;
  price: number;
  minutes: number;
  time: string;
  description: string;
  ingredients: string;
  image: ImageSourcePropType;
};
export const categories = ['Jungle Bites', 'Safari Meals', 'Wild Treats'];
export const dishes: Dish[] = [
  {
    id: 'wrap',
    name: 'Jungle Crunch Wrap',
    category: categories[0],
    price: 8.5,
    minutes: 12,
    time: '10–12',
    description:
      'Crispy chicken, fresh vegetables and creamy herb sauce wrapped in a warm tortilla.',
    ingredients:
      'Tortilla, crispy chicken, lettuce, tomato, cucumber, cheddar cheese, herb sauce.',
    image: require('../assets/win-beast-jungle-crunch-wrap.png'),
  },
  {
    id: 'sliders',
    name: 'Wild Paw Sliders',
    category: categories[0],
    price: 9.9,
    minutes: 15,
    time: '12–15',
    description:
      'Three mini beef burgers with melted cheese, fresh vegetables and signature sauce.',
    ingredients:
      'Mini burger buns, beef patties, cheddar cheese, lettuce, tomato, pickles, burger sauce.',
    image: require('../assets/win-beast-wild-paw-sliders.png'),
  },
  {
    id: 'bites',
    name: 'Safari Chicken Bites',
    category: categories[0],
    price: 7.9,
    minutes: 10,
    time: '8–10',
    description:
      'Golden crispy chicken pieces served with seasoned potato wedges and dipping sauce.',
    ingredients:
      'Chicken breast, breadcrumbs, flour, eggs, potato wedges, paprika, garlic, dipping sauce.',
    image: require('../assets/win-beast-safari-chicken-bites.png'),
  },
  {
    id: 'sticks',
    name: 'Monkey Cheese Sticks',
    category: categories[0],
    price: 6.5,
    minutes: 9,
    time: '7–9',
    description:
      'Crispy mozzarella sticks with a soft melted cheese center and tomato dip.',
    ingredients:
      'Mozzarella, breadcrumbs, flour, eggs, Italian herbs, tomato sauce.',
    image: require('../assets/win-beast-monkey-cheese-sticks.png'),
  },
  {
    id: 'fries',
    name: 'Zebra Loaded Fries',
    category: categories[0],
    price: 8.2,
    minutes: 12,
    time: '10–12',
    description:
      'Crispy fries topped with melted cheese, chicken pieces, vegetables and creamy sauce.',
    ingredients:
      'Potatoes, chicken, cheddar cheese, tomato, green onions, sweet peppers, creamy sauce.',
    image: require('../assets/win-beast-zebra-loaded-fries.png'),
  },
  {
    id: 'bowl',
    name: 'Savannah Chicken Bowl',
    category: categories[1],
    price: 13.9,
    minutes: 18,
    time: '15–18',
    description:
      'Grilled chicken served with seasoned rice, roasted vegetables and a fresh herb dressing.',
    ingredients:
      'Chicken breast, basmati rice, zucchini, bell pepper, corn, cherry tomatoes, herbs, olive oil.',
    image: require('../assets/win-beast-savannah-chicken-bowl.png'),
  },
  {
    id: 'burger',
    name: 'Lion Burger Plate',
    category: categories[1],
    price: 14.5,
    minutes: 18,
    time: '15–18',
    description:
      'Juicy beef burger with cheddar cheese and fresh vegetables, served with crispy fries.',
    ingredients:
      'Beef patty, burger bun, cheddar cheese, lettuce, tomato, red onion, pickles, potatoes, burger sauce.',
    image: require('../assets/win-beast-lion-burger-plate.png'),
  },
  {
    id: 'pasta',
    name: 'Elephant Garden Pasta',
    category: categories[1],
    price: 12.9,
    minutes: 17,
    time: '14–17',
    description:
      'Creamy pasta with mushrooms, spinach, roasted vegetables and Parmesan cheese.',
    ingredients:
      'Penne pasta, mushrooms, spinach, zucchini, bell pepper, cream, Parmesan, garlic, herbs.',
    image: require('../assets/win-beast-elephant-garden-pasta.png'),
  },
  {
    id: 'bbq',
    name: 'Ranger BBQ Chicken',
    category: categories[1],
    price: 15.2,
    minutes: 20,
    time: '18–20',
    description:
      'Grilled chicken covered with smoky BBQ sauce and served with potatoes and fresh salad.',
    ingredients:
      'Chicken breast, BBQ sauce, potatoes, lettuce, cucumber, tomato, red onion, olive oil.',
    image: require('../assets/win-beast-ranger-bbq-chicken.png'),
  },
  {
    id: 'veggie',
    name: 'Giraffe Veggie Burger',
    category: categories[1],
    price: 12.5,
    minutes: 15,
    time: '12–15',
    description:
      'Grilled vegetable patty with avocado, fresh salad and herb sauce in a toasted bun.',
    ingredients:
      'Vegetable patty, burger bun, avocado, lettuce, tomato, cucumber, red onion, herb sauce.',
    image: require('../assets/win-beast-giraffe-veggie-burger.png'),
  },
  {
    id: 'shake',
    name: 'Panda Cookie Shake',
    category: categories[2],
    price: 6.9,
    minutes: 7,
    time: '5–7',
    description:
      'Thick vanilla milkshake blended with chocolate cookies and topped with whipped cream.',
    ingredients:
      'Vanilla ice cream, milk, chocolate cookies, whipped cream, chocolate sauce.',
    image: require('../assets/win-beast-panda-cookie-shake.png'),
  },
  {
    id: 'berry',
    name: 'Flamingo Berry Cup',
    category: categories[2],
    price: 6.5,
    minutes: 6,
    time: '4–6',
    description:
      'Fresh strawberries, blueberries and raspberries layered with creamy yogurt and crunchy granola.',
    ingredients:
      'Strawberries, blueberries, raspberries, yogurt, granola, honey.',
    image: require('../assets/win-beast-flamingo-berry-cup.png'),
  },
  {
    id: 'waffle',
    name: 'Monkey Banana Waffle',
    category: categories[2],
    price: 7.9,
    minutes: 10,
    time: '8–10',
    description:
      'Warm Belgian waffle topped with banana slices, chocolate sauce and vanilla ice cream.',
    ingredients:
      'Waffle batter, banana, vanilla ice cream, chocolate sauce, powdered sugar.',
    image: require('../assets/win-beast-monkey-banana-waffle.png'),
  },
  {
    id: 'donuts',
    name: 'Tiger Caramel Donuts',
    category: categories[2],
    price: 6.2,
    minutes: 9,
    time: '7–9',
    description:
      'Mini warm donuts covered with cinnamon sugar and served with caramel dipping sauce.',
    ingredients: 'Flour, milk, eggs, butter, sugar, cinnamon, caramel sauce.',
    image: require('../assets/win-beast-tiger-caramel-donuts.png'),
  },
  {
    id: 'sundae',
    name: 'Tropical Jungle Sundae',
    category: categories[2],
    price: 7.5,
    minutes: 7,
    time: '5–7',
    description:
      'Vanilla ice cream with mango, pineapple, banana and crunchy coconut topping.',
    ingredients:
      'Vanilla ice cream, mango, pineapple, banana, coconut flakes, fruit sauce.',
    image: require('../assets/win-beast-tropical-jungle-sundae.png'),
  },
];
export type Habitat = {
  id: string;
  name: string;
  emoji: string;
  kind: string;
  x: number;
  y: number;
  image: ImageSourcePropType;
  description: string;
};
export const habitats: Habitat[] = [
  {
    id: 'lion',
    name: 'Lion Territory',
    emoji: '🦁',
    kind: 'Animal',
    x: 77,
    y: 25,
    image: require('../assets/win-beast-lion-territory.png'),
    description:
      'A spacious habitat designed for the zoo’s lions, featuring open grass areas, rocky platforms, shaded resting zones, and elevated observation points. Watch the lions resting, exploring their territory, and interacting with their group while learning about their behavior, diet, communication, and natural habitat.',
  },
  {
    id: 'giraffe',
    name: 'Giraffe Savannah',
    emoji: '🦒',
    kind: 'Animal',
    x: 19,
    y: 13,
    image: require('../assets/win-beast-giraffe-savannah.png'),
    description:
      'A large open area inspired by the African savannah. Observe giraffes walking, feeding, and interacting with their surroundings. Special viewing points and informational displays explain their diet, height, social behavior, and unique adaptations.',
  },
  {
    id: 'elephant',
    name: 'Elephant Valley',
    emoji: '🐘',
    kind: 'Animal',
    x: 18,
    y: 41,
    image: require('../assets/win-beast-elephant-valley.png'),
    description:
      'A spacious habitat with open walking areas, water features, feeding zones, and enrichment structures. Observe elephants’ daily activities and learn how they use their trunks, communicate, form social relationships, and interact with their environment.',
  },
  {
    id: 'penguin',
    name: 'Penguin Bay',
    emoji: '🐧',
    kind: 'Animal',
    x: 30,
    y: 26,
    image: require('../assets/win-beast-penguin-bay.png'),
    description:
      'Rocky areas, pools, underwater viewing windows, and comfortable nesting zones for the penguin colony. Watch penguins swimming, resting near the pool, and interacting while discovering facts about their diet, movement, and social behavior.',
  },
  {
    id: 'monkey',
    name: 'Monkey Jungle',
    emoji: '🐒',
    kind: 'Animal',
    x: 83,
    y: 54,
    image: require('../assets/win-beast-monkey-jungle.png'),
    description:
      'A lively tropical-style habitat filled with climbing structures, ropes, platforms, trees, and enrichment activities. Watch primates climb, play, search for food, and communicate while learning about their intelligence, social structure, and natural behaviors.',
  },
  {
    id: 'reptile',
    name: 'Reptile House',
    emoji: '🦎',
    kind: 'Exhibit',
    x: 82,
    y: 39,
    image: require('../assets/win-beast-reptile-house.png'),
    description:
      'An indoor climate-controlled area dedicated to snakes, lizards, turtles, and other reptiles. Each habitat recreates suitable temperature, vegetation, rocks, and humidity. Explore multiple exhibits and discover how reptiles survive in very different environments.',
  },
  {
    id: 'bird',
    name: 'Tropical Bird Garden',
    emoji: '🦜',
    kind: 'Animal',
    x: 49,
    y: 37,
    image: require('../assets/win-beast-tropical-bird-garden.png'),
    description:
      'A colorful garden filled with tropical vegetation and dedicated habitats for parrots and other exotic birds. Observe bright feathers, flight patterns, feeding habits, and communication in an immersive environment inspired by tropical forests.',
  },
  {
    id: 'food',
    name: 'Wild Food Court',
    emoji: '🍔',
    kind: 'Food',
    x: 24,
    y: 56,
    image: require('../assets/win-beast-wild-food-court.png'),
    description:
      'Take a break and choose food from Jungle Bites, Safari Meals, and Wild Treats. The zoo’s main dining area includes comfortable seating, mobile order pickup points, shaded rest areas, and information screens displaying current orders and estimated preparation times.',
  },
  {
    id: 'play',
    name: 'Adventure Playground',
    emoji: '🛝',
    kind: 'Facility',
    x: 77,
    y: 13,
    image: require('../assets/win-beast-adventure-playground.png'),
    description:
      'A family recreation area with animal-themed climbing structures, slides, interactive activities, comfortable seating for parents, and shaded rest zones. A convenient place for families to relax between visits to animal habitats.',
  },
  {
    id: 'arena',
    name: 'Zoo Events Arena',
    emoji: '🎪',
    kind: 'Events',
    x: 48,
    y: 10,
    image: require('../assets/win-beast-zoo-events-arena.png'),
    description:
      'The main location for scheduled zoo events, keeper presentations, educational programs, and special animal-focused activities. A visitor seating area and presentation zone host selected experiences. Information displays provide upcoming sessions and start times.',
  },
];
export type ZooEvent = {
  id: string;
  name: string;
  habitat: string;
  image: ImageSourcePropType;
  description: string;
  startsAt: string | null;
  capacity: number | null;
};
export const events: ZooEvent[] = [
  {
    id: 'lion-feed',
    name: 'Lion Feeding Experience',
    habitat: 'lion',
    image: require('../assets/win-beast-lion-feeding-experience.png'),
    description:
      'Experience one of the most exciting moments of the day as the zoo’s lions gather for their scheduled feeding session. Watch from a safe viewing area while professional keepers explain how meals are prepared, what lions eat, and how their diet changes with age and activity. Discover hunting behavior, communication, social structure, and daily routines that keep lions active and healthy.',
    startsAt: null,
    capacity: null,
  },
  {
    id: 'giraffe-breakfast',
    name: 'Giraffe Breakfast Time',
    habitat: 'giraffe',
    image: require('../assets/win-beast-giraffe-breakfast-time.png'),
    description:
      'Watch the zoo’s giraffes enjoy their first meal of the day. Keepers introduce the giraffes and explain their favorite foods, feeding habits, social behavior, and unique physical characteristics. Observe how their long tongues collect leaves and discover how their extraordinary height helps them survive.',
    startsAt: null,
    capacity: null,
  },
  {
    id: 'penguin-talk',
    name: 'Penguin Keeper Talk',
    habitat: 'penguin',
    image: require('../assets/win-beast-penguin-keeper-talk.png'),
    description:
      'Meet the team responsible for caring for the penguin colony. Watch penguins swim, interact, and enjoy their meal while keepers explain communication and colony life. Discover how the habitat is maintained, what penguins eat, how they care for their young, and their adaptations for moving through water.',
    startsAt: null,
    capacity: null,
  },
  {
    id: 'elephant-care',
    name: 'Elephant Care Session',
    habitat: 'elephant',
    image: require('../assets/win-beast-elephant-care-session.png'),
    description:
      'Discover what goes into caring for some of the largest animals at the zoo. Keepers demonstrate feeding, enrichment, exercise, and voluntary care sessions. Learn how elephants communicate, how family groups function, why trunks are versatile, and how activities encourage natural behaviors.',
    startsAt: null,
    capacity: null,
  },
  {
    id: 'reptile-show',
    name: 'Reptile Discovery Show',
    habitat: 'reptile',
    image: require('../assets/win-beast-reptile-discovery-show.png'),
    description:
      'Enter the fascinating world of snakes, lizards, turtles, and other reptiles. Explore how they regulate temperature, find food, protect themselves, and adapt to their environments. Learn how keepers maintain appropriate temperatures, humidity levels, feeding schedules, and habitats.',
    startsAt: null,
    capacity: null,
  },
  {
    id: 'bird-encounter',
    name: 'Tropical Bird Encounter',
    habitat: 'bird',
    image: require('../assets/win-beast-tropical-bird-encounter.png'),
    description:
      'Observe parrots and exotic species while learning about feathers, diets, calls, flight abilities, and social behavior. Zoo staff explain how birds communicate, why species have distinctive colors, and how enrichment encourages exploring, foraging, climbing, and natural interaction.',
    startsAt: null,
    capacity: null,
  },
  {
    id: 'monkey-hour',
    name: 'Monkey Enrichment Hour',
    habitat: 'monkey',
    image: require('../assets/win-beast-monkey-enrichment-hour.png'),
    description:
      'Watch primates investigate puzzles, hidden food, climbing structures, and other enrichment activities. Keepers explain why challenges encourage natural problem-solving abilities. Observe social interactions while learning about communication, intelligence, feeding habits, family relationships, and individual personalities.',
    startsAt: null,
    capacity: null,
  },
  {
    id: 'cats-walk',
    name: 'Big Cats Evening Walk',
    habitat: 'lion',
    image: require('../assets/win-beast-big-cats-evening-walk.png'),
    description:
      'Visit the big cats during quieter evening hours when many become more active. A guided experience introduces lions, tigers, and other large felines and explains their senses, movement, territories, sleeping patterns, and hunting adaptations. Discover daily routines and differences between species.',
    startsAt: null,
    capacity: null,
  },
  {
    id: 'junior-day',
    name: 'Zoo Junior Keeper Day',
    habitat: 'arena',
    image: require('../assets/win-beast-zoo-junior-keeper-day.png'),
    description:
      'An interactive educational event for younger visitors. Discover preparing animal diets, maintaining habitats, observing behavior, and creating simple enrichment activities. Zoo staff guide age-appropriate activities and explain observation, cleanliness, nutrition, safety, and respect for animals.',
    startsAt: null,
    capacity: null,
  },
  {
    id: 'night-safari',
    name: 'Night Safari Adventure',
    habitat: 'arena',
    image: require('../assets/win-beast-night-safari-adventure.png'),
    description:
      'Explore a different side of the zoo on a guided evening route through selected habitats. Discover nocturnal behavior, night vision, hearing, communication, and low-light adaptations. Atmospheric lighting and quieter surroundings reveal how animal activity changes after sunset.',
    startsAt: null,
    capacity: null,
  },
];
export const questions = [
  {
    question: 'What animals can I see at the zoo?',
    emoji: '🦁',
    answers: [
      'You can discover many different animals throughout the zoo, including lions, giraffes, elephants, penguins, monkeys, reptiles, and colorful tropical birds. Open the interactive map to find the habitat of each animal.',
      'The zoo features animals from different environments around the world. Explore large mammals in the savannah areas, visit playful primates in Monkey Jungle, discover reptiles indoors, or watch penguins swimming at Penguin Bay.',
      'There is plenty to explore during your visit. Popular locations include Lion Territory, Giraffe Savannah, Elephant Valley, Penguin Bay, Monkey Jungle, Reptile House, and Tropical Bird Garden.',
    ],
  },
  {
    question: 'What events are happening today?',
    emoji: '🎪',
    answers: [
      "The zoo regularly organizes animal feeding sessions, keeper talks, educational presentations, and special visitor experiences. Open the Events section to see today's schedule, available places, and starting times.",
      'You can join activities such as Lion Feeding Experience, Penguin Keeper Talk, Elephant Care Session, or Monkey Enrichment Hour. Event availability can change during the day, so check the Events section for current information.',
      'There are different activities scheduled throughout the day. Visit the Events section to explore upcoming experiences, check how many places remain, and reserve spots for yourself and your group.',
    ],
  },
  {
    question: 'Where can I get food?',
    emoji: '🍔',
    answers: [
      'Visit the Wild Food Court for meals, snacks, desserts, and refreshing treats. You can browse the complete menu and place your order directly through the Food Court section of the app.',
      'The zoo’s main dining area is the Wild Food Court. The menu is divided into Jungle Bites for quick snacks, Safari Meals for larger dishes, and Wild Treats for desserts and sweet options.',
      'You can order food without interrupting your zoo adventure. Choose your dishes in the Food Court section, place an order, track its preparation status, and collect it when the app shows that it is ready.',
    ],
  },
  {
    question: 'How can I find an animal?',
    emoji: '🗺️',
    answers: [
      'Open the Interactive Zoo Map and select the animal habitat you want to visit. Each location includes a photo, description, and information about what you can discover there.',
      'Use the Zoo Map to find locations such as Lion Territory, Elephant Valley, Giraffe Savannah, or Penguin Bay. Select a location to learn more about it and access the directions option.',
      'Finding animals is easy with the interactive map. Tap a habitat marker to view its details, then select Get Directions to open Apple Maps and continue with navigation.',
    ],
  },
  {
    question: 'Where can I find my tickets?',
    emoji: '🎟️',
    answers: [
      'Your registered zoo tickets are available in the Profile section. Each ticket contains its information and a QR code that can be opened in a larger format for scanning at the entrance.',
      'Open Profile and go to your ticket area. You can view each selected ticket individually and enlarge its QR code when you need to present it at the zoo entrance.',
      'All tickets selected through the app are stored in your Profile. If you skipped ticket selection earlier, you can use the Choose Tickets button there to return to the ticket selection screen.',
    ],
  },
];
