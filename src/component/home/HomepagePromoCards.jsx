import React from 'react'
import { PromoCard } from './PromoBanners.jsx'

export default function HomepagePromoCards({ cards = [] }) {
  if (!cards.length) return null

  return (
    <section className="container mt-5 velmora-home-promo-cards">
      <div className="grid gap-3 md:grid-cols-2">
        {cards.map((card) => (
          <PromoCard key={card.id} card={card} wide={cards.length === 1} />
        ))}
      </div>
    </section>
  )
}
