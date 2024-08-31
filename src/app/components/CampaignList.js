// components/CampaignList.js
import React from 'react';
import Card from './Card'; 

export default function CampaignList() {
  // Sample data for demonstration
  const cards = [
    {
      id: 1,
      image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
      title: 'Campaign 1',
      description: 'Details about Campaign 1',
      fundLink: 'https://example.com/fund1',
      statsLink: 'https://example.com/stats1',
    },
    {
      id: 2,
      image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
      title: 'Campaign 2',
      description: 'Details about Campaign 2',
      fundLink: 'https://example.com/fund2',
      statsLink: 'https://example.com/stats2',
    },
    {
        id: 1,
        image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
        title: 'Campaign 1',
        description: 'Details about Campaign 1',
        fundLink: 'https://example.com/fund1',
        statsLink: 'https://example.com/stats1',
      },
      {
        id: 2,
        image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
        title: 'Campaign 2',
        description: 'Details about Campaign 2',
        fundLink: 'https://example.com/fund2',
        statsLink: 'https://example.com/stats2',
      },
      {
        id: 1,
        image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
        title: 'Campaign 1',
        description: 'Details about Campaign 1',
        fundLink: 'https://example.com/fund1',
        statsLink: 'https://example.com/stats1',
      },
      {
        id: 2,
        image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
        title: 'Campaign 2',
        description: 'Details about Campaign 2',
        fundLink: 'https://example.com/fund2',
        statsLink: 'https://example.com/stats2',
      },
    // Add more items as needed
  ];

  return (
    <div className="h-[80vh] scroll-smooth  overflow-y-auto p-4">
       {cards.map(card => (
        <Card
          key={card.id}
          image={card.image}
          title={card.title}
          description={card.description}
          fundLink={card.fundLink}
          statsLink={card.statsLink}
        />
      ))}
    </div>

      

  );
}
