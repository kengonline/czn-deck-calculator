import React, { useState, useMemo } from 'react';
import { Calculator, Info } from 'lucide-react';

export default function CalculatorPage() {
  const [saveDataTier, setSaveDataTier] = useState(1);
  const [divineCharacterCards, setDivineCharacterCards] = useState(0);
  const [neutralCards, setNeutralCards] = useState(0);
  const [upgradedNeutralCards, setUpgradedNeutralCards] = useState(0);
  const [divineNeutralCards, setDivineNeutralCards] = useState(0);
  const [monsterCards, setMonsterCards] = useState(0);
  const [upgradedMonsterCards, setUpgradedMonsterCards] = useState(0);
  const [divineMonsterCards, setDivineMonsterCards] = useState(0);
  const [forbiddenCards, setForbiddenCards] = useState(0);
  
  // Remove card tracking
  const [removeActions, setRemoveActions] = useState<{ isSpecial: boolean }[]>([]);
  
  // Copy card tracking
  const [copyActions, setCopyActions] = useState<{ cardType: string }[]>([]);
  
  // Card conversion tracking
  const [conversions, setConversions] = useState(0);

  // Remove steps: 0, 10, 30, 50, 70 (max)
  const removeSteps = [0, 10, 30, 50, 70];
  
  // Copy steps: 0, 10, 30, 50, 70 (max)
  const copySteps = [0, 10, 30, 50, 70];

  const calculation = useMemo(() => {
    const maxScore = (saveDataTier - 1) * 10 + 30;
    
    // Character cards
    const characterTotal = divineCharacterCards * 20;
    
    // Neutral cards
    const neutralBase = neutralCards * 20;
    const neutralUpgraded = upgradedNeutralCards * 30;
    const neutralDivine = divineNeutralCards * 40; // 20 base + 20 divine
    const neutralTotal = neutralBase + neutralUpgraded + neutralDivine;
    
    // Monster cards
    const monsterBase = monsterCards * 80;
    const monsterUpgraded = upgradedMonsterCards * 90;
    const monsterDivine = divineMonsterCards * 100; // 80 base + 20 divine
    const monsterTotal = monsterBase + monsterUpgraded + monsterDivine;
    
    // Forbidden cards
    const forbiddenTotal = forbiddenCards * 20;
    
    // Remove card points
    let removeTotal = 0;
    removeActions.forEach((action, index) => {
      const stepIndex = Math.min(index, removeSteps.length - 1);
      const basePoints = removeSteps[stepIndex];
      const extraPoints = action.isSpecial ? 20 : 0;
      removeTotal += basePoints + extraPoints;
    });
    
    // Copy card points
    let copyTotal = 0;
    copyActions.forEach((action, index) => {
      const stepIndex = Math.min(index, copySteps.length - 1);
      const basePoints = copySteps[stepIndex];
      
      let cardPoints = 0;
      if (action.cardType === 'character') cardPoints = 0;
      else if (action.cardType === 'characterDivine') cardPoints = 20;
      else if (action.cardType === 'neutral') cardPoints = 20;
      else if (action.cardType === 'neutralUpgraded') cardPoints = 30;
      else if (action.cardType === 'neutralDivine') cardPoints = 40;
      else if (action.cardType === 'monster') cardPoints = 80;
      else if (action.cardType === 'monsterUpgraded') cardPoints = 90;
      else if (action.cardType === 'monsterDivine') cardPoints = 100;
      
      copyTotal += basePoints + cardPoints;
    });
    
    // Conversion points
    const conversionTotal = conversions * 10;
    
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
  }, [saveDataTier, divineCharacterCards, neutralCards, upgradedNeutralCards, divineNeutralCards, 
      monsterCards, upgradedMonsterCards, divineMonsterCards, forbiddenCards,
      removeActions, copyActions, conversions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-purple-300" />
            <h1 className="text-3xl font-bold text-white">Save the Deck Score Calculator</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-purple-300 mb-4">Save Data</h2>
                <label className="block">
                  <span className="text-white font-medium">Save Data Tier (1-14)</span>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={saveDataTier}
                    onChange={(e) => setSaveDataTier(Math.max(1, Math.min(14, parseInt(e.target.value) || 1)))}
                    className="mt-2 w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </label>
                <div className="mt-3 text-purple-200 text-sm">
                  Maximum Score: {calculation.maxScore}
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-blue-300 mb-4">Character Cards</h2>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-white text-sm">Divine Upgraded (20 pts each)</span>
                    <input
                      type="number"
                      min="0"
                      value={divineCharacterCards}
                      onChange={(e) => setDivineCharacterCards(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-blue-300 mb-4">Neutral Cards</h2>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-white text-sm">Base (20 pts each)</span>
                    <input
                      type="number"
                      min="0"
                      value={neutralCards}
                      onChange={(e) => setNeutralCards(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Upgraded (30 pts each)</span>
                    <input
                      type="number"
                      min="0"
                      value={upgradedNeutralCards}
                      onChange={(e) => setUpgradedNeutralCards(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Divine Upgraded (40 pts each)</span>
                    <input
                      type="number"
                      min="0"
                      value={divineNeutralCards}
                      onChange={(e) => setDivineNeutralCards(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-orange-300 mb-4">Monster Cards</h2>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-white text-sm">Base (80 pts each)</span>
                    <input
                      type="number"
                      min="0"
                      value={monsterCards}
                      onChange={(e) => setMonsterCards(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Upgraded (90 pts each)</span>
                    <input
                      type="number"
                      min="0"
                      value={upgradedMonsterCards}
                      onChange={(e) => setUpgradedMonsterCards(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Divine Upgraded (100 pts each)</span>
                    <input
                      type="number"
                      min="0"
                      value={divineMonsterCards}
                      onChange={(e) => setDivineMonsterCards(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-red-300 mb-4">Other Cards</h2>
                <label className="block">
                  <span className="text-white text-sm">Forbidden Cards (20 pts each)</span>
                  <input
                    type="number"
                    min="0"
                    value={forbiddenCards}
                    onChange={(e) => setForbiddenCards(Math.max(0, parseInt(e.target.value) || 0))}
                    className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </label>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-green-300 mb-4">Remove Cards</h2>
                <div className="text-xs text-gray-300 mb-3">
                  Steps: 0, 10, 30, 50, 70 pts (+20 if starter/divine)
                </div>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-white text-sm">Normal Removes</span>
                    <input
                      type="number"
                      min="0"
                      value={removeActions.filter(a => !a.isSpecial).length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const normalRemoves = Array(count).fill({ isSpecial: false });
                        const specialRemoves = removeActions.filter(a => a.isSpecial);
                        setRemoveActions([...normalRemoves, ...specialRemoves]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Character/Divine Removes</span>
                    <input
                      type="number"
                      min="0"
                      value={removeActions.filter(a => a.isSpecial).length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const normalRemoves = removeActions.filter(a => !a.isSpecial);
                        const specialRemoves = Array(count).fill({ isSpecial: true });
                        setRemoveActions([...normalRemoves, ...specialRemoves]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-cyan-300 mb-4">Copy Cards</h2>
                <div className="text-xs text-gray-300 mb-3">
                  Steps: 0, 10, 30, 50, 70 pts + card value
                </div>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-white text-sm">Character (0 pts)</span>
                    <input
                      type="number"
                      min="0"
                      value={copyActions.filter(a => a.cardType === 'character').length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const others = copyActions.filter(a => a.cardType !== 'character');
                        const newCopies = Array(count).fill({ cardType: 'character' });
                        setCopyActions([...others, ...newCopies]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Character Divine (20 pts)</span>
                    <input
                      type="number"
                      min="0"
                      value={copyActions.filter(a => a.cardType === 'characterDivine').length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const others = copyActions.filter(a => a.cardType !== 'characterDivine');
                        const newCopies = Array(count).fill({ cardType: 'characterDivine' });
                        setCopyActions([...others, ...newCopies]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Neutral (20 pts)</span>
                    <input
                      type="number"
                      min="0"
                      value={copyActions.filter(a => a.cardType === 'neutral').length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const others = copyActions.filter(a => a.cardType !== 'neutral');
                        const newCopies = Array(count).fill({ cardType: 'neutral' });
                        setCopyActions([...others, ...newCopies]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Neutral Upgraded (30 pts)</span>
                    <input
                      type="number"
                      min="0"
                      value={copyActions.filter(a => a.cardType === 'neutralUpgraded').length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const others = copyActions.filter(a => a.cardType !== 'neutralUpgraded');
                        const newCopies = Array(count).fill({ cardType: 'neutralUpgraded' });
                        setCopyActions([...others, ...newCopies]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Neutral Divine (40 pts)</span>
                    <input
                      type="number"
                      min="0"
                      value={copyActions.filter(a => a.cardType === 'neutralDivine').length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const others = copyActions.filter(a => a.cardType !== 'neutralDivine');
                        const newCopies = Array(count).fill({ cardType: 'neutralDivine' });
                        setCopyActions([...others, ...newCopies]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Monster (80 pts)</span>
                    <input
                      type="number"
                      min="0"
                      value={copyActions.filter(a => a.cardType === 'monster').length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const others = copyActions.filter(a => a.cardType !== 'monster');
                        const newCopies = Array(count).fill({ cardType: 'monster' });
                        setCopyActions([...others, ...newCopies]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Monster Upgraded (90 pts)</span>
                    <input
                      type="number"
                      min="0"
                      value={copyActions.filter(a => a.cardType === 'monsterUpgraded').length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const others = copyActions.filter(a => a.cardType !== 'monsterUpgraded');
                        const newCopies = Array(count).fill({ cardType: 'monsterUpgraded' });
                        setCopyActions([...others, ...newCopies]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white text-sm">Monster Divine (100 pts)</span>
                    <input
                      type="number"
                      min="0"
                      value={copyActions.filter(a => a.cardType === 'monsterDivine').length}
                      onChange={(e) => {
                        const count = Math.max(0, parseInt(e.target.value) || 0);
                        const others = copyActions.filter(a => a.cardType !== 'monsterDivine');
                        const newCopies = Array(count).fill({ cardType: 'monsterDivine' });
                        setCopyActions([...others, ...newCopies]);
                      }}
                      className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-pink-300 mb-4">Card Conversions</h2>
                <div className="text-xs text-gray-300 mb-3">
                  10 pts each (original card points remain)
                </div>
                <label className="block">
                  <span className="text-white text-sm">Number of Conversions</span>
                  <input
                    type="number"
                    min="0"
                    value={conversions}
                    onChange={(e) => setConversions(Math.max(0, parseInt(e.target.value) || 0))}
                    className="mt-1 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </label>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className={`bg-gradient-to-br ${calculation.dangerBg} p-6 rounded-xl border-2 ${calculation.dangerBorder} sticky top-6`}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Info className="w-6 h-6" />
                  Score Breakdown
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm text-purple-200 mb-1">Maximum Possible Score</div>
                    <div className="text-3xl font-bold text-white">{calculation.maxScore}</div>
                  </div>

                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm text-purple-200 mb-1">Your Total Score</div>
                    <div className={`text-4xl font-bold ${calculation.dangerColor}`}>{calculation.totalScore}</div>
                    <div className="mt-2 bg-gray-800/50 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          calculation.dangerLevel === 'critical' ? 'bg-red-500' :
                          calculation.dangerLevel === 'warning' ? 'bg-yellow-500' :
                          calculation.dangerLevel === 'caution' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(calculation.percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-300 mt-2 flex justify-between items-center">
                      <span>{calculation.percentage.toFixed(1)}% of maximum</span>
                      {calculation.totalScore >= calculation.maxScore ? (
                        <span className="text-red-300 font-semibold">⚠️ Over limit!</span>
                      ) : (
                        <span>{calculation.maxScore - calculation.totalScore} to max</span>
                      )}
                    </div>
                  </div>

                  <div className="h-px bg-white/20 my-4"></div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white">
                      <span>Neutral Cards:</span>
                      <span className="font-semibold">{calculation.neutralTotal}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Monster Cards:</span>
                      <span className="font-semibold">{calculation.monsterTotal}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Forbidden Cards:</span>
                      <span className="font-semibold">{calculation.forbiddenTotal}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Remove Cards:</span>
                      <span className="font-semibold">{calculation.removeTotal}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Copy Cards:</span>
                      <span className="font-semibold">{calculation.copyTotal}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Conversions:</span>
                      <span className="font-semibold">{calculation.conversionTotal}</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/20 my-4"></div>

                  <div className="text-xs text-gray-300 space-y-1">
                    <div>Remove Actions: {removeActions.length}</div>
                    <div>Copy Actions: {copyActions.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}