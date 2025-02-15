import React, { useState } from 'react';
import { Select } from './Select';

interface CalculatorProps {
  type: {
    productType: 'semi-finished' | 'finished';
    containerType: 'ampoule' | 'vial';
    materialType?: 'plastic' | 'glass';
  };
  onAddInspection: (inspection: {
    name: string;
    type: {
      productType: 'semi-finished' | 'finished';
      containerType: 'ampoule' | 'vial';
      materialType?: 'plastic' | 'glass';
    };
    batchSize: number;
    volume?: string;
    boxSize?: string;
    collectiveBoxSize?: string;
    results: {
      aqlCount: number;
      inspectionQuantity: string;
      periodicity: number;
      intervals: Array<{
        start: number;
        end: number;
      }>;
      defects: {
        critical: number;
        major: number;
        minor: number;
      };
      pharmacotheque?: {
        totalSamples: string;
        quantityIMF: string;
        boxQuantity: string;
      };
    };
  }) => void;
}

interface CalculationResult {
  aqlCount: number;
  inspectionQuantity: string;
  periodicity: number;
  intervals: Array<{
    start: number;
    end: number;
  }>;
  defects: {
    critical: number;
    major: number;
    minor: number;
  };
  pharmacotheque?: {
    totalSamples: string;
    quantityIMF: string;
    boxQuantity: string;
  };
}

const VOLUMES = {
  ampoule: {
    plastic: [
      { value: "5mL_10mL_20mL", label: "5mL, 10mL ou 20mL" },
      { value: "5mL_10mL_20mL_WFI", label: "5mL, 10mL ou 20mL WFI" },
      { value: "5mL_10mL_20mL_WFI_Adipharm", label: "5mL, 10mL ou 20mL WFI Adipharm" }
    ],
    glass: [
      { value: "1mL", label: "1mL" },
      { value: "2mL_5mL_10mL_20mL", label: "2mL, 5mL, 10mL ou 20mL" }
    ]
  },
  vial: {
    plastic: [
      { value: "1000mL", label: "1000mL" },
      { value: "500mL", label: "500mL" },
      { value: "500mL_WFI", label: "500mL WFI" },
      { value: "250mL", label: "250mL" },
      { value: "250mL_WFI", label: "250mL WFI" },
      { value: "100mL_50mL", label: "100mL ou 50mL" },
      { value: "50mL_WFI", label: "50mL WFI" }
    ],
    glass: [
      { value: "2mL", label: "2mL" },
      { value: "greater_2mL", label: ">2mL" },
      { value: "2mL_5mL_Sugammadex", label: "2mL ou 5mL Sugammadex" }
    ]
  }
};

const BOX_SIZES = {
  ampoule: {
    glass: [
      { value: "1", label: "1 ampola" },
      { value: "5", label: "5 ampolas" },
      { value: "10", label: "10 ampolas" },
      { value: "12", label: "12 ampolas" },
      { value: "50", label: "50 ampolas" },
      { value: "60", label: "60 ampolas" },
      { value: "100", label: "100 ampolas" },
      { value: "NA", label: "NA - Manual" }
    ]
  },
  vial: {
    glass: [
      { value: "10", label: "10 frascos" },
      { value: "25", label: "25 frascos" },
      { value: "50", label: "50 frascos" }
    ]
  }
};

