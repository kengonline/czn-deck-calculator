import React, { useState } from 'react';

type Deck = {
  name: string;
  saveDataTier: number;
  divineCharacterCards: number;
  neutralCards: number;
  upgradedNeutralCards: number;
  divineNeutralCards: number;
  monsterCards: number;
  upgradedMonsterCards: number;
  divineMonsterCards: number;
  forbiddenCards: number;
  removeActions: { isSpecial: boolean }[];
  copyActions: { cardType: string }[];
  conversions: number;
};

type Props = {
  deck: Deck;
  index: number;
  updateDeck: (i: number, patch: Partial<Deck>) => void;
  setRemoveCount: (deckIndex: number, isSpecial: boolean, count: number) => void;
  setCopyCount: (deckIndex: number, cardType: string, count: number) => void;
  calculation?: any;
};

export default function SaveDataDeck({ deck, index, updateDeck, setRemoveCount, setCopyCount, calculation }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setOpen(o => !o)}
          className="text-white/90 hover:text-white transition-colors w-9 h-9 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 flex-shrink-0"
          style={{ cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}
          aria-expanded={open}
          aria-label={open ? 'Collapse deck' : 'Expand deck'}
        >
          {open ? '▾' : '▸'}
        </button>

        <input
          className="text-lg font-semibold bg-white/5 px-2 py-0.5 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/30 border border-transparent hover:border-white/10 min-w-0 truncate"
          value={deck.name}
          onChange={(e) => updateDeck(index, { name: e.target.value })}
          style={{ cursor: 'text' }}
        />
      </div>

      <div className="md:flex md:gap-6">
        <div className="md:flex-1">
          <label className="block mb-3">
        <span className="text-white font-medium">Save Data Tier (1-14)</span>
        <input
          type="number"
          min={1}
          max={14}
          value={deck.saveDataTier}
          onChange={(e) => updateDeck(index, { saveDataTier: Math.max(1, Math.min(14, parseInt(e.target.value) || 1)) })}
          className="mt-2 w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>
        {open && (
        <div className="space-y-4">
        <div>
          <h3 className="text-sm text-blue-300 mb-2">Character Cards</h3>
          <label className="block">
            <span className="text-white text-sm">Divine Upgraded (20 pts each)</span>
            <input
              type="number"
              min={0}
              value={deck.divineCharacterCards}
              onChange={(e) => updateDeck(index, { divineCharacterCards: Math.max(0, parseInt(e.target.value) || 0) })}
              className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <div>
          <h3 className="text-sm text-blue-300 mb-2">Neutral Cards</h3>
          <div className="space-y-2">
            <label className="block">
              <span className="text-white text-sm">Base (20 pts each)</span>
              <input type="number" min={0} value={deck.neutralCards} onChange={(e) => updateDeck(index, { neutralCards: Math.max(0, parseInt(e.target.value) || 0) })} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </label>
            <label className="block">
              <span className="text-white text-sm">Upgraded (30 pts each)</span>
              <input type="number" min={0} value={deck.upgradedNeutralCards} onChange={(e) => updateDeck(index, { upgradedNeutralCards: Math.max(0, parseInt(e.target.value) || 0) })} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </label>
            <label className="block">
              <span className="text-white text-sm">Divine Upgraded (40 pts each)</span>
              <input type="number" min={0} value={deck.divineNeutralCards} onChange={(e) => updateDeck(index, { divineNeutralCards: Math.max(0, parseInt(e.target.value) || 0) })} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-orange-300 mb-2">Monster Cards</h3>
          <div className="space-y-2">
            <label className="block">
              <span className="text-white text-sm">Base (80 pts each)</span>
              <input type="number" min={0} value={deck.monsterCards} onChange={(e) => updateDeck(index, { monsterCards: Math.max(0, parseInt(e.target.value) || 0) })} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </label>
            <label className="block">
              <span className="text-white text-sm">Upgraded (90 pts each)</span>
              <input type="number" min={0} value={deck.upgradedMonsterCards} onChange={(e) => updateDeck(index, { upgradedMonsterCards: Math.max(0, parseInt(e.target.value) || 0) })} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </label>
            <label className="block">
              <span className="text-white text-sm">Divine Upgraded (100 pts each)</span>
              <input type="number" min={0} value={deck.divineMonsterCards} onChange={(e) => updateDeck(index, { divineMonsterCards: Math.max(0, parseInt(e.target.value) || 0) })} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-red-300 mb-2">Other Cards</h3>
          <label className="block">
            <span className="text-white text-sm">Forbidden Cards (20 pts each)</span>
            <input type="number" min={0} value={deck.forbiddenCards} onChange={(e) => updateDeck(index, { forbiddenCards: Math.max(0, parseInt(e.target.value) || 0) })} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
          </label>
        </div>

        <div>
          <h3 className="text-sm text-green-300 mb-2">Remove Cards</h3>
          <div className="text-xs text-gray-300 mb-2">Steps: 0, 10, 30, 50, 70 pts (+20 if starter/divine)</div>
          <label className="block">
            <span className="text-white text-sm">Normal Removes</span>
            <input type="number" min={0} value={deck.removeActions.filter(a => !a.isSpecial).length} onChange={(e) => setRemoveCount(index, false, Math.max(0, parseInt(e.target.value) || 0))} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </label>
          <label className="block mt-2">
            <span className="text-white text-sm">Basic/Divine Removes</span>
            <input type="number" min={0} value={deck.removeActions.filter(a => a.isSpecial).length} onChange={(e) => setRemoveCount(index, true, Math.max(0, parseInt(e.target.value) || 0))} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          </label>
        </div>

        <div>
          <h3 className="text-sm text-cyan-300 mb-2">Copy Cards</h3>
          <div className="text-xs text-gray-300 mb-2">Steps: 0, 10, 30, 50, 70 pts</div>
          <label className="block">
            <span className="text-white text-sm">Number of Copies</span>
            <input type="number" min={0} value={deck.copyActions.length} onChange={(e) => updateDeck(index, { copyActions: Array(Math.max(0, parseInt(e.target.value) || 0)).fill({ cardType: 'copy' }) })} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </label>
        </div>

        <div>
          <h3 className="text-sm text-pink-300 mb-2">Card Conversions</h3>
          <div className="text-xs text-gray-300 mb-2">10 pts each (original card points remain)</div>
          <label className="block">
            <span className="text-white text-sm">Number of Conversions</span>
            <input type="number" min={0} value={deck.conversions} onChange={(e) => updateDeck(index, { conversions: Math.max(0, parseInt(e.target.value) || 0) })} className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
          </label>
        </div>
        </div>
        )}
        </div>

        {/* Breakdown column */}
        <div className="md:w-80 mt-4 md:mt-0">
          {calculation ? (
            open ? (
              <div className={`bg-gradient-to-br ${calculation.dangerBg} p-4 rounded-lg border ${calculation.dangerBorder}`}>
                <div className="text-sm text-purple-200 mb-2">Maximum Possible Score</div>
                <div className="text-2xl font-bold text-white">{calculation.maxScore}</div>

                <div className="mt-4 text-sm text-purple-200 mb-2">Your Total Score</div>
                <div className={`text-xl font-bold ${calculation.dangerColor}`}>{calculation.totalScore}</div>

                <div className="mt-3 bg-gray-800/50 rounded-full h-3 overflow-hidden">
                  <div className={`h-full ${calculation.dangerLevel === 'critical' ? 'bg-red-500' : calculation.dangerLevel === 'warning' ? 'bg-yellow-500' : calculation.dangerLevel === 'caution' ? 'bg-blue-500' : 'bg-green-500'}`} style={{ width: `${Math.min(calculation.percentage, 100)}%` }} />
                </div>

                <div className="mt-3 text-sm text-gray-300">
                  <div>{calculation.percentage.toFixed(1)}% of maximum</div>
                </div>

                <div className="h-px bg-white/10 my-3" />

                <div className="text-sm text-white space-y-1">
                  <div className="flex justify-between"><span>Neutral:</span><span>{calculation.neutralTotal}</span></div>
                  <div className="flex justify-between"><span>Monster:</span><span>{calculation.monsterTotal}</span></div>
                  <div className="flex justify-between"><span>Forbidden:</span><span>{calculation.forbiddenTotal}</span></div>
                  <div className="flex justify-between"><span>Remove:</span><span>{calculation.removeTotal}</span></div>
                  <div className="flex justify-between"><span>Copy:</span><span>{calculation.copyTotal}</span></div>
                  <div className="flex justify-between"><span>Conversions:</span><span>{calculation.conversionTotal}</span></div>
                </div>
              </div>
            ) : (
              <div className={`bg-gradient-to-br ${calculation.dangerBg} p-3 rounded-lg border-2 ${calculation.dangerBorder}`}>
                <div className="flex justify-between items-baseline">
                  <div className="text-sm text-purple-200">Maximum</div>
                  <div className="text-sm font-semibold text-white">{calculation.maxScore}</div>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <div className="text-sm text-purple-200">Total</div>
                  <div className={`text-sm font-semibold ${calculation.dangerColor}`}>{calculation.totalScore}</div>
                </div>

                <div className="mt-2 bg-gray-800/50 rounded-full h-2 overflow-hidden">
                  <div className={`${calculation.dangerLevel === 'critical' ? 'bg-red-500' : calculation.dangerLevel === 'warning' ? 'bg-yellow-500' : calculation.dangerLevel === 'caution' ? 'bg-blue-500' : 'bg-green-500'} h-full transition-all`} style={{ width: `${Math.min(calculation.percentage, 100)}%` }} />
                </div>
              </div>
            )
          ) : (
            <div className="text-sm text-gray-300">—</div>
          )}
        </div>
      </div>
    </div>
  );
}
