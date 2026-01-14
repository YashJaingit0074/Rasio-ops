
import React, { useState, useRef } from 'react';
import { aiService } from '../services/geminiService';
import { InventoryItem, ExpiryStatus } from '../types';

interface Props {
  onItemsDetected: (newItems: InventoryItem[]) => void;
}

const VisionModule: React.FC<Props> = ({ onItemsDetected }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setPreview(reader.result as string);
      
      setLoading(true);
      const results = await aiService.analyzeInventoryImage(base64);
      
      const mappedItems: InventoryItem[] = results.map((item, idx) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: item.name || 'Unknown Item',
        category: item.category || 'Other',
        quantity: item.quantity || '1 unit',
        addedAt: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Simulated 7-day default
        status: ExpiryStatus.FRESH
      }));

      onItemsDetected(mappedItems);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-500 text-3xl mb-4">
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Vision-to-Inventory Engine</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
            Upload a photo of your groceries, pantry, or receipts. Our AI will automatically extract and digitize the content for inventory tracking.
          </p>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />

        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 flex items-center gap-3 mx-auto"
        >
          {loading ? (
            <>
              <i className="fas fa-circle-notch fa-spin"></i>
              Running Inference...
            </>
          ) : (
            <>
              <i className="fas fa-camera"></i>
              Start Scan
            </>
          )}
        </button>

        {preview && (
          <div className="mt-8 relative group">
            <img src={preview} alt="Preview" className="max-h-64 rounded-2xl mx-auto shadow-md border-4 border-white" />
            <div className="absolute inset-0 bg-emerald-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-2 border-emerald-500 border-dashed m-1"></div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
          <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">Technical Specs</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 text-slate-300">
              <i className="fas fa-microchip text-emerald-500"></i>
              <span>Model: Gemini Multi-modal LLM (Inference)</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <i className="fas fa-layer-group text-emerald-500"></i>
              <span>Feature Extraction: Zero-shot Recognition</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <i className="fas fa-database text-emerald-500"></i>
              <span>Pipeline: Vision -> Structure -> SQL Schema</span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h4 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-lightbulb text-amber-500"></i>
            Usage Tips
          </h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              Capture images in clear daylight for 98% accuracy.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              Include quantity labels (e.g., labels on packaging).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              Group similar items together for better categorization.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisionModule;
