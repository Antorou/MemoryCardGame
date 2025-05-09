const frameworks = [
    { framework: 'messi', img: '/img/messi.png' },
    { framework: 'ronaldo', img: '/img/ronaldo.png' },
    { framework: 'neymar', img: '/img/neymar.png' },
    { framework: 'benzema', img: '/img/benzema.png' },
    { framework: 'dembele', img: '/img/dembele.png' },
    { framework: 'zidane', img: '/img/zidane.png' }
  ];
  
  // Duplicate and assign unique IDs
  export const generateCards = () => {
    return [...frameworks, ...frameworks].map((card, index) => ({
      id: index,
      ...card,
      flipped: false
    }));
  };