const PHARMACOTHEQUE = {
  plastic_vial: {
    "1000mL": ["4 frascos", "1 + 2 + 1 frascos", ""],
    "500mL": ["4 frascos", "1 + 2 + 1 frascos", ""],
    "100mL_50mL": ["4 frascos", "1 + 2 + 1 frascos", ""],
    "500mL_WFI": ["6 frascos", "2 + 2 + 2 frascos", ""],
    "250mL": ["6 frascos", "2 + 2 + 2 frascos", ""],
    "250mL_WFI": ["14 frascos", "4 + 6 + 4 frascos", ""],
    "50mL_WFI": ["28 frascos", "9 + 10 + 9 frascos", ""]
  },
  plastic_ampoule: {
    "5mL_10mL_20mL": ["50 ampolas", "20 + 10 + 20 ampolas", "Verificar a quantidade no embalamento!"],
    "5mL_10mL_20mL_WFI": ["1500mL", "500mL + 500mL + 500mL", "Verificar a quantidade no embalamento!"],
    "5mL_10mL_20mL_WFI_Adipharm": ["2250mL", "750mL + 750mL + 750mL", "Verificar a quantidade no embalamento!"]
  },
  glass_ampoule: {
    "1mL": {
      "1": ["100 ampolas", "30 + 40 + 30 ampolas", "30 + 40 + 30 caixas (Total: 100 caixas)"],
      "5": ["100 ampolas", "30 + 40 + 30 ampolas", "6 + 8 + 6 caixas (Total: 20 caixas)"],
      "10": ["100 ampolas", "30 + 40 + 30 ampolas", "3 + 4 + 3 caixas (Total: 10 caixas)"],
      "12": ["120 ampolas", "36 + 48 + 36 ampolas", "3 + 4 + 3 caixas (Total: 10 caixas)"],
      "50": ["150 ampolas", "50 + 50 + 50 ampolas", "1 + 1 + 1 caixas (Total: 3 caixas)"],
      "60": ["180 ampolas", "60 + 60 + 60 ampolas", "1 + 1 + 1 caixas (Total: 3 caixas)"],
      "100": ["100 ampolas", "30 + 40 + 30 ampolas", "1 caixa"]
    },
    "2mL_5mL_10mL_20mL": {
      "1": ["50 ampolas", "20 + 10 + 20 ampolas", "20 + 10 + 20 caixas (Total: 50 caixas)"],
      "5": ["50 ampolas", "15 + 20 + 15 ampolas", "3 + 4 + 3 caixas (Total: 10 caixas)"],
      "10": ["50 ampolas", "20 + 10 + 20 ampolas", "2 + 1 + 2 caixas (Total: 5 caixas)"],
      "12": ["60 ampolas", "24 + 12 + 24 ampolas", "2 + 1 + 2 caixas (Total: 5 caixas)"],
      "50": ["50 ampolas", "20 + 10 + 20 ampolas", "1 caixa"],
      "60": ["60 ampolas", "20 + 20 + 20 ampolas", "1 caixa"],
      "100": ["100 ampolas", "30 + 40 + 30 ampolas", "1 caixa"],
      "NA": ["50 ampolas", "17 + 16 + 17 ampolas", "NA"]
    }
  },
  glass_vial: {
    "2mL": {
      "50": ["150 frascos", "50 + 50 + 50 frascos", "1 + 1 + 1 caixas (Total: 3 caixas)"]
    },
    "2mL_5mL_Sugammadex": {
      "10": ["20 frascos", "3 + 4 + 3 frascos + TE (3 + 4 + 3 frascos)", "1 + TE caixas (Total: 2 caixas)"]
    },
    "greater_2mL": {
      "25": ["75 frascos", "25 + 25 + 25 frascos", "1 + 1 + 1 caixas (Total: 3 caixas)"]
    }
  }
};

