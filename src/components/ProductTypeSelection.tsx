import React from 'react';
import { ChevronRight, PillIcon, TestTubes, MilkIcon } from 'lucide-react';

type ProductType = 'semi-finished' | 'finished';
type ContainerType = 'ampoule' | 'vial';
type MaterialType = 'plastic' | 'glass';

interface ProductTypeSelectionProps {
  onSelect: (selection: {
    productType: ProductType;
    containerType: ContainerType;
    materialType?: MaterialType;
  }) => void;
}

export function ProductTypeSelection({ onSelect }: ProductTypeSelectionProps) {
  const [selectedType, setSelectedType] = React.useState<ProductType | null>(null);
  
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Produto Semi-Acabado */}
        <button
          onClick={() => setSelectedType('semi-finished')}
          className={`p-6 rounded-lg border-2 transition-all ${
            selectedType === 'semi-finished'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-4">
            <TestTubes className="w-8 h-8 text-indigo-600" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">Produto Semi-Acabado</h3>
              <p className="text-sm text-gray-600">Inspeções AQL com amostragem Normal Nível II</p>
            </div>
          </div>
        </button>

        {/* Produto Acabado */}
        <button
          onClick={() => setSelectedType('finished')}
          className={`p-6 rounded-lg border-2 transition-all ${
            selectedType === 'finished'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-4">
            <PillIcon className="w-8 h-8 text-indigo-600" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">Produto Acabado</h3>
              <p className="text-sm text-gray-600">Inspeções AQL e Farmacoteca</p>
            </div>
          </div>
        </button>
      </div>

      {/* Opções para Produto Semi-Acabado */}
      {selectedType === 'semi-finished' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Selecione o tipo de recipiente:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <button
              onClick={() => onSelect({ productType: 'semi-finished', containerType: 'ampoule' })}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <MilkIcon className="w-6 h-6 text-indigo-600" />
                <span className="font-medium">Ampolas</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button
              onClick={() => onSelect({ productType: 'semi-finished', containerType: 'vial' })}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <PillIcon className="w-6 h-6 text-indigo-600" />
                <span className="font-medium">Frascos</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* Opções para Produto Acabado */}
      {selectedType === 'finished' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Selecione o tipo de recipiente e material:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Ampolas PE */}
            <button
              onClick={() => onSelect({ 
                productType: 'finished', 
                containerType: 'ampoule',
                materialType: 'plastic'
              })}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <MilkIcon className="w-6 h-6 text-indigo-600" />
                <div className="text-left">
                  <span className="font-medium block">Ampolas PE</span>
                  <span className="text-sm text-gray-600">Nível II Normal</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Ampolas VD */}
            <button
              onClick={() => onSelect({ 
                productType: 'finished', 
                containerType: 'ampoule',
                materialType: 'glass'
              })}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <MilkIcon className="w-6 h-6 text-indigo-600" />
                <div className="text-left">
                  <span className="font-medium block">Ampolas VD</span>
                  <span className="text-sm text-gray-600">Especial S-4</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Frascos PE */}
            <button
              onClick={() => onSelect({ 
                productType: 'finished', 
                containerType: 'vial',
                materialType: 'plastic'
              })}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <PillIcon className="w-6 h-6 text-indigo-600" />
                <div className="text-left">
                  <span className="font-medium block">Frascos PE</span>
                  <span className="text-sm text-gray-600">Nível II Normal/Apertado</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Frascos VD */}
            <button
              onClick={() => onSelect({ 
                productType: 'finished', 
                containerType: 'vial',
                materialType: 'glass'
              })}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <MilkIcon className="w-6 h-6 text-indigo-600" />
                <div className="text-left">
                  <span className="font-medium block">Frascos VD</span>
                  <span className="text-sm text-gray-600">Especial S-4</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}