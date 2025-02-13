import { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { Layout } from './components/Layout';
import { ProductTypeSelection } from './components/ProductTypeSelection';
import { Calculator } from './components/Calculator';

type CalculatorType = {
  productType: 'semi-finished' | 'finished';
  containerType: 'ampoule' | 'vial';
  materialType?: 'plastic' | 'glass';
} | null;

export default function App() {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType>(null);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CalculatorIcon className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">Calculadora AQL</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Calcule os valores do Limite de Qualidade Aceitável (AQL) e requisitos de amostragem para controle de qualidade na fabricação farmacêutica.
            </p>
          </header>

          {!selectedCalculator ? (
            <ProductTypeSelection onSelect={setSelectedCalculator} />
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedCalculator(null)}
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
              >
                ← Voltar para seleção
              </button>
              <Calculator type={selectedCalculator} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}