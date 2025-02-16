import React from 'react';
import { X } from 'lucide-react';

interface Inspection {
  id: string;
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
}

interface DashboardProps {
  inspections: Inspection[];
  onFinishInspection: (id: string) => void;
}

export function Dashboard({ inspections, onFinishInspection }: DashboardProps) {
  const getTypeLabel = (type: Inspection['type']) => {
    const productName = type.productType === 'semi-finished' ? 'Semi-Acabado' : 'Acabado';
    const containerName = type.containerType === 'ampoule' ? 'Ampolas' : 'Frascos';
    const materialName = type.materialType === 'plastic' ? 'PE' : 'VD';
    return `${productName} - ${containerName} ${materialName}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Inspeções em Andamento</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {inspections.map((inspection) => (
          <div key={inspection.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-indigo-50 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{inspection.name}</h2>
                <p className="text-sm text-gray-600">{getTypeLabel(inspection.type)}</p>
              </div>
              <button
                onClick={() => onFinishInspection(inspection.id)}
                className="p-1 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                title="Encerrar Inspeção"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Informações do Lote</h3>
                <div className="text-sm text-gray-600">
                  <p>Tamanho do Lote: {inspection.batchSize}</p>
                  {inspection.volume && <p>Volume: {inspection.volume}</p>}
                  {inspection.boxSize && <p>Tamanho da Caixa: {inspection.boxSize}</p>}
                  {inspection.collectiveBoxSize && (
                    <p>Quantidade por Caixa Coletiva: {inspection.collectiveBoxSize}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Informações do AQL</h3>
                <div className="text-sm text-gray-600">
                  <p>Quantidade de AQLs: {inspection.results.aqlCount}</p>
                  <p>Quantidade a Inspecionar: {inspection.results.inspectionQuantity}</p>
                  <p>Periodicidade: {Math.round(inspection.results.periodicity)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Intervalos</h3>
                <div className="text-sm text-gray-600">
                  {inspection.results.intervals.map((interval, index) => (
                    <p key={index}>
                      AQL {index + 1}: {Math.round(interval.start)} até {Math.round(interval.end)}
                      {inspection.collectiveBoxSize && (
                        <span className="block text-gray-500">
                          (da caixa {Math.ceil(interval.start/parseInt(inspection.collectiveBoxSize))} até a caixa {Math.ceil(interval.end/parseInt(inspection.collectiveBoxSize))})
                        </span>
                      )}
                    </p>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Defeitos Aceitáveis</h3>
                <div className="text-sm text-gray-600">
                  <p>Críticos: {inspection.results.defects.critical}</p>
                  <p>Maiores: {inspection.results.defects.major}</p>
                  <p>Menores: {inspection.results.defects.minor}</p>
                </div>
              </div>

              {inspection.results.pharmacotheque && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Farmacoteca</h3>
                  <div className="text-sm text-gray-600">
                    <p>Total de Amostras: {inspection.results.pharmacotheque.totalSamples}</p>
                    <p>Quantidade (I/M/F): {inspection.results.pharmacotheque.quantityIMF}</p>
                    <p>Quantidade de Caixas: {inspection.results.pharmacotheque.boxQuantity}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {inspections.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            Nenhuma inspeção em andamento
          </div>
        )}
      </div>
    </div>
  );
}