export function Calculator({ type, onAddInspection }: CalculatorProps) {
  const [inspectionName, setInspectionName] = useState('');
  const [batchSize, setBatchSize] = useState('');
  const [volume, setVolume] = useState('');
  const [boxSize, setBoxSize] = useState('');
  const [collectiveBoxSize, setCollectiveBoxSize] = useState('');

  const calculateS4Defects = (size: number) => {
    if (size <= 90) return { critical: 0, major: 0, minor: 0 };
    if (size <= 500) return { critical: 0, major: 0, minor: 1 };
    if (size <= 1200) return { critical: 0, major: 0, minor: 2 };
    if (size <= 10000) return { critical: 0, major: 0, minor: 3 };
    if (size <= 35000) return { critical: 0, major: 1, minor: 5 };
    if (size <= 500000) return { critical: 0, major: 1, minor: 7 };
    return { critical: 0, major: 2, minor: 10 };
  };

  const calculateNormalLevelIIDefects = (size: number) => {
    if (size <= 25) return { critical: 0, major: 0, minor: 0 };
    if (size <= 90) return { critical: 0, major: 0, minor: 1 };
    if (size <= 150) return { critical: 0, major: 0, minor: 2 };
    if (size <= 280) return { critical: 0, major: 0, minor: 3 };
    if (size <= 500) return { critical: 0, major: 1, minor: 5 };
    if (size <= 1200) return { critical: 0, major: 1, minor: 7 };
    if (size <= 3200) return { critical: 0, major: 2, minor: 10 };
    if (size <= 10000) return { critical: 0, major: 3, minor: 14 };
    if (size <= 35000) return { critical: 0, major: 5, minor: 21 };
    if (size <= 150000) return { critical: 0, major: 7, minor: 21 };
    if (size <= 500000) return { critical: 0, major: 10, minor: 21 };
    return { critical: 0, major: 14, minor: 21 };
  };

  const calculateTightLevelIIDefects = (size: number) => {
    if (size === 4800) return { critical: 0, major: 2, minor: 12 };
    return calculateNormalLevelIIDefects(size);
  };

  const calculateIntervals = (size: number, periodicity: number, aqlCount: number) => {
    const intervals = [];
    let start = 0;
    let end = periodicity / 2;

    for (let i = 0; i < aqlCount; i++) {
      intervals.push({
        start: Math.round(start),
        end: Math.round(end)
      });
      start = end + 1;
      end = start + periodicity;
      if (end > size) end = size;
    }

    return intervals;
  };

  const handleCalculate = () => {
    if (!inspectionName) {
      alert('Por favor, nomeie a inspeção');
      return;
    }

    if (!batchSize) {
      alert('Por favor, preencha o tamanho do lote');
      return;
    }

    const size = parseInt(batchSize);
    let aqlCount = 3;
    let inspectionQuantity = "";

    if (type.productType === 'finished') {
      if (type.materialType === 'glass') {
        if (size <= 35000) {
          inspectionQuantity = "20, 10, 20 (Total: 50)";
        } else if (size <= 500000) {
          inspectionQuantity = "30, 20, 30 (Total: 80)";
        } else if (size <= 1000000) {
          inspectionQuantity = "50, 25, 50 (Total: 125)";
        }
      } else if (type.containerType === 'ampoule') {
        if (size <= 35000) {
          aqlCount = 3;
          inspectionQuantity = "66, 66, 68 (Total: 200)";
        } else if (size <= 150000) {
          aqlCount = 3;
          inspectionQuantity = "300, 200, 300 (Total: 800)";
        } else {
          aqlCount = 5;
          inspectionQuantity = "160, 160, 160, 160, 160 (Total: 800)";
        }
      } else {
        if (size <= 10000) {
          aqlCount = 2;
          inspectionQuantity = "100, 100 (Total: 200)";
        } else if (size <= 35000) {
          aqlCount = 3;
          inspectionQuantity = "66, 66, 68 (Total: 200)";
        }
      }
    } else {
      if (type.materialType === 'glass') {
        if (size <= 35000) {
          aqlCount = 2;
          inspectionQuantity = "100, 100 (Total: 200)";
        } else if (size <= 70000) {
          aqlCount = 2;
          inspectionQuantity = "400, 400 (Total: 800)";
        } else if (size <= 150000) {
          aqlCount = 3;
          inspectionQuantity = "300, 200, 300 (Total: 800)";
        } else {
          aqlCount = 5;
          inspectionQuantity = "160, 160, 160, 160, 160 (Total: 800)";
        }
      } else {
        if (size <= 35000) {
          aqlCount = 2;
          inspectionQuantity = "100, 100 (Total: 200)";
        } else {
          aqlCount = 3;
          inspectionQuantity = "66, 66, 68 (Total: 200)";
        }
      }
    }

    const periodicity = size / (aqlCount - 1);
    let defects;
    
    if (type.materialType === 'glass' && type.productType === 'finished') {
      defects = calculateS4Defects(size);
    } else if (type.containerType === 'vial' && type.materialType === 'plastic' && size === 4800) {
      defects = calculateTightLevelIIDefects(size);
    } else {
      defects = calculateNormalLevelIIDefects(size);
    }

    let pharmacotheque;
    if (type.productType === 'finished' && volume) {
      if (type.materialType === 'glass') {
        if (type.containerType === 'ampoule' && boxSize) {
          pharmacotheque = {
            totalSamples: PHARMACOTHEQUE.glass_ampoule[volume][boxSize][0],
            quantityIMF: PHARMACOTHEQUE.glass_ampoule[volume][boxSize][1],
            boxQuantity: PHARMACOTHEQUE.glass_ampoule[volume][boxSize][2]
          };
        } else if (type.containerType === 'vial' && boxSize) {
          const vialPharmacotheque = PHARMACOTHEQUE.glass_vial[volume]?.[boxSize];
          if (vialPharmacotheque) {
            pharmacotheque = {
              totalSamples: vialPharmacotheque[0],
              quantityIMF: vialPharmacotheque[1],
              boxQuantity: vialPharmacotheque[2]
            };
          }
        }
      } else {
        const plasticKey = `${type.containerType === 'ampoule' ? 'plastic_ampoule' : 'plastic_vial'}`;
        const plasticPharmacotheque = PHARMACOTHEQUE[plasticKey][volume];
        if (plasticPharmacotheque) {
          pharmacotheque = {
            totalSamples: plasticPharmacotheque[0],
            quantityIMF: plasticPharmacotheque[1],
            boxQuantity: plasticPharmacotheque[2]
          };
        }
      }
    }

    const results = {
      aqlCount,
      inspectionQuantity,
      periodicity,
      intervals: calculateIntervals(size, periodicity, aqlCount),
      defects,
      pharmacotheque
    };

    onAddInspection({
      name: inspectionName,
      type,
      batchSize: size,
      volume,
      boxSize,
      collectiveBoxSize,
      results
    });
  };

  const getTitle = () => {
    const productName = type.productType === 'semi-finished' ? 'Semi-Acabado' : 'Acabado';
    const containerName = type.containerType === 'ampoule' ? 'Ampolas' : 'Frascos';
    const materialName = type.materialType === 'plastic' ? 'PE' : 'VD';
    
    return `${productName} - ${containerName}${type.materialType ? ` ${materialName}` : ''}`;
  };

  const availableVolumes = type.containerType && type.materialType ? 
    VOLUMES[type.containerType][type.materialType] : [];

  const availableBoxSizes = type.containerType && type.materialType && 
    BOX_SIZES[type.containerType]?.[type.materialType] || [];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{getTitle()}</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nome da Inspeção
            </label>
            <input
              type="text"
              value={inspectionName}
              onChange={(e) => setInspectionName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Digite o nome da inspeção"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tamanho do Lote
            </label>
            <input
              type="number"
              value={batchSize}
              onChange={(e) => setBatchSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Digite o tamanho do lote"
            />
          </div>
          
          {type.productType === 'finished' && (
            <>
              <Select
                label="Volume"
                options={availableVolumes}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />

              {availableBoxSizes.length > 0 && (
                <Select
                  label="Tamanho da Caixa"
                  options={availableBoxSizes}
                  value={boxSize}
                  onChange={(e) => setBoxSize(e.target.value)}
                />
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Quantidade por Caixa Coletiva
                </label>
                <input
                  type="number"
                  value={collectiveBoxSize}
                  onChange={(e) => setCollectiveBoxSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Digite a quantidade por caixa coletiva"
                />
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Iniciar Inspeção
        </button>
      </div>
    </div>
  );
}