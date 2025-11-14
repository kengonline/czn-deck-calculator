import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import SaveDataDeck from '../components/SaveDataDeck';

export default function CalculatorPage() {
  // Represent three decks with identical structure; each deck keeps its own counts and name
  const makeDeck = (name: string) => ({
    name,
    saveDataTier: 1,
    divineCharacterCards: 0,
    neutralCards: 0,
    upgradedNeutralCards: 0,
    divineNeutralCards: 0,
    monsterCards: 0,
    upgradedMonsterCards: 0,
    divineMonsterCards: 0,
    forbiddenCards: 0,
    removeActions: [] as { isSpecial: boolean }[],
    copyActions: [] as { cardType: string }[],
    conversions: 0,
  });

  const [decks, setDecks] = useState(() => [makeDeck('Deck 1'), makeDeck('Deck 2'), makeDeck('Deck 3')]);

  // Remove steps: 0, 10, 30, 50, 70 (max)
  const removeSteps = [0, 10, 30, 50, 70];

  // Copy steps: 0, 10, 30, 50, 70 (max)
  const copySteps = [0, 10, 30, 50, 70];

  const updateDeck = (index: number, patch: Partial<typeof decks[number]>) => {
    setDecks((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  };

  const setRemoveCount = (deckIndex: number, isSpecial: boolean, count: number) => {
    setDecks((prev) => prev.map((d, i) => {
      if (i !== deckIndex) return d;
      const other = d.removeActions.filter(a => a.isSpecial !== isSpecial);
      const added = Array(Math.max(0, count)).fill({ isSpecial });
      return { ...d, removeActions: [...other, ...added] };
    }));
  };

  const setCopyCount = (deckIndex: number, cardType: string, count: number) => {
    setDecks((prev) => prev.map((d, i) => {
      if (i !== deckIndex) return d;
      const others = d.copyActions.filter(a => a.cardType !== cardType);
      const added = Array(Math.max(0, count)).fill({ cardType });
      return { ...d, copyActions: [...others, ...added] };
    }));
  };

  const computeForDeck = (deck: typeof decks[number]) => {
    const maxScore = (deck.saveDataTier - 1) * 10 + 30;

    // Character cards
    const characterTotal = deck.divineCharacterCards * 20;

    // Neutral cards
    const neutralBase = deck.neutralCards * 20;
    const neutralUpgraded = deck.upgradedNeutralCards * 30;
    const neutralDivine = deck.divineNeutralCards * 40; // 20 base + 20 divine
    const neutralTotal = neutralBase + neutralUpgraded + neutralDivine;

    // Monster cards
    const monsterBase = deck.monsterCards * 80;
    const monsterUpgraded = deck.upgradedMonsterCards * 90;
    const monsterDivine = deck.divineMonsterCards * 100; // 80 base + 20 divine
    const monsterTotal = monsterBase + monsterUpgraded + monsterDivine;

    // Forbidden cards
    const forbiddenTotal = deck.forbiddenCards * 20;

    // Remove card points
    let removeTotal = 0;
    deck.removeActions.forEach((action, index) => {
      const stepIndex = Math.min(index, removeSteps.length - 1);
      const basePoints = removeSteps[stepIndex];
      const extraPoints = action.isSpecial ? 20 : 0;
      removeTotal += basePoints + extraPoints;
    });

    // Copy card points (step-based only, no card-type multipliers)
    let copyTotal = 0;
    deck.copyActions.forEach((_, index) => {
      const stepIndex = Math.min(index, copySteps.length - 1);
      copyTotal += copySteps[stepIndex];
    });

    // Conversion points
    const conversionTotal = deck.conversions * 10;

    const totalScore = characterTotal + neutralTotal + monsterTotal + forbiddenTotal + removeTotal + copyTotal + conversionTotal;

    // Calculate percentage and danger level
    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    let dangerLevel = 'safe';
    let dangerColor = 'text-green-300';
    let dangerBg = 'from-green-500/20 to-emerald-500/20';
    let dangerBorder = 'border-green-400/50';

    if (percentage >= 90) {
      dangerLevel = 'critical';
      dangerColor = 'text-red-300';
      dangerBg = 'from-red-500/20 to-orange-500/20';
      dangerBorder = 'border-red-400/50';
    } else if (percentage >= 70) {
      dangerLevel = 'warning';
      dangerColor = 'text-yellow-300';
      dangerBg = 'from-yellow-500/20 to-orange-500/20';
      dangerBorder = 'border-yellow-400/50';
    } else if (percentage >= 50) {
      dangerLevel = 'caution';
      dangerColor = 'text-blue-300';
      dangerBg = 'from-blue-500/20 to-cyan-500/20';
      dangerBorder = 'border-blue-400/50';
    }

    return {
      maxScore,
      neutralTotal,
      monsterTotal,
      forbiddenTotal,
      removeTotal,
      copyTotal,
      conversionTotal,
      totalScore,
      percentage,
      dangerLevel,
      dangerColor,
      dangerBg,
      dangerBorder,
      breakdown: {
        neutralBase,
        neutralUpgraded,
        neutralDivine,
        monsterBase,
        monsterUpgraded,
        monsterDivine
      }
    };
  };

  const calculations = useMemo(() => decks.map(d => computeForDeck(d)), [decks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-purple-300" />
            <h1 className="text-3xl font-bold text-white">Save the Deck Score Calculator</h1>
          </div>

          <div className="space-y-6">
            {decks.map((deck: any, i: number) => (
              <div key={i} className="w-full">
                <SaveDataDeck deck={deck} index={i} updateDeck={updateDeck} setRemoveCount={setRemoveCount} setCopyCount={setCopyCount} calculation={calculations[i]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}