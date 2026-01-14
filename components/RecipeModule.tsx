
import React, { useState } from 'react';
import { aiService } from '../services/geminiService';
import { InventoryItem, Recipe } from '../types';

interface Props {
  inventory: InventoryItem[];
}

const RecipeModule: React.FC<Props> = ({ inventory }) => {
  const [dietaryGoal, setDietaryGoal] = useState('High protein, low carb');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    const results = await aiService.getRAGRecommendations(inventory, dietaryGoal);
    setRecipes(results);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Constraint & Goal Tuning</label>
            <input 
              type="text" 
              value={dietaryGoal}
              onChange={(e) => setDietaryGoal(e.target.value)}
              placeholder="e.g. Keto, Vegan, or specific ingredients to use..."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
            />
          </div>
          <button 
            onClick={fetchRecommendations}
            disabled={loading || inventory.length === 0}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center gap-3 disabled:opacity-50"
          >
            {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-wand-magic-sparkles"></i>}
            Run RAG Pipeline
          </button>
        </div>
        {inventory.length === 0 && (
          <p className="text-rose-500 text-xs mt-3 italic">Notice: Inventory is empty. Add items to enable context-aware retrieval.</p>
        )}
      </div>

      {/* Results */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
              <div className="h-4 bg-emerald-500" style={{ opacity: recipe.sustainabilityScore / 100 }}></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">{recipe.title}</h4>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-black">
                    {recipe.sustainabilityScore}% Score
                  </span>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Context Matched</p>
                    <div className="flex flex-wrap gap-1.5">
                      {recipe.ingredientsUsed.map((ing, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs border border-slate-200">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {recipe.missingIngredients.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Missing Gaps</p>
                      <div className="flex flex-wrap gap-1.5">
                        {recipe.missingIngredients.map((ing, i) => (
                          <span key={i} className="bg-rose-50 text-rose-600 px-2 py-1 rounded text-xs border border-rose-100">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600 line-clamp-3">
                      {recipe.instructions[0]}...
                    </p>
                  </div>
                </div>

                <button className="mt-6 w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-emerald-500 hover:text-white transition-all group-hover:scale-[1.02]">
                  View Full Workflow
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !loading && (
        <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <i className="fas fa-brain text-2xl"></i>
          </div>
          <h4 className="text-slate-400 font-medium">Neural Planner Idle</h4>
          <p className="text-slate-300 text-sm">Waiting for inventory context to generate sustainability-optimized meal plans.</p>
        </div>
      )}
    </div>
  );
};

export default RecipeModule